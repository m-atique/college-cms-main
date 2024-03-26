'use client'
import React,{useState,useContext, useEffect} from 'react'
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





const FeeInfo = (props) => {
useEffect(()=>{
  props.getDetails()
  
},[])

  return (
    <div className=" grid grid-cols-12 w-full py-4 ">

    {/* ======================= First div ================================== */}
              <div className="grid col-span-4  items-center justify-center  ">

    {/* ============================Adms.Fee=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Adm.Fee
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.admfeeAmount} onChange={(e) => props.setadmfeeAmount(e.target.value)}
     
      />
    </div>
    
    </div>
   
    {/* ============================ END Adms.Fee=================== */}
    
    {/* ============================Adms.Fee Discount=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Discount
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.admfeeDiscount} onChange={(e) => props.setadmfeeDiscount(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Adms.Fee discount=================== */}
       {/* ============================Adms.Fee Discount reason=================== */}
       <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Reason
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.admfeeReason} onChange={(e) => props.setadmfeeReason(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Adms.Fee reason=================== */}
   {/* ============================Adms.Fee net=================== */}
   <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Net Amount
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.admFee} onChange={(e) => props.setadmFee(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Adms.Fee net=================== */}

              </div>
    
    
    
    {/* ======================= Second div ================================== */}

    <div className="grid col-span-4   items-center justify-center ">
      {/* ======================Monthly Fee =================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Monthly
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} value = {props.monthlyfeeAmount} onChange={(e) => props.setmonthlyfeeAmount(e.target.value)} />
    </div>
    
    </div>
    {/* =========================== end Monthly Fee=================== */}
      {/* ============================Monthly Discount=================== */}
      <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Discount
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.monthlyfeeDiscount} onChange={(e) => props.setmonthlyfeeDiscount(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Monthly discount=================== */}
       {/* ============================Monthly Discount reason=================== */}
       <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Reason
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.monthlyfeeReason} onChange={(e) => props.setmonthlyfeeReason(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Monthly reason=================== */}
   {/* ============================Monthly net=================== */}
   <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Net Amount
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.monthlyFee} onChange={(e) => props.setmonthlyFee(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Monthly net=================== */}

              </div>
   {/* ======================= Third div ================================== */}
   <div className="grid col-span-4   items-center justify-center ">
      {/* ======================annual Fee =================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Annual
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} value = {props.annualfeeAmount} onChange={(e) => props.setannualfeeAmount(e.target.value)} />
    </div>
    
    </div>
    {/* =========================== end annual Fee=================== */}
      {/* ============================annual Discount=================== */}
      <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Discount
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.annualfeeDiscount} onChange={(e) => props.setannualfeeDiscount(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END annual discount=================== */}
       {/* ============================annual Discount reason=================== */}
       <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Reason
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.annualfeeReason} onChange={(e) => props.setannualfeeReason(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Annual reason=================== */}
   {/* ============================Annual net=================== */}
   <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Net Amount
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}   value = {props.annualFee} onChange={(e) => props.setannualFee(e.target.value)}
     
      />
    </div>
    
    </div>
    {/* ============================ END Monthly net=================== */}

              </div>

            </div>
  );
}

export default FeeInfo




// {/* ============================Exame Fee=================== */}
// <div className="grid grid-cols-6 p-1">
    
// <div className= {` ${styles.label}  `}>
// Exam Fee
// </div>

// <div className="grid col-span-4">
//   <input type="text" className= {`${styles.input} w-3/4 `}value = {props.examfee} onChange={(e) => props.setexamfee(e.target.value)} />
// </div>

// </div>
// {/* ============================ END Exam Fee=================== */}

// {/* ============================ Fine  =================== */}
// <div className="grid grid-cols-6 p-1">

// <div className= {` ${styles.label}  `}>
//  Fine
// </div>

// <div className="grid col-span-4">
//   <input type="text" className= {`${styles.input} w-3/4 `}value = {props.fine} onChange={(e) => props.setfine(e.target.value)} />
// </div>

// </div>
// {/* ============================ EN Fine =================== */}

// {/* ============================Discount=================== */}
// <div className="grid grid-cols-6 p-1">

// <div className= {` ${styles.label}  `}>
// Discount
// </div>

// <div className="grid col-span-4">
//   <input type="text" className= {`${styles.input} w-3/4 `}value = {props.discount} onChange={(e) => props.setdiscount(e.target.value)} />
// </div>

// </div>
// {/* ============================ END Discount=================== */}

 
    // {/* ============================Lab Charges=================== */}
    // <div className="grid grid-cols-6 p-1">
    
    // <div className= {` ${styles.label}  `}>
    // Lab Charges
    // </div>
    
    // <div className="grid col-span-4">
    //   <input type="text" className= {`${styles.input} w-3/4 `}value = {props.labfee} onChange={(e) => props.setlabfee(e.target.value)} />
    // </div>
    
    // </div>
    // {/* ============================ endLab Charges=================== */}

