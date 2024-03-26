"use client";
import React ,{useState,useEffect,useContext}from "react";
import styles from "./page.module.css";
import { ClassContext, SectionContext,spUnitContext,domainContext,sessionContext } from '../../datastore/dataprovider';
import { Selector } from "../../../components/ui/selector";
import { ImBin2 } from "react-icons/im";


const PromotionForm = (props) => {
 
  const classes = useContext(ClassContext);
  const sections = useContext(SectionContext);
  const ds = useContext(domainContext).base_url
  const sessions = useContext(sessionContext).session;
  
  const sessionsData = sessions.map((item)=>( {
    value: item.name,
    label: item.name,
  }))
  

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
      <div className="w-full p-1">
       <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Rec.No</div>

          <div className={`grid col-span-4 p-0 ${styles.input}`}>
            <input type="text" className="rounded-md pl-5"
             
              value={props.recId}
              onChange={(e)=>props.setrecId(e.target.value)}
              onKeyPress={(e)=>{
                  
                if(e.key==="Enter"){
                  props.getPromotionData()
                }}}
            />
          </div>
        </div> 
        <h6 className="w-full text-center bg-slate-300 mb-4 p-2 rounded-sm font-sans">
          Current Class
        </h6>
        {/* ============================Fee Month=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Course</div>

          <div className={`grid col-span-4 p-0 ${styles.input}`}>
            <Selector
              data={sessionsData}
              value={props.currentSession}
              setValue={props.setCurrentSession}
            />
          </div>
        </div>
        {/* ============================ END Fee Month=================== */}

        {/* ============================ CLASS================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Class</div>

          <div className={`grid col-span-4 p-0 ${styles.input}`}>
            <Selector
              data={classesData}
              value={props.currentClass}
              setValue={props.setCurrentClass}
            />
          </div>
        </div>
        {/* ============================ END Class=================== */}
        {/* ============================Section================== */}
        {/* <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Section</div>

          <div className={`grid col-span-4 p-0 ${styles.input}`}>
            <Selector
              data={sectionData}
              value={props.currentSection}
              setValue={props.setCurrentSection}
            />
          </div>
        </div> */}
        {/* ============================ END Section================== */}
        <div className="flex items-center justify-center w-full pt-4 pb-1">
          <button
            className="bg-second text-white rounded-sm w-4/6 p-2 hover:bg-blue-900"
            onClick={props.preview}
          >
            Preview List
          </button>
        </div>
      </div>

      {/* =============================promotion div */}
      <div className="w-full p-1">
        <h6 className="w-full text-center bg-slate-300 mb-4 p-2 rounded-sm font-sans">
          Next Class
        </h6>

        {/* ============================Fee Month=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Course</div>

          <div className={`grid col-span-4 p-0 ${styles.input}`}>
            <Selector
              data={sessionsData}
              value={props.newSession}
              setValue={props.setnewSession}
            />
          </div>
        </div>
        {/* ============================ END Fee Month=================== */}

        {/* ============================ CLASS================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Class</div>

          <div className={`grid col-span-4 p-0 ${styles.input}`}>
            <Selector
              data={classesData}
              value={props.newClass}
              setValue={props.setnewClass}
            />
          </div>
        </div>
        {/* ============================ END Class=================== */}
        {/* ============================Section================== */}
        {/* <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Section</div>

          <div className={`grid col-span-4 p-0 ${styles.input}`}>
            <Selector
              data={sectionData}
              value={props.newSection}
              setValue={props.setnewSection}
            />
          </div>
        </div> */}
        {/* ============================ END Section================== */}

        <div className="flex items-center justify-center gap-2 w-full pt-4 pb-1">
         
          <button  className='disabled:bg-slate-500 pl-8 pr-10 py-2 rounded-md bg-red-600 text-white 'type ='button'
                onClick={()=>props.delPromotion()}
  
                > <div className='flex items-center'><ImBin2 className='size-3 mr-1'/> Delete</div></button>
                 <button
            className="bg-second text-white rounded-sm w-4/6 p-2 hover:bg-blue-900"
            onClick={() => props.promotionFn()}
          >
            Promote
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PromotionForm;
