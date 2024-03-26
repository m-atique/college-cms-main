import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import { PiStudentFill } from "react-icons/pi";
  import { SiFormstack,SiGoogleclassroom,SiHomeadvisor,SiGoogleforms  } from "react-icons/si";
  import { AiOutlineApartment, AiOutlineDollarCircle } from "react-icons/ai";
  import { BsCashCoin } from "react-icons/bs";
  import { HiHome } from "react-icons/hi2";
  import { MdOutlineLocalLibrary,MdMoveUp, MdLogout } from "react-icons/md";
  import { FaMoneyCheckDollar } from "react-icons/fa6";
  import { TbTimelineEventPlus } from "react-icons/tb";
  import logo from '../../../public/logo.png'

  import Link from "next/link";
 

  import React from 'react'
import Image from "next/image";
  
  const AcadamicHeader = () => {
    return (
      <div >
<Menubar className=" border-b border-second  bg-gradient-to-r from-base to-slate-100 flex justify-between rounded-none py-10 pl-2 pr-8 font-sans  ">

<div className="w-6/12 text-2xl font-bold text-second flex items-center ">
<Image src={logo} alt="logo" className="w-12 h-12 mr-2" />
<h1 >NHMP TRAINING COLLEGE SHEIKHUPURA</h1>
</div>

   {/* ============first */}


   {/* <MenubarMenu>
    <MenubarTrigger> <SiGoogleforms  size ={16} className='mr-2'/> Reports</MenubarTrigger>


    <MenubarContent className=" rounded-none bg-white">

      <MenubarItem> <SiGoogleclassroom className='mr-2'/><Link href ='/acadamics/reports/classwiselist'>ClassWise students List</Link></MenubarItem>
      <MenubarSeparator />
      
      <MenubarSeparator />
      <MenubarItem> <AiOutlineApartment className='mr-2'/><Link href ='/acadamics/reports/sectionwiselist'>SectionWise students List</Link></MenubarItem>
      <MenubarSeparator />
      <MenubarItem> <BsCashCoin className='mr-2'/> <Link href ='/acadamics/reports/sapphirians'>Sapphirians List</Link></MenubarItem>
      <MenubarItem> <MdMoveUp className='mr-2 size-4'/> <Link href ='/acadamics/reports/spNonSp'>Sapphirains/Non Sapphirians</Link></MenubarItem>
          
    </MenubarContent>
  </MenubarMenu> */}
   
   <MenubarMenu>
    
    <MenubarTrigger>
    <PiStudentFill size ={20} className='mr-2 '/>
    <Link href ='/acadamics/studentRegistration'>Trainee Registration Form</Link>
    </MenubarTrigger>
  </MenubarMenu>

  
  {/* =========================second */}
  <MenubarMenu>
    <MenubarTrigger> <SiGoogleforms  size ={16} className='mr-2'/> Misc. Forms</MenubarTrigger>


    <MenubarContent className=" rounded-none bg-white">
    <MenubarItem> <TbTimelineEventPlus className='mr-2'/><Link href ='/acadamics/sessionCreation'>Course Registration Form</Link></MenubarItem>
      <MenubarSeparator />
      <MenubarItem> <SiGoogleclassroom className='mr-2'/><Link href ='/acadamics/classForm'>Class Registration Form</Link></MenubarItem>
      <MenubarSeparator />
      
      {/* <MenubarItem> <AiOutlineApartment className='mr-2'/><Link href ='/acadamics/sectionForm'>Section Registration Form</Link></MenubarItem> */}
      <MenubarSeparator />
      {/* <MenubarItem> <BsCashCoin className='mr-2'/> <Link href ='/acadamics/feeVoucherForm'>Fee Voucher Form</Link></MenubarItem> */}
      <MenubarItem> <MdMoveUp className='mr-2 size-4'/> <Link href ='/acadamics/classpromotion'>Class Promotion Form</Link></MenubarItem>

      {/* <MenubarSeparator />
      <MenubarItem> <AiOutlineDollarCircle className='mr-2 size-4'/> <Link href ='/acadamics/feeCatalog'>Fee Catalog Form</Link></MenubarItem> */}
          
    </MenubarContent>
  </MenubarMenu>


  <MenubarMenu>
    
    <MenubarTrigger>
      <Link href={'/acadamics'}>
    <HiHome size ={20} color={"purple"} title="Home" className='mr-2 '/>
      </Link>
    </MenubarTrigger>
  </MenubarMenu>

  <MenubarMenu>
    
    <MenubarTrigger>
      <Link href={'/'}>
    <MdLogout size ={20} color={"purple"} title="Home" className='mr-2 '/>
      </Link>
    </MenubarTrigger>
  </MenubarMenu>

 
</Menubar>








      </div>
    )
  }
  
  export default AcadamicHeader