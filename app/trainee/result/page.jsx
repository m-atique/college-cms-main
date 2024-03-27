'use client'

import React, {useState} from 'react'
import { TbHexagonNumber1 } from "react-icons/tb";
import { FaAward } from "react-icons/fa6";
import axios from 'axios';
const AddResult = ()=>{

const defaults= {
        traineeId: "",
        status:"",
        obMarks:"",
        totalMarks:"",
        position:"",
        remarks:"",
        addedBy:"",
        addedDate:"",
}
const [data, setData] = useState(defaults)
const [ReceivedItemArray, setArray] = useState([]);

function add () {
        if(data.tid === ''){ 
                const element = document.getElementById('tid');
                // element.style.background='red' || parseInt(data.punishment) > 0
                element.style.border='red'
                alert("Please Enter Trainee ID")}
                else if (data.status === '' ) {alert("Please select Punishment")}
                else if (data.obMarks == '') {alert("Please Obtained Marks")}
                else if (data.totalMarks == '') {alert("Please Total Marks Marks")}
                else if (data.position === '') {alert("Please enter reason")}
                
                        else {
                                axios.post('http://localhost:5000/results/addResult',data).then(
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
                <FaAward size={25}  />
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Add Trainee Results
                </h1>
               </div>
                
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col  border-r-4  border-blue-900 w-8/12  bg-slate-50 px-28 py-5 rounded-tl-md'>
                                <label htmlFor="tid">Select Trainee*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.traineeId}
                                onChange={(e)=>setData({...data, traineeId:e.target.value})}/> 

                                <label htmlFor="">Result (Pass / Fail)*</label>
                                <select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.status}
                                onChange={(e)=>setData({...data, status:e.target.value})}
                                >
                                                <option value="">--Select--</option>
                                                <option className="text-green-500 font-bold" value="Pass"> Pass</option>
                                                <option className="text-red-500 font-bold" value="Fail"> Fail </option>
                                                
                                        </select>

                                <label htmlFor="">Obtained Marks*</label>
                                <input type="number" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.obMarks}
                                onChange={(e)=>setData({...data, obMarks:e.target.value})}/> 

                                <label htmlFor="">Total Marks*</label>
                                <input type="number" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.totalMarks}
                                onChange={(e)=>setData({...data, totalMarks:e.target.value})}/> 

                                <label htmlFor="">Position (if any)*</label>
                                <select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.position}
                                onChange={(e)=>setData({...data, position:e.target.value})}
                                >
                                                <option value="">--Select--</option>
                                                <option  value="Nil"> Nil</option>
                                                <option  value="All Round First"> All Round First</option>
                                                <option  value="Best in Discipline"> Best in Discipline </option>
                                                <option  value="Best in Academics"> Best in Academics </option>
                                                <option  value="Best in Parade (first)"> Best in Parade (first)</option>
                                                <option  value="Best in Parade (second)"> Best in Parade (second) </option>
                                                <option  value="Best in Fire"> Best in Fire </option>
                                                
                                                
                                        </select>

                                <label htmlFor="remarks">Remarks (if any)</label>
                                <textarea id="remarks" className='h-20 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.remarks}
                                onChange={(e)=>setData({...data, remarks:e.target.value})}
                                ></textarea>
                                
                               
                                        <div className='flex flex-row p-2 items-end justify-end gap-4'>
                                        <input type="reset" value="Reset" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white cursor-pointer p-2'  onClick={() => reset()}/>
                                        <input type="submit" value="Add Result" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-200 hover:text-black' onClick={() => add()}/>
                                        </div>
                        </div>
                        <div className='flex flex-row w-4/12 bg-slate-300 rounded-tr-md'>
                                <h2>Selected Trainee Information</h2>
                        </div>
                </div>
                
                
        </div>
)}
export default AddResult