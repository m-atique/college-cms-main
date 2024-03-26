
"use client"
import React, { use, useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import logo from '../../../../public/logo.png'
import CollectionTable from "./sectionTable";
import Reportheader from '@/components/ui/reportheader'


const SectionReport = React.forwardRef((props, ref) => {
 

const Data = props.data




  return (
    <div ref={ref} className=" w-[205mm] h-[297mm] p-2 flex flex-col ">
      <div className="  flex flex-col  items-center  justify-center">

      <Reportheader />
      <div className=" w-full text-center  font-extrabold text-2xl">
      
      <h1 className="underline underline-offset-4 mb-2">
     Class
       <span className="text-blue-800 px-2">
        {props.class?props.class.toUpperCase():"_________"}
        </span>
         Section
         <span className="text-blue-800 px-2">
           {props.section?props.section.toUpperCase():"__________"}
           </span>
        </h1></div>
      <CollectionTable data={Data} />
      </div>
     
    </div>
  );
});
SectionReport.displayName ="SectionReport"
export default SectionReport;
