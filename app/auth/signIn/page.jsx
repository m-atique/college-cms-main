'use client'
import React ,{useState,useContext}from 'react'

import { signIn } from "next-auth/react"
import Image from 'next/image'
// import MainBck from '../../../public/2.jpg'
// import logo from '../../components/assests/PMP LOGO.png'
import { useRouter } from 'next/navigation'
import { User2,KeyRound } from 'lucide-react'
import axios from 'axios'

// import {login} from '../backend/login'
// import {Alert} from '../components/alert'




import bckImage2 from '../../../public/pic4.jpeg'
import bckImage3  from '../../../public/pic2.jpeg'
import logo from '../../../public/logo.png'
import bckImage from '../../../public/background.jpeg'



const Signinhandle = () => {
  //  const ds = useContext(domainContext).base_url

    const [data, setData] = useState([])
    const [user,setUser] =useState("")
    const [pwd,setPwd] =useState("")
    const [emptyUser,setEmptyUser] =useState('hidden')
    const [emptyPwd,setEmptyPwd] =useState('hidden')


    const onsubmit = async ()=>{
    await  signIn('credentials',
{
username : user,
password : pwd,
redirect:true,
callbackUrl :'/'
})

}





const router = useRouter()

  // const login = async () => { 
      
  //   if (user == ''){
  //     setEmptyUser('block')
  //     setEmptyPwd('hidden')
  //   }
  //   else if ( user !== '' && pwd == ""){
  //     setEmptyUser('hidden')
  //     setEmptyPwd('block')
  //   }
  //   else  if (user !== '' && pwd !== ""){
  //     setEmptyUser('hidden')
  //     setEmptyPwd('hidden')
      
  //     axios.get(`${ds}/users/getUser/${user}`).then(
  //       response =>{
  //         const result = response.data[0]
  //         if(result){
  //           result.userPwd == pwd?router.push('/dashboard'): alert("Wrong password")
  //         }
  //         else{
  //           alert("Please Enter Correct User")
  //         }
  //       }
  //     )
  //   }
  // };



  return ( 

    <div className = " relative bg-[url('../public/b2.jpg')] h-screen w-screen flex items-center bg-cover  justify-start">
      <div className='flex w-2/4'>
    <div className='absolute text-5xl font-extrabold text-white top-0 p-2 flex items-center z-50 '>
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
</div>
      <div className='h-5/6 p-5 w-2/4 ml-20 flex items-end justify-center flex-col gap-3 pt-10 bg-opacity-70'>
       
      <div className='h-3/6 w-5/6  flex items-center justify-center flex-col gap-3 pt-10 bg-opacity-30 rounded-lg'>

      <p className ={`text-xs text-red-600 ${emptyUser}`}>Please Enter User ID</p>
        <div className='flex-row flex items-center w-3/5 bg-white shadow-2xl rounded-md p-1 shadow-teal-500'> 
        <User2 stroke='#051532' className=' absolute  w-[32px] h-[40px] p-2' />
       <input 
      className=' p-2 text w-full pl-10 '
      placeholder='User'
      type ='text'
      value ={user}
      onChange={(e)=>setUser(e.target.value)}
       />
       </div>

         <div className='flex-row flex items-center w-3/5  bg-white shadow-2xl rounded-md p-1 shadow-teal-500'> 
        <KeyRound stroke='#051532' className='absolute  w-[32px] h-[40px] p-2' />
      <input 
      className='rounded-sm p-2 text w-full pl-10' 
      placeholder='Passward' 
      type='password'
      value ={pwd}
      onChange={(e)=>setPwd(e.target.value)}
      />
       </div>
       <p className ={`text-xs text-red-600 ${emptyPwd} `}>Please Enter Password</p>
        

        <div className=' justify-end  w-3/5 flex pt-10'>

        <button className='bg-gradient-to-br border border-black from-yellow-400 to bg-yellow-500 font-bold font-sans shadow-lg shadow-black  rounded-md p-2 w-2/5'
        onClick={()=>onsubmit()}
        
        >Login</button>
        </div>
      </div>
    </div>
  </div>



  )
}


export default Signinhandle