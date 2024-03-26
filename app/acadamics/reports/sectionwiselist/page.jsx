"use client"
import SectionReport from './printmodal'
import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from "next/navigation";


import React, { useEffect,useRef, useState ,useContext} from "react";
import { Selector } from '@/components/ui/selector';
import axios from "axios";

import { domainContext,SectionContext,ClassContext } from "@/app/datastore/dataprovider";



const ClassWiseReport = () => {
  const ds = useContext(domainContext).base_url
  const classes = useContext(ClassContext)
  const sections = useContext(SectionContext);

  const classesData = classes.map((item)=>( {
    value: item.name,
    label: item.name,
  }))


  const sectionData = sections.map((item)=>( {
    value: item.name,
    label: item.name,
  }))

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

const [data,setData]= useState([])
const [cls,setCls]= useState("")
const [sec,setSec]= useState("")


const getData=async()=>{
  const clsId = cls?classes.find((item)=>item.name.toLowerCase() === cls).classId:""
  const secId = sec?sections.find((item)=>item.name.toLowerCase() === sec).sectionId:""
  const response = await axios.get(`${ds}/std/listBySection/${clsId}/${secId}/Active`)
  setData(response.data)
}

return (
 <div className=''>
  <div className='bg-second w-full p-3 flex justify-between items-center'>
<div className=' w-9/12  flex justify-center items-center'>
  <label htmlFor="" className='px-2 mr-2 text-slate-100'>Class</label>
  <div className='w-1/4 bg-white rounded-sm  p-1'>
<Selector data={classesData}
value = {cls} setValue ={setCls}
/> 

  </div>

  <label htmlFor="" className='px-2 mr-2 text-slate-100'>Section</label>
  <div className='w-1/4 bg-white rounded-sm  p-1'>
    
<Selector data={sectionData}
value = {sec} setValue ={setSec}
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

      <SectionReport ref={componentRef} data= {data} class={cls} section={sec} />
    </div>
  </div>
  
 </div>
)
};

export default ClassWiseReport;
