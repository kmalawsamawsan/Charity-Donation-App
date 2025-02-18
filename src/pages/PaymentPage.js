import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Qr4dyAhvoEPVZE99VkZNFbILdHiGnUC7zxTIOLcsMzfqyn7dnMYiCEDfIck8MZ1b15VJNEQqEPK2aT8Rt4wKUWu0094YNA6p9");

const PaymentForm = ({ donationAmount, projectId, projectName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  // دالة معالجة الدفع باستخدام Stripe
  const handleStripePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/donate", {
        amount: donationAmount * 100,
        currency: "sar",
      });

      const { clientSecret } = response.data;
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Donor Name",
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await handlePaymentSuccess(paymentIntent);
        alert("تم التبرع بنجاح باستخدام Stripe!");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء معالجة الدفع:", error);
      setError("حدث خطأ أثناء معالجة الدفع.");
    } finally {
      setLoading(false);
    }
  };

  // دالة معالجة الدفع باستخدام PayPal
  const handlePayPalPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api.sandbox.paypal.com/v2/checkout/orders",
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "SAR",
                value: donationAmount,
              },
            },
          ],
        },
        {
          auth: {
            username: process.env.REACT_APP_PAYPAL_CLIENT_ID,
            password: process.env.REACT_APP_PAYPAL_SECRET,
          },
        }
      );

      const { id } = response.data;
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${id}`;
    } catch (error) {
      console.error("حدث خطأ أثناء معالجة الدفع باستخدام PayPal:", error);
      setError("حدث خطأ أثناء معالجة الدفع باستخدام PayPal.");
    } finally {
      setLoading(false);
    }
  };

  // دالة معالجة الدفع باستخدام Skrill
  const handleSkrillPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/skrill/create-payment", {
        amount: donationAmount,
        currency: "SAR",
        email: "sb-fo1zr37402305@personal.example.com", // البريد الإلكتروني الصحيح
      });

      const { paymentUrl } = response.data;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("حدث خطأ أثناء معالجة الدفع باستخدام Skrill:", error);
      setError("حدث خطأ أثناء معالجة الدفع باستخدام Skrill.");
    } finally {
      setLoading(false);
    }
  };

  // دالة معالجة الدفع باستخدام Payoneer
  const handlePayoneerPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/payoneer/create-payment", {
        amount: donationAmount,
        currency: "SAR",
        email: "sb-fo1zr37402305@personal.example.com", // البريد الإلكتروني الصحيح
      });

      const { paymentUrl } = response.data;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("حدث خطأ أثناء معالجة الدفع باستخدام Payoneer:", error);
      setError("حدث خطأ أثناء معالجة الدفع باستخدام Payoneer.");
    } finally {
      setLoading(false);
    }
  };

  // دالة حفظ بيانات التبرع في قاعدة البيانات
  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      const response = await axios.post("http://localhost:5000/api/donations", {
        user_id: localStorage.getItem("userId"),
        project_id: projectId,
        amount: donationAmount,
        payment_method: paymentIntent.payment_method || "PayPal",
        transaction_id: paymentIntent.id || paymentIntent.orderID,
        status: "completed",
      });

      console.log("تم تخزين التبرع في قاعدة البيانات:", response.data);
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ بيانات التبرع:", error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">اختر طريقة الدفع:</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setPaymentMethod("stripe")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              paymentMethod === "stripe" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            دفع باستخدام Stripe
          </button>
          <button
            onClick={() => setPaymentMethod("paypal")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              paymentMethod === "paypal" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            دفع باستخدام PayPal
          </button>
          <button
            onClick={() => setPaymentMethod("skrill")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              paymentMethod === "skrill" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            دفع باستخدام Skrill
          </button>
          <button
            onClick={() => setPaymentMethod("payoneer")}
            className={`px-4 py-2 rounded transition-all duration-300 ${
              paymentMethod === "payoneer" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            دفع باستخدام Payoneer
          </button>
        </div>
      </div>

      {paymentMethod === "stripe" && (
        <form onSubmit={handleStripePayment} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">تفاصيل البطاقة</label>
            <div className="p-2 border rounded-lg">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            {loading ? "جاري المعالجة..." : "تبرع الآن"}
          </button>
        </form>
      )}

      {paymentMethod === "paypal" && (
        <div className="space-y-4">
          <button
            onClick={handlePayPalPayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            {loading ? "جاري التوجيه إلى PayPal..." : "دفع باستخدام PayPal"}
          </button>
        </div>
      )}

      {paymentMethod === "skrill" && (
        <div className="space-y-4">
          <button
            onClick={handleSkrillPayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
          >
            {loading ? "جاري التوجيه إلى Skrill..." : "دفع باستخدام Skrill"}
          </button>
        </div>
      )}

      {paymentMethod === "payoneer" && (
        <div className="space-y-4">
          <button
            onClick={handlePayoneerPayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            {loading ? "جاري التوجيه إلى Payoneer..." : "دفع باستخدام Payoneer"}
          </button>
        </div>
      )}
    </div>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const donationAmount = location.state?.donationAmount || "0";
  const projectId = location.state?.projectId || null;
  const projectName = location.state?.projectName || "";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div dir="rtl" className="max-w-md w-full bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-green-300 to-transparent opacity-50 blur-lg transform -translate-y-1/2"></div>

        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">قيمة التبرع:</h2>
            <div className="text-xl font-bold text-green-600">
              {donationAmount} <span className="text-gray-600">ريال</span>
            </div>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm
            donationAmount={donationAmount}
            projectId={projectId}
            projectName={projectName}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;