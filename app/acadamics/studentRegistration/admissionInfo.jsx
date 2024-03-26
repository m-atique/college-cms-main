'use client'
import React,{useContext} from 'react'
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
import { ClassContext, SectionContext,spUnitContext,sessionContext } from '../../datastore/dataprovider';

const status = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  }
 
]
const result = [
  {
    value: "Pass",
    label: "Pass",
  },
  {
    value: "Fail",
    label: "Fail",
  }
 
]

const adm_type = [
  {
    value: "New",
    label: "New",
  },
  {
    value: "Re Admission",
    label: "Re Admission",
  }
 
]
const adm_status = [
 
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Struck Off",
    label: "Struck Off",
  },
  {
    value: "Pass Out",
    label: "Pass Out",
  }
 
]



const AdmissionInfo = (props) => {

  const classes = useContext(ClassContext);
  const sections = useContext(SectionContext);
  const spunits = useContext(spUnitContext).spUnits
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

const sapphireUnits = spunits.map((item)=>( {
  value: item.name,
  label: item.name,
}))




  return (
    <div className=" grid grid-cols-12 w-full p-4   ">
      {/* ======================= First div ================================== */}
      <div className="grid col-span-6  items-center justify-center  ">
        {/* ============================Reg. Date=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Reg. Date</div>

          <div className="grid col-span-4">
            <input
              type="date"
              className={`${styles.input} w-3/4 `}
              value={props.regDate}
              onChange={(e) => props.setregDate(e.target.value)}
            />
          </div>
        </div>
        {/* ============================ reg date=================== */}

        {/* ============================test =================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Test Class</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={classesData} value = {props.testClass} setValue ={props.settestClass}  />
          </div>
        </div>
        {/* ============================ END test=================== */}

        {/* ============================test result=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Test result</div>


          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={result}
            value = {props.testResult}
            setValue ={props.setTestResult}  />
          </div>
         
        </div>
        {/* ============================ END result=================== */}

        {/* ============================marks=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Marks</div>

          <div className="grid col-span-4">
            <input
              type="text"
              className={`${styles.input} w-3/4 `}
              value={props.marks}
              onChange={(e) => props.setmarks(e.target.value)}
            />
          </div>
        </div>
        {/* ============================ END marks=================== */}

        {/* ============================Sapphirain status  =================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Sappirian</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={status}
            value = {props.sapphirian}
            setValue ={props.setsapphirian}  />
          </div>
        </div>
        {/* ============================ END sappire =================== */}
      {/*============================marks=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Sapphire. Id</div>

          <div className="grid col-span-4">
            <input
              type="text"
              className={`${styles.input} w-3/4 `}
              value={props.spId}
              onChange={(e) => props.setspId(e.target.value)}
            />
          </div>
        </div>
        {/* ============================ END marks=================== */}

        {/* ============================Sapphirian Unit =================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Sapphire Unit</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={sapphireUnits}
             value = {props.spUnit}
             setValue ={props.setspUnit}
              />
          </div>
        </div>
        {/* ============================ end Sapphirian Unit =================== */}

        {/* ============================Father icom =================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Father Incom</div>

          <div className="grid col-span-4">
            <input
              type="text"
              className={`${styles.input} w-3/4 `}
              value={props.fatherIncom}
              onChange={(e) => props.setfatherIncom(e.target.value)}
            />
          </div>
        </div>
        {/* ============================ end Sapphirian Unit =================== */}
      </div>

      {/* ======================= Second div ================================== */}
      <div className="grid col-span-6   items-center justify-center ">
        {/* ============================Session=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Session</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={sessionsData}
             value = {props.session}
             setValue ={props.setsession}
            />
          </div>
        </div>
        {/* ============================ END session=================== */}

        {/* ============================AdmissionType=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Adm.Type</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={adm_type}
             value = {props.admType}
             setValue ={props.setadmType}
            />
          </div>
        </div>
        {/* ============================ end AdmissionType=================== */}

        {/* ============================Pre Reg No=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Prev Reg. No</div>

          <div className="grid col-span-4">
            <input type="text" className={`${styles.input} w-3/4 `}
             value={props.preRegNo}
             onChange={(e) => props.setpreRegNo(e.target.value)}
             />
          </div>
        </div>
        {/* ============================Pre Reg No=================== */}

        {/* ============================Enrolled Class =================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Enrolled Class</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={classesData} 
            value = {props.admClass}
            setValue ={props.setadmClass}
            
            />
          
          </div>
        </div>
        {/* ============================ END Enrolled Class =================== */}

        {/* ====================== Section =================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Section</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={sectionData}
             value = {props.section}
             setValue ={props.setsection}
              />
          </div>
        </div>
        {/* =========================== end Section=================== */}

        {/* ============================Addmission status=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Adms.Status</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={adm_status}
             value = {props.status}
             setValue ={props.setstatus}
              />
          </div>
        </div>
        {/* ============================ end =================== */}

        {/* ============================Pick/Drop=================== */}
        <div className="grid grid-cols-6 p-1">
          <div className={` ${styles.label}  `}>Pick/Drop</div>

          <div className="grid col-span-3 border border-second rounded-sm">
            <Selector data={status} 
             value = {props.pick}
             setValue ={props.setpick}
              />
          </div>
        </div>
        {/* ============================ endPick/Drop=================== */}
      </div>
    </div>
  );
}

export default AdmissionInfo






