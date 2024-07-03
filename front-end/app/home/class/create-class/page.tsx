"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CreateCollectionInput from "@/components/Input/CreateCollectionInput";
import Plus from "@/components/Svg/Plus";
import WordEditCard from "@/components/Collection/WordEditCard";
import { Label } from "@radix-ui/react-dropdown-menu";
import { api_class } from "@/config/axios.config";
import { useRouter } from "next/navigation";
import classApi from "@/lib/ClassApi";
interface IClassInfo {
  name: string;
  images: string;
}

export interface ICreateClassRequest {
  userId: string;
  classInfo: IClassInfo;
}

const Page = () => {
  const route = useRouter()
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserId(String(localStorage.getItem("user")));
    }
  }, []);
  const [classImg, setClassImg] = useState<string>();
  const [className, setClassName] = useState<string>();

  const createClass = (input: ICreateClassRequest) => {
    classApi
      .createClass(input)
      .then((res) => {
        route.push(`/home/class/${res.data.data.hosted.pop().id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="px-16 py-10">
      <h1 className="font-black text-4xl mb-10">Create New Class</h1>
      <div className="w-1/2 flex flex-col gap-7 mb-10">
        <div>
          <div className="mb-2 w-full border-b-2 border-gray-600">
            <input
              className="hidden"
              type="file"
              id="image-upload"
              name="image-upload"
            />
            <CldUploadWidget
              uploadPreset="tniqb9sb"
              onSuccess={(results: any) => {
                setClassImg(results.info.public_id);
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    className=" mb-4 bg-cyan-300 font-bold rounded-lg text-black px-4 py-2 cursor-pointer hover:bg-blue-300 transition-colors duration-200 inline-block"
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                  >
                    Upload
                  </Button>
                );
              }}
            </CldUploadWidget>
          </div>
          <Label className="mt-2 block text-xs text-gray-400 font-medium uppercase tracking-wider">
            Avatar
          </Label>
        </div>
        <div>
          <Input
            type="text"
            className="focus:border-cyan-500"
            onChange={(e) => {
              setClassName(e.target.value);
            }}
          ></Input>
          <Label className="block text-xs text-gray-400 font-medium uppercase mt-4 tracking-wider">
            Class&apos;s name
          </Label>
        </div>
        {/* <div>
          <Input type="text" className="focus:border-cyan-500"></Input>
          <Label className="block text-xs text-gray-400 font-medium uppercase mt-4 tracking-wider">
            Class's name
          </Label>
        </div> */}
        {/* <div>
          <Input type="text" className="focus:border-cyan-500"></Input>
          <Label className="block text-xs text-gray-400 font-medium uppercase mt-4 tracking-wider">
            Class's name
          </Label>
        </div> */}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-end w-full">
          <button
            className="px-5 py-3 bg-cyan-300 rounded-lg font-bold hover:bg-cyan-400"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              userId &&
                classImg &&
                className &&
                createClass({
                  userId: userId,
                  classInfo: {
                    name: className,
                    images: classImg,
                  },
                });
            }}
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
