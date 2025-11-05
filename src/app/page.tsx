"use client";
import { useState } from "react";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [message, setMessage] = useState("");

  // ⬇ لما المستخدم يغيّر أي input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ⬇ لما المستخدم يضغط "Submit"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("جارٍ الإرسال...");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "حدث خطأ");

      setMessage("✅ تم الإرسال بنجاح!");
      setFormData({ name: "", email: "" });
    } catch (err: any) {
      setMessage(`❌ خطأ: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">إضافة مستخدم جديد</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-80 border p-5 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="الاسم"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="الإيميل"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          إرسال
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}