'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/veticalTabs"

export const StudentTabs =()=>{
    return(
    <Tabs defaultValue="account" className="w-[400px] flex flex-row">
    <TabsList>
    <TabsTrigger value="admission" className="block w-full"> Admission Detail</TabsTrigger>
    <TabsTrigger value="student" className="block w-full">Student Bio</TabsTrigger>
    <TabsTrigger value="father" className="block  w-full"> Father/Gaurdian Detail</TabsTrigger>
   
    </TabsList>
    <TabsContent value="admission">Admission Detail.</TabsContent>
    <TabsContent value="student">Student Bio</TabsContent>
    <TabsContent value="father">Father</TabsContent>
    </Tabs>
    )
}
