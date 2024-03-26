'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";

import { IoMdSave,IoIosPeople } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import clsx from 'clsx';
import { Selector } from '../../../components/ui/selector';
import {StudentTabs} from '../../../components/ui/studentTabs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/veticalTabs"

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
  
]

const religions = [
  {
    value: "Islam",
    label: "Islam",
  },
  {
    value: "Christianity",
    label: "Christianity",
  },
  {
    value: "Hindu",
    label: "Hindu",
  },
  {
    value: "Other",
    label: "Other",
  },
  
]

const hafizState = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
  
]

const StudentBio = (props) => {


const [age , setAge ]=useState(0)

const getAge = ()=>{

  const  st_age = new Date().getFullYear() - new Date(props.dob).getFullYear()
  setAge(st_age)
}



  return (
    <div className=" grid grid-cols-12 w-full p-4  items-center justify-center ">


    {/* ======================= First div ================================== */}
              <div className="grid col-span-6  items-center justify-center  ">

                    {/* ============================Student ID=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Trainee ID
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-2/4 `}
      value={props.id}
      onChange={(e) => props.setid(e.target.value)}

      onKeyPress={(e)=>{
                  
        if(e.key==="Enter"){
          props.getData()
        }}}
       />
    </div>
    
    </div>
    {/* ============================ END Student ID=================== */}
    
    {/* ============================student name=================== */}
                <div className="grid grid-cols-6 p-1">
    
                  <div className= {` ${styles.label}  `}>
                    Name
                  </div>
    
                  <div className="grid col-span-4">
                    <input type="text" className= {`${styles.input} w-3/4 `} 
                    
      value={props.name}
      onChange={(e) => props.setname(e.target.value)}
                    />
                  </div>
    
                </div>
    {/* ============================D.O>B=================== */}
    
    {/* ============================Date of Bith=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Date of Birth
    </div>
    
    <div className="grid col-span-4">
      <input type="date" className= {`${styles.input} w-3/4 `} 
      
      value={props.dob}
      onChange={(e) => props.setdob(e.target.value)}
      onBlur={()=>getAge()}
       />
    </div>
    
    </div>
    {/* ============================ end Date of birth================== */}
    
    
    
    
    
    {/* ============================Birth Place =================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
   Place of Birth
    </div>
    
    <div className="grid col-span-3 border border-second rounded-sm">
      <input type='text'
      
      value={props.pob}
      onChange={(e) => props.setpob(e.target.value)} />
    </div>
    
    </div>
    {/* ============================ End birth place=================== */}
    
    {/* ==============================B.Form #================= */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    CNIC No.
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} 
      
      value={props.bform}
      onChange={(e) => props.setbform(e.target.value)} />
    </div>
    
    </div>
    {/* ============================ END B.Form #=================== */}
    

    
    {/* ============================Gender  =================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Gender
    </div>
    
    <div className="grid col-span-3 border border-second rounded-sm">
      <Selector data = {genders} 
    
      value={props.gender}
      setValue = {props.setgender} />
    </div>
    
    </div>
    {/* ============================ END  Gender=================== */}
        {/* ===========================age================== */}
        <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Age
    </div>
    
    <div className="grid col-span-3 border pl-2 border-second rounded-sm">
      <input type='text'  
      
      value={`${age} years`}
      onChange={(e) => setAge(e.target.value)}
      readOnly
      />
    </div>
    
    </div>
    {/* ==========================Cast=================== */}

    
    
    
              </div>
    
    
    
    {/* ======================= Second div ================================== */}
    <div className="grid col-span-6  ">

              {/* ============================Religion=================== */}
              <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Religion
    </div>
    
    <div className="grid col-span-3 border border-second rounded-sm">
      <Selector data = {religions} 
      
      value={props.religion}
      setValue={props.setreligion} />
    </div>
    
    </div>
    {/* ============================ END Religion=================== */}
    
    {/* ===============================Hafiz/Not================ */}
                {/* <div className="grid grid-cols-6 p-1">
    
                  <div className= {` ${styles.label}  `}>
                    Hafiz/Not
                  </div>
    
                  <div className="grid col-span-3 border border-second rounded-sm">
      <Selector data = {hafizState} 
      
      value={props.hafiz}
     setValue = {props.sethafiz} />
    </div>
    
                </div> */}
    {/* ============================ end Hafiz/Not=================== */}
    
    {/* ============================Current Address =================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  items-center justify-center `}>
    Current Address   </div>
    
    <div className="grid col-span-3">
    <textarea name="" id="" cols="8" rows="4"  className='resize-none focus:outline-none border border-second  rounded-md pl-2' 
    
    value={props.currentAdd}
    onChange={(e) => props.setcurrentAdd(e.target.value)} ></textarea>
    </div>
    
    
    </div>
    {/* ============================ end  Current Address==== */}
    
    
    {/* =========================
    Permanent Address=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label} items-center justify-center `} 
    
   >
      Permanent Address
      <button className='bg-second border text-white hover:scale-105 rounded-full hover:bg-blue-900 pz-1'
      onClick ={()=>props.setpermanentAdd(props.currentAdd)}
      >Same</button>
    </div>
    
    <div className="grid col-span-3">
    <textarea name="" id="" cols="8" rows="4"  className='resize-none focus:outline-none border border-second  rounded-md pl-2' 
     value={props.permanentAdd}
     onChange={(e) => props.setpermanentAdd(e.target.value)}></textarea>
    </div>
    
    </div>
    {/* ============================ end 
    Permanent Address =================== */}
    

    
    
    
              </div>
    
            </div>
  );
}

export default StudentBio






