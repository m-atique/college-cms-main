"use client"
import styles from './page.module.css'

import React, { useState,useContext, useEffect ,useMemo} from 'react'
import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";
import { IoMdSave,IoIosPeople } from "react-icons/io";
import { BsCashCoin } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import VoucherForm from './voucherForm'
import VoucherTable from './voucherTable'
import Extrafee from './extrafee';
import axios from 'axios';
import { ClassContext,SectionContext,domainContext } from "@/app/datastore/dataprovider";

import { Selector } from '../../../components/ui/selector';
import { getmaxid, idbyname ,idby2candy} from '@/backend/login';
import { useRouter } from 'next/navigation';

 const createQueryString = (name, value) => {
  const params = new URLSearchParams();
  params.set(name, JSON.stringify(value))

  return params.toString();
};


const FeeForm = () => {
  const router = useRouter()
  const today = new Date().toISOString().split("T")[0];
  const year= new Date().getFullYear()
  const Month =  new Date().getMonth()+1
  const ds = useContext(domainContext).base_url


   const defaults = useMemo(() => ( {
    month: `${year}-${
      Month.toString().length < 2 ? 0 + Month.toString() : Month
    }`,
    class: "",
    section: "",
    msg: "",
    duedate: today,
    admfee: "",
    paperfund: "",
    annualfee: "",
    sportsfund: "",
    workbookfund: "",
    labfee: "",
    monthlyfee: "",
    vgId:"",
    voucherNo:"",
    studentId:"",
    vanfee: "",
    otherstype:"",
    othersamount:"",
    fine: "",
    sataionaryfund: "",
    colordayfund: "",
    specialdayfund: "",
    graduationfund: "",
    partfund: "",
    discount: "",
    status: "pending",
    addedby: "",
    date: today,
  }),[Month,today,year])








const[data,setData] = useState(defaults) 
const classes = useContext(ClassContext);
const sections = useContext(SectionContext);
const [studentlist,setStudentlist] =useState([])
const [selectedList,setselectedList] = useState()

//==========getclasswisedata
const  classwiseData= async()=>{
  if(data.class && data.section){

  //  console.log(data.section === sections[0].name.toLowerCase())
    const selected_cls = data.class
      ? classes.find((item) => item.name.toLowerCase() === data.class)
          .classId
      : "";

    const selected_sec = data.section
      ? sections.find((item) => item.name.toLowerCase() === data.section)
          .sectionId
      : "";
      const result = await axios.get(`${ds}/std/sectionStds/${selected_cls}/${selected_sec}`)
      if(result.data.length>0){

      setStudentlist(result.data)
      

      }
      else{
        alert("No Record Found")
      }
  }else{
    alert("Please select class and section")
  }
}



const savevoucher = async()=>{


 await selectedList?.length>0? 
    selectedList.map(async (item)=>{
      const acId = await idby2candy("accounts","acId","id",item.original.studentId,"title","student")


      const amount =item.original.monthlyfee + parseInt(data.admfee==''?0:data.admfee)+ parseInt(data.fine==''?0:data.fine) +parseInt(data.labfee==''?0:data.labfee) + parseInt(data.othersamount==''?0:data.othersamount) +parseInt(data.paperfund==''?0:data.paperfund) - parseInt(data.discount==''?0:data.discount)
                
      axios.post(`${ds}/fee/addfv`, 
      
      
      {studentId:item.original.studentId,
      accountId:acId,
      monthlyfee:item.original.monthlyfee,
      admfee:data.admfee,
      annualfee:data.annualfee,
      labfee:data.labfee,
      workbookfund:data.workbookfund,
      sportsfund:data.sportsfund,
      paperfund:data.paperfund,
      othersType:data.otherstype,
      othersAmount:data.othersamount,
      fine:data.fine,
      discount:data.discount,
      date:today,
      vgId:data.vgId,
      voucherNo:data.voucherNo++,
      status:"pending",
      month:data.month,
      duedate:data.duedate,
      msg:data.msg,
      intimePayable:amount,
      latePayable:amount+200
      }
      
      ).then(
        async response=>{
          
          if(response.data!='OK'){alert("Vocher Generation error Try Again")} 
          if(response.data == 'OK'){
            const ledId = await getmaxid("ledger","ledgerId")
              
              const amount =item.original.monthlyfee + parseInt(data.admfee==''?0:data.admfee)+ parseInt(data.fine==''?0:data.fine) +parseInt(data.labfee==''?0:data.labfee) + parseInt(data.othersamount==''?0:data.othersamount) +parseInt(data.paperfund==''?0:data.paperfund) - parseInt(data.discount==''?0:data.discount)
               
              const ledgerEntry ={
                ledgerId : parseInt(ledId?ledId:0)+1 ,
                acId : acId,
                date:today,
                voucherNo:data.voucherNo++,
                entryType : "student fee",
                credit : 0,
                fine:0,
                discount:0,
                debit:amount,
                detail:` RS ${amount} Student Monthly fee for  month ${data.month}  with id # ${item.original.studentId},name ${item.original.name}`
                
  
                }
             
               
               axios.post(`${ds}/acl/addledger`  ,
                  ledgerEntry
              
              ).then(
                response=>{
                  if(response.data =='OK'){

                    router.push("/acadamics/vouchers" + "?" + createQueryString("voucherparams",{class:data.class,section:data.section,month:data.month,vgNo:data.vgId}));
                    
                  }
                }
              )

          }
        }
      )
    

      
    })
    :alert("Please Select students")
  reset()


}


useEffect(()=>{
  const reset =async()=>{
    const VcherID = await getmaxid("feevouchers","vgId")
    const vNo = await getmaxid("feevouchers","voucherNo")
  
    setData({...defaults,
      month:`${year}-${Month.toString().length<2?0+Month.toString():Month}`,
     
      duedate:today,
      vgId : parseInt(VcherID?VcherID:0) +1,
      voucherNo:parseInt(vNo?vNo:0) +1
    })
    setStudentlist([])
    setselectedList([])
  }
  reset()
},[Month,defaults,today,year])



  return (
    <div className="h-[36rem] flex items-center justify-center p-2">
      <div className="shadow-lg shadow-slate-600 w-full h-full rounded-lg border border-second flex  flex-col items-center justify-start">
        <div className="flex  w-full p-2 bg-gradient-to-b from-second to-slate-500 rounded-t-md items-center justify-center text-2xl font-sans font-bold text-white ">
          <span className="flex drop-shadow-md shadow-black ">
            {" "}
            <BsCashCoin className="size-8 mr-2" /> Fee Voucher Generation Form
          </span>{" "}
        </div>
        <div className=" h-full  grid grid-cols-12 items-start  justify-center  w-full p- ">
          <div className="grid col-span-3 min-w-max bg-base rounded-sm ">
            <VoucherForm
             //=============month
             vgId={data.vgId}
             setvgId={(value) => setData({ ...data, vgId: value })}
              //=============month
              month={data.month}
              setMonth={(value) => setData({ ...data, month: value })}
              //=============class
              class={data.class}
              setClass={(value) => setData({ ...data, class: value })}
              //=============secction
              section={data.section}
              setSection={(value) => setData({ ...data, section: value })}
             
              //=============msg
              msg={data.msg}
              setMsg={(value) => setData({ ...data, msg: value })}
              //=============dueDAte
              duedate={data.duedate}
              setduedate={(value) => setData({ ...data, duedate: value })}
               
            />
            <div className="flex flex-row flex-wrap gap-2 w-full items-center justify-center py-3">
              <Extrafee 
              //=============admfee
              admfee={data.admfee}
              setadmfee={(value) => setData({ ...data, admfee: value })}
              //=============paperfund
              paperfund={data.paperfund}
              setpaperfund={(value) => setData({ ...data, paperfund: value })}
              //=============fine
              fine={data.fine}
              setfine={(value) => setData({ ...data, fine: value })}
              //=============sportsfund
              otherstype={data.otherstype}
              setotherstype={(value) => setData({ ...data, otherstype: value })}
              //=============workbookfund
              othersamount={data.othersamount}
              setothersamount={(value) => setData({ ...data, othersamount: value })}
              //=============labfee
              labfee={data.labfee}
              setlabfee={(value) => setData({ ...data, labfee: value })}

              clear  =  {()=>setData(
                {admfee:"",
              paperfund:"",
              fine:"",
              sportsfund:"",
              othersamount:"",
              otherstype:"",
              fine:"",
              labfee:""}
              )}
              
              />
                            <button
                className="bg-second text-white rounded-sm w-2/5 p-2"
                onClick={() => classwiseData()}
              >
                Student List 
              </button>
              <button
                className="bg-second text-white rounded-sm w-2/5 p-2"
                onClick={() => reset()}
              >
                Clear
              </button>

              <button
                className="bg-second text-white rounded-sm w-2/5 p-2"
                onClick={()=>savevoucher()}
              >
               Print 
              </button>
            </div>
          </div>
          <div className="grid col-span-9 p-2 w-full ">
            <VoucherTable data  = {studentlist} setRecord={setselectedList} />
          </div>
        </div>
      </div>
    </div>
  );
} 

export default FeeForm