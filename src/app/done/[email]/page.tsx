import { Suspense } from 'react';
import Link from 'next/link';

type User = {
    name: string,
    email: string,
    message: string
}
async function page({ params }: { params: Promise<{ email: string }> }) {

    const { email } = await params;

    console.log(email);


    async function get() {

        const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const res = await fetch(`${baseURL}/api?email=${email}`)

        const data = await res.json();

        return data

    }

    const data = await get()

    const fEmail = data.email;
    const name = data.name;

    console.log(name, fEmail);



    return (
        <>

            <div className=" w-90 md:w-140 md:h-110 h-102 card text-white m-auto rounded-2xl flex flex-col gap-10">
                <div className=' mt-10 ml-10'>
                    <h1 className='font-bold text-3xl text-green-500'>Submit Done</h1>
                    <p className='text-gray-400'>the submitted info is:</p>
                </div>

                <div className='flex flex-col gap-15'>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-row gap-4 ml-10 text-xl">
                            <p>Name:</p>
                            <p>{name}</p>
                        </div>
                        <div className="flex flex-row gap-4 ml-10 text-xl">
                            <p>Email:</p>
                            <p>{fEmail}</p>
                        </div>
                    </div>
                    <div>
                        <button className='p-3 border-2 border-solid border-white ml-25 md:ml-50 rounded-2xl hover:text-green-300 hover:border-green-300'>
                            <Link href="/">return to home</Link>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default page