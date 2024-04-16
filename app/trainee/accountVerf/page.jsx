'use client'

import React, {useState} from 'react'

import axios from 'axios';
const AccountVerf = ()=>{

const defaults= {
        courseName: "",
        startDate:"",
        endDate:"",
        remarks:"",
        addedBy:"",
        addedDate:"",
}
const [data, setData] = useState(defaults)


function add () {
        if(data.courseName === ''){ 
           alert("Please Enter Course Name")}
                
                else if (data.startDate === '') {alert("Please select Course Start Date")}
                else if (data.endDate === '') {alert("Please select Course End Date")}
                
                        else {
                                axios.post('http://localhost:5000/course/addCourse',data).then(
                                        response=>{
                                                if (response) { console.log(response.data.message)
                                                        
                                                        setData(defaults)
                                                        alert("Data has been added Successfully")
                                                      }
                                                      else { alert("not working") }
                                        }

                                ).catch((error)=>{
                                        console.log(error)
                                })
                        }
}

function reset(){setData(defaults)}

return (
        <div className='bg-slate-200  border w-10/12 h-4/5 m-auto p-2 items-center'>
               <div className="flex flex-row justify-center w-full p-4 gap-2 bg-slate-300">
                
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'> List of Trainee Registered Through Android Application
                </h1>
               </div>
                
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col   border-blue-900 w-full bg-slate-50 px-2 py-2 rounded-tl-md'>
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
                        <div className='p-1 mr-2 w-1/12  '></div>
                    </div>        
                        </div>
                        
                </div>
                
                
        </div>
)}
export default AccountVerf