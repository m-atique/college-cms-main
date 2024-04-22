'use client'
import React ,{useState}from 'react'

import { signOut} from "next-auth/react"
// import logo from '../../components/assests/PMP LOGO.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// const onsubmit = async ()=>{
//   await  signOut(
// {

// redirect:true,
// callbackUrl :'/'
// })}


const Signouthandle = () => {

  const router = useRouter()


  return (
    <div className ='flex justify-center items-center h-screen w-full'>
    <div  className='flex flex-col bg-gray-300 rounded-md gap-3 items-center justify-center w-2/6 h-3/6 font-sans'>
     {/* <Image src={logo}  alt="logo" width={90} height ={90} className='sm:w-44 sm:h-44 w-10 h-10'
     /> */}
  
  DO YOU REALLY WANT TO SIGN OUT?
  <div className='flex gap-4 w-full item-center justify-center'>

    <button type="submit" className='bg-red-500 rounded-md mt-5 w-1/4 p-2' onClick={()=>signOut()}> Yes </button>
    <button type="submit" className='bg-blue-500 rounded-md mt-5 w-1/4 p-2' onClick={()=>router.push('/')}> No </button>
  </div>
  </div>
  </div>
  )
}


export default Signouthandle