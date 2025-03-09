const express = require('express');
const pool = require('./db');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 5006;

// إعداد multer لتخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // مجلد تخزين الصور
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // اسم الملف
  }
});

const upload = multer({ storage });

// إنشاء مجلد uploads إذا لم يكن موجودًا
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // تقديم الملفات الثابتة من مجلد uploads

// نقاط النهاية
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { name, description, targetamount, startdate } = req.body;
    const image = req.file ? req.file.filename : null; // اسم الملف إذا تم تحميله

    const result = await pool.query(
      'INSERT INTO projects (name, description, targetamount, startdate, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, targetamount, startdate, image]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/donations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donations');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/interactions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM interactions');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/associations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM associations');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// تقديم ملف index.html عند الوصول إلى الجذر
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});