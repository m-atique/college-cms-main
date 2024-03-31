'use client'

import React, {useState} from 'react'
import { PiPencilLineFill } from "react-icons/pi";
import axios from 'axios';
const AddAbsence = ()=>{

const defaults= {
        traineeId: "",
        startDate:"",
        endDate:"",
        days:"",
        reason:"", 
        remarks:"",
        addedBy:"",
        addedDate:"",
}
const [data, setData] = useState(defaults)
const [ReceivedItemArray, setArray] = useState([]);

function add () {
        if(data.traineeId === ''){ alert("Please Enter Trainee ID")}
                else if (data.startDate === '' ) {alert("Please enter Start Date")}
                else if (data.endDate === ''  || data.endDate  <= data.startDate) {
                        var st = new Date(data.startDate)
                        var end = new Date(data.endDate)
                        var diff = st -end
                        var res = Math.round(diff /(1000*3600*24))
                       
                        alert("Please enter end Date or Date should not be less then or equal to start Date")}
                else if (data.days === ''|| parseInt(data.days) < 1) {alert("Please enter days")}
                else if (data.reason === '') {alert("Please enter reason")}
                
                        else {
                                axios.post('http://localhost:5000/absence/addAbsence',data).then(
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
        <div className='bg-slate-200 border w-10/12 h-4/5 m-auto p-2 items-center'>
                 <div className="flex flex-row justify-center w-full p-4 gap-2 bg-slate-300">
                <PiPencilLineFill size={25} color='black' />
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Add Trainee Absence Record
                </h1>
               </div>
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col  border-r-4  border-blue-900 w-8/12  bg-slate-50 px-28 py-5 rounded-tl-md'>
                                <label htmlFor="tid">Select Trainee*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.traineeId}
                                onChange={(e)=>setData({...data, traineeId:e.target.value})}/> 

                        
                                <label htmlFor="">From*</label>
                                <input type="date" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.startDate}
                                onChange={(e)=>setData({...data, startDate:e.target.value})}/> 

                                <label htmlFor="">To*</label>
                                <input type="date" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.endDate}
                                onChange={(e)=>setData({...data, endDate:e.target.value})}/> 

                                <label htmlFor="days">Absent Days*</label>
                                <input type="number" name="" id="days" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.days}
                                onChange={(e)=>setData({...data, days:e.target.value})} 
                                
                                />
                        
                                <label htmlFor="reason">Reason*</label>
                                <textarea id ="reason" className='h-20 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.reason}
                                onChange={(e)=>setData({...data, reason:e.target.value})}
                                ></textarea>

                                <label htmlFor="remarks">Remarks (if any)</label>
                                <textarea id="remarks" className='h-20 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.remarks}
                                onChange={(e)=>setData({...data, remarks:e.target.value})}
                                ></textarea>
                                
                               
                                        <div className='flex flex-row p-2 items-end justify-end gap-4'>
                                        <input type="reset" value="Reset" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white cursor-pointer p-2'  onClick={() => reset()}/>
                                        <input type="submit" value="Add Absence record" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-200 hover:text-black' onClick={() => add()}/>
                                        </div>
                        </div>
                        
                </div>
                
                
        </div>
)}
export default AddAbsence