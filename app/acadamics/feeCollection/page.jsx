"use client";
import styles from "./page.module.css";

import React, { useEffect, useState ,useMemo,useContext} from "react";
import { ImBin2 } from "react-icons/im";
import { VscClearAll } from "react-icons/vsc";
import { IoMdSave, IoIosPeople } from "react-icons/io";
import { BsCashCoin } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import CollectionForm from "./collectionForm";
import CollectionTable from "./collectionTable";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import axios from "axios";
import { Selector } from "../../../components/ui/selector";
import { domainContext } from "@/app/datastore/dataprovider";
import { getmaxid } from "@/backend/login";

const FeeForm = () => {
  const ds = useContext(domainContext).base_url
  const today = new Date().toISOString().split("T")[0];

  const defaults = useMemo(() => ( {
    acId: "",
    voucherNo: "",
    amount: "",
    stDiscount: "",
    date: today,
    stFine: "",
    netAmount: "",
    paidAmount: "",
    intimePayable:"",
  }

  ),[today])
  const [data, setData] = useState(defaults);
  const [vouchers, setVouchers] = useState([]);

 

  //=============================


  const savePayment = async() => {
if(data.voucherNo && data.accountId && data.paidAmount){
  
    const ledId = await getmaxid("ledger","ledgerId")

    const ledgerEntry ={
      ledgerId : parseInt(ledId?ledId:0)+1 ,
      acId : data.accountId,
      date:today,
      voucherNo:data.voucherNo,
      entryType : "student fee",
      credit : data.paidAmount,
      fine:data.stFine?data.stFine:0,
      discount:data.stDiscount?data.stDiscount:0,
      debit:0,
      detail:`id # ${data.studentId} has paid  RS ${data.paidAmount} Student Monthly fee for  the  month ${data.month}  `
      

      }

    axios.patch(`${ds}/fee/payfee/${data.voucherNo}`).then(
      response=>{
        if(response.data == 'OK'){


          axios.post(`${ds}/acl/addledger`,ledgerEntry).then(
            response=>{
              if(response.data == 'OK'){
                alert("Fee Paid")
                setData(defaults)
              }

            }
          )

        }
      }
    )

  }}
  

  useEffect(() => {
    const getVoucherList = async () => {
      axios.get(`${ds}/fee/pending`).then((response) => {
        if (response.data.length > 0) {
          setVouchers(response.data);
        }
      });
    };
    getVoucherList();
    setData(defaults);
  }, [defaults,ds]);

  return (
    <div className="h-fit flex items-center justify-center p-2">
      <div className="shadow-lg shadow-slate-600 w-full h-full rounded-lg border border-second flex  flex-col items-center justify-start">
        <div className="flex  w-full p-2 bg-gradient-to-b from-second to-slate-500 rounded-t-md items-center justify-center text-2xl font-sans font-bold text-white ">
          <span className="flex drop-shadow-md shadow-black ">
            {" "}
            <FaMoneyCheckDollar className="size-8 mr-2" /> Fee Collection Form
          </span>{" "}
        </div>
        <div className=" h-full  grid grid-cols-12 items-start  justify-center  w-full p-1 ">
          <div className="grid col-span-9 p-2">
            <CollectionTable data={vouchers} getValue={setData} />
          </div>
          <div className="grid col-span-3 h-full bg-base rounded-sm ">
            <CollectionForm
              //=============voucher No
              voucherNo={data.voucherNo}
              setVoucher={(value) => setData({ ...data, voucherNo: value })}
              //=============secction
              amount={data.intimePayable}
              setamount={(value) => setData({ ...data, intimePayable: value })}
              //=============secction
              fine={data.stFine}
              setfine={(value) => setData({ ...data, stFine: value })}
              //=============secction
              discount={data.stDiscount}
              setdiscount={(value) => setData({ ...data, stDiscount: value })}
              //=============secction
              netAmount={
                
                parseInt(data.intimePayable?data.intimePayable:0)+
                parseInt(data.stFine?data.stFine:0)-
                parseInt(data.stDiscount?data.stDiscount:0) 
              
              }
              setnetAmount={(value) => setData({ ...data, netAmount: value })}
              //=============secction
              paidAmount={data.paidAmount}
              setpaidAmount={(value) => setData({ ...data, paidAmount: value })}
            />

            <div className="flex flex-row flex-wrap gap-2 w-full items-center justify-center py-3">
              <button
                className="bg-second text-white rounded-sm w-2/5 p-2"
                onClick={() => setData(defaults)}
              >
                Clear
              </button>
              <button
                className="bg-second text-white rounded-sm w-2/5 p-2"
                onClick={() => savePayment()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeForm;
