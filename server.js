require('dotenv').config(); // تحميل متغيرات البيئة

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

// إعداد السيرفر
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // استخدام المفتاح السري من متغيرات البيئة

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());

// إعداد قاعدة البيانات PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'charity_donation',
  password: process.env.DB_PASSWORD || '123',
  port: process.env.DB_PORT || 5432,
});

// التحقق من وجود مجلد `uploads`
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// إعداد Multer لتخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// عرض الملفات من مجلد `uploads`
app.use('/uploads', express.static(uploadDir));

// نقطة النهاية لتحميل الصور
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "لم يتم تحميل أي صورة" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// نقطة النهاية للتسجيل
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  // التحقق من صحة البيانات المدخلة
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  try {
    // التحقق مما إذا كان البريد الإلكتروني مستخدمًا بالفعل
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إدراج المستخدم في قاعدة البيانات
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashedPassword, phone, 'user']
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "حدث خطأ أثناء التسجيل" });
  }
});

// نقطة النهاية لتسجيل الدخول
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // التحقق من صحة البيانات المدخلة
  if (!email || !password) {
    return res.status(400).json({ message: "البريد الإلكتروني وكلمة المرور مطلوبان" });
  }

  try {
    // البحث عن المستخدم في قاعدة البيانات
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "البريد الإلكتروني غير موجود" });
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
    }

    // إنشاء رمز مصادقة (JWT)
    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET || 'secret_key', // استخدم متغيرات البيئة في الإنتاج
      { expiresIn: '1h' }
    );

    res.json({ token, user: user.rows[0] });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
  }
});

// نقطة النهاية لتسجيل دخول المسؤول
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // البحث عن المسؤول في قاعدة البيانات
    const admin = await pool.query("SELECT * FROM users WHERE email = $1 AND role = 'admin'", [email]);
    if (admin.rows.length === 0) {
      return res.status(401).json({ message: "غير مصرح بالوصول" });
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, admin.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
    }

    // إنشاء رمز مصادقة (JWT)
    const token = jwt.sign(
      { userId: admin.rows[0].id, role: 'admin' },
      process.env.JWT_SECRET || 'secret_key', // استخدم متغيرات البيئة في الإنتاج
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
  }
});

// Middleware لحماية المسار /admin/dashboard
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "غير مصرح بالوصول" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "غير مصرح بالوصول" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    return res.status(401).json({ message: "رمز المصادقة غير صالح" });
  }
};

// نقطة النهاية للوصول إلى لوحة تحكم المسؤول
app.get('/admin/dashboard', authenticateAdmin, (req, res) => {
  res.json({ message: "مرحبًا بالمسؤول" });
});

// نقطة النهاية لإضافة المشاريع
app.post("/api/projects", async (req, res) => {
  const { title, description, category_id, region_id, impact_id, amount, image_url } = req.body;

  // التحقق من صحة البيانات المدخلة
  if (!title || !description || !category_id || !region_id || !impact_id || !amount || !image_url) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  try {
    const newProject = await pool.query(
      "INSERT INTO Projects (title, description, category_id, region_id, impact_id, amount, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, category_id, region_id, impact_id, amount, image_url]
    );

    res.status(201).json(newProject.rows[0]);
  } catch (error) {
    console.error("حدث خطأ أثناء إنشاء المشروع:", error);
    res.status(500).json({ message: "حدث خطأ أثناء إنشاء المشروع" });
  }
});

// نقطة النهاية لجلب جميع المشاريع
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM Projects");
    res.json(projects.rows);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// نقطة النهاية لحذف مشروع معين
app.delete("/api/projects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await pool.query("DELETE FROM Projects WHERE id = $1 RETURNING *", [id]);
    if (deletedProject.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(deletedProject.rows[0]);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// نقطة نهاية لتسجيل الدفع اليدوي
app.post('/api/payment', async (req, res) => {
  const { userId, amount } = req.body;

  // التحقق من صحة البيانات المدخلة
  if (!userId || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ success: false, message: 'بيانات غير صالحة' });
  }

  try {
    // التحقق من وجود المستخدم
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    // إدخال الدفع في قاعدة البيانات
    const result = await pool.query(
      'INSERT INTO payments (user_id, amount, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [userId, amount, 'completed']
    );

    res.json({ success: true, payment: result.rows[0] });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء معالجة الدفع' });
  }
});

// نقطة نهاية للتبرع باستخدام Stripe
app.post('/api/donate', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // إنشاء نية دفع (Payment Intent) عبر Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // تحويل المبلغ إلى سنتات
      currency: currency || 'usd', // العملة الافتراضية هي الدولار
      payment_method_types: ['card'],
    });

    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ success: false, message: 'Payment failed', error: error.message });
  }
});

// نقطة نهاية لتخزين التبرعات في قاعدة البيانات
app.post('/api/donations', async (req, res) => {
  const { user_id, project_id, amount, payment_method, transaction_id, status } = req.body;

  try {
    // إدراج التبرع في قاعدة البيانات
    
    const result = await pool.query(
      `INSERT INTO donations (user_id, project_id, amount, payment_method, transaction_id, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
      [user_id, project_id, amount, payment_method, transaction_id, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to save donation' });
  }
});

// نقطة نهاية لجلب التبرعات
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await pool.query("SELECT * FROM donations");
    res.json(donations.rows);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// نقطة نهاية لمعالجة Stripe Webhook
app.post('/stripe-webhook', async (req, res) => {
  const event = req.body;

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // استخراج بيانات التبرع
    const amount = paymentIntent.amount / 100; // تحويل إلى عملة صحيحة
    const currency = paymentIntent.currency;
    const donor_email = paymentIntent.receipt_email;

    // حفظ التبرع في قاعدة البيانات
    try {
      const result = await pool.query(
        `INSERT INTO donations (user_id, project_id, amount, payment_method, transaction_id, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
        [null, null, amount, 'Stripe', paymentIntent.id, 'completed']
      );

      console.log("تم تخزين التبرع في قاعدة البيانات:", result.rows[0]);
      res.status(200).send('تم الحفظ بنجاح');
    } catch (error) {
      console.error('Error saving donation:', error);
      res.status(500).json({ error: 'Failed to save donation' });
    }
  } else {
    res.status(400).send('حدث خطأ');
  }
});

// بدء تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});