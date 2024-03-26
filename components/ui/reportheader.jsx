import React from 'react'
import logo from '../../public/logo.png'
import Image from "next/image";
const Reportheader = () => {
  return (
    <div className="w-[205mm] flex items-center justify-center ">



    <div className="  flex justify-start   w-11/12 items-start mb-8  mt-5">
    <div className=" "> 
    <Image src={logo} alt='logo' className="  w-16 h-18  mr-12  " />
    </div>
    <div className="w-4/6 ">
    <div className =" text-center  font-extrabold fonst-sarif underline-offset-1 text-3xl w-full">
      Sapphire School of Learning</div>
      
    <div className ="border-b-2 border-black border-spacing-6 text-center font-bold  underline-offset-1 text-xl">
   
    Ferozewattoan, Sheikhupura</div>
      
     
      </div>
    
      </div>
    
    </div>
  )
}

export default Reportheader