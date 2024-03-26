"use client";
import React,{useState,useMemo,useEffect,useContext} from "react";
import styles from "./page.module.css";
import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";

import { IoMdSave, IoIosPeople } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import clsx from "clsx";
import { Selector } from "../../../components/ui/selector";
import { StudentTabs } from "../../../components/ui/studentTabs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/veticalTabs";
import StudentBio from "./studentBio";
import AmissionInfo from "./admissionInfo";
import FamilyInfo from "./familyInfo";
import FeeInfo from "./feedetail";
import { getmaxid ,idbyname} from "@/backend/login";
import axios from "axios";
import { ClassContext,SectionContext,spUnitContext,domainContext,sessionContext } from "@/app/datastore/dataprovider";
import ImgPicker from "@/components/ui/imagePicker";

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"


const createQueryString = (name, value) => {
  const params = new URLSearchParams();
  params.set(name, JSON.stringify(value))

  return params.toString();
};



const StudentRegForm = () => {
  const router = useRouter()

  const today = new Date().toISOString().split("T")[0];
  const Month =new Date().getMonth()+1
  const dateafter10days =new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)).toISOString().split("T")[0];

 


const classes = useContext(ClassContext);
const sections = useContext(SectionContext);
const spunits = useContext(spUnitContext).spUnits
const sessions = useContext(sessionContext).session;
const ds = useContext(domainContext).base_url

// const currentsession =  sessions.find((item)=>item.sessionId  ==  sessions.length).name

const reset = async()=>{ 
  const response = await getmaxid("students","studentId")
  const accountId = await getmaxid("accounts","acId")
  const ledId = await getmaxid("ledger","ledgerId")
  const VcherID = await getmaxid("feevouchers","vgId")
  const vNo = await getmaxid("feevouchers","voucherNo")


 
  setData(
    {...defaults,
      id:parseInt(response?response:"0") +1,
      accId:parseInt(accountId?accountId:"0") +1,
      ledgerId:parseInt(ledId?ledId:"0") +1,
      vgId : parseInt(VcherID?VcherID:"0") +1,
      voucherNo:parseInt(vNo?vNo:"0") +1,
      

    })

}




   const defaults = useMemo(() => ({
    admfeeAmount:"",
    admfeeDiscount:"",
    admfeeReason:"",
    admFee:"",

    monthlyfeeAmount:"",
    monthlyfeeDiscount:"",
    monthlyfeeReason:"",
    monthlyFee: "",

    annualfeeAmount:"",
    annualfeeDiscount:"",
    annualfeeReason:"",
    annualFee:"",
   
    
    //=================admisssion
    regDate: today,
    testClass: "",
    testResult: "",
    marks: "",
    sapphirian: "",
    spId:"",
    spUnit: "",
    fatherIncom: "",
    session: "",
    admType: "",
    preRegNo: "",
    admClass: "",
    classId:"",
    section: "",
    status: "",
    pick: "",
    
    //=============family
    familyNo: "",
    father: "",
    fatherCnic: "",
    fatherJob: "",
    gaurdian: "",
    gRelation: "",
    contact: "",
    econtact: "",
    gaurdianCnic:"",
    motherCnic:"",
    
    //==============student
    id: "",
    name: "",
    dob: today,
    pob: "",
    bform: "",
    gender: "",
    age: "",
    religion: "",
    hafiz: "",
    currentAdd: "",
    permanentAdd: "",
    photo:"",
    //===================
    addedby :"",
    date:today,
    sportsfee : 0, 
     stationaryfund: 0,
     accId:0,
     ledgerId:0,
     vgId:0,
     voucherNo:0

  }),[today])

  useEffect(()=>{
 
    reset()
    
  },[defaults])


  const [data,setData]=useState(defaults)
  //==========functions 
//--------------get fee datail
const getfeeDeatail =()=>{

            const admClassId = data.admClass?classes.find((item)=>item.name.toLowerCase() === data.admClass||item.name == data.admClass).classId:""
            const newsessionId = data.session?sessions.find((item)=>item.name.toLowerCase() === data.session  ).sessionId:""
if(admClassId && newsessionId){
  axios.get(`${ds}/fee/fcById/${newsessionId}/${admClassId}`).then(
    response=>{
     
      if(response.data.length>0){
        const feedata = response.data[0]
        if(data.sapphirian !== 'yes'){

          setData({...data,
            monthlyfeeAmount:feedata.monthlyFee,
            annualfeeAmount:feedata.annualFee,
            admfeeAmount:feedata.admFee,
          })
         
        }else{
          setData({...data,
            monthlyfeeAmount:feedata.sp_monthlyFee,
            annualfeeAmount:feedata.sp_annualFee,
            admfeeAmount:feedata.sp_admFee,
          })
        
        }
      }else{
        toast({
          variant: "error",
          title: "No Fee  in Catalog",
          description: error.message,
          action: <ToastAction altText="go back to form">Ok</ToastAction>
        });
      }
    }) 
}
}

//========save student fee detail
const saveStudentFee =async()=>{
const feesId = await getmaxid("studentfee","feeId")
console.log(data.admFee,data.annualFee,data.monthlyFee)

  if(data){
  const admClassId = data.admClass?classes.find((item)=>item.name.toLowerCase() === data.admClass).classId:""
  const newsessionId = data.session?sessions.find((item)=>item.name.toLowerCase() === data.session).sessionId:""

  const studentFee ={
    id:feesId?parseInt(feesId)+1:1,
    sessionId:newsessionId,
    classId:admClassId,
    studentId:data.id,
    admFee:parseInt(data.admfeeAmount?data.admfeeAmount:0)-parseInt(data.admfeeDiscount?data.admfeeDiscount:0),
    monthlyFee:parseInt(data.monthlyfeeAmount?data.monthlyfeeAmount:0)-parseInt(data.monthlyfeeDiscount?data.monthlyfeeDiscount:0),
    annualFee:parseInt(data.annualfeeAmount?data.annualfeeAmount:0)-parseInt(data.annualfeeDiscount?data.annualfeeDiscount:0),
    addedBy:1,
    date:today
  }

  axios.post(`${ds}/fee/addstudentfee`,studentFee).then(
    response=>{
      if(response.data == 'OK'){
        console.log("Fee saved")
      }
      else{
        console.log("error in saving fee info")
      }
    }
  )

}
}
//=======================save posting 
const SavePosting =async()=>{

  const postingId = await getmaxid("studentPosting","postingId")
  if (data){
    const admClassId = data.admClass?classes.find((item)=>item.name.toLowerCase() === data.admClass).classId:""
    const newsessionId = data.session?sessions.find((item)=>item.name.toLowerCase() === data.session).sessionId:""
    const newsectionId = data.section?sections.find((item)=>item.name.toLowerCase() === data.section).sectionId:""
    const studentPosting ={
      postingId:postingId?parseInt(postingId)+1:1,
      studentId:data.id,
      sessionId:newsessionId,
      classId:admClassId,
      sectionId:newsectionId,
      addedBy:1,
      date:today
    } 
    axios.post(`${ds}/std/addStudentPosting`,studentPosting).then(
      response=>{
        if(response.data == 'OK'){
          console.log("posting saved")
        }
        else{
          console.log("error in saving posting")
        }
      }
    )

  }
}


//============================
  const saveStudentAccount = async()=>{
   
    axios.post(`${ds}/acc/addAccount`,
    {"acId":data.accId,"name":data.name, "type":"debiter","title":"student","date":today,"id":data.id}
    ).then(
      response =>{
        if(response.data =='OK'){
            console.log (" std account saved")
        }else{
          console.log("account creation pending")
        }
      }
    )
  }

  //===================create voucher 
  const printFeeVoucher =async ()=>{

   
   axios.post(`${ds}/fee/addfv`, 
   
      
      {studentId:data.id,
      accountId:data.accId,
      monthlyfee:data.tutionfee,
      admfee:data.admfee,
      annualfee:0,
      labfee:data.labfee,
      workbookfund:0,
      sportsfund:0,
      paperfund:data.examfee,
      othersType:"",
      othersAmount:0,
      fine:data.fine,
      discount:data.discount,
      date:today,
      vgId:data.vgId,
      voucherNo:data.voucherNo,
      status:data.status,
      month:Month,
      duedate:dateafter10days,
      intimePayable:parseInt(data.admfee==''?0:data.admfee)+ parseInt(data.fine==''?0:data.fine) + parseInt(data.labfee==''?0:data.labfee) + parseInt(data.tutionfee =='' ?0:data.tutionfee) + parseInt(data.examfee==''?0:data.examfee)-parseInt(data.discount==''?0:data.discount),

      latePayable:parseInt(data.admfee==''?0:data.admfee)+ parseInt(data.fine==''?0:data.fine) +parseInt(data.labfee==''?0:data.labfee) + parseInt(data.tutionfee==''?0:data.tutionfee) +parseInt(data.examfee==''?0:data.examfee)-parseInt(data.discount==''?0:data.discount)+200,      
      msg:"Welcome to Sapphire"
      }
      
      ).then(
       response =>{
        
        if(response.data == 'OK'){
       
         const amount =parseInt(data.admfee ==''?0:data.admfee)+ parseInt(data.fine==''?0:data.fine) +parseInt(data.labfee==''?0:data.labfee) + parseInt(data.tutionfee==''?0:data.tutionfee) +parseInt(data.examfee==''?0:data.examfee)-+parseInt(data.discount==''?0:data.discount)

          const ledgerEntry ={
            ledgerId : data.ledgerId ,
            acId : data.accId,
            voucherNo:data.voucherNo,
            date:today,
            entryType : "student fee",
            credit : 0,
            discount:0,
            fine:0,
            debit:amount ,

            detail:` RS ${amount} at Admission in  month ${data.month}  with id # ${data.id},name ${data.name}`
            

            }

            axios.post(`${ds}/acl/addledger`   ,
                  ledgerEntry
              
              ).then(
                response=>{
                  if(response.data =='OK'){
                    console.log("ledger saved")

                    router.push("/acadamics/admissionslips" + "?" + createQueryString("voucherparams",{class:data.admClass,section:data.section,month:data.month,vgNo:data.vgId}));
                    
                  }else{

                  }
                }
              )
        }
       }
      )
    
    
    }

  //======save student 
  const saveStudent = async() => {
    
    if (data){
     
      axios.get(`${ds}/std/studentList/${data.id}`).then(
        std=>{
          
          if(std.data.length<1){
           
            const admClassId = data.admClass?classes.find((item)=>item.name.toLowerCase() === data.admClass).classId:""
            const testclassId = data.testClass?classes.find((item)=>item.name.toLowerCase() === data.testClass).classId:""
            const sectionId = data.section?sections.find((item)=>item.name.toLowerCase() === data.section).sectionId:""
            const spUnitId = data.spUnit?spunits.find((item)=>item.name.toLowerCase() === data.spUnit).suId:""
            const newsessionId = data.session?sessions.find((item)=>item.name.toLowerCase() === data.session).sessionId:""
            

           

  axios.post(`${ds}/std/addStudent`,
  {...data,admClass:admClassId,section:sectionId,testClass:testclassId,spUnit:spUnitId,session:newsessionId,
    admFee:parseInt(data.admfeeAmount?data.admfeeAmount:0)-parseInt(data.admfeeDiscount?data.admfeeDiscount:0),
    monthlyFee:parseInt(data.monthlyfeeAmount?data.monthlyfeeAmount:0)-parseInt(data.monthlyfeeDiscount?data.monthlyfeeDiscount:0),
    annualFee:parseInt(data.annualfeeAmount?data.annualfeeAmount:0)-parseInt(data.annualfeeDiscount?data.annualfeeDiscount:0),
    addedBy:1
  }
  
  ).then(
   async  response =>{
      if(response.data =='OK'){
          await saveStudentFee()
          await SavePosting()
         await saveStudentAccount()
        // await printFeeVoucher()
        toast({
          variant: "success",
          title: " Saved",
          action: <ToastAction altText="go back to form">Ok</ToastAction>
        });
        reset()
        
      }
      else{
        toast({
          variant: "error",
          title: " Error",
          description: error.message,
          action: <ToastAction altText="go back to form">Ok</ToastAction>
        });
      }
    }
    )
}
else {
  toast({
    variant: "error",
    title: " Error",
    description: error.message,
    action: <ToastAction altText="go back to form">Ok</ToastAction>
  });
}
}
)   
     
      }
  }

  //==========retrieving data
  const retriveData = async()=> {


    axios.get(`${ds}/std/studentList/${data.id}`).then(

    (response)=>{
    
      const studentData= response.data[0]
      if(studentData){
      
        const retrieveddata ={


        admFee: studentData.st_admFee,
        monthlyFee: studentData.st_monthlyfee ,
        annualFee:studentData.st_annualFee ,
        admfeeDiscount:studentData.annualfeeDiscount,
        admfeeReason:studentData.admfeeReason,
        monthlyfeeDiscount:studentData.monthlyfeeDiscount,
        monthlyfeeReason:studentData.monthlyfeeReason,
        annualfeeDiscount:studentData.annualfeeDiscount,
        annualfeeReason:studentData.annualfeeReason,

 
        //=================admission. ,
        regDate:studentData.regDate.split("T")[0] ,
        testClass:studentData.testclass?classes.find((item)=>item.classId === parseInt(studentData.testclass)).name:"",
        testResult: studentData.result ,
        marks: studentData.marks ,
        sapphirian: studentData.sapphirian ,
        spId:studentData.sapphirId ,
        spUnit: studentData.spUnit?spunits.find((item)=>item.suId === parseInt(studentData.sapphireUnit)).name:"",
        fatherIncom: studentData.fatherIncom ,
        session: studentData.sessionName ,
        admType: studentData.admType ,
        preRegNo: studentData.preRegId ,
        admClass: studentData.className,
        section: studentData.sectionName,  
        status: studentData.status ,
        pick: studentData.pickup ,
  
        //=============family. ,
        familyNo: studentData.familyno ,
        father: studentData.father ,
        fatherCnic: studentData.fatherCnic ,
        fatherJob: studentData.fatherJob ,
        gaurdian: studentData.gaurdian ,
        gRelation: studentData.gRelation ,
        contact: studentData.contact ,
        econtact: studentData.emergencyNo ,
        gaurdianCnic:studentData.gaurdianCnic ,
        motherCnic:studentData.motherCnic ,
  
        //==============student
        id: studentData.studentid,
        name:studentData.name,
        dob: studentData.dob.split("T")[0],
        pob: studentData.pob,
        bform: studentData.bform,
        gender: studentData.gender,
       
        religion: studentData.religion,
        hafiz: studentData.hafiz,
        currentAdd: studentData.currentAddress,
        permanentAdd: studentData.parmanentAddress,
        photo:studentData.photo
        //===================
        
        
      };
      setData(retrieveddata)
      
      

      }
      else{
        toast({
          variant: "error",
          title: "No Record Found",
          description: error.message,
          action: <ToastAction altText="go back to form">Ok</ToastAction>
        });
       
        reset()
      }
    }
    )
    
  }

 //========================= updateStudent
const updateStudent =async()=>{
  if(data){
   
    const admClassId = data.admClass
      ? classes.find((item) => item.name.toLowerCase() === data.admClass.toLowerCase() )
          .classId
      : "";
    const testclassId = data.testClass
      ? classes.find((item) => item.name.toLowerCase() === data.testClass.toLowerCase())
          .classId
      : "";
    const sectionId = data.section
      ? sections.find((item) => item.name.toLowerCase() === data.section.toLowerCase())
          .sectionId
      : "";
      const spUnitId = data.spUnit
      ? spunits.find((item) =>  item.name.toLowerCase() === data.spUnit.toLowerCase())
          .suId
      : "";

      const sessionId = data.session?sessions.find((item)=>item.name === data.session).sessionId:""

      const newpostingId = await getmaxid("studentPosting","postingId")
      const newfeeId =await getmaxid("studentFee","feeId")

    const updatedData ={
      ...data,
      
      classId:admClassId,
      sectionId:sectionId,
      testClass:testclassId,
      sessionId:sessionId,
      session:sessionId,
      spUnit:spUnitId,
      gaurdianCnic:"",
      motherCnic:"",
      addedby:1,
      monthlyFee:data.monthlyfeeAmount,
      admFee:data.admfeeAmount,
      annualFee:data.annualfeeAmount,
      postingId:newpostingId?parseInt(newpostingId)+1:1,
      feeId:newfeeId?parseInt(newfeeId)+1:1,
      studentId:data.id,
      addedBy:1,
      date:today
    }
  
    axios.patch(`${ds}/std/updateStudent/${data.id}`,
    updatedData
  ).then(
    response =>{
    
    if(response.data =='OK'){
      toast({
        variant: "success",
        title: " Updated",
        describtion:"Student Record Updated",
        action: <ToastAction altText="go back to form">Ok</ToastAction>
      });
      reset()
    }
    else{
      toast({
        variant: "error",
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000
      });
    }
    }
)
}


}   

//=======================age calculation

const { toast } = useToast()





  return (
  <div className='flex  w-full h-[90vh]  bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center'>

 
  <div className='h-[35rem] w-full  flex items-center justify-center '>
<div
        className="shadow-lg shadow-slate-600 w-5/6 h-full  rounded-lg border border-second flex  flex-col items-center justify-start"
        
      >
        <div className="flex  w-full h-1/4 bg-gradient-to-b from-second to-slate-500 rounded-t-md items-center justify-center text-2xl font-sans font-bold text-white ">
          <span className="flex drop-shadow-md shadow-black ">
            {" "}
            <PiStudentFill className="size-8 mr-2" /> Trainee Registration Form
          </span>{" "}
        </div>
 {/* bg-[url('https://i.pinimg.com/236x/35/53/7b/35537b1a06c910d3f420f1fa392e5fa0.jpg')] */}
        <div className="w-full h-5/6 p-2  ">
          <Tabs
            defaultValue="student"
            className="w-full flex flex-row  bg-white rounded-md"
          >
             
            <TabsList className="flex flex-col items-center justify-center rounded-none ">
              <div className={`h-32 w-32 rounded-full bg-cover bg-center border-2 border-second 
              `}
             style={{ backgroundImage: `url(${data.photo})` }}
              
              ></div>
              <div className="h-24 w-full flex  flex-col items-center justify-center  pb-3  px-2">
                <p className="w-full text-center font-sans font-semibold">
                  {data.name?data.name.toLocaleUpperCase():""}
                </p>

                <ImgPicker  
                
                setter={(value) => setData({ ...data, photo: value })}
                />
               
               
              </div>

              <TabsTrigger
                value="student"
                className="block w-full border-second border m-1"
              >
                Personal Detail
              </TabsTrigger>
              <TabsTrigger
                value="father"
                className="block  w-full border-second border m-1"
              >
                {" "}
                Family Detail
              </TabsTrigger>
              <TabsTrigger
                value="admission"
                className="block w-full border-second border m-1"
              >
                {" "}
                Admission Detail
              </TabsTrigger>
              <TabsTrigger
                value="fee"
                className="block w-full border-second border m-1"
              >
                {" "}
                Posting
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student" className="">
              <StudentBio
                //---------------------------id
                id={data.id}
                setid={(value) => setData({ ...data, id: value })}
                getData = {retriveData}
                //---------------------------name
                name={data.name}
                setname={(value) =>
                  setData({ ...data, name: value })
                }
                //---------------------------dob
                dob={data.dob}
                setdob={(value) =>
                  setData({ ...data, dob:value})
                }
               
                //---------------------------pob
                pob={data.pob}
                setpob={(value) =>
                  setData({ ...data, pob: value })
                }
                //---------------------------bform
                bform={data.bform}
                setbform={(value) =>
                  setData({ ...data, bform: value })
                }
                //---------------------------gender
                gender={data.gender}
                setgender={(value) =>
                  setData({ ...data, gender: value })
                }
                //---------------------------age
                age={data.age}
                setage={(value) =>
                  setData({ ...data, age: value })
                }
                //---------------------------religion
                religion={data.religion}
                setreligion={(value) =>
                  setData({ ...data, religion: value })
                }
                //---------------------------hafiz
                hafiz={data.hafiz}
                sethafiz={(value) =>
                  setData({ ...data, hafiz: value })
                }
                //---------------------------currentAdd
                currentAdd={data.currentAdd}
                setcurrentAdd={(value) =>
                  setData({ ...data, currentAdd: value })
                }
                //---------------------------permanentAdd
                permanentAdd={data.permanentAdd}
                setpermanentAdd={(value) =>
                  setData({ ...data, permanentAdd: value })
                }
              />
            </TabsContent>
            <TabsContent value="father" className="">
              <FamilyInfo
                //---------------------------family no
                familyNo={data.familyNo}
                setfamilyNo={(value) =>
                  setData({ ...data, familyNo: value })
                }
                //---------------------------family no
                father={data.father}
                setfather={(value) =>
                  setData({ ...data, father: value })
                }
                //------------------------------------------------------------------------------fatherCnic
                fatherCnic={data.fatherCnic}
                setfatherCnic={(value) =>
                  setData({ ...data, fatherCnic: value })
                }
                //------------------------------------------------------------------------------fatherJob
                fatherJob={data.fatherJob}
                setfatherJob={(value) =>
                  setData({ ...data, fatherJob: value })
                }
                //-----------------------------------------------------------------------------gaurdian
                gaurdian={data.gaurdian}
                setgaurdian={(value) =>
                  setData({ ...data, gaurdian: value })
                }
                //-----------------------------------------------------------------------------gRelation
                gRelation={data.gRelation}
                setgRelation={(value) =>
                  setData({ ...data, gRelation: value })
                }
                //-----------------------------------------------------------------------------contact
                contact={data.contact}
                setcontact={(value) =>
                  setData({ ...data, contact: value })
                }
                //-----------------------------------------------------------------------------contact
                econtact={data.econtact}
                setecontact={(value) =>
                  setData({ ...data, econtact: value })
                }
              />
            </TabsContent>

            {/*-----------------------admision form------------------- */}

            <TabsContent value="admission" className="">
              {/* <AmissionInfo
                regDate={data.regDate}
                setregDate={(value) =>
                  setData({ ...data, regDate: value })
                }
                //------------------------------------------------------------------------------testClass
                testClass={data.testClass}
                settestClass={(value) =>
                  setData({ ...data, testClass: value })
                }
                //------------------------------------------------------------------------------testResult
                testResult={data.testResult}
                setTestResult={(value) =>
                  setData({ ...data, testResult: value })
                }
                //-----------------------------------------------------------------------------marks
                marks={data.marks}
                setmarks={(value) =>
                  setData({ ...data, marks: value })
                }
                //-----------------------------------------------------------------------------sapphirian
                sapphirian={data.sapphirian}
                setsapphirian={(value) =>
                  setData({ ...data, sapphirian: value })
                }
                 //-----------------------------------------------------------------------------sapphirian
                 spId={data.spId}
                 setspId={(value) =>
                   setData({ ...data, spId: value })
                 }
                //-----------------------------------------------------------------------------sapphirian unit
                spUnit={data.spUnit}
                setspUnit={(value) =>
                  setData({ ...data, spUnit: value })
                }
                //------------------------------------------------------------------------------fatherIncom
                fatherIncom={data.fatherIncom}
                setfatherIncom={(value) =>
                  setData({ ...data, fatherIncom: value })
                }
                //------------------------------------------------------------------------------session
                session={data.session}
                setsession={(value) =>
                  setData({ ...data, session: value })
                }
                //------------------------------------------------------------------------------session
                admType={data.admType}
                setadmType={(value) =>
                  setData({ ...data, admType: value })
                }
                //------------------------------------------------------------------------------preRegNo
                preRegNo={data.preRegNo}
                setpreRegNo={(value) =>
                  setData({ ...data, preRegNo: value })
                }
                //------------------------------------------------------------------------------admClass
                admClass={data.admClass}
                setadmClass={(value) =>
                  setData({ ...data, admClass: value })
                }
                //------------------------------------------------------------------------------section
                section={data.section}
                setsection={(value) =>
                  setData({ ...data, section: value })
                }
                //------------------------------------------------------------------------------status
                status={data.status}
                setstatus={(value) =>
                  setData({ ...data, status: value })
                }
                //------------------------------------------------------------------------------pick
                pick={data.pick}
                setpick={(value) =>
                  setData({ ...data, pick: value })
                }
              /> */}
            </TabsContent>

            {/* ======================feee form */}
            <TabsContent value="fee" className="">
              {/* <FeeInfo   />  */}
                
              {/* <FeeInfo

              getDetails = {()=>getfeeDeatail()}
              //-------------------discount
                 admfeeAmount={data.admfeeAmount}
                 setadmfeeAmount={(value) =>
                   setData({ ...data, admfeeAmount: value })
                 }
                 //----------------------------------reason
                 admfeeDiscount={data.admfeeDiscount}
                 setadmfeeDiscount={(value) =>
                   setData({ ...data, admfeeDiscount: value })
                 }
                //----------------------------------amount
                admfeeReason={data.admfeeReason}
                setadmfeeReason={(value) =>
                  setData({ ...data, admfeeReason: value })
                }
                //----------------------------------amount
                admFee={
                  // data.admFee
                
                  parseInt(data.admfeeAmount?data.admfeeAmount:0)-
                  parseInt(data.admfeeDiscount?data.admfeeDiscount:0) 
                
                }
              
                setadmFee={(value) =>
                  setData({ ...data,
                  admFee: value
                
                })
                }                
              //-------------------monthly amount
              monthlyfeeAmount={data.monthlyfeeAmount}
              setmonthlyfeeAmount={(value) =>
                setData({ ...data, monthlyfeeAmount: value })
              }
              //----------------------------------m.discount
              monthlyfeeDiscount={data.monthlyfeeDiscount}
              setmonthlyfeeDiscount={(value) =>
                setData({ ...data, monthlyfeeDiscount: value })
              }
             //----------------------------------m.reason
             monthlyfeeReason={data.monthlyfeeReason}
             setmonthlyfeeReason={(value) =>
               setData({ ...data, monthlyfeeReason: value })
             }
             //----------------------------------monthly fee
             monthlyFee={
              // data.monthlyFee
                
              parseInt(data.monthlyfeeAmount?data.monthlyfeeAmount:0)-
              parseInt(data.monthlyfeeDiscount?data.monthlyfeeDiscount:0) 
            
            }
             setmonthlyFee={(value) =>
               setData({ ...data, monthlyFee: value })
             }
        //-------------------annual amount
        annualfeeAmount={data.annualfeeAmount}
        setannualfeeAmount={(value) =>
          setData({ ...data, annualfeeAmount: value })
        }
        //----------------------------------annual.discount
        annualfeeDiscount={data.annualfeeDiscount}
        setannualfeeDiscount={(value) =>
          setData({ ...data, annualfeeDiscount: value })
        }
       //----------------------------------annual.reason
       annualfeeReason={data.annualfeeReason}
       setannualfeeReason={(value) =>
         setData({ ...data, annualfeeReason: value })
       }
       //----------------------------------annual fee
       annualFee={ 
        
        // data.annualFee
        parseInt(data.annualfeeAmount?data.annualfeeAmount:0)-parseInt(data.annualfeeDiscount?data.annualfeeDiscount:0)
      }
       setannualFee={(value) =>
         setData({ ...data, annualFee: value })
       }                
                             
                /> */}
              
              

              <div className="grid col-span-12  items-center justify-center   ">
                <div className=" h-1/5 flex w-full items-center justify-center  gap-2 pt-10">
                  <button className=" pl-8 pr-10 py-2 rounded-md bg-red-600 text-white"

                  >
                    
                    <div className="flex items-center">
                      <ImBin2 className="size-3 mr-1" /> Delete
                    </div>
                  </button>

                  <button className=" pl-8 pr-10 py-2 rounded-md text-white bg-[#424949]" 
                  onClick = {()=>updateStudent()}
                  >
                    <div className="flex items-center">
                      <MdEditNote className="size-6 mr-1 " /> Update
                    </div>
                  </button>

                  <button
                    className=" pl-8 pr-10 py-2 rounded-md bg-slate-800 text-white"
                  onClick={()=>reset()}
                  >
                    <div className="flex items-center">
                      <VscClearAll className="size-5 mr-1" /> Reset
                    </div>
                  </button>

                  <button className=" pl-8 pr-10 py-2 rounded-md text-white bg-[#04232C]"
                  onClick={saveStudent}
                  >
                    <div className="flex items-center">
                      <IoMdSave className="size-5 mr-1 " /> Save
                    </div>
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentRegForm;

