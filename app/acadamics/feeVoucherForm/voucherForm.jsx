'use client'
import React,{useContext} from 'react'
import styles from './page.module.css'
import Extrafee from './extrafee'
import { Selector } from '../../../components/ui/selector';
import { ClassContext,SectionContext } from "@/app/datastore/dataprovider";


const VoucherForm = (props) => {
  const classes = useContext(ClassContext);
  const sections = useContext(SectionContext);

const classesData = classes.map((item)=>( {
  value: item.name,
  label: item.name,
}))

const sectionData = sections.map((item)=>( {
  value: item.name,
  label: item.name,
}))
  return (
    <div>
        <div className ='w-full p-1'>

          {/* ============================Fee Month=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
   Rec.#
    </div>
    
    <div className="grid col-span-4">
      <input type="text"  className= {`${styles.input} w-3/4 `}
      
      value={props.vgId}
      onChange={(e) => props.setvgId(e.target.value)}
      />
    </div>
    
    </div>
    {/* ============================ END Fee Month=================== */}
            {/* ============================Fee Month=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Fee Month
    </div>
    
    <div className="grid col-span-4">
      <input type="month" min ='2023-01' max = '2123-12' className= {`${styles.input} w-3/4 `}
      
      value={props.month}
      onChange={(e) => props.setMonth(e.target.value)}
      />
    </div>
    
    </div>
    {/* ============================ END Fee Month=================== */}

                {/* ============================FEE CLASS================== */}
                <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Class
    </div>
    
    <div className="grid col-span-3 border border-second rounded-sm">
    <Selector data={classesData}
             value = {props.class}
             setValue ={props.setClass}
              />
    </div>
    
    </div>
    {/* ============================ END Class=================== */}
                {/* ============================Section================== */}
                <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Section
    </div>
    
    <div className="grid col-span-3 border border-second rounded-sm"
    
    
    >
    <Selector data={sectionData}
             value = {props.section}
             setValue ={props.setSection}
            
              />
    </div>
    
    </div>
    {/* ============================ END Section================== */}

    {/* ============================ > Due Date================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}> Due Date
    </div>
    
    <div className="grid col-span-4">
      <input type="date" className= {`${styles.input} w-3/4 `} 
       value={props.duedate}
       onChange={(e) => props.setduedate(e.target.value)}
      />
    </div>
    
    </div>
    {/* ============================ > Due Date================== */}

    <div className='rounded-sm h-[11rem] w-full  items-start justify-center '>
      {/* ============================Massage box================== */}
      <fieldset className='flex items-center justify-center rounded-md border  border-second '>
        <legend className='ml-4 text-xs ' >Message</legend>
        <textarea name="" id="" cols="26" rows="4"  className='resize-none focus:outline-none focus:border  rounded-md pl-2'
         value={props.msg}
         onChange={(e) => props.setMsg(e.target.value)}
        
        ></textarea>
      </fieldset>
    
    {/* ============================ Massage box=================== */}
    </div>

    



        </div>
    </div>
  )
}

export default VoucherForm