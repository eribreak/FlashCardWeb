import { Copy, SquarePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import classApi from "@/lib/ClassApi";
export function CreateAssignment({
  hostId,
  classId,
}: {
  hostId: string;
  classId: string;
}) {
  const [due, setDue] = React.useState<Date>();
  const [question, setquestion] = useState<string>();

  const [open, setopen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-lg my-4 px-5 py-2 bg-cyan-400 hover:bg-cyan-300 font-semibold text-sm "
          variant="outline"
        >
          Create assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new assignment</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="question" className="sr-only">
              Question
            </Label>
            <Input
              id="question"
              onChange={(e) => {
                setquestion(e.target.value);
              }}
              value={question ? question : ""}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    " justify-start text-left font-normal",
                    !due && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {due ? format(due, "PPP") : <span>Pick a due</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={due}
                  onSelect={setDue}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              question &&
                due &&
                classApi
                  .createAssignment(hostId, classId, {
                    question,
                    due: due.toISOString(),
                  })
                  .then(() => {
                    setDue(undefined);
                    setquestion(undefined);
                    setopen(false);
                  });
            }}
          >
            <span className="sr-only">create</span>
            <SquarePlus />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
