import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// تسجيل مكونات Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [totalDonations, setTotalDonations] = useState(0); // إجمالي التبرعات
  const [activeProjects, setActiveProjects] = useState([]); // المشاريع النشطة

  // جلب بيانات التقارير من الخادم
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        const data = await response.json();

        // تحديث الحالة بالبيانات المسترجعة
        setTotalDonations(data.totalDonations);
        setActiveProjects(data.activeProjects);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  // بيانات الرسم البياني الشريطي
  const barChartData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "عدد التبرعات",
        data: [120, 190, 300, 250, 180, 400],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // بيانات الرسم البياني الدائري
  const pieChartData = {
    labels: ["مشاريع الغذاء", "مشاريع الدعم المالي", "مشاريع الأطفال"],
    datasets: [
      {
        label: "توزيع المشاريع",
        data: [40, 35, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-8">تقارير المنصة</h1>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800">إجمالي التبرعات</h2>
          <p className="text-2xl text-green-600 font-bold">{totalDonations} ريال</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800">عدد المتبرعين</h2>
          <p className="text-2xl text-green-600 font-bold">12,345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800">عدد المشاريع</h2>
          <p className="text-2xl text-green-600 font-bold">{activeProjects.length}</p>
        </div>
      </div>

      {/* الرسم البياني الشريطي */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">عدد التبرعات الشهرية</h2>
        <div className="h-96">
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "التبرعات الشهرية",
                },
              },
            }}
          />
        </div>
      </div>

      {/* الرسم البياني الدائري */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">توزيع المشاريع</h2>
          <div className="h-96">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "توزيع المشاريع",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* جدول المشاريع النشطة */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">المشاريع النشطة</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">اسم المشروع</th>
                  <th className="py-2 px-4 border-b">إجمالي التبرعات</th>
                  <th className="py-2 px-4 border-b">عدد المتبرعين</th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.map((project) => (
                  <tr key={project.project_id}>
                    <td className="py-2 px-4 border-b">مشروع {project.project_id}</td>
                    <td className="py-2 px-4 border-b">{project.total_donated} ريال</td>
                    <td className="py-2 px-4 border-b">{project.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* خريطة التوزيع الجغرافي */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">التوزيع الجغرافي</h2>
        <div className="h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">خريطة تفاعلية ستظهر هنا</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;