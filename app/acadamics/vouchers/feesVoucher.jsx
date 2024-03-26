"use client"
import React, { use, useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import logo from '../../../public/logo.png'


const FeeVoucherSheet = React.forwardRef((props, ref) => {
  const params = useSearchParams()
  const voucherDetail  = params.get("voucherparams");
 const voucherData = JSON.parse(voucherDetail) 
 const [vouchers,setvouchers] =useState()



 useEffect(()=>{
  const getVoucherData=()=>{
    axios.get(`http://localhost:5010/fee/getfv/${voucherData.vgNo}`).then(
      response=>{
        setvouchers(response.data)
      }
    )
   }
  getVoucherData()
 },[voucherData.vgNo])

  return (
    <div ref={ref} className="p-2">
      
      {vouchers?.map((item,index) => (
        <div key={index} className="w-[205mm] h-[94mm] border border-black m-2 mb-4 p-1 ">
          <div className="boder-2 border-black  w-full  h-full  p-1">
            <div className="grid grid-cols-12 ">
              <div className="grid col-span-6 border border-slate-800  ">
                <div className=" items-center justify-center w-full flex">

                  <Image src={logo} alt = "logo" className="w-10 h-10 mr-2" />
                  <div className="">
                  <div className=" font-extrabold text-lg text-center font-sans  ">
                    SAPPHIRE SCHOOL OF LEARNING
                  </div>

                  <div className="  font-sans text-xs font-bold text-center flex ">
                    FEROZWATTOAN SHEIKHUPURA <p className=" text-[8px] rounded-sm px-1 ml-4 border border-slate-800">Office Copy</p>
                  </div>
                  </div>
                </div>
                <div className=" text-extrabold font-sans gap-1 border-b-2 border-black ">
                  <div className="text-xs flex  justify-between  p-1 bg-slate-200 font-bold">
                    <div className="w-fit text-start border border-black px-1 rounded-sm">
                      {" "}
                      <b>S.No</b> {item.voucherNo}
                    </div>
                    <div className="w-fit text-start">
                      {" "}
                      <b>Issue Date</b> {item.duedate.split("T")[0].split("-").reverse().join("-")}
                    </div>
                    <div className="w-fit text-start">
                      {" "}
                      <b>Due Date</b> {item.duedate.split("T")[0].split("-").reverse().join("-")}
                    </div>
                  </div>
                  <div className="text-xs flex  justify-between px-2">
                    <div className="w-4/6 text-start">
                      {" "}
                      <b>Name</b> {item.name.toUpperCase()} <span className="border border-black px-1  rounded-sm">Id-{item.studentId}</span>
                    </div>
                    <div className="w-2/6 text-start">
                      {" "}
                      <b>Class</b> {voucherData.class.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-xs flex  justify-between px-2">
                    <div className="w-4/6 text-start">
                      {" "}
                      <b>F.Name</b> {item.father.toUpperCase()}
                    </div>

                    <div className="w-2/6 text-start">
                      {" "}
                      <b>Section</b> {voucherData.section.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Admission Fee</div>{" "}
                  <div className="w-4/12 text-end">{item.admfee}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Tuition Fee</div>{" "}
                  <div className="w-4/12 text-end">{item.monthlyfee}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Lab Charges</div>{" "}
                  <div className="w-4/12 text-end">{item.labfee}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Exam Fee</div>{" "}
                  <div className="w-4/12 text-end">{item.paperfund}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-10/12 over flow overflow-hidden"> Other Charges({item.othersType})</div>{" "}
                  <div className="w-2/12 text-end">{item.othersAmount}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-w-6/12"> Fine</div>{" "}
                  <div className="w-4/12 text-end">{item.fine}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12"> Arrears</div>{" "}
                  <div className="w-4/12 text-end">{item.arrears}</div>
                </div>

                <div className="text-sm font-bold bg-slate-200 border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">
                    {" "}
                    Net Payable Before Due Date
                  </div>{" "}
                  <div className="w-4/12 text-end">{item.monthlyfee + item.admfee+item.labfee+item.fine+item.paperfund+item.othersAmount+item.arrears}</div>
                </div>
                <div className="text-sm font-bold bg-slate-200 border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12"> Net Payable After Due Date</div>{" "}
                  <div className="w-4/12 text-end">{item.monthlyfee + item.admfee+item.labfee+item.fine+item.paperfund+item.othersAmount+item.arrears +200}</div>
                </div>
              </div>
              <div className="grid col-span-6 border border-slate-800  ">
                <div className=" items-center justify-center w-full flex">

                  <Image src={logo} alt="School logo" className="w-10 h-10 mr-2" />
                  <div className="">
                  <div className=" font-extrabold text-lg text-center font-sans  ">
                    SAPPHIRE SCHOOL OF LEARNING
                  </div>

                  <div className="  font-sans text-xs font-bold text-center flex ">
                    FEROZWATTOAN SHEIKHUPURA <p className=" text-[8px] rounded-sm px-1 ml-4 border border-slate-800">STUDENT COPY</p>
                  </div>
                  </div>
                </div>
                <div className=" text-extrabold font-sans gap-1 border-b-2 border-black ">
                  <div className="text-xs flex  justify-between  p-1 bg-slate-200 font-bold">
                    <div className="w-fit text-start border border-black px-1 rounded-sm">
                      {" "}
                      <b>S.No</b> {item.voucherNo}
                    </div>
                    <div className="w-fit text-start">
                      {" "}
                      <b>Issue Date</b> {item.duedate.split("T")[0].split("-").reverse().join("-")}
                    </div>
                    <div className="w-fit text-start">
                      {" "}
                      <b>Due Date</b> {item.duedate.split("T")[0].split("-").reverse().join("-")}
                    </div>
                  </div>
                  <div className="text-xs flex  justify-between px-2">
                    <div className="w-4/6 text-start">
                      {" "}
                      <b>Name</b> {item.name.toUpperCase()} <span className="border border-black px-1  rounded-sm">Id-{item.studentId}</span>
                    </div>
                    <div className="w-2/6 text-start">
                      {" "}
                      <b>Class</b> {voucherData.class.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-xs flex  justify-between px-2">
                    <div className="w-4/6 text-start">
                      {" "}
                      <b>F.Name</b> {item.father.toUpperCase()}
                    </div>

                    <div className="w-2/6 text-start">
                      {" "}
                      <b>Section</b> {voucherData.section.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Admission Fee</div>{" "}
                  <div className="w-4/12 text-end">{item.admfee}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Tuition Fee</div>{" "}
                  <div className="w-4/12 text-end">{item.monthlyfee}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Lab Charges</div>{" "}
                  <div className="w-4/12 text-end">{item.labfee}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">Exam Fee</div>{" "}
                  <div className="w-4/12 text-end">{item.paperfund}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-10/12 over flow overflow-hidden"> Other Charges({item.othersType})</div>{" "}
                  <div className="w-2/12 text-end">{item.othersAmount}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-w-6/12"> Fine</div>{" "}
                  <div className="w-4/12 text-end">{item.fine}</div>
                </div>
                <div className="text-sm border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12"> Arrears</div>{" "}
                  <div className="w-4/12 text-end">{item.arrears}</div>
                </div>

                <div className="text-sm font-bold bg-slate-200 border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12">
                    {" "}
                    Net Payable Before Due Date
                  </div>{" "}
                  <div className="w-4/12 text-end">{item.monthlyfee + item.admfee+item.labfee+item.fine+item.paperfund+item.othersAmount+item.arrears}</div>
                </div>
                <div className="text-sm font-bold bg-slate-200 border-b  border-slate-400 flex justify-between px-2">
                  {" "}
                  <div className="w-8/12"> Net Payable After Due Date</div>{" "}
                  <div className="w-4/12 text-end">{item.monthlyfee + item.admfee+item.labfee+item.fine+item.paperfund+item.othersAmount+item.arrears +200}</div>
                </div>
              </div>
             
             
             

              <div className="grid col-span-12 font-sm font-sans">
                <div>
                  <span className="font-bold">Note:- </span> {item.msg}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
FeeVoucherSheet.displayName="FeeVoucherSheet"
export default FeeVoucherSheet;
