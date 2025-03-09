import React from "react";
import { useNotifications } from "../context/NotificationsContext";

const BeneficiariesPage = () => {
  const { notifications } = useNotifications();

  return (
    <div className="pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">المستفيدون</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold mb-2">الأسر المحتاجة</h3>
            <p className="text-gray-600">عدد المستفيدين: 150 أسرة</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold mb-2">الأيتام</h3>
            <p className="text-gray-600">عدد المستفيدين: 75 يتيم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiariesPage;