'use client'

import React, {useState} from 'react'
import { TbHexagonNumber1 } from "react-icons/tb";
import { FaAward } from "react-icons/fa6";
import axios from 'axios';
const AddPosting = ()=>{

const defaults= {
        traineeId: "",
        postingHistory:"", 
        addedBy:"",
        addedDate:"",
}
const [data, setData] = useState(defaults)
const [ReceivedItemArray, setArray] = useState([]);

function add () {
        if(data.traineeId === ''){ 
                alert("Please Enter Trainee ID")}
                else if (data.status === '' ) {alert("Please select Punishment")}
                
                
                        else {
                                axios.post('http://localhost:5000/posting/addPosting',data).then(
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
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Add Trainee Posting Details
                </h1>
               </div>
                
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col  border-r-4  border-blue-900 w-8/12  bg-slate-50 px-28 py-5 rounded-tl-md'>
                                <label htmlFor="tid">Select Trainee*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.traineeId}
                                onChange={(e)=>setData({...data, traineeId:e.target.value})}/> 

                                <label htmlFor="">Posting Zone / Office*</label>
                                <select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.postingHistory}
                                onChange={(e)=>setData({...data, postingHistory:e.target.value})}
                                >
                                                <option value="">--Select--</option>
                                                <option  value="Central Regional Office"> Central Regional Office</option>
                                                <option  value="North Regional Office"> North Regional Office</option>
                                                <option  value="CPO Office, Islamabad"> CPO Office, Islamabad</option>
                                                <option  value="Motorway Central-I"> Motorway Central-I</option>
                                                <option  value="Motorway Central-II"> Motorway Central-II </option>
                                                <option  value="N-5 Central"> N-5 Central </option>
                                                <option  value="N-5 North"> N-5 North </option>
                                                <option  value="N-5 South"> N-5 South </option>
                                                <option  value="West"> West </option>
                                                <option  value="Training College"> Training College </option>
                                                
                                                
                                        </select>

                                 

                               

                                <label htmlFor="remarks">Remarks (if any)</label>
                                <textarea id="remarks" className='h-20 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.remarks}
                                onChange={(e)=>setData({...data, remarks:e.target.value})}
                                ></textarea>
                                
                               
                                        <div className='flex flex-row p-2 items-end justify-end gap-4'>
                                        <input type="reset" value="Reset" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white cursor-pointer p-2'  onClick={() => reset()}/>
                                        <input type="submit" value="Add Posting" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-200 hover:text-black' onClick={() => add()}/>
                                        </div>
                        </div>
                        <div className='flex flex-row w-4/12 bg-slate-300 rounded-tr-md'>
                                <h2>Selected Trainee Information</h2>
                        </div>
                </div>
                
                
        </div>
)}
export default AddPosting