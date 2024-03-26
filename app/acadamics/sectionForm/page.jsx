"use client"
import React,{useState,useEffect,useMemo,useContext} from 'react'
import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";
import { IoMdSave,IoIosPeople } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import axios from 'axios';
import { getmaxid } from '@/backend/login';
import { ClassContext,SectionContext,spUnitContext,domainContext } from "@/app/datastore/dataprovider";
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"






const SectionForm = () => {
  const { toast } = useToast()
  const defaults = useMemo(() => ({
    id:0,
    name :"",
    description:"",
   
  }),[])

  const ds = useContext(domainContext).base_url
  
 
  const reset = async()=>{ 
    const response = await getmaxid("sections","sectionId")
    // setData(defaults)
    setData({...defaults,id:response+1})
}

useEffect(()=>{

  reset()
  
},[defaults])




  const [data,setData]=useState(defaults)
 //--------get data
  const getData =async()=>{
    const section = await axios.get(`${ds}/cls/sectionList/${data.id}`)
    if(section.data.length>0){
      const result = await section.data[0]

      setData({...data,  
        name:result.name,
        description:result.description
      })
    }else{
      toast({
        variant: "error",
        title: "Invalid Section Id",
        
        status: "error",
        duration: 3000
      });
    }
  }

//========================= updateclass
const updateSection =()=>{
  
  
    axios.patch(`http://localhost:5010/cls/updateSection/${data.id}`, data ).then(
      response =>{
        console.log(response)
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
          title: "Invalid Section Id",
          
          status: "error",
          duration: 3000
        });
   
      }
      }
  )
  }
  //========================= updateclass
const deleteSection =()=>{

    axios.delete(`http://localhost:5010/cls/deleteSection/${data.id}`).then(
      response =>{
      if(response.data =='OK'){
        toast({
          variant: "success",
          title: "Deleted",
         
          action: <ToastAction altText="go back to form">Ok</ToastAction>
        });
        reset()
      }
      else{
        toast({
          variant: "error",
          title: "Invalid Section",
          
          status: "error",
          duration: 3000
        });
      }
      }
  )
  }    
  //=======save data   
  
  const savedata= ()=>{
    
    if (data){
      
      axios.get(`http://localhost:5010/cls/sectionList/${data.id}`).then(
      cheksection=>{
        
      if(cheksection.data.length<1){
        axios.post('http://localhost:5010/cls/addSection',
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
                title: "Error please check all fields",
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
          variant: "error",
          title: "Already in record",
          
          status: "error",
          duration: 3000
        });
      }
      }
      )      
            }
  }
    
    
  return (
    <div className='flex  w-full h-[90vh]  bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center'>

 
    <div className='h-[30rem] w-full  flex items-center justify-center '>
        <div className='shadow-lg shadow-slate-600 w-3/5 h-full rounded-lg border border-second flex  flex-col items-center justify-start'
        
        >
            <div className='flex  w-full h-1/4 bg-gradient-to-b from-second to-slate-500 rounded-t-md items-center justify-center text-2xl font-sans font-bold text-white '>
              <span className='flex drop-shadow-md shadow-black '> <FaLayerGroup className='size-8 mr-2' /> Section Registration Form</span> </div>
            <div className=' h-3/4 pt-5 flex items-center  justify-center flex-col gap-3 w-full  '>

                <div className='w-3/5 flex '>
                <label htmlFor="id" className='p-2 rounded-sm bg-slate-300 w-1/5 text-center mr-2 font-sans'> Section Id</label>
                <input type="text" id='id' className='border w-2/6 p-1 rounded-sm border-second'
                value={data.id} onChange={(e)=>setData({...data,id:e.target.value})} 

                 onKeyPress={(e)=>{
                  if(e.key==="Enter"){
                    getData()
                  }
                 }}
                             
                />
                 
                </div>

                 <div className='w-3/5 flex '>
                 <label htmlFor="id" className='p-2 rounded-sm bg-slate-300 w-1/4 text-center mr-2 font-sans'> Name</label>
                 <input type="text" id='name' className='border w-full p-1 rounded-sm border-second '
                 value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}
                />
               
                </div> 

                <div className='w-3/5 flex '>
                <label htmlFor="id" className='p-2 rounded-sm bg-slate-300 w-1/4 text-center mr-2 font-sans'> Description</label>
                <input type="text" id='fee' className='border w-full p-1  rounded-sm border-second '
                value={data.description} onChange={(e)=>setData({...data,description:e.target.value})}
                 />
                </div>

               


               </div>
               <div className=' h-1/5 flex w-full items-center justify-center  gap-2 '>
                <button className=' pl-8 pr-10 py-2 rounded-md bg-red-600 text-white'
                onClick={()=>deleteSection()}
                > <div className='flex items-center'><ImBin2 className='size-3 mr-1'/> Delete</div></button>

                <button className=' pl-8 pr-10 py-2 rounded-md text-white bg-[#424949]'
                type='button' onClick={()=>updateSection()}>
                  <div className='flex items-center'><MdEditNote  className='size-6 mr-1 ' /> Update</div>
                  </button>

                <button className=' pl-8 pr-10 py-2 rounded-md bg-slate-800 text-white' onClick={()=>reset()} ><div className='flex items-center'><VscClearAll className='size-5 mr-1' /> Reset</div></button>
                
                <button className=' pl-8 pr-10 py-2 rounded-md text-white bg-[#04232C]' type='button'  onClick={()=>savedata(data)}>
                <div className='flex items-center'><IoMdSave  className='size-5 mr-1 '/> Save</div>
                  
                  </button>                
                
            </div>
        </div>


        </div>
    </div>
  )
}

export default SectionForm