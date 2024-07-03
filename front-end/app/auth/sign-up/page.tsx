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
import SignUpForm from './SignupForm';
import Logo from '../../../assets/quiz-logo.png'
import Image from 'next/image';
// * email + password form
const page: FC = () => {
  let imgURl = "https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg?t=st=1713604418~exp=1713608018~hmac=426eab602178fc430ae9a9ff537b08413a98f6f4e218bab14c7b546bbc48af15&w=740"

  return <div className='bg-gradient-to-r from-purple-400 via-cyan-400 to-gray-400 w-screen h-screen flex'>
    <div className='w-3/5  h-auto container rounded-lg shadow-lg bg-white flex m-auto px-0 animate-[ping_0.5s_0s]'>
      <Card className='w-1/2 text-black bg-white border-none max-sm:w-full'>
          <CardHeader className='text-center'>
            <CardTitle>
              <Image src={Logo} alt="" className=" block h-20 w-20 mx-auto object-cover" />
            </CardTitle>
            <CardDescription>Create account</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>

          <CardFooter className='max-w-md w-full flex flex-col gap-3'>
            <p>Go back to <Link href="\auth\login" className='underline underline-offset-2'>Login</Link></p>
          </CardFooter>
      </Card>
    <img src={imgURl} className='w-1/2 object-cover rounded-r-lg max-sm:hidden' alt='login-picture'/>
    </div>
  </div>;
};

export default page;