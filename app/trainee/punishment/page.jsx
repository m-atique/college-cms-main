'use client'

import React, {useState} from 'react'
import { GiThorHammer } from "react-icons/gi";
import axios from 'axios';
const AddPunishment = ()=>{

const defaults= {
        traineeId: "",
        punishment:"",
        days:"",
        reason:"",
        remarks:"",
        orderBy:"",
        addedBy:"",
        addedDate:"",
}
const [data, setData] = useState(defaults)
const [ReceivedItemArray, setArray] = useState([]);

function add () {
        if(data.traineeId === ''){ 
                
                alert("Please Enter Trainee ID")}
                else if (data.punishment === '' ) {alert("Please select Punishment")}
                
                else if (data.reason === '') {alert("Please enter reason")}
                else if (data.orderBy === '') {alert("Please select Authority")}
                        else {
                                axios.post('http://localhost:5000/punishment/addPunishment',data).then(
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
                <GiThorHammer size={25} color='black' />
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Add Trainee punishment Record
                </h1>
               </div>
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col  border-r-4  border-blue-900 w-8/12  bg-slate-50 px-28 py-5 rounded-tl-md'>
                                <label htmlFor="tid">Select Trainee*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.traineeId}
                                onChange={(e)=>setData({...data, traineeId:e.target.value})}/> 

                        
                                <label htmlFor="">Punishment*</label>
                                <select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.punishment}
                                onChange={(e)=>setData({...data, punishment:e.target.value})}
                                >
                                                <option value="">--Select--</option>
                                                <option value="Extra Drill"> Extra Drill </option>
                                                <option value="Detained"> Detaintion </option>
                                                <option value="Repatriated">Repatriation</option>
                                        </select>

                                <label htmlFor="days">Punishment Days*</label>
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

                                <label htmlFor="orderBy">Orderd By*</label>
                                        <select name="" id="order_by" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                        value={data.orderBy}
                                        onChange={(e)=>setData({...data, orderBy:e.target.value})}
                                        >
                                        <option value="">--Select--</option>
                                                <option value="Deputy Commandant">SP / Deputy Commandant</option>
                                                <option value="Commandant">DIG / Commandant</option>
                                        </select>
                                        <div className='flex flex-row p-2 items-end justify-end gap-4'>
                                        <input type="reset" value="Reset" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white cursor-pointer p-2'  onClick={() => reset()}/>
                                        <input type="submit" value="Add Punishment" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-200 hover:text-black' onClick={() => add()}/>
                                        </div>
                        </div>
                        <div className='flex flex-row w-4/12 bg-slate-300 p-4 rounded-tr-md justify-center items-center'>
                                <h2>Selected Trainee Information will be displayed here</h2>
                        </div>
                </div>
                
                
        </div>
)}
export default AddPunishment