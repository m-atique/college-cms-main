
"use client"
import React, { useMemo,useContext, useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import logo from '../../../../public/logo.png'
import CollectionTable from "./classTable";
import Reportheader from '@/components/ui/reportheader'


const ClassReport = React.forwardRef((props, ref) => {
 

const Data = props.data

console.log(Data)


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
         
        </h1></div>
      <CollectionTable data={Data} />
      </div>
     
    </div>
  );
});

ClassReport.displayName="ClassReport"
export default ClassReport;
