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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import adminApi from "@/lib/AdminApi";
import { Payment } from "../edituser/columns";
import { Payment as Paymentclass } from "../editclass/columns";

const Page = () => {
  const [numberUsers, setNumberUsers] = useState(0)
  const [numberClasses, setNumberClasses] = useState(0)
 const [usersData, setUsersData] = useState<Payment[]>([])
  const [classesData, setClassesData] = useState<Paymentclass[]>([]);
  useEffect(() => {
    adminApi.getUserData().then((res) => {
        const numberOfUsers = res.data.data.length;
        setNumberUsers(numberOfUsers)
        const dataUser = res.data.data;
        setUsersData(
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

    
}, [numberUsers]);

useEffect(() => {
    adminApi.getClassData().then((res) => {
        const numberOfClasses = res.data.data.length;
        setNumberClasses(numberOfClasses)
        const dataClass = res.data.data;
        setClassesData(
          dataClass.map((classes) => {
            return {
              id: Number(classes.id),
              name: classes.name,
              hostId: Number(classes.hostId),
              images: classes.images,
              description: classes.description,
            };
          })
        );
    })
  }, [numberClasses]);

  return (
    <div className="">

      <Card className=" pl-4 pr-4 pt-4 pb-8 ml-4 mr-4 mt-4 mb-4 grid grid-rows-1 gap-0 ">
        <div className="font-extrabold text-2xl mt-6"> Dashboard</div>
        <div className=" grid grid-cols-4 ">

          <Card className="h-[100px] ml-2 mr-1 col-span-2">
            <CardHeader>
              <CardTitle className=" text-xl">Number of user</CardTitle>
              <CardDescription className="text-lg font-bold">
                {numberUsers}
              </CardDescription>
            </CardHeader>
          </Card>

          

          <Card className=" h-[100px] ml-2 mr-1 col-span-2">
            <CardHeader>
              <CardTitle className=" text-xl">Number of class</CardTitle>
              <CardDescription className="text-lg font-bold">
                {numberClasses}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-4">
          

          <Card className=" min-h-[500px] ml-2 mr-1">
            <CardHeader>
              <CardTitle className=" text-xl">Newest user</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">

                <thead className="mb-3">
                  <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Email</th>
                  </tr>
                </thead>

                <tbody className="">
                  {usersData.map((user,i) => 
                  <tr key={i} className="odd:bg-gray-100 py-3">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                  )}
                </tbody>  
              </table>
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Page;
