'use client';
import React, { FC, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import ProfileForm from './loginForm';
import Image from 'next/image';
// * email + password form
const page: FC = () => {
  let imgURl = "https://img.freepik.com/free-photo/cute-puppy-sitting-outdoors-looking-camera-surrounded-by-flowers-generated-by-artificial-intelligence_188544-84977.jpg?t=st=1713540957~exp=1713544557~hmac=a159e3531eb071cae1c7eaae258fde8f7b509b32d46ee0388dc19a9d83a88ce6&w=2000"

  return <div className='bg-gradient-to-r from-cyan-400 via-gray-400 to-purple-400 w-screen h-screen flex'>
    <div className='w-3/5  h-auto container rounded-lg shadow-lg bg-white flex m-auto px-0'>
      <Card className='w-1/2 text-black bg-white border-none'>
          <CardHeader className='text-center'>
            <CardTitle>
            </CardTitle>
            <CardDescription className='font-semibold text-lg'>Admin Login</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>

      </Card>
    </div>
  </div>;
};

export default page;
