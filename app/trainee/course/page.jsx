'use client'

import React, {useState} from 'react'

import axios from 'axios';
const AddCourse = ()=>{

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
                
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Add New Course
                </h1>
               </div>
                
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col  border-r-4  border-blue-900 w-8/12  bg-slate-50 px-28 py-5 rounded-tl-md'>
                                <label htmlFor="tid">Enter Course Name*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.courseName}
                                onChange={(e)=>setData({...data, courseName:e.target.value})}/> 

                                <label htmlFor="">Start Date*</label>
                                <input type="date" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.startDate}
                                onChange={(e)=>setData({...data, startDate:e.target.value})}/>

                                <label htmlFor="">End Date*</label>
                                <input type="date" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.endDate}
                                onChange={(e)=>setData({...data, endDate:e.target.value})}/> 

                                

                                

                                <label htmlFor="remarks">Remarks (if any)</label>
                                <textarea id="remarks" className='h-20 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.remarks}
                                onChange={(e)=>setData({...data, remarks:e.target.value})}
                                ></textarea>
                                
                               
                                        <div className='flex flex-row p-2 items-end justify-end gap-4'>
                                        <input type="reset" value="Reset" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white cursor-pointer p-2'  onClick={() => reset()}/>
                                        <input type="submit" value="Add New Course" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-200 hover:text-black' onClick={() => add()}/>
                                        </div>
                        </div>
                        
                </div>
                
                
        </div>
)}
export default AddCourse