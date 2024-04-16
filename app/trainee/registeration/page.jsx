'use client'
import React, {useState} from 'react'

import axios from 'axios';
const Register = ()=>{

const defaults= {
        traineeId: "",
        tName:"", 
        tFName:"",
        tCnic:"",
        tBg:"",
        tDob:"",
        tQualification:"",
        tDomicile:"",
        tPA:"",
        tCA:"",
        tContact:"",
        tEmgcontact:"",
        tRelation:"",
        tBeltno:"",
        tRank:"",
        tDL:"",
        tDLno:"",
        tDLissuedBy:"",
        tHeight:"",
        tMedical:"",
        tJoinService:"",
        tJoinNHMP:"",
        tArrivalCollege:"",
        tExp:"",
        tReligion:"",
        tPosting:"",
        remarks:"",
        addedBy:"",
        addedDate:"",
}
const [data, setData] = useState(defaults)
const [ReceivedItemArray, setArray] = useState([]);

function add () {
        if(data.traineeId === ''){ 
                alert("Please Enter Trainee ID")}
               
                
                
                        else {
                                axios.post('http://localhost:5000/register/TraineeRegisteration',data).then(
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
                
                <h1 className=' text-black  rounded-md text-lg text-center font-bold'>Trainee Registeration Form
                </h1>
               </div>
                
                <div className='flex flex-row w-full '>
                        <div className='flex flex-col  border-r-4  border-blue-900 w-6/12  bg-slate-50 px-28 py-5 rounded-tl-md'>
                                <label htmlFor="">Enter Trainee ID*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.traineeId}
                                onChange={(e)=>setData({...data, traineeId:e.target.value})}/> 

                                <label htmlFor="">Name*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tName}
                                onChange={(e)=>setData({...data, tName:e.target.value})}/> 

                                <label htmlFor="">Father Name*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tFName}
                                onChange={(e)=>setData({...data, tFName:e.target.value})}/>

                                

                                <label htmlFor="">Trainee CNIC*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tCnic}
                                onChange={(e)=>setData({...data, tCnic:e.target.value})}/> 
<label htmlFor="">Blood Group*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tBg}
                                onChange={(e)=>setData({...data, tBg:e.target.value})}/> 

                                <label htmlFor="">Date Of Birth*</label>
                                <input type="date" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tDob}
                                onChange={(e)=>setData({...data, tDob:e.target.value})}/> 

<label htmlFor="">Qualification*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tQualification}
                                onChange={(e)=>setData({...data, tQualification:e.target.value})}/>

<label htmlFor="">Domicile*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tDomicile}
                                onChange={(e)=>setData({...data, tDomicile:e.target.value})}/>                               



<label htmlFor="">Permanent Address*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tPa}
                                onChange={(e)=>setData({...data, tPA:e.target.value})}/> 
<label htmlFor="">Postal / Current Address.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tCA}
                                onChange={(e)=>setData({...data, tCA:e.target.value})}/>  
<label htmlFor="">Tainee Contact No.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tContact}
                                onChange={(e)=>setData({...data, tContact:e.target.value})}/>        
<label htmlFor="">Emergency Contact No.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tEmgcontact}
                                onChange={(e)=>setData({...data, tEmgcontact:e.target.value})}/>                            
<label htmlFor="">Relation (with Emergency).*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tRelation}
                                onChange={(e)=>setData({...data, tRelation:e.target.value})}/>     


                        </div>
                        
                        
 <div className='flex flex-col w-6/12 bg-slate-50 rounded-tr-md px-14'>
                               
                                <label htmlFor="">Rank*</label>
                                

<select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.tRank}
                                onChange={(e)=>setData({...data, tRank:e.target.value})}
                                >
                                                <option value="">--Select--</option>
                                                
                                                <option  value="UT"> UT </option>
                                                <option  value="Probationer"> Probationer </option>
                                                <option  value="C/JPO "> C/JPO </option>
                                                <option  value="HC/APO"> HC/APO </option>
                                                <option  value="SI/PO"> SI/PO </option>
                                                <option  value="IP/SPO"> IP/SPO </option>
                                                <option  value="CPO/DSP"> CPO/DSP </option>
                                                
                                                
                                        </select>

                                <label htmlFor="">Belt No.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tBeltno}
                                onChange={(e)=>setData({...data, tBeltno:e.target.value})}/>
                                <label htmlFor="">Driving License*</label>
                                

<select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.tDL}
                                onChange={(e)=>setData({...data, tDL:e.target.value})}
                                >
                                                <option value="">--Select--</option>
                                                
                                                <option  value="Yes"> Yes </option>
                                                <option  value="No"> No </option>
                                                </select>
                                                

                                 <label htmlFor="">Driving License No.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tDLno}
                                onChange={(e)=>setData({...data, tDLno:e.target.value})}/>


                                                        

                                 <label htmlFor="">Driving License issuing Authority.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tDLissuedBy}
                                onChange={(e)=>setData({...data, tDLissuedBy:e.target.value})}/>

                                <label htmlFor="">Height*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tHeight}
                                onChange={(e)=>setData({...data, tHeight:e.target.value})}/>   

<label htmlFor="">Medical Fitness Certificate.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tMedical}
                                onChange={(e)=>setData({...data, tMedical:e.target.value})}/>  

<label htmlFor="">Date of Joining Government Service.*</label>
                                <input type="date" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tJoinService}
                                onChange={(e)=>setData({...data, tJoinService:e.target.value})}/>  

<label htmlFor="">Date of Joining (NHMP).*</label>
                                <input type="date" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tJoinNHMP}
                                onChange={(e)=>setData({...data, tJoinNHMP:e.target.value})}/>

<label htmlFor="">Date of Arrivat at NHMP College.*</label>
                                <input type="date" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tArrivalCollege}
                                onChange={(e)=>setData({...data, tArrivalCollege:e.target.value})}/>

<label htmlFor="">Professional Experience.*</label>
                                <input type="text" name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2' 
                                value={data.tExp}
                                onChange={(e)=>setData({...data, tExp:e.target.value})}/>

<label htmlFor="">Religion.*</label>
                        <select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.tReligion}
                                onChange={(e)=>setData({...data, tReligion:e.target.value})}
                                >
                                <option value="">--Select--</option>
                                <option  value="Muslim"> Muslim </option>
                                 <option  value="Christian"> Christian </option>
                                 <option  value="Sikh"> Sikh </option>
                                <option  value="Hindu"> Hindu </option>
                                 </select>
                                <label htmlFor="">Posting Zone / Office*</label>
                                <select name="" id="" className='h-10 border-b shadow-sm shadow-black rounded-sm pl-2'
                                value={data.tPosting}
                                onChange={(e)=>setData({...data, tPosting:e.target.value})}
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