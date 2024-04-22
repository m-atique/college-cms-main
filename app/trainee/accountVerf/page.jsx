'use client'

import React, {useEffect, useState} from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axios from 'axios'

const AccountVerf = ()=>{

        useEffect(()=>{
       
                axios.get('http://localhost:5000/register/getRegAccounts').then(
                        response=>{
                                if (response) { console.log(response.data)
                                        setData(response.data) 
                                console.log(response.data)
                                }
                                 else { alert("not working") }
                        }
        
                ).catch((error)=>{
                        console.log(error)
                })
        },[])
   
 
                
const [data, setData] = useState([])


return (
        <div className='bg-slate-200  border w-10/12 h-4/5 m-auto p-2 items-center'>
               <div className="flex flex-row justify-center w-full p-4 gap-2 bg-gray-300">
                
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'> List of Trainee Registered Through Android Application
                </h1>
               </div>
                
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col   border-blue-900 w-full  rounded-tl-md'>
                        <div className='flex flex-row  text-white bg-blue-400  '>
                        <div className='p-1 w-1/12 '>Sr. #</div>
                        <div className='p-1 ml-2 w-3/12 '>Trainee Name</div>
                        <div className='p-1 ml-2 w-2/12 '>Father Name</div>
                        <div className='p-1 ml-2 w-1/12 '>CNIC.</div>
                        <div className='p-1 ml-2 w-1/12 '>Blood Group.</div>
                        <div className='p-1 mr-2 w-1/12  '>Date of Birth</div>
                        <div className='p-1 ml-2 w-1/12 '>Qualification</div>
                        <div className='p-1 ml-2 w-1/12 '>Domicile</div>
                        <div className='p-1 mr-2 w-1/12  '>Personal Contact</div>
                        <div className='p-1 mr-2 w-1/12  '>Emergency Contact</div>
                        <div className='p-1 mr-2 w-1/12  '>Emergency Contact (Relation)</div>
                        
                    </div>        
                        </div>
                        
                        
                </div>
                <div>
                                {data && 
                                data.map((item, index)=>(
                                        <div className='p-2 w-full border-b border-blue-400  flex flex-row'>
                                        <div className='p-1 ml-2 w-1/12 '>{item.id}</div>
                                        <div className='p-1 ml-2 w-3/12 '>{item.tName}</div>
                                        <div className='p-1 ml-2 w-2s/12 '>{item.tFName}</div>
                                        <div className='p-1 ml-2 w-2/12 '>{item.tCnic}</div>
                                        <div className='p-1 ml-2 w-2/12 '>{item.tDob}</div>
                                        <div className='p-1 ml-2 w-1/12 '>{item.tDomicile}</div>
                                        <div className='p-1 ml-2 w-1/12 '>
                                                <FaCheckCircle color='green'/> 
                                                <MdEdit/>
                                        </div>
                                        </div>
                                       
                                ))}
                                   
                        </div>
                
                
        </div>
)}
export default AccountVerf