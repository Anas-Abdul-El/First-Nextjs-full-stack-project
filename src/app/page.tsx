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


// import { getInfo } from '../../../../prisma/seed';
// import { redirect } from 'next/navigation';

// async function page({ params }: { params: Promise<{ email: string }> }) {

//     const { email } = await params;

//     const info = await getInfo(email.replace("%40", "@"))

//     const InfoForm = {
//         email: '',
//         phoneNumber: 0,
//         name: ''
//     }

//     if (info === false) redirect("/")


//     if (info) {
//         InfoForm.email = info.user[0].email
//         InfoForm.phoneNumber = info.user[0].phoneNumber
//         InfoForm.name = info.user[0].name
//     }

//     const arr = [
//         {
//             head: "Name:",
//             value: InfoForm.name
//         },
//         {
//             head: "Email Address:",
//             value: InfoForm.email
//         },
//         {
//             head: "Phone Number:",
//             value: InfoForm.phoneNumber
//         },
//     ]


//     return (
//         <>
//             <div className=" w-90 md:w-140 md:h-130 card text-white m-auto rounded-2xl flex flex-col gap-10">
//                 <div className=' mt-10 ml-10'>
//                     <h1 className='font-bold text-3xl text-green-500'>Done</h1>
//                     <p className='text-gray-400'>The assigned information is:</p>
//                 </div>
//                 <div className='ml-15'>
//                     {
//                         arr.map((ele, key) => {
//                             return (
//                                 <div key={key} className='flex flex-col md:flex-row gap-3 mb-15'>
//                                     <li className='text-xl'>{ele.head}</li>
//                                     <p className='text-xl'>{ele.value}</p>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//         </>
//     )
// }

// export default page