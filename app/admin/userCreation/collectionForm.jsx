'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'





const CollectionForm = (props) => {
  
  return (
    <div>
        <div className ='w-full p-1 flex flex-col gap-4 justify-center h-full'>
            {/* ============================voucher=================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Name
    </div>
    
    <div className="grid col-span-4">
      <input 
       value={props.voucherNo}
       onChange={(e) => props.setvoucherNo(e.target.value)}
        type="text" className= {`${styles.input} w-3/4 `} 
      
      
      />
    </div>
    
    </div>
    {/* ============================ END Fee Month=================== */}

    {/* ============================FEE CLASS================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Role
    </div>
    
    <div className="grid col-span-4 ">
    <input 
  
    value={props.amount}
    onChange={(e) => props.setamount(e.target.value)} type="text" className= {`${styles.input} w-3/4 `} readOnly/>
    </div>
    
    </div>
    {/* ============================ END Class=================== */}

    {/* ============================Section================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}>
    Discount
    </div>
    
    <div className="grid col-span-4 ">
    <input value={props.discount}
    onChange={(e) => props.setdiscount(e.target.value)} type="text" className= {`${styles.input} w-3/4 `} />
    </div>
    
    </div>
    {/* ============================ END Section================== */}


    {/* ============================ > Due Date================== */}
    <div className="grid grid-cols-6 p-1">
    
    <div className= {` ${styles.label}  `}> Status
    </div>
    
    <div className="grid col-span-4">
      <input value={props.paidAmount}
    onChange={(e) => props.setpaidAmount(e.target.value)}
     type="text" className= {`${styles.input} w-3/4  `} />
    </div>
    
    </div>
        </div>
    </div>
  )
}

export default CollectionForm