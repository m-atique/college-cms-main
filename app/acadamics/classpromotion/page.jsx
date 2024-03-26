"use client"
import styles from './page.module.css'


import React,{useState,useMemo,useContext,useEffect} from 'react'
import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";
import { IoMdSave,IoIosPeople } from "react-icons/io";
import { MdEditNote,MdMoveUp } from "react-icons/md";
import PromotionForm from './promotionForm'
import PromotionTable from './promotionTable'
import { ClassContext,SectionContext,spUnitContext,sessionContext,domainContext } from "@/app/datastore/dataprovider";


import { Selector } from '../../../components/ui/selector';
import axios from 'axios';
import { getmaxid } from '@/backend/login';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"


const PromotionPage = () => {
  const { toast } = useToast()
const classes = useContext(ClassContext);
const sections = useContext(SectionContext);
const spunits = useContext(spUnitContext).spUnits
const ds = useContext(domainContext).base_url
const sessions = useContext(sessionContext).session;


const defaults = useMemo(() => ({
  recId:"",
  currentSession:"",
  currentClass:"",
  currentSection:"",
  newSession:"",
  newClass:"",
  newSection:""
}))

const [data,setData]=useState(defaults)
const [studentList,setStudentList]= useState([])
const [selectedList,setselectedList] = useState()
const [currentPosting,setCurrentPosting] =useState({})
const today = new Date().toISOString().split("T")[0];

const reset=async ()=>{
  let promoId = await getmaxid("studentPosting","promotionId")
  setData({...defaults,recId:promoId?parseInt(promoId)+1:1})
  setStudentList([])
  setselectedList([])
}

//===========functions
const getData=async()=>{
 
if(data.currentSession && data.currentClass && data.currentSection){

  const ssnId = data.currentSession?sessions.find((item)=>item.name.toLowerCase() === data.currentSession).sessionId:""
  const clsId = data.currentClass?classes.find((item)=>item.name.toLowerCase() === data.currentClass).classId:""
  const secId = data.currentSection?sections.find((item)=>item.name.toLowerCase() === data.currentSection).sectionId:""

setCurrentPosting({prevsession:ssnId,prevclass:clsId,prevsec:secId})

  const response = await axios.get(`${ds}/std/listforsession/${ssnId}/${clsId}/${secId}/Active`)
  setStudentList(response.data)
}
}
//==============save promotion
      const savePromotion =  async(promotionData)=>{
 await axios.post(`${ds}/std/addStudentPosting`,promotionData).then(
   response=>{
    if(response.data == 'OK'){
      console.log("posting saved",promotionData)
    }
    else{
      console.log("error in saving posting",promotionData)
    }
  }

).catch(
  reson=>{console.log(reson)}
)
await axios.post(`${ds}/fee/addstudentfee`,promotionData).then(
  response=>{
    if(response.data == 'OK'){
      console.log("Fee saved" )
    }
    else{
      console.log("error in saving fee info")
    }
  }
).catch(
  reson=>{console.log(reson)}
)

 }
//=================new class fee
const getnewClassFee = async () => {
  try {
    if (data.newSession && data.newClass && data.newSection) {
      const ssnId = data.newSession ? sessions.find((item) => item.name.toLowerCase() === data.newSession).sessionId : "";
      const clsId = data.newClass ? classes.find((item) => item.name.toLowerCase() === data.newClass).classId : "";
      const secId = data.newSection ? sections.find((item) => item.name.toLowerCase() === data.newSection).sectionId : "";

      const response = await axios.get(`${ds}/fee/classFee/${ssnId}/${clsId}`);
      let lastpromotionId = await getmaxid("studentPosting", "promotionId");
      let feesId = await getmaxid("studentfee", "feeId");
      let postingId = await getmaxid("studentPosting", "postingId");


    
      const newPromotionId = lastpromotionId ? parseInt(lastpromotionId) + 1 : 1;
      
      const savePromises = selectedList.map(async (item, index)=> {

            if (item.original.sapphirian == 'yes') {
         return savePromotion( {
                id: feesId ? parseInt(feesId) + index + 1 : 1,
                postingId: postingId ? parseInt(postingId) + index + 1 : 1,
                promotionId: newPromotionId,
                sessionId: ssnId,
                classId: clsId,
                sectionId: secId,
                studentId: item.original.studentId,
                
               monthlyFee: parseInt(response.data[0].sp_monthlyFee) - parseInt(item.original.monthlyfeeDiscount),
                annualFee: parseInt(response.data[0].sp_annualFee) - parseInt(item.original.annualfeeDiscount),
                admFee: parseInt(response.data[0].sp_admFee) - parseInt(item.original.admfeeDiscount),
                addedBy: 1,
                date: today,
                prevSession:currentPosting?currentPosting.prevsession:0,
                prevClass:currentPosting?currentPosting.prevclass:0,
                prevSection:currentPosting?currentPosting.prevsec:0,
              })
            } else {
              return  savePromotion(   {
                id: feesId ? parseInt(feesId) + index + 1 : 1,
                postingId: postingId ? parseInt(postingId) + index + 1 : 1,
                promotionId: newPromotionId,
                sessionId: ssnId,
                classId: clsId,
                sectionId: secId,
                studentId: item.original.studentId,
                monthlyFee: parseInt(response.data[0].monthlyFee) - parseInt(item.original.monthlyfeeDiscount),
                annualFee: parseInt(response.data[0].annualFee) - parseInt(item.original.annualfeeDiscount),
                admFee: parseInt(response.data[0].admFee) - parseInt(item.original.admfeeDiscount),
                addedBy: 1,
                date: today,
                prevSession:currentPosting?currentPosting.prevsession:0,
                prevClass:currentPosting?currentPosting.prevclass:0,
                prevSection:currentPosting?currentPosting.prevsec:0,
              })
            }
  
      });

      try {
        await Promise.all(savePromises);
        toast({
          variant: "success",
          title: " All Data Saved",
          action: <ToastAction altText="go back to form">Ok</ToastAction>
        });
        reset(); // Reset the form
    } catch (error) {
       // Show error toast here
    toast({
      variant: "error",
      title: "Error",
      description: 'Failed to save data: ' + error.message,
      status: "error",
      duration: 3000
    });
    }
   
     
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};


//============retive promotion data

const retrivePromotionData = async()=>{
const response = await axios.get(`${ds}/std/promotion/${data.recId}`)
setData({
  ...data,
  currentSession:sessions.find((item)=>item.sessionId === parseInt(response.data[0].prevSession)).name,
  currentClass:classes.find((item)=>item.classId === parseInt(response.data[0].prevClass)).name,
  currentSection:sections.find((item)=>item.sectionId === parseInt(response.data[0].prevSection)).name,
  newSession:sessions.find((item)=>item.sessionId === parseInt(response.data[0].sessionId)).name,
  newClass:classes.find((item)=>item.classId === parseInt(response.data[0].classId)).name,
  newSection:sections.find((item)=>item.sectionId === parseInt(response.data[0].sectionId)).name,

})
const response2 = await axios.get(`${ds}/std/listforsession/${response.data[0].sessionId}/${response.data[0].classId}/${response.data[0].sectionId}/Active`)
setStudentList(response2.data)

}
//==============delete promotion
const deletePromotion =()=>{

  if(data){
    axios.delete(`${ds}/std/deletePromotion/${data.recId}`).then(
      response =>{
        
      if(response.data =='OK'){
        toast({
          variant: "success",
          title: " Deleted",
          action: <ToastAction altText="go back to form">Ok</ToastAction>
        });
        reset()
      }
      else{
        toast({
          variant: "error",
          title: "Error",
          description: 'Failed to delete: ' + error.message,
          status: "error",
          duration: 3000
        });
        reset()
      }
      }
  )}
  } 

  useEffect(()=>{reset()},[])

  return (

    
    <div className='flex  w-full h-[90vh]  bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center px-5'>

 
   

       

        <div className='shadow-lg shadow-slate-600 w-full h-fit rounded-lg border border-second flex  flex-col items-center justify-start'>
            <div className='flex  w-full p-2 bg-gradient-to-b from-second to-slate-500 rounded-t-md items-center justify-center text-2xl font-sans font-bold text-white '>
              <span className='flex drop-shadow-md shadow-black '> <MdMoveUp className='size-8 mr-2' /> Class Promotion Form</span> </div>
            <div className=' h-full  grid grid-cols-12 items-start  justify-center  w-full p-1 '>
              <div className='grid col-span-3 bg-base rounded-sm '>
                <PromotionForm
//======================currentSession

recId = {data.recId}
setrecId = {(value)=>setData({...data,recId:value})}  
getPromotionData={retrivePromotionData}  
delPromotion ={deletePromotion}           
//======================currentSession

currentSession = {data.currentSession}
setCurrentSession = {(value)=>setData({...data,currentSession:value})}
//======================currentClass

currentClass = {data.currentClass}
setCurrentClass = {(value)=>setData({...data,currentClass:value})}
//======================currentSection

currentSection = {data.currentSection}
setCurrentSection = {(value)=>setData({...data,currentSection:value})}

//=========priew data
preview = {()=>getData()}
//======================newSession

newSession = {data.newSession}
setnewSession = {(value)=>setData({...data,newSession:value})}
//======================newClass

newClass = {data.newClass}
setnewClass = {(value)=>setData({...data,newClass:value})}
//======================newSection

newSection = {data.newSection}
setnewSection = {(value)=>setData({...data,newSection:value})}
//========================promote
promotionFn = {()=>getnewClassFee()}


                />
              </div>
              <div className='grid col-span-9 p-2'>
                <PromotionTable data = {studentList} setRecord={setselectedList} />
              </div>
                

               </div>

        </div>



    </div>
  )
}

export default PromotionPage