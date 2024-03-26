'use client'
import React,{useEffect,useMemo, useState,useContext} from 'react'

import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";
import { IoMdSave,IoIosPeople } from "react-icons/io";
import { MdEditNote } from "react-icons/md";


import { Selector } from '../../../components/ui/selector';
import { getmaxid } from '@/backend/login';
import axios from 'axios'
import { ClassContext,SectionContext,spUnitContext,domainContext } from "@/app/datastore/dataprovider";
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




const ClassForm =() => {
  const { toast } = useToast()
  const defaults = useMemo(() => ({
    id:"",
    name :"",
    type:""
  }),[])
  
  const ds = useContext(domainContext).base_url
 
  const reset = async()=>{ 
    const response = await getmaxid("classes","classId")
    // setData(defaults)
    setData({...defaults,id:response+1})
}

useEffect(()=>{

  reset()
  
},[defaults])



  const [data,setData]=useState(defaults)



  const saveClass = () => {

    if (data){
      
axios.get(`${ds}/cls/classesList/${data.id}`).then(
chekclass=>{
if(chekclass.data.length<1){
  axios.post(`${ds}/cls/addClass`,
  data
  
  ).then(
    response =>{
      if(response.data =='OK'){
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
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000
        });
        
      }
    }
    )
}
else {
  toast({
    variant: "default",
    title: "Class Already In Record",
   
    status: "error",
    duration: 3000
  });
}
}
)   
      
      }
  }





  const retriveData = async()=> {

    if (data){
    axios.get(`${ds}/cls/classesList/${data.id}`).then(

    (response)=>{
    
      const classdata= response.data[0]
      if(classdata){
        
        setData({...data,
       
          name:classdata.name,
          type:classdata.type
        })
      }
      else{
        toast({
          variant: "error",
          title: "No Record Found",
         
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
  axios.patch(`${ds}/cls/updateClass/${data.id}`, data ).then(
    response =>{
    
    if(response.data =='OK'){
      toast({
        variant: "success",
        title: " Updated",
        describtion:"Class Record Updated",
        action: <ToastAction altText="go back to form">Ok</ToastAction>
      });
      reset()
    }
    else{
      toast({
        variant: "error",
        title: "Invalid Id",
        description: error.message,
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
        console.log(response)
      if(response.data =='OK'){
        toast({
          variant: "success",
          title: " Deleted",
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
  )}
  }    


  
 
return (
  <div className='flex  w-full h-[90vh]  bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center'>

 
    <div className='h-[30rem] w-full  flex items-center justify-center '>

       

        <div className='shadow-lg   shadow-slate-600 w-3/5 h-full rounded-lg border border-second flex  flex-col items-center justify-start'
        
        >
            <div className='flex  w-full h-1/4 bg-gradient-to-b from-second to-slate-500 rounded-t-md items-center justify-center text-2xl font-sans font-bold text-white '>
              <span className='flex drop-shadow-md shadow-black '> <IoIosPeople className='size-8 mr-2' /> Class Registration Form</span> </div>
            <div className=' h-full pt-5 flex items-center  justify-center flex-col gap-3 w-full  '>

                <div className='w-3/5 flex '>
                <label htmlFor="id" className='p-2 rounded-sm bg-slate-300 w-1/5 text-center mr-2 font-sans'> Class Id</label>
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
                {/* <div className='w-3/5 flex '>
                <label htmlFor="id" className='p-2 rounded-sm bg-slate-300 w-1/4 text-center mr-2 font-sans'> Type</label>
                <div className='border w-full  flex rounded-sm border-second items-center justify-center '>
               
          <Selector
            data = {datax}   value={data.type} setValue={(x)=>setData({...data,type:x})} 
          />
        
      
</div>
        
               
                </div> */}

                 <div className='w-3/5 flex '>
                 <label htmlFor="id" className='p-2 rounded-sm bg-slate-300 w-1/4 text-center mr-2 font-sans'> Name</label>
                <input type="text" id='name' className='border w-full p-1 rounded-sm border-second '
                value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} 
                />
              
                </div> 

               

                {/* <div className='w-3/5 flex '>
                <label htmlFor="fee" className='p-2 rounded-sm bg-slate-300 w-1/4 text-center mr-2 font-sans'>Fee</label>
                <input type="text" id='fee' className='border w-full p-1  rounded-sm border-second '
                  value={data.fee} onChange={(e)=>setData({...data,fee:e.target.value})} />
                </div> */}


               </div>
               <div className=' h-1/5 flex w-full items-center justify-center flex-wrap  gap-2 '>
                <button  className='disabled:bg-slate-500 pl-8 pr-10 py-2 rounded-md bg-red-600 text-white 'type ='button'
                onClick={()=>deleteclass()}
  
                > <div className='flex items-center'><ImBin2 className='size-3 mr-1'/> Delete</div></button>

                <button className=' pl-8 pr-10 py-2 rounded-md text-white bg-[#424949]' type ='button' onClick={()=>updateclass()}>
                  <div className='flex items-center'><MdEditNote  className='size-6 mr-1 ' /> Update</div>
                  </button>

                <button className=' pl-8 pr-10 py-2 rounded-md bg-slate-800 text-white'type='button' onClick={()=>reset()}><div className='flex items-center'><VscClearAll className='size-5 mr-1'/> Reset</div></button>
                
                <button className=' pl-8 pr-10 py-2 rounded-md text-white bg-[#04232C]'  type ='submit'
                onClick={()=>saveClass()}
                >
                <div className='flex items-center'><IoMdSave  className='size-5 mr-1 ' /> Save</div>
                  
                  </button>                
                
            </div>
        </div>



    </div>
    </div>
  )
}

export default ClassForm