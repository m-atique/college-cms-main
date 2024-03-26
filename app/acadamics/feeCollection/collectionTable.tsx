"use client"

import * as React from "react"
import { BsThreeDots,BsFillCaretDownFill ,BsChevronDown } from "react-icons/bs";


import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useContext } from "react";



export type Payment = {
  studentId: string 
  admfee: number
  arrears: number
  name: string
  monthlyfee:  number
  paperfund:number
  fine:number,
  discount:number,
  labfee:number
  othersAmount:number
  othersType:string
  voucherNo:number
}




export const columns: ColumnDef<Payment>[] = [  
  {
    accessorKey: "voucherNo",
    header: "Vch.#",
  },{
    accessorKey: "studentId",
    header: "S.Id",

  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <BsFillCaretDownFill className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
 
  {
    accessorKey: "monthlyfee",
    header: "Monthly",

  },
  {
    accessorKey: "paperfund",
    header: "Exam Fee",

  },
  {
    accessorKey: "labfee",
    header: "Lab Fee",

  },
  {
    accessorKey: "admfee",
    header: "Exam Fee",

  },
  {
    accessorKey: "fine",
    header: "Fine",

  },
  
  {
    accessorKey: "othersAmount",
    header: "Others",

  },
  {
    accessorKey: "discount",
    header: "Discount",

  },
 

  {
    accessorKey: "total",
    header: () => <div className="text-right">NET PAYABLE</div>,
    cell: ({row}) => {
      const fee = parseInt(row.getValue("monthlyfee")?row.getValue("monthlyfee"):"0")+ parseInt(row.getValue("paperfund")?row.getValue("paperfund"):"0")+parseInt(row.getValue("labfee")?row.getValue("labfee"):"0")+ parseInt(row.getValue("admfee")?row.getValue("admfee"):"0")+parseInt(row.getValue("othersAmount")?row.getValue("othersAmount"):"0")+ parseInt(row.getValue("fine")?row.getValue("fine"):"0")-parseInt(row.getValue("discount")?row.getValue("discount"):"0")

      // Format the fee as a dollar fee
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "PKR",
      }).format(fee)
     
      return <div className="text-right font-medium"> Rs: {fee}/-</div>
    }
  },

 
  
  
]



export default function CollectionTable(props:any) {



  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
    const data = props.data
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-11/12 h-5/6">
      <div className="flex items-center py-3 gap-4 px-5 bg-slate-300 rounded-md mb-3">
      <Input
          placeholder="Filter Names..."
          value={(table.getColumn("studentId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("studentId")?.setFilterValue(event.target.value)
            
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <BsChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-second  text-slate-50 text-center text-sm border border-black">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader >
          <TableBody>
            
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="max-h-min bg-slate-200 text-center "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}  className=" border border-slate-500"
                    onClick={()=>props.getValue(cell.row.original)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      

                      )}
                      
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-10 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
         
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-1">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
