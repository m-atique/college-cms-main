import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Searchbar = () => {
  return (
    <div className='flex flex-row'>
       <div className="grid grid-cols-4 items-center ">
              <Label className='bg-slate-300' >Student Id</Label>
              <Input
                className="col-span-2 h-8 rounded-sm border border-second"
              />
            </div>
            <div className="grid grid-cols-4 items-center ">
              <Label className='bg-slate-300' >Name</Label>
              <Input
                className="col-span-2 h-8 rounded-sm border border-second"
              />
            </div>
    </div>
  )
}

export default Searchbar