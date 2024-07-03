"use client";
import React, { Children, useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { Edit, Router } from "lucide-react";
import adminApi from "@/lib/AdminApi";
import { set } from "react-hook-form";
import { IUser } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const route = useRouter();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    adminApi
      .getUserData()
      .then((res) => {
        const dataUser = res.data.data;
        setData(
          dataUser.map((user) => {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              password: user?.password,
              phoneNumber: Number(user.phoneNumber),
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reset]);

    // const handleDelete = (id: number) => {
    //     adminApi
    //         .deleteUser(id)
    //         .then(() => {
    //             window.location.reload()
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    return (

        <div className="container mx-auto py-10">
            <div className="font-extrabold text-2xl mt-6 "> Edit user</div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>PhoneNumber</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.password}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell className="text-right">

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button onClick={()=>{
                                        setName(item.name);
                                        setPassword(item.password);
                                        setEmail(item.email);
                                        setPhoneNumber(item.phoneNumber.toString());
                                    }}>Edit </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    
                                    <DialogHeader>
                                    <DialogTitle>Edit </DialogTitle>
                                    </DialogHeader>
                                    
                                    <div className="grid gap-4 py-4">
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                        Name
                                        </Label>
                                        <Input id="name" onChange={(e)=>{setName(e.target.value)}} className="col-span-3"value={name} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="password" className="text-right">
                                        password
                                        </Label>
                                        <Input id="password" onChange={(e)=>{setPassword(e.target.value)}} className="col-span-3" value={password} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="Email" className="text-right">
                                        Email
                                        </Label>
                                        <Input id="Email" onChange={(e)=>{setEmail(e.target.value)}} className="col-span-3" value={email} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phoneNumber" className="text-right">
                                        phoneNumber
                                        </Label>
                                        <Input id="phoneNumber" onChange={(e)=>setPhoneNumber(e.target.value)} className="col-span-3"value={phoneNumber} />
                                    </div>
                                    </div>
                                    <DialogFooter>
                                    <Button type="submit" onClick={()=>{
                                        adminApi.editUser({
                                            id: Number(item.id),
                                            name: name,
                                            password: password,
                                            email: email,
                                            phoneNumber: phoneNumber.toString()
                                        }).then(()=>{
                                            setReset(!reset);
                                        });
                                    }}>Save changes</Button>
                                    </DialogFooter>
                                   
                                </DialogContent>
                                
                            </Dialog>
                                <Button className="ml-4"
                                    // onClick={() => {
                                    //     adminApi
                                    //         .deleteUser(Number(item.id))
                                    //         .then(() => {
                                    //             setReset(!reset);
                                    //         });
                                    // }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table>
        </div>
    );
}
