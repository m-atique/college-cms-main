'use client'
import React,{useEffect,useMemo, useState,useContext} from 'react'

import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";
import { IoMdSave,IoIosPeople } from "react-icons/io";
import { MdEditNote } from "react-icons/md";


import { Selector } from '../../../components/ui/selector';
import { getmaxid } from '@/backend/login';
import axios from 'axios'
import { ClassContext,SectionContext,spUnitContext,sessionContext,domainContext } from "@/app/datastore/dataprovider";
import { FaMoneyBill } from 'react-icons/fa6';
import { AiFillDollarCircle } from 'react-icons/ai';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"



const datax = [
  {
    value: "Primary Boys",
    label: "Primary Boys",
  },
  {
    value: "Middle Boys",
    label: "Middle Boys",
  },
  {
    value: "High Boys",
    label: "High Boys",
  },
  {
    value: "College Boys",
    label: "College Boys",
  },
  {
    value: "Primary Girls",
    label: "Primary Girls",
  },
  {
    value: "Middle Girls",
    label: "Middle Girls",
  },
  {
    value: "High Girls",
    label: "High Girls",
  },
  {
    value: "College Girls",
    label: "College Girls",
  },
]




const FeeCatalog =() => {
  const { toast } = useToast()
    const today = new Date().toISOString().split("T")[0];
  const defaults = useMemo(() => ({
    id:"",
    session:"",
    class :"",
    admFee:"",
    annualFee:"",
    monthlyFee:"",
    sp_admFee:"",
    sp_annualFee:"",
    sp_monthlyFee:"",
    date:today,
    addedBy:""
    

  }),[today])
  
  const ds = useContext(domainContext).base_url
  const classes = useContext(ClassContext);
  const sessions = useContext(sessionContext).session;


  const classesData = classes.map((item)=>( {
    value: item.name,
    label: item.name,
  }))


  const sessionsData = sessions.map((item)=>( {
    value: item.name,
    label: item.name,
  }))
 
  const reset = async()=>{ 
    const response = await getmaxid("feeCatalog","fcId")
    // setData(defaults)
    setData({...defaults,id:response+1})
}

useEffect(()=>{

  reset()
  
},[defaults])



  const [data,setData]=useState(defaults)



  const saveFeeCatalog = () => {

    if (data){
     
      const ClassId = data.class?classes.find((item)=>item.name.toLowerCase() === data.class).classId:""
      const sessionId = data.session?sessions.find((item)=>item.name.toLowerCase() === data.session).sessionId:""
     
axios.get(`${ds}/fee/fcById/${sessionId}/${ClassId}`).then(
response=>{
  if(response.data.length>0){
    toast({
      variant: "Error",
      title: " Saved",
     description:"Fee Catalog  for current class is already in Record",
      action: <ToastAction altText="go back to form">Ok</ToastAction>
    });
   
  }else{
    axios.post(`${ds}/fee/addfeecatlog`,
   {...data,sessionId:sessionId,classId:ClassId,addedBy:1}
    ).then(
      response=>{
        if (response.data=='OK'){
          toast({
            variant: "success",
            title: " Saved",
           
            action: <ToastAction altText="go back to form">Ok</ToastAction>
          });
          reset()
        }
      }
    )
  }
})     
      }
  }






  const retriveData = async()=> {

    if (data){
    axios.get(`${ds}/fee/singleFc/${data.id}`).then(

    (response)=>{
    
      const fcData= response.data[0]
      if(fcData){
        

        setData({...fcData,
          id:fcData.fcId,
          class:classes.find((item)=>item.classId === parseInt(fcData.classId)).name,
          session:sessions.find((item)=>item.sessionId === parseInt(fcData.sessionId)).name,
          
        })
      }
      else{
        toast({
          variant: "error",
          title: "Not  Found",
          
          status: "error",
          duration: 3000
        });
      }
    }
    )
    
  }
}

//========================= updateclass
const updateclass =()=>{

  if (data){
   
    const updatedClassId = data.class?classes.find((item)=>item.name.toLowerCase() === data.class || item.name== data.class ).classId:""
    const updatedsessionId = data.session?sessions.find((item)=>item.name.toLowerCase() === data.session||item.name== data.session).sessionId:""
    
  axios.patch(`${ds}/fee/updatefeeCatalog/${data.id}`, {...data,sessionId:updatedsessionId,classId:updatedClassId,addedBy:1}  ).then(
    response =>{
    
    if(response.data =='OK'){
      toast({
        variant: "success",
        title: " Updated",
       
        action: <ToastAction altText="go back to form">Ok</ToastAction>
      });
      reset()
    }
    else{
      toast({
        variant: "error",
        title: "Invalid Id",
        
        status: "error",
        duration: 3000
      });
    }
    }
)
}    
}
//========================= updateclass
const deleteclass =()=>{

  if(data){
    axios.delete(`${ds}/cls/deleteClass/${data.id}`).then(
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
          title: "Invalid  Id",
          
          status: "error",
          duration: 3000
        });
      }
      }
  )}
  }    


  
 
return (
  <div className='flex  w-full h-[90vh]  bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center'>

 
    <div className='h-[30rem] w-full  flex items-center justify-center '>

       

        <div className='shadow-lg   shadow-slate-600 w-3/5 h-full rounded-lg border border-second flex  flex-col items-center justify-start'
        
        >
            <div className='flex  w-full h-1/4 bg-gradient-to-b from-second to-slate-500 rounded-t-md items-center justify-center text-2xl font-sans font-bold text-white '>
              <span className='flex drop-shadow-md shadow-black '> <AiFillDollarCircle className='size-8 mr-2' /> Fee Catalog</span> </div>
            <div className=' h-full pt-5 flex items-center  justify-center flex-col gap-3 w-full  '>

                <div  className='flex  justify-center pb-5'>

                <div className='w-3/5 flex justify-center'>
                <label htmlFor="id" className='p-2 rounded-sm bg-slate-300  text-center mr-2 font-sans'> Rec.#</label>
                <input type="text" id='id' className='border w-2/6 p-1 rounded-sm border-second'
                  value={data.id} onChange={(e)=>setData({...data,id:e.target.value})} 
                 onKeyPress={(e)=>{
                  
                  if(e.key==="Enter"){
                    retriveData()
                  }
                  // if(e.key==="."){
                  //   setData({...data,id:data.id+1})
                  //   retriveData()
                  // }
                  // if(e.key===","){
                  //   setData({...data,id:data.id - 1})
                  //   retriveData()
                  // }
                  
                 }}
                             
                />
                
                 
                </div>
                <div className='w-4/5 flex justify-center '>
                 <label htmlFor="id" className='p-2 rounded-sm border bg-slate-300  text-center mr-2 font-sans'> Session</label>
                 <div className='bg-white  p-1 rounded-sm'>

                 <Selector data={sessionsData} 
            value = {data.session}
            setValue ={(value)=>setData({...data,session:value})}
            />
            </div>
              
                </div> 

                 <div className='w-4/5 flex justify-center '>
                 <label htmlFor="id" className='p-2 rounded-sm border bg-slate-300 w-1/4 text-center mr-2 font-sans'> Class</label>
                 <div className='bg-white  p-1 rounded-sm'>

                 <Selector data={classesData} 
            value = {data.class}
            setValue ={(value)=>setData({...data,class:value})}
            />
            </div>
              
                </div> 
                </div>
               {/* ------------------ fee divs */}
               <div className='w-10/12  grid grid-cols-12 '>
                 <div  className='grid col-span-6 border rounded-md items-center  justify-center '>
                    <div className='border border-second rounded-md flex flex-col gap-5 pb-2'>
                    <div className='  flex items-center justify-center  bg-blue-300 font-extrabold rounded-t-md h-10'> Sapphirians </div>
                    {/* addmission fee */}
                    <div className='grid items-center grid-cols-6 gap-2 px-2'>
                    <div className='grid col-span-2 '>Adm. Fee</div>
                    <div className='grid col-span-4'>
                        <input type="text" className='border p-1 rounded-sm border-second' 
                        value={data.admFee} onChange={(e)=>setData({...data,admFee:e.target.value})}
                        />
                    </div>
                    </div>

                    
                 {/* -----------monthly fee */}
                 <div className='grid items-center grid-cols-6 gap-2 px-2'>
                    <div className='grid col-span-2'>Monthly Fee</div>
                    <div className='grid col-span-4'>
                        <input type="text" className='border p-1 rounded-sm border-second'  
                        value={data.monthlyFee} onChange={(e)=>setData({...data,monthlyFee:e.target.value})}
                        />
                    </div>
                    </div>
                    {/* -----------annual fee */}
                    <div className='grid items-center grid-cols-6 gap-2 px-2'>
                    <div className='grid col-span-2'>Annual Fee</div>
                    <div className='grid col-span-4'>
                        <input type="text" className='border p-1 rounded-sm border-second' 
                        value={data.annualFee} onChange={(e)=>setData({...data,annualFee:e.target.value})}
                        />
                    </div>
                    </div>
                    

                    </div>
                 </div>
                 <div  className='grid col-span-6 border rounded-md items-center  justify-center '>
                    <div className='border border-second rounded-md flex flex-col gap-5 pb-2'>
                    <div className='  flex items-center justify-center  bg-slate-300 font-extrabold rounded-t-md h-10'> Non Sapphirians </div>
                    {/* addmission fee */}
                    <div className='grid items-center grid-cols-6 gap-2 px-2'>
                    <div className='grid col-span-2 '>Adm. Fee</div>
                    <div className='grid col-span-4'>
                        <input type="text" className='border p-1 rounded-sm border-second' 
                        value={data.sp_admFee} onChange={(e)=>setData({...data,sp_admFee:e.target.value})}
                        />
                    </div>
                    </div>

                    
                 {/* -----------monthly fee */}
                 <div className='grid items-center grid-cols-6 gap-2 px-2'>
                    <div className='grid col-span-2'>Monthly Fee</div>
                    <div className='grid col-span-4'>
                        <input type="text" className='border p-1 rounded-sm border-second' 
                        value={data.sp_monthlyFee} onChange={(e)=>setData({...data,sp_monthlyFee:e.target.value})}
                        />
                    </div>
                    </div>
                    {/* -----------annual fee */}
                    <div className='grid items-center grid-cols-6 gap-2 px-2'>
                    <div className='grid col-span-2'>Annual Fee</div>
                    <div className='grid col-span-4'>
                        <input type="text" className='border p-1 rounded-sm border-second' 
                        value={data.sp_annualFee} onChange={(e)=>setData({...data,sp_annualFee:e.target.value})}
                        />
                    </div>
                    </div>
                    

                    </div>
                 </div>
               </div>

               


               </div>
               <div className=' h-1/5 flex w-full items-center justify-center flex-wrap  gap-2 '>
                {/* <button  className='disabled:bg-slate-500 pl-8 pr-10 py-2 rounded-md bg-red-600 text-white 'type ='button'
                onClick={()=>deleteclass()}
  
                > <div className='flex items-center'><ImBin2 className='size-3 mr-1'/> Delete</div></button> */}

                <button className=' pl-8 pr-10 py-2 rounded-md text-white bg-[#424949]' type ='button' onClick={()=>updateclass()}>
                  <div className='flex items-center'><MdEditNote  className='size-6 mr-1 ' /> Update</div>
                  </button>

                <button className=' pl-8 pr-10 py-2 rounded-md bg-slate-800 text-white'type='button' onClick={()=>reset()}><div className='flex items-center'><VscClearAll className='size-5 mr-1'/> Reset</div></button>
                
                <button className=' pl-8 pr-10 py-2 rounded-md text-white bg-[#04232C]'  type ='submit'
                onClick={()=>saveFeeCatalog()}
                >
                <div className='flex items-center'><IoMdSave  className='size-5 mr-1 ' /> Save</div>
                  
                  </button>                
                
            </div>
        </div>



    </div>
    </div>
  )
}

export default FeeCatalog