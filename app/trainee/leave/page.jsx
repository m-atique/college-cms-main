"use client";

import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import styles from './page.module.css'
import bg from '../../../public/leavebg.jpg'

const AddLeave = () => {
  const defaults = {
    traineeId: "",
    startDate: "",
    endDate: "",
    days: "",
    reason: "",
    leaveType: "",
    remarks: "",
    approvedBy: "",
    addedBy: "",
    addedDate: "",
  };
  const [data, setData] = useState(defaults);

  function caluclationDate(s, e) {
    let st = new Date(s);
    let end = new Date(e);
    let Difference_In_Time = end.getTime() - st.getTime();

    let res = Math.round(Difference_In_Time / (1000 * 3600 * 24) + 1);
    data.days = res;
    console.log(res + "dfsdfd" + data.days);
  }
  // const [ReceivedItemArray, setArray] = useState([]);
  // const d = toISOString().split('T')[0]
  function add() {
    if (data.traineeId === "") {
      alert("Please Enter Trainee ID");
    } else if (data.startDate === "") {
      alert("Please enter Start Date");
    } else if (data.endDate === "" || data.endDate < data.startDate) {
      alert(
        "Please enter end Date or Date should not be less then or equal to start Date"
      );
    } else if (data.endDate !== "" || data.endDate > data.startDate) {
      console.log("wwwwwwwwwwwwwwwww");
      caluclationDate(data.startDate, data.endDate);
    } else if (parseInt(data.days) < 1) {
      alert("Days issue");
    } else if (data.reason === "") {
      alert("Please enter reason");
    } else if (data.leaveType === "") {
      alert("Please select Type of Leave");
    } else if (data.approvedBy === "") {
      alert("Please select Approved Authority");
    } else {
      axios
        .post("http://localhost:5000/leave/addleave", data)
        .then((response) => {
          if (response) {
            console.log(response.data.message);

            setData(defaults);
            alert("Data has been added Successfully");
          } else {
            alert("not working");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function reset() {
    setData(defaults);
  }

  return (
    <div className="bg-[url('../public/leavebg.jpg')] bg-cover  border w-full h-4/5 m-auto p-2 items-center flex flex-col pb-10">
      <div className="flex flex-row justify-center items-center w-4/12 p-4 gap-2 translate-y-5 rounded-md  border-2 bg-yellow-300 border-[#092470] shadow-md shadow-slate-900">
        <FaCalendarAlt
          size={30}
          color="
#2E146B"
        />
        <h1 className=" text-transparent bg-gradient-to-br from-purple-800 to-green-800 bg-clip-text  rounded-md  text-center font-bold text-2xl">
          Trainee Leaves Record
        </h1>
      </div>
      <div className="flex flex-row w-full items-center justify-center ">
        <div className="flex flex-col    w-7/12  bg-slate-600 shadow-2xl border-slate-700 border bg-opacity-80 shadow-white px-28 py-5 rounded-lg">
          <label htmlFor="tid" className={styles.label}>
            {" "}
            Trainee Reg.No*
          </label>
          <input
            type="text"
            name=""
            id="tid"
            className="h-10 border-b shadow-sm shadow-black rounded-sm w-2/5 pl-2"
            value={data.traineeId}
            onChange={(e) => setData({ ...data, traineeId: e.target.value })}
          />
<div className="flex gap-4 py-2 w-full">

<div className="flex flex-col w-2/4">
          <label htmlFor="" className={styles.label}>From*</label>
          <input
            type="date"
            name=""
            id="tid"
            className="h-10  border-b shadow-sm shadow-black rounded-sm px-2"
            value={data.startDate}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
          />
</div>
<div className="flex flex-col w-2/4">
          <label htmlFor="" className={styles.label}>To*</label>
          <input
            type="date"
            name=""
            id="tid"
            className="h-10 border-b shadow-sm shadow-black rounded-sm px-2"
            value={data.endDate}
            onChange={(e) => setData({ ...data, endDate: e.target.value })}
          />
</div>
</div>

<div className="flex gap-4 py-2 w-full">


<div className="flex flex-col w-2/4">

<label htmlFor="leaveType" className={styles.label}>Leave Type*</label>
          <select
            name=""
            id="leaveType"
            className="h-10 border-b shadow-sm shadow-black rounded-sm pl-2"
            value={data.leaveType}
            onChange={(e) => setData({ ...data, leaveType: e.target.value })}
          >
            <option value="">--Select--</option>
            <option value="Short Leave">Short Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Medical Leave">Medical Leave</option>
          </select>
         
</div>
<div className="flex flex-col w-2/4">
          <label htmlFor="days" className={styles.label}> Days*</label>
          <input
            type="number"
            name=""
            id="days"
            min={1}
            className="h-10 border-b shadow-sm shadow-black rounded-sm px-2 "
            value={data.days}
            onChange={(e)=>setData({...data, days:e.target.value})}
          />
</div>
</div>
<label htmlFor="reason" className={styles.label}>Reason*</label>
          <textarea
            id="reason"
            className="h-20 border-b shadow-sm shadow-black rounded-sm px-2 resize-none"
            value={data.reason}
            onChange={(e) => setData({ ...data, reason: e.target.value })}
          ></textarea>
        

          <label htmlFor="remarks" className={styles.label}>Remarks (if any)</label>
          <textarea
            id="remarks"
            className="h-20 border-b shadow-sm shadow-black rounded-sm p-2 resize-none"
            value={data.remarks}
            onChange={(e) => setData({ ...data, remarks: e.target.value })}
          ></textarea>



<div className="flex gap-4 py-2 w-full ">
<div className="flex flex-col w-2/4">
          <label htmlFor="orderBy" className={styles.label}>Approved By*</label>
          <select
            name=""
            id="order_by"
            className="h-10 border-b shadow-sm shadow-black rounded-sm px-2"
            value={data.approvedBy}
            onChange={(e) => setData({ ...data, approvedBy: e.target.value })}
          >
                
            <option value="" >--Select--</option>
            <option value="Deputy Commandant">SP / Deputy Commandant</option>
            <option value="Commandant">DIG / Commandant</option>
           
          </select>
          </div>
<div className="flex gap-5 sm:w-2/4   items-end justify-end">
        
        
            <input
              type="reset"
              value="Reset"
              className="h-10  shadow-lg shadow-slate-900 w-2/5 rounded-md bg-yellow-500 text-[#092470] font-bold cursor-pointer p-2 hover:scale-105 hover:text-black"
              onClick={() => reset()}
            />
            <input
              type="submit"
              value="Save"
              className="h-10 w-2/5  shadow-lg shadow-slate-800  rounded-sm bg-[#092470] text-white p-2 cursor-pointer hover:scale-105 hover:text-yellow-200"
              onClick={() => add()}
            />
         
          </div>
          </div>

        </div>
        {/* <div className='flex flex-row w-4/12 bg-slate-300 rounded-tr-md'>
                                <h2>Selected Trainee Information</h2>
                        </div> */}
      </div>
    </div>
  );
};
export default AddLeave;

