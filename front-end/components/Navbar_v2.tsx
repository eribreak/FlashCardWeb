"use client"
import React, {useState} from 'react';
import Logo from './quiz-logo.png';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const NavBar_v2 = () => {
const router = useRouter();


  return (
    <>
      <div className="w-full  fixed top-0 z-50 bg-white">
        <div className="h-full w-full shadow-md grid grid-cols-5 items-center justify-center align-baseline">
          <div className="pl-10 h-full flex gap-1 items-center select-none col-span-2">
            <img src={Logo.src} alt="" className=" block h-20" />

            <Button variant="link" className="font-bold">
              {' '}
              <Link href="/home">Home</Link>
            </Button>
            <Button variant="link" className="font-bold">
              {' '}
              <Link href="/home/user-library">Library</Link>
            </Button>
          </div>

          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="text"
              placeholder="Study sets, class"
              className="rounded-full"
        
            />
            <Button
              size="sm"
              disabled={false}
              className="!absolute right-1 top-[3px] rounded-full flex items-center justify-center bg-gray-700"
              >
              <MagnifyingGlassIcon className=" text-lg text-white h-4 w-4 " />
            </Button>
          </div>

          <div className="flex justify-center items-center">
            <Button onClick={() => router.push('/home/collection/create')} >Create collection</Button>
          </div>

          <div className="flex justify-start items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  color="blue-gray"
                  className=" rounded-full h-10 w-10 bg-blue-100/20 py-0 pr-0 pl-0 ">
                  <User className=" h-10 w-10 text-blue-300 fill-blue-300  rounded-full p-1.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span><Link href="\Login">Log out</Link></span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar_v2;