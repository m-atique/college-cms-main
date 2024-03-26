'use client'


import {login} from '../backend/login'
import {Alert} from '../components/alert'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import bckImage2 from '../public/pic4.jpeg'
import bckImage3  from '../public/pic2.jpeg'
import logo from '../public/logo.png'
import bckImage from '../public/background.jpeg'



export default function Home() {

const router = useRouter()
  const [user,setUser] = useState()
  const [Pwd,setPwd] = useState()
  const [role,setRole] = useState()


const  gotoHome = (user)=>{


if(user=='academics'){

  router.push('./acadamics')
}
if(user=='accounts'){

  router.push('./accounts')
}

}
  
 
  return (
    <div className = " relative bg-[url('../public/b2.jpg')] h-screen w-screen flex items-center bg-cover  justify-start">
      <div className='absolute text-5xl font-extrabold text-white top-0 p-2 flex items-center z-50'>
      <Image src = {logo}alt='logo' className='w-20 h-20 mx-4 p-2 '/> 
      <h1 className=' text-5xl font-sans font-bold text-lime-100 '>NHMP Training College Sheikhupura </h1>
      </div>
  
        <div className="w-60 h-60 rounded-3xl shadow-lg shadow-slate-500 rotate-45 border-2 border-white  flex overflow-clip ">
  <Image src = {bckImage2} alt='bck'  className=' h-full scale-150 -rotate-45'/>    
        </div>
        <div className="w-60 h-60 rounded-3xl shadow-lg shadow-slate-500 rotate-45 border-2  bg-slate-100 border-white  flex overflow-clip">
  <Image src = {bckImage3} alt="x" className='w-[100%] h-full scale-150 -rotate-45'/>    
</div>
<div className="w-60 h-60 rounded-3xl shadow-lg shadow-slate-500 rotate-45 border-2 -ml-8 bg-cover transform border-white  flex overflow-clip">
  <Image src = {bckImage} alt='x' className=' h-full scale-150 -rotate-45'/>     
</div>
        <div className='h-screen w-2/5 ml-20 flex items-center justify-center flex-col gap-3 pt-10'>
          <input type="text" className='p-2 border border-black shadow-black shadow-md rounded-md ml-5 w-9/12' placeholder='User'
          value ={user} onChange ={(e)=>setUser(e.target.value)}
          
          />
          <input type="password" className='p-2 border border-black shadow-black shadow-md rounded-md ml-5 w-9/12' placeholder='Password'
          value ={Pwd} onChange ={(e)=>setPwd(e.target.value)}
          />

          <div className='w-9/12 justify-end flex'>

          <button className='bg-gradient-to-br from-yellow-400 to bg-yellow-500 font-bold font-sans shadow-md shadow-black rounded-md p-2 w-2/5'
          onClick={()=>login(user,Pwd,"Inccorect User","Incorrect password",()=>gotoHome(user))}
          
          >Login</button>
          </div>
        </div>
     
    </div>

  )
}





