"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LinkProps } from "next/link"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number
  name: string
  images: string
  hostId: number
  description: string
  
}

export const columns: ColumnDef<Payment>[] = [
  
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "images",
    header: "image",
  },
  {
    accessorKey: "hostId",
    header: "host id",
  },

  {
    id: "Actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <div className="flex justify-self-center">
        <div className="mr-4">
          <Dialog>
      <DialogTrigger asChild>
        <Button >Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit </DialogTitle>
          <DialogDescription>
         
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Id
            </Label>
            <Input id="id" value="id" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input id="image" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hostid" className="text-right">
              Host Id
            </Label>
            <Input id="hostid" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </div>
        <div>
          <Button onClick={() => router.push('/admin/mainmenu/editclass')}>Delete</Button>
        </div>
        </div>
        
      )
    },
  },

  

]
