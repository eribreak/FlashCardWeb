"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Logo from "../../assets/quiz-logo.png";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();
  const [searching, setSearching] = useState<string>();
  

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userData") as string))
  },[])


  useEffect(() => {
    searching && router.push(`/home/Searching?q=${searching}`);
  }, [searching]);

  return (
    <>
      <div className="w-screen fixed top-0 z-50 bg-white">
        <div className="h-full w-full shadow-sm flex justify-between items-center align-baseline px-10">
          <div className="h-full flex gap-1 items-center select-none col-span-2">
            <Image src={Logo.src} alt="" className=" block" width={100} height={60}/>

            <Button variant="link" className="font-bold">
              {" "}
              <Link href="/home">Home</Link>
            </Button>
            <Button variant="link" className="font-bold">
              {" "}
              {userInfo && <Link href="/home/user-library">Library</Link> }
            </Button>
          </div>

          <form className="relative flex w-full max-w-[30rem]">
            <Input
              type="text"
              placeholder="Study sets, class"
              className="rounded-full placeholder:font-medium"
              onChange={(e) => {
                setSearching(e.target.value);
              }}
            />
            <Button
              type="submit"
              size="sm"
              disabled={false}
              className="!absolute right-2 top-[3px] rounded-full flex items-center justify-center bg-gray-700"
            >
              <MagnifyingGlassIcon className=" text-lg text-white h-4 w-4 " />
            </Button>
          </form>

          <div className="flex gap-8">
            <div className="flex gap-6">
              <Button
                className="w-auto"
                onClick={() => {
                    if(userInfo) {
                      router.push("/home/collection/create")
                    } else {
                      router.push('/auth/login')
                    }
                  }
                }
              >
                <PlusIcon className=" text-lg text-white h-4 w-4 mr-2"/>
                Create collection
              </Button>
              <Button
                className="w-auto"
                onClick={() => {
                    if(userInfo) {
                      router.push("/home/class/create-class")
                    } else {
                      router.push('/auth/login')
                    }
                  }
                }
              >
                Create class
              </Button>
            </div>

            <div className="flex justify-start items-center">
              {userInfo ?  
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    color="blue-gray"
                    className=" rounded-full h-10 w-10 bg-blue-100/20 py-0 pr-0 pl-0 "
                  >
                    <User className=" h-10 w-10 text-blue-300 fill-blue-300  rounded-full p-1.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span
                        onClick={() => router.push("/home/profile/profile")}
                      >
                        Profile
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                          localStorage.removeItem("userData");
                          localStorage.removeItem("user");
                          router.push('/auth/login')
                        }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>
                        <button>Log out</button>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              : <Link href={'/auth/login'} className="bg-yellow-400 px-5 py-2 rounded-md font-medium text-sm">Sign in</Link>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
