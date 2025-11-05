import { redirect } from "next/navigation";
import { addInfo } from "../../prisma/seed";
import InfoForm from "@/components/Form";

type In = {
  value: string,
  message: string
}

export type Message = {
  name: In,
  email: In
}

export default function AddUserPage() {

  async function createInfo(prevState: any, formData: FormData) {
    "use server";
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const messages: Message = {
      name: {
        value: name,
        message: ""
      },
      email: {
        value: email,
        message: ""
      }
    }

    if (!name) {
      messages.name.message = "name is req"
    }

    if (!email) {
      messages.email.message = "name is req"
    }

    if (name && email) {
      await addInfo({ name, email })
      redirect(`/done/${email}`)
    }

    return messages
  }

  return (

    <div className=" w-90 md:w-140 md:h-130 card text-white m-auto rounded-2xl flex flex-col gap-10">
      <div className=' mt-10 ml-10'>
        <h1 className='font-bold text-3xl text-green-500'>Personal Info</h1>
        <p className='text-gray-400'>Enter this info:</p>
      </div>
      <InfoForm createInfo={createInfo} />
    </div>
  );
}



// "use client";
// import { useState } from "react";

// export default function AddUserPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: ""
//   });

//   const [message, setMessage] = useState("");

//   // ⬇ لما المستخدم يغيّر أي input
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ⬇ لما المستخدم يضغط "Submit"
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("جارٍ الإرسال...");

//     try {
//       const res = await fetch("/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "حدث خطأ");

//       setMessage("✅ تم الإرسال بنجاح!");
//       setFormData({ name: "", email: "" });
//     } catch (err: any) {
//       setMessage(`❌ خطأ: ${err.message}`);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">إضافة مستخدم جديد</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-3 w-80 border p-5 rounded-lg shadow"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="الاسم"
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="الإيميل"
//           value={formData.email}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           إرسال
//         </button>
//       </form>

//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }