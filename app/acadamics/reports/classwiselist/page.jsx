"use client"
import ClassReport from './printmodal'
import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from "next/navigation";


import React, { useEffect,useRef, useState ,useContext} from "react";
import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";
import { IoMdSave, IoIosPeople } from "react-icons/io";
import { BsCashCoin } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import CollectionTable from "./classTable";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { Selector } from '@/components/ui/selector';
import axios from "axios";

import { domainContext } from "@/app/datastore/dataprovider";
import { getmaxid } from "@/backend/login";
import { ClassContext } from '@/app/datastore/dataprovider';

const ClassWiseReport = () => {
  const ds = useContext(domainContext).base_url
  const classes = useContext(ClassContext)

  const classesData = classes.map((item)=>( {
    value: item.name,
    label: item.name,
  }))

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

const [data,setData]= useState([])
const [cls,setCls]= useState("")


const getData=async()=>{
  const clsId = cls?classes.find((item)=>item.name.toLowerCase() === cls).classId:""
  const response = await axios.get(`${ds}/std/studentByclassStatus/${clsId}/Active`)
  setData(response.data)
}

return (
 <div className=''>
  <div className='bg-second w-full p-3 flex justify-between items-center'>
<div className=' w-9/12  flex justify-center items-center'>
  <label htmlFor="" className='px-2 mr-5 text-slate-100'>Class Name</label>
  <div className='w-1/4 bg-white rounded-sm  p-1'>
<Selector data={classesData}
value = {cls} setValue ={setCls}
/> 
  </div>
<div className=' w-3/12  flex justify-center items-center'>
   <button onClick={getData}
     className='border-2 border-white rounded-md px-10 py-2 text-white font-semibold hover:text-black hover:bg-slate-200 hover:scale-x-105'
   >Generate</button>
</div>

</div>
<div className=' w-3/12  flex justify-center items-center'>
   <button onClick={handlePrint}  className='border-2 border-white rounded-md px-10 py-2 text-white font-semibold hover:text-black hover:bg-slate-200 hover:scale-x-105   '>Print</button>
</div>
  </div>


  <div className='flex items-center justify-center '>
    <div  className='flex items-center justify-center '>

      <ClassReport ref={componentRef} data= {data} class ={cls} />
    </div>
  </div>
  
 </div>
)
};

export default ClassWiseReport;
