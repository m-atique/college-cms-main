'use client'

import React, {useState} from 'react'
import { TbHexagonNumber1 } from "react-icons/tb";
import { FaAward } from "react-icons/fa6";
import axios from 'axios';
const Register = ()=>{

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
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Register Trainee
                </h1>
               </div>
                
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col  border-r-4  border-blue-900 w-6/12  bg-slate-50 px-28 py-5 rounded-tl-md'>
                                <label htmlFor="tid">Enter Trainee ID*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.traineeId}
                                onChange={(e)=>setData({...data, traineeId:e.target.value})}/> 

                                <label htmlFor="tid">Name*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tName}
                                onChange={(e)=>setData({...data, tName:e.target.value})}/> 

                                <label htmlFor="tid">Father Name*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.fName}
                                onChange={(e)=>setData({...data, fName:e.target.value})}/>

                                

                                <label htmlFor="tid">Trainee CNIC*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tCnic}
                                onChange={(e)=>setData({...data, tCnic:e.target.value})}/> 
<label htmlFor="tid">Blood Group*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tBg}
                                onChange={(e)=>setData({...data, tBg:e.target.value})}/> 

                                <label htmlFor="tid">Date Of Birth*</label>
                                <input type="date" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tDob}
                                onChange={(e)=>setData({...data, tDob:e.target.value})}/> 

<label htmlFor="tid">Qualification*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tQualfication}
                                onChange={(e)=>setData({...data, tQualfication:e.target.value})}/>

<label htmlFor="tid">Domicile*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tDomicile}
                                onChange={(e)=>setData({...data, tDomicile:e.target.value})}/>                               



<label htmlFor="tid">Permanent Address*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tPA}
                                onChange={(e)=>setData({...data, tPA:e.target.value})}/> 
<label htmlFor="tid">Postal / Current Address.*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tCA}
                                onChange={(e)=>setData({...data, tCA:e.target.value})}/>  
<label htmlFor="tid">Tainee Contact No.*</label>
                                <input type="number" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tcontact}
                                onChange={(e)=>setData({...data, tcontact:e.target.value})}/>        
<label htmlFor="tid">Emergency Contact No.*</label>
                                <input type="number" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tEcontact}
                                onChange={(e)=>setData({...data, tEcontact:e.target.value})}/>                            
<label htmlFor="tid">Relation (with Emergency).*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tRelation}
                                onChange={(e)=>setData({...data, tRelation:e.target.value})}/>     


                        </div>
                        
                        
 <div className='flex flex-col w-6/12 bg-slate-50 rounded-tr-md px-14'>
                                <h2>Selected Trainee Information</h2>
                                <label htmlFor="tid">Rank*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tRank}
                                onChange={(e)=>setData({...data, tRank:e.target.value})}/>

                                <label htmlFor="tid">Belt No.*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tBelt}
                                onChange={(e)=>setData({...data, tBelt:e.target.value})}/>
                                <label htmlFor="tid">Driving license No.*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tDL}
                                onChange={(e)=>setData({...data, tDL:e.target.value})}/> 

                                <label htmlFor="tid">Height*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tHeight}
                                onChange={(e)=>setData({...data, tHeight:e.target.value})}/>   

<label htmlFor="tid">Medical Fitness Certificate.*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tFcertificate}
                                onChange={(e)=>setData({...data, tFcertificate:e.target.value})}/>  

<label htmlFor="tid">Date of Joining Government Service.*</label>
                                <input type="date" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tJService}
                                onChange={(e)=>setData({...data, tJService:e.target.value})}/>  

<label htmlFor="tid">Date of Joining (NHMP).*</label>
                                <input type="date" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tJNHMP}
                                onChange={(e)=>setData({...data, tJNHMP:e.target.value})}/>

<label htmlFor="tid">Date of Arrivat at NHMP College.*</label>
                                <input type="date" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tArrival}
                                onChange={(e)=>setData({...data, tArrival:e.target.value})}/>

<label htmlFor="tid">Professional Experience.*</label>
                                <input type="texts" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tExp}
                                onChange={(e)=>setData({...data, tExp:e.target.value})}/>

<label htmlFor="tid">Religion.*</label>
                                <input type="text" name="" id="tid" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tReligion}
                                onChange={(e)=>setData({...data, tReligion:e.target.value})}/>

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
                                        <input type="submit" value="Register" className='h-10 border-b shadow-sm  rounded-sm bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-200 hover:text-black' onClick={() => add()}/>
                                        </div>
                        </div>
                </div>
                
                
        </div>
)}
export default Register