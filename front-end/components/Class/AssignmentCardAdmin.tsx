import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { api_class } from "@/config/axios.config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FakePostData } from "@/API/FakeData";
import Class from "@/components/Svg/Class";
import Plus from "@/components/Svg/Plus";
import Three_dot from "@/components/Svg/Three_dot";
import Addmember from "@/components/Svg/Addmember";
import CreateCollectionInput from "@/components/Input/CreateCollectionInput";
import Send from "@/components/Svg/Send";
import School from "@/components/Svg/School";
import FlashCard from "@/components/Svg/FlashCard";
import { PlusIcon, Route, User } from "lucide-react";
import { FakeClassData } from "@/API/FakeData";
import classApi, { IClass, IClassDetails } from "@/lib/ClassApi";
import ClassCard from "@/components/Class/ClassCard";
import authApi from "@/lib/authApi";
import Image from "next/image";
import errorImg from "../../../../assets/404.png";
import { useRouter } from "next/navigation";
import classImage from "../../../../assets/class.png";
import CollectionRow from "@/components/Class/CollectionRow";
import { IAssigment } from "@/lib/ClassApi";
import { format } from "date-fns";

function AssignmentCardAdmin({ assignment }: { assignment: IAssigment }) {
  const { id, question, description } = assignment;

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <Avatar className="mr-2 ">
              <AvatarImage
                //   src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <div className="text-1xl">{assignment.question}</div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>{assignment.description}</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <div className="ml-auto grid">
              <Button className="justify-self-end mx-8 rounded-lg px-5 py-2 bg-cyan-400 hover:bg-cyan-300 font-semibold text-sm">
                Edit Assingment
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Assignment</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Question
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Due
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Description
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between">
        Due at {format(assignment.due, "PPP")}
      </CardFooter>
    </Card>
  );
}

export default AssignmentCardAdmin;
