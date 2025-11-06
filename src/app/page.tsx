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

    <div className=" w-90 md:w-140 md:h-110 h-102 card text-white m-auto rounded-2xl flex flex-col gap-10">
      <div className=' mt-10 ml-10'>
        <h1 className='font-bold text-3xl text-green-500'>Personal Info</h1>
        <p className='text-gray-400'>Enter this info:</p>
      </div>
      <InfoForm createInfo={createInfo} />
    </div>
  );
}

