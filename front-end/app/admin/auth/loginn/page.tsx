'use client';
import React, { FC } from 'react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Page: FC = () => {
    const router = useRouter();

  const handleLogin = () => {
    const username = "admin";
    const password = "123";

    // Check if the entered username and password are correct
    if (username === "admin" && password === "123") {
      // Redirect to a different page after successful login
      localStorage.setItem("admin","accessed");
      router.push("/admin/mainmenu/dashboard");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className='bg-gradient-to-r from-cyan-400 via-gray-400 to-purple-400 w-screen h-screen flex'>
      <div className='w-[550px] h-auto container rounded-lg shadow-lg bg-white flex m-auto px-0'>
        <Card className="w-[550px]">
          <CardHeader>
            <CardTitle>Admin login</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;