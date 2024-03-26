import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Extrafee(props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-second text-white rounded-sm w-2/5 p-2"
        >
          Add Funds
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 ml-5 shadow-lg border border-black shadow-slate-800">
        <div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none"> Additional Fee</h4>
              <p className="text-sm text-muted-foreground">
                Add additional fees and save
              </p>
            </div>
            <div className="grid gap-2 ">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Adms.Fee</Label>
                <Input className="col-span-2 h-8 border-second" 
                 value={props.admfee}
                 onChange={(e) => props.setadmfee(e.target.value)}/>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Lab Charges</Label>
                <Input className="col-span-2 h-8 border-second"
                 value={props.labfee}
                 onChange={(e) => props.setlabfee(e.target.value)} />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Exam Fee</Label>
                <Input
                  className="col-span-2 h-8 border-second"
                  value={props.paperfund}
                  onChange={(e) => props.setpaperfund(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Others Type</Label>
                <Input
                  className="col-span-2 h-8 border-second"
                  value={props.otherstype}
                  onChange={(e) => props.setotherstype(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Others Amount</Label>
                <Input
                  className="col-span-2 h-8 border-second"
                  value={props.othersamount}
                  onChange={(e) => props.setothersamount(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Fine</Label>
                <Input
                  className="col-span-2 h-8 border-second"
                  value={props.fine}
                  onChange={(e) => props.setfine(e.target.value)}
                />
              </div>

              {/* <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Workbook Fund </Label>
                <Input
                  className="col-span-2 h-8 rounded-sm"
                  value={props.workbookfund}
                  onChange={(e) => props.setworkbookfund(e.target.value)}
                />
              </div> */}

              <div className="flex gap-2 justify-end w-full">

            
            <button onClick={props.clear}
            className='bg-slate-500 text-white rounded-sm w-2/5 p-1 text-xs' >Clear</button>
            </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
