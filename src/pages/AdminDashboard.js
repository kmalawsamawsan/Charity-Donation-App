import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    category_id: "",
    region_id: "",
    impact_id: "",
    amount: "",
  });
  const [image, setImage] = useState(null); // تخزين مسار الصورة
  const [projects, setProjects] = useState([]); // لتخزين قائمة المشاريع

  // جلب جميع المشاريع من الخادم
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // جلب المشاريع عند تحميل الصفحة
  useEffect(() => {
    fetchProjects();
  }, []);

  // تحديث الحقول عند التغيير
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  // رفع ملف الصورة وتخزين مسار الصورة
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImage(response.data.imageUrl); // تخزين مسار الصورة
    } catch (error) {
      console.error("حدث خطأ أثناء تحميل الصورة:", error);
    }
  };

  // إرسال النموذج لإضافة مشروع جديد
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/projects", {
        ...projectData,
        image_url: image, // إرسال رابط الصورة إلى الخادم
      });

      if (response.status === 201) {
        alert("تمت إضافة المشروع بنجاح");
        fetchProjects(); // تحديث قائمة المشاريع بعد الإضافة
        setProjectData({
          title: "",
          description: "",
          category_id: "",
          region_id: "",
          impact_id: "",
          amount: "",
        });
        setImage(null); // تفريغ حقل الصورة
      } else {
        alert(`حدث خطأ أثناء إضافة المشروع: ${response.data.message || "خطأ غير معروف"}`);
      }
    } catch (error) {
      alert(`حدث خطأ أثناء إضافة المشروع: ${error.message}`);
    }
  };

  // حذف مشروع معين
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/projects/${id}`);
      if (response.status === 200) {
        alert("تم حذف المشروع بنجاح");
        fetchProjects(); // تحديث قائمة المشاريع بعد الحذف
      } else {
        alert(`حدث خطأ أثناء حذف المشروع: ${response.data.message || "خطأ غير معروف"}`);
      }
    } catch (error) {
      alert(`حدث خطأ أثناء حذف المشروع: ${error.message}`);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">لوحة تحكم المشاريع</h2>

      {/* نموذج إضافة مشروع */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="عنوان المشروع"
          className="w-full p-2 border rounded-lg"
          value={projectData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="وصف المشروع"
          className="w-full p-2 border rounded-lg"
          value={projectData.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          className="w-full p-2 border rounded-lg"
          onChange={handleImageUpload}
          required
        />
        {image && <img src={image} alt="Preview" className="w-32 h-32 object-cover" />}
        <select
          name="category_id"
          className="w-full p-2 border rounded-lg"
          value={projectData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">اختر الفئة</option>
          <option value="1">صدقة</option>
          <option value="2">كفارة</option>
          <option value="3">الأيتام</option>
          <option value="4">زكاة</option>
          <option value="5">الأنعام</option>
          <option value="6">الأوقاف</option>
        </select>
        <select
          name="region_id"
          className="w-full p-2 border rounded-lg"
          value={projectData.region_id}
          onChange={handleChange}
          required
        >
          <option value="">اختر المنطقة</option>
          <option value="1">الرياض</option>
          <option value="2">مكة</option>
          <option value="3">جدة</option>
          <option value="4">الدمام</option>
          <option value="5">تبوك</option>
          <option value="6">الطائف</option>
          <option value="7">حائل</option>
        </select>
        <select
          name="impact_id"
          className="w-full p-2 border rounded-lg"
          value={projectData.impact_id}
          onChange={handleChange}
          required
        >
          <option value="">اختر التأثير</option>
          <option value="1">رعوية</option>
          <option value="2">تنموية</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="المبلغ الافتراضي للتبرع"
          className="w-full p-2 border rounded-lg"
          value={projectData.amount}
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg">
          إضافة المشروع
        </button>
      </form>

      {/* قائمة المشاريع */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">قائمة المشاريع</h3>
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="flex justify-between items-center border p-4 rounded-lg">
                <div>
                  <h4 className="font-bold">{project.title}</h4>
                  <p>{project.description}</p>
                  <p>المبلغ: {project.amount}</p>
                  {project.image_url && (
                    <img
                      src={`http://localhost:5000${project.image_url}`} // عرض الصورة من مجلد uploads
                      alt={project.title}
                      className="w-24 h-24 object-cover mt-2 rounded-lg"
                    />
                  )}
                </div>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>لا توجد مشاريع مضافة.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;