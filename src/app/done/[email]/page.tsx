import { getInfo } from '../../../../prisma/seed';
import { redirect } from 'next/navigation';

async function page({ params }: { params: Promise<{ email: string }> }) {

    const { email } = await params;

    const info = await getInfo(email.replace("%40", "@"))

    const InfoForm = {
        email: '',
        name: ''
    }

    console.log(info);


    if (info === false) redirect("/")


    if (info) {
        InfoForm.email = info.user.email
        InfoForm.name = info.user.name
    }

    const arr = [
        {
            head: "Name:",
            value: InfoForm.name
        },
        {
            head: "Email Address:",
            value: InfoForm.email
        }
    ]


    return (
        <>
            <div className=" w-90 md:w-140 md:h-110 card text-white m-auto rounded-2xl flex flex-col gap-10">
                <div className=' mt-10 ml-10'>
                    <h1 className='font-bold text-3xl text-green-500'>Done</h1>
                    <p className='text-gray-400'>The assigned information is:</p>
                </div>
                <div className='ml-15'>
                    {
                        arr.map((ele, key) => {
                            return (
                                <div key={key} className='flex flex-col md:flex-row gap-3 mb-15'>
                                    <li className='text-xl'>{ele.head}</li>
                                    <p className='text-xl'>{ele.value}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default page