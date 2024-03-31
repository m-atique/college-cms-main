'use client'

import React, {useState} from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import axios from 'axios';


const AddLeave = ()=>{

const defaults= {
        traineeId: "",
        startDate:"",
        endDate:"",
        days:"",
        reason:"",
        leaveType:"",
        remarks:"",
        approvedBy:"",
        addedBy:"",
        addedDate:"",
}
const [data, setData] = useState(defaults)

function caluclationDate(s , e){
                let st = new Date(s)
                let end = new Date(e)
                let Difference_In_Time = end.getTime() - st.getTime();
                
                let res = Math.round(Difference_In_Time /(1000*3600*24)+1)
                data.days = res   
                console.log(res + "dfsdfd" + data.days)
             
}
// const [ReceivedItemArray, setArray] = useState([]);
// const d = toISOString().split('T')[0]
function add () {
        if(data.traineeId === ''){         alert("Please Enter Trainee ID")}
        else if (data.startDate === '' ) {alert("Please enter Start Date")}
        else if (data.endDate === ''  || data.endDate  < data.startDate) {
                
                alert("Please enter end Date or Date should not be less then or equal to start Date")
                      
                }
                else if (data.endDate !== ''  || data.endDate  > data.startDate) {
                                console.log('wwwwwwwwwwwwwwwww')
                       caluclationDate(data.startDate,data.endDate)
                              
                        }
                else if (parseInt(data.days) < 1) {
                        alert("Days issue")}
                else if (data.reason === '') {alert("Please enter reason")}
                else if (data.leaveType === '') {alert("Please select Type of Leave")}
                else if (data.approvedBy === '') {alert("Please select Approved Authority")}
                        else {
                                axios.post('http://localhost:5000/leave/addleave',data).then(
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
                <FaCalendarAlt size={25} color='black' />
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Add Trainee Leaves Record
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
                                

                                <label htmlFor="days"> Days*</label>
                                <input type="number" name="" id="days" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.days}
                                // onChange={(e)=>setData({...data, days:e.target.value})} 
                                />
                        
                                <label htmlFor="reason">Reason*</label>
                                <textarea id ="reason" className='h-20 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.reason}
                                onChange={(e)=>setData({...data, reason:e.target.value})}
                                ></textarea>

                                <label htmlFor="leaveType">Leave Type*</label>
                                        <select name="" id="leaveType" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                        value={data.leaveType}
                                        onChange={(e)=>setData({...data, leaveType:e.target.value})}
                                        >
                                        <option value="">--Select--</option>
                                                <option value="Short Leave">Short Leave</option>
                                                <option value="Casual Leave">Casual Leave</option>
                                                <option value="Medical Leave">Medical Leave</option>
                                        </select>

                                <label htmlFor="remarks">Remarks (if any)</label>
                                <textarea id="remarks" className='h-20 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.remarks}
                                onChange={(e)=>setData({...data, remarks:e.target.value})}
                                ></textarea>

                                <label htmlFor="orderBy">Approved By*</label>
                                        <select name="" id="order_by" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                        value={data.approvedBy}
                                        onChange={(e)=>setData({...data, approvedBy:e.target.value})}
                                        >
                                        <option value="">--Select--</option>
                                                <option value="Deputy Commandant">SP / Deputy Commandant</option>
                                                <option value="Commandant">DIG / Commandant</option>
                                        </select>
                                        <div className='flex flex-row p-2 items-end justify-end gap-4'>
                                        <input type="reset" value="Reset" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white cursor-pointer p-2'  onClick={() => reset()}/>
                                        <input type="submit" value="Add Leave Record" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-200 hover:text-black' onClick={() => add()}/>
                                        </div>
                        </div>
                        {/* <div className='flex flex-row w-4/12 bg-slate-300 rounded-tr-md'>
                                <h2>Selected Trainee Information</h2>
                        </div> */}
                </div>
                
                
        </div>
)}
export default AddLeave