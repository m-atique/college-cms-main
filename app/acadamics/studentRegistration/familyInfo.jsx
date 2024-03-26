'use client'
import React,{useContext,useEffect,useState} from 'react'
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
import { domainContext } from '@/app/datastore/dataprovider';
import axios from 'axios';





const FamilyInfo = (props) => {
  const ds = useContext(domainContext).base_url
  const [Sublings, setSublings] = useState([])

const getsublings = async()=>{
 
  const response = await axios.get(`${ds}/std/sublings/${props.fatherCnic}`)
  if(response.data.length>0){
    setSublings(response.data)
  }
}

  return (
    <div className=" grid grid-cols-12 w-full p-4   ">


    {/* ======================= First div ================================== */}
              <div className="grid col-span-6  items-center justify-center  ">
    
    {/* ============================Family NO=================== */}
                {/* <div className="grid grid-cols-6 p-1">
    
                  <div className= {` ${styles.label}  `}>
                    Family No
                  </div>
    
                  <div className="grid col-span-4">
                    <input type="text" className= {`${styles.input} w-2/4 `}
                     value={props.familyNo}
                     onChange={(e) => props.setfamilyNo(e.target.value)} 
                     />
                  </div>
    
                </div> */}
    {/* ============================ end Familly No=================== */}
    
    {/* =================================Father Name============== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label} text-sm  `}>
    Father Name
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} 
                     value={props.father}
                     onChange={(e) => props.setfather(e.target.value)}  />
    </div>
    
    </div>
    {/* ============================ Father Name=================== */}
    
    
    
    
    
    {/* =======================Father CNIC=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Father CNIC
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `}
                     value={props.fatherCnic}
                     onChange={(e) => props.setfatherCnic(e.target.value)} 
                     onBlur ={async()=>await getsublings()} />
    </div>
    
    </div>
    {/* ===========================Father CNIC=================== */}
        {/* ============================Father Job =================== */}
        <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
Father Job
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} 
                     value={props.fatherJob}
                     onChange={(e) => props.setfatherJob(e.target.value)} />
    </div>
    
    </div>
    {/* ============================ end SFather Job=================== */}
    {/* =================================Gaurdian Name============== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label} text-sm  `}>
   Next of kin
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} 
                     value={props.gaurdian}
                     onChange={(e) => props.setgaurdian(e.target.value)} />
    </div>
    
    </div>
    {/* ============================ Gaurdian Name=================== */}

        {/* =================================Gaurdian Relation============== */}
        <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label} text-sm  `}>
   Relation
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} 
                     value={props.gRelation}
                     onChange={(e) => props.setgRelation(e.target.value)} />
    </div>
    
    </div>
    {/* ============================ Gaurdian Relation=================== */}
    
    {/* =====================Contact NO result=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Contact No.
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} 
                      value={props.contact}
                      onChange={(e) => props.setcontact(e.target.value)}   />
    </div>
    
    </div>
    {/* ============================Contact NO=================== */}
    
    {/* =========================== Emerg.Contact=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
   Emerg.Contact
    </div>
    
    <div className="grid col-span-4">
      <input type="text" className= {`${styles.input} w-3/4 `} 
                     value={props.econtact}
                     onChange={(e) => props.setecontact(e.target.value)}  />
    </div>
    
    </div>
    {/* ============================ END Emerg.Contact=================== */}
    
              </div>
    
    
    
    {/* ======================= Second div ================================== */}
    <div className="grid col-span-6 pt-3 items-start justify-center bg-slate-300 rounded-md ">
      
    
       {/* ============================Subling Record =================== */}

       <div className='p-1 flex flex-col gap-2'>
       <div  className='text-lg w-full text-center font-extrabold'>Sublings Details</div>
       <div className=' flex items-center w-full gap-1 border border-slate-800 bg-second text-slate-50 rounded-sm '>
                <div className='w-[160px] text-start pl-2 '>Name</div>
                {/* <div className='w-[60px] text-start pl-2 '>Class</div>
                <div className='w-[60px] text-start pl-2 '>Section</div>
                <div className='w-[66px] text-start pl-2 '>Fee</div> */}

              </div>
            {Sublings.map((item,index)=>(
              <div key ={index} className=' flex  w-full bg-slate-50 rounded-sm border border-slate-400 gap-1'>
                <div className='w-[160px] text-start pl-2 '>{item.name}</div>
                <div className='w-[60px] text-start pl-2 '>{item.regClassid}</div>
                <div className='w-[60px] text-start pl-2 '>{item.sectionId}</div>
                <div className='w-[66px] text-start pl-2 '>{item.monthlyfee}</div>

              </div>
            ))}
          </div>   
    {/* ============================ end Subling record =================== */}
    
    
    
    
              </div>
    
            </div>
  );
}

export default FamilyInfo






