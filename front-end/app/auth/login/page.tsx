'use client';
import React, { FC, useState } from 'react';
import LoginImg from "../../../assets/international-day-education-cartoon-style-with-stack-books.jpg"
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
import Logo from '../../../assets/quiz-logo.png'
// * email + password form
const page: FC = () => {
  let imgURl = "https://img.freepik.com/free-photo/cute-puppy-sitting-outdoors-looking-camera-surrounded-by-flowers-generated-by-artificial-intelligence_188544-84977.jpg?t=st=1713540957~exp=1713544557~hmac=a159e3531eb071cae1c7eaae258fde8f7b509b32d46ee0388dc19a9d83a88ce6&w=2000"

  return <div className='bg-gradient-to-r from-cyan-400 via-gray-400 to-purple-400 w-screen h-screen flex'>
    <div className='w-3/5  h-auto container rounded-lg shadow-lg bg-white flex m-auto px-0'>
      <Card className='w-1/2 text-black bg-white border-none'>
          <CardHeader className='text-center'>
            <CardTitle>
              <Image src={Logo} alt="" className=" block h-20 w-20 mx-auto object-cover" />
            </CardTitle>
            <CardDescription className='font-semibold text-lg'>Member Login</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>

          <CardFooter className='max-w-md w-full flex flex-col gap-3'>
            <Link href="\auth\sign-up" className='bg-white font-semibold shadow rounded-full px-16 py-2 border-cyan-500 border-2 hover:bg-cyan-500 hover:text-white'>Đăng ký</Link>
            <Link href="\auth\forgotpassword" className='underline underline-offset-2'>Quên mật khẩu ?</Link>
          </CardFooter>
      </Card>
    <Image src={LoginImg} className='w-1/2 object-cover rounded-r-lg ' alt='Quiz'/>
    </div>
  </div>;
};

export default page;
