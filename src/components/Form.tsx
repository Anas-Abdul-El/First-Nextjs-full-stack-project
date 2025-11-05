// 'use client'

// import { useActionState } from 'react'
// import Form from 'next/form'
// import type { Message } from '@/app/page'

// function InfoForm({ createInfo }: { createInfo: (prevState: any, formData: FormData) => Promise<Message> }) {

//     const message: Message = {
//         name: {
//             value: "",
//             message: '',
//         },
//         email: {
//             value: "",
//             message: '',
//         },
//         phoneNumber: {
//             value: "",
//             message: '',
//         }
//     }

//     const [state, formAction, isPending] = useActionState(createInfo, message)

//     return (
//         <Form action={formAction} className='flex flex-col gap-5 md:gap-10 ml-8 md:ml-10  w-5/6'>
//             <div className='flex flex-col '>

//                 <div className='flex justify-between'>
//                     <label htmlFor="name">Name</label>
//                     <p className='text-red-500'>{state.name.message}</p>
//                 </div>

//                 <input
//                     type="text"
//                     name='name'
//                     id='name'
//                     placeholder='Your full name'
//                     className='border-gray-400 border-2 w-full rounded-xl p-2'
//                     defaultValue={state?.name?.value} />

//             </div>

//             <div className='flex flex-col '>

//                 <div className='flex justify-between'>
//                     <label htmlFor="email">Email Address</label>
//                     <p className='text-red-500'>{state.email.message}</p>
//                 </div>

//                 <input
//                     type="text"
//                     name='email'
//                     id='email'
//                     placeholder='example@.com'
//                     className='border-gray-400 border-2 w-full rounded-xl p-2'
//                     defaultValue={state?.email?.value} />

//             </div>

//             <div className='flex flex-col '>

//                 <div className='flex justify-between'>
//                     <label htmlFor="number">Phone Number</label>
//                     <p className='text-red-500'>{state.phoneNumber.message}</p>
//                 </div>

//                 <input
//                     type="text"
//                     name='phoneNumber'
//                     id='number'
//                     placeholder='00 000 000'
//                     className='border-gray-400 border-2 w-full rounded-xl p-2'
//                     defaultValue={state?.phoneNumber?.value} />

//             </div>

//             <button
//                 type='submit'
//                 className='w-fit p-1 text-xl ml-25 md:ml-46 cursor-pointer transition-colors hover:text-gray-500'>{isPending ? "loading..." : "Submit"}</button>
//         </Form>
//     )
// }

// export default InfoForm