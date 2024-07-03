import Addmember from "@/components/Svg/Addmember";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const Addstudent = () => {
  const [open, setopen] = useState<boolean>(false);
  const [emails, setemails] = useState<string[]>(["aas@gmail.com"]);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <button className="py-auto px-3 border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
          <div className="m-auto">
            <Addmember />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="mb-5">
            <Label className="w-[120px] mb-5 text-1xl font-bold">
              Student email:
            </Label>
            <Input type="text" placeholder="code" />
          </div>
        </div>
        {emails?.map((email, index) => (
          <div className="mb-5" key={index}>
            <Button
              className="w-[120px] mb-5 text-1xl font-bold"
              variant={"outline"}
            >
              {email}
            </Button>
          </div>
        ))}
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Addstudent;
