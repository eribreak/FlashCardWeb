"use client";

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
import classApi, { IAnswer, IClass, IClassDetails } from "@/lib/ClassApi";
import ClassCard from "@/components/Class/ClassCard";
import authApi from "@/lib/authApi";
import Image from "next/image";
import errorImg from "../../../../assets/404.png";
import { useRouter } from "next/navigation";
import classImage from "../../../../assets/class.png";
import CollectionRow from "@/components/Class/CollectionRow";
import AssignmentCard from "@/components/Class/AssignmentCard";
import AssignmentCardAdmin from "@/components/Class/AssignmentCardAdmin";
import AnswerCard from "@/components/Class/AnswerCard";
import { format } from "date-fns";
import { CreateAssignment } from "./CreateAssignment";
import Addstudent from "./Addstudent";
const Page = ({ params }: { params: { classId: string } }) => {
  const route = useRouter();
  const [currentClass, setcurrentClass] = useState<{
    hostID: number;
    id: number;
    className: string;
    description: string;
  }>(FakeClassData[Number(params.classId)]);

  const [requested, setRequested] = useState<boolean>(false);
  const [classDetails, setclassDetails] = useState<IClassDetails>();
  const [classes, setClasses] = useState<IClass[]>();
  const [userId, setUserId] = useState<number>();
  const [classImg, setClassImg] = useState<string>();
  const [answer, setAnswer] = useState<IAnswer[]>();

  const [isInClass, setisInClass] = useState<boolean>(false);
  useEffect(() => {
    classApi
      .viewDetailClass(Number(params.classId))
      .then((res) => {
        setclassDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (classDetails?.studyAt.find((item) => item.studentId === userId)) {
      setisInClass(true);
      console.log("in class");
    } else {
      setisInClass(classDetails?.hostId === userId);
    }
  }, [classDetails, userId]);

  const [createPost_content, setcreatePost_content] = useState<string>();
  useEffect(() => {
    let a = classes?.find((e) => e.id === Number(params.classId));
    if (a) {
      setcurrentClass({
        hostID: Number(a.hostId),
        id: a.id,
        className: a.name,
        description: String(a.description),
      });
    }
  }, [classes]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserId(Number(localStorage.getItem("user")));
    }
  }, []);

  const createPost = () => {
    console.log({
      hostId: currentClass.hostID,
      classId: currentClass.id,
      content: createPost_content,
      createrId: userId,
    });

    userId &&
      createPost_content &&
      classApi
        .createPost({
          hostId: currentClass.hostID,
          classId: currentClass.id,
          content: createPost_content,
          createrId: userId,
        })
        .then((res) => {
          classApi
            .viewDetailClass(Number(params.classId))
            .then((res) => {
              setclassDetails(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });

          setcreatePost_content("");
        })
        .catch((err) => {
          console.log(err);
        });
  };

  if (!userId) {
    return (
      <div className="flex w-full flex-col py-10 px-16">
        <div className="mb-5 border-b-[1px] border-slate-200 pb-5 flex justify-between">
          <div>
            <div className="flex mb-2">
              <Class />
              <div className="flex text-4xl font-bold ml-4 ">
                {classDetails?.name}
              </div>
            </div>
            <div className="flex gap-2">
              {userId === classDetails?.hostId && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="py-auto px-3 border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
                      <div className="m-auto">
                        <Addmember />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add member</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="mb-5">
                        <Label className="w-[120px] mb-5 text-1xl font-bold">
                          Student code:
                        </Label>
                        <Input type="text" placeholder="code" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {userId === classDetails?.hostId && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="py-auto border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
                      <div className="m-auto">
                        <Plus />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Collection</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="mb-5">
                        <Label className="w-[120px] mb-5 text-1xl font-bold">
                          Collection Name:
                        </Label>
                        <Input type="text" placeholder="Name" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {userId === classDetails?.hostId && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="py-auto border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
                      <div className="m-auto">
                        <Three_dot />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-bold">
                        request
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="mb-5">
                        <Label className="w-[120px] mb-5 text-1xl font-bold"></Label>
                        <div>
                          {classDetails?.requests?.map((request, index) => (
                            <div
                              className="flex mb-2 mt-2 ml-auto"
                              key={index}
                              onClick={() => {
                                authApi.addStundet(
                                  classDetails.id,
                                  request.fromUserId
                                );
                              }}
                            >
                              <Avatar className="mr-2">
                                <AvatarImage
                                  src="https://github.com/shadcn.png"
                                  alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <Badge className="bg-cyan-400 px-5 leading-none h-auto">
                                {request.id}
                              </Badge>
                              <Button className="flex ml-auto"> accept</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Close</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* end */}

              <Dialog>
                <DialogTrigger asChild>
                  <button className="py-auto border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
                    <div className="m-auto">
                      <Three_dot />
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">
                      Member list
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="mb-5">
                      <Label className="w-[120px] mb-5 text-1xl font-bold"></Label>
                      <div>
                        {classDetails?.studyAt?.map((user, index) => (
                          <div
                            className="flex item-center mb-2 mt-2"
                            key={index}
                          >
                            <Avatar className="mr-2">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="px-5 flex font-bold items-center ">
                              {user.student.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {userId === classDetails?.hostId && (
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">Edit Class Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="mb-5 text-3xl font-bold">
                    Edit Class
                  </DialogTitle>
                  <div>
                    <form className="">
                      <div>
                        <Label className="w-[120px] mb-3 text-1xl font-bold">
                          Class Image:
                        </Label>
                        <div className="mb-2">
                          <input
                            className="hidden"
                            type="file"
                            id="image-upload"
                            name="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className=" mb-4 bg-cyan-300 font-bold rounded-lg text-black px-4 py-2 cursor-pointer hover:bg-blue-300 transition-colors duration-200 inline-block"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                      <div className="mb-5">
                        <Label className="w-[120px] mb-3 text-1xl font-bold">
                          Class Name:
                        </Label>
                        <Input type="text" placeholder="Class Name" />
                      </div>
                      <div className="mb-5">
                        <Label className="w-[120px] mb-3 text-1xl font-bold">
                          Class Code:
                        </Label>
                        <Input type="text" placeholder="Class Code" />
                      </div>
                      <div className="mb-5">
                        <Label className="mb-3 text-1xl font-bold">
                          Class Description:
                        </Label>
                        <Textarea placeholder="Type your description here." />
                      </div>
                      <div className="flex items-center space-x-2 mb-5">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Allow member to invite new member
                        </label>
                      </div>
                      <div className="flex justify-end">
                        <Button className="bg-cyan-400 hover:bg-cyan-300 text-black">
                          Save
                        </Button>
                      </div>
                    </form>
                  </div>
                </DialogHeader>

                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="flex gap-10">
          <div className="w-4/5">
            {!isInClass && classDetails ? (
              <div className="px-7 py-5 flex flex-col items-center">
                <Image
                  src={classImage.src}
                  width={300}
                  height={300}
                  alt="join class"
                />
                <h1 className="mb-7 font-semibold font-lg">
                  Join class to view class&apos;information
                </h1>
                <Button
                  className="w-auto ml-3 bg-cyan-400 text-black font-semibold hover:bg-cyan-300 hover:scale-110 transition-all ease-in-out"
                  onClick={() => {
                    userId &&
                      authApi
                        .requestToClass(Number(params.classId), userId)
                        .then(() => {
                          setRequested(true);
                        });
                  }}
                >
                  {requested ? "Your request have be make" : "Join class"}
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="post" className="">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="post">Post</TabsTrigger>
                  <TabsTrigger value="assignment">Assignment</TabsTrigger>
                  <TabsTrigger value="Collection">Collection</TabsTrigger>
                </TabsList>
                {/* Post Part */}
                <TabsContent value="post">
                  <Card className="flex flex-col pb-5">
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold">Post</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 flex-grow overflow-auto">
                      <div className="justify-center">
                        {/* Card Post */}
                        {classDetails?.posts?.map((post, index) => (
                          <Card
                            className="w-full mb-4 flex flex-col"
                            key={index}
                          >
                            <CardHeader className="px-6 py-4">
                              <CardTitle>
                                <div className="flex gap-3">
                                  <Avatar className="mr-2">
                                    <AvatarImage
                                      src="https://github.com/shadcn.png"
                                      alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <Badge className="bg-cyan-400 px-5 leading-none h-auto">
                                    {post.content}
                                  </Badge>
                                  <p className="text-xs font-medium leading-loose my-auto italic">
                                    {post.date}
                                  </p>
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="mb-1 text-xl font-bold">
                                Title
                              </div>
                              <div className="w-full items-center gap-4">
                                <h2>{post.content}</h2>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between"></CardFooter>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <div className="flex gap-5 w-full bg-white px-7">
                      <div className="w-full">
                        <input
                          type="text"
                          name={"name"}
                          value={createPost_content}
                          onChange={(e) => {
                            setcreatePost_content(e.target.value);
                          }}
                          id=""
                          placeholder={"any"}
                          className="bg-transparent w-full border-b-2 border-gray-600 focus:outline-0 mb-2 placeholder:text-slate-300 py-3 focus:border-b-4 focus:border-cyan-500"
                        />
                        <label
                          htmlFor={"name"}
                          className="block text-xs text-gray-400 font-medium uppercase tracking-wider"
                        ></label>
                      </div>

                      <button
                        className="mt-1 px-3 py-2 bg-cyan-400 rounded-2xl font-semibold hover:bg-gray-500"
                        onClick={() => {
                          createPost();
                        }}
                      >
                        <Send />
                      </button>
                    </div>
                  </Card>
                </TabsContent>
                {/* Assignment Part */}
                <TabsContent value="assignment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assignment</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Tabs defaultValue="assignment" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="assignment">
                            Assignment
                          </TabsTrigger>
                          <TabsTrigger value="answer">Answer</TabsTrigger>
                        </TabsList>
                        <TabsContent value="assignment">
                          {userId === classDetails?.hostId && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  className="rounded-lg my-4 px-5 py-2 bg-cyan-400 hover:bg-cyan-300 font-semibold text-sm "
                                  variant="outline"
                                >
                                  Create Assingment
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Create Assignment</DialogTitle>
                                  <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Question
                                    </Label>
                                    <Input id="name" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
                                      Due
                                    </Label>
                                    <Input
                                      id="username"
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
                                      Description
                                    </Label>
                                    <Input
                                      id="username"
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Create</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                          {userId === classDetails?.hostId
                            ? classDetails?.assignments?.map(
                                (item: any, i: any) => (
                                  <AssignmentCardAdmin
                                    key={i}
                                    assignment={item}
                                  />
                                )
                              )
                            : classDetails?.assignments?.map(
                                (item: any, i: any) => (
                                  <AssignmentCard key={i} assignment={item} />
                                )
                              )}
                        </TabsContent>
                        <TabsContent value="answer">
                          {answer?.map((item, i) => (
                            <AnswerCard key={i} answer={item} />
                          ))}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </TabsContent>

                {/* Collection Part */}
                <TabsContent value="Collection">
                  <Card>
                    <CardHeader>
                      <CardTitle>Collection</CardTitle>
                      <CardDescription>
                        <button
                          className="text-sm bg-cyan-400 flex gap-1 px-3 py-1 rounded-2xl text-black font-bold mt-2"
                          onClick={() =>
                            route.push(
                              `/home/class/${params.classId}/create_collection`
                            )
                          }
                        >
                          <PlusIcon size={15} className="my-auto" />
                          <p className="my-auto">Add collection</p>
                        </button>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {classDetails?.collections.map((collection, index) => {
                        return (
                          <CollectionRow key={index} collection={collection} />
                        );
                      })}
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
          <div className="w-1/5 flex flex-col gap-5">
            <h1 className="tracking-wide uppercase text-gray-500 font-bold text-sm">
              Invite class id
            </h1>
            <div className="flex gap-5 w-full">
              <h1 className="bg-white px-5 py-2 rounded-lg border-2 border-gray-700 w-3/4">
                #12345
              </h1>
              <button className="rounded-lg px-5 py-2 bg-cyan-400 hover:bg-cyan-300 font-semibold text-sm">
                Copy
              </button>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="tracking-wide uppercase text-gray-500 font-bold text-sm">
                Class detail
              </h1>
              <div className="flex gap-5 font-semibold leading-loose">
                <School /> {classDetails?.name}
              </div>
              <div className="flex gap-5 font-semibold leading-loose">
                <FlashCard size={25} /> {classDetails?.collections.length}{" "}
                collections
              </div>
              <div className="flex gap-5 font-semibold leading-loose">
                <div className="rounded-full bg-slate-100">
                  <User className=" h-7 w-7 text-blue-300 fill-blue-300  rounded-full" />
                </div>
                {classDetails?.studyAt.length} Member
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col py-10 px-16">
      <div className="mb-5 border-b-[1px] border-slate-200 pb-5 flex justify-between">
        <div>
          <div className="flex mb-2">
            <Class />
            <div className="flex text-4xl font-bold ml-4 ">
              {classDetails?.name}
            </div>
          </div>
          <div className="flex gap-2">
            {userId === classDetails?.hostId && (
              <Addstudent></Addstudent>
              // <Dialog>
              //   <DialogTrigger asChild>
              //     <button className="py-auto px-3 border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
              //       <div className="m-auto">
              //         <Addmember />
              //       </div>
              //     </button>
              //   </DialogTrigger>
              //   <DialogContent className="sm:max-w-[425px]">
              //     <DialogHeader>
              //       <DialogTitle>Add member</DialogTitle>
              //     </DialogHeader>
              //     <div className="grid gap-4 py-4">
              //       <div className="mb-5">
              //         <Label className="w-[120px] mb-5 text-1xl font-bold">
              //           Student code:
              //         </Label>
              //         <Input type="text" placeholder="code" />
              //       </div>
              //     </div>
              //     <DialogFooter>
              //       <Button type="submit">Add</Button>
              //     </DialogFooter>
              //   </DialogContent>
              // </Dialog>
            )}
            {userId === classDetails?.hostId && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="py-auto border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
                    <div className="m-auto">
                      <Plus />
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Collection</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="mb-5">
                      <Label className="w-[120px] mb-5 text-1xl font-bold">
                        Collection Name:
                      </Label>
                      <Input type="text" placeholder="Name" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {userId === classDetails?.hostId && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="py-auto border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
                    <div className="m-auto">
                      <Three_dot />
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">
                      request
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="mb-5">
                      <Label className="w-[120px] mb-5 text-1xl font-bold"></Label>
                      <div>
                        {classDetails?.requests?.map((request, index) => (
                          <div
                            className="flex mb-2 mt-2 ml-auto"
                            key={index}
                            onClick={() => {
                              authApi.addStundet(
                                classDetails.id,
                                request.fromUserId
                              );
                            }}
                          >
                            <Avatar className="mr-2">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Badge className="bg-cyan-400 px-5 leading-none h-auto">
                              {request.id}
                            </Badge>
                            <Button className="flex ml-auto"> accept</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {/* end */}

            <Dialog>
              <DialogTrigger asChild>
                <button className="py-auto border-[3px] border-gray-300 rounded-full h-10 w-10 font-semibold flex hover:bg-slate-100">
                  <div className="m-auto">
                    <Three_dot />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">
                    Member list
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="mb-5">
                    <Label className="w-[120px] mb-5 text-1xl font-bold"></Label>
                    <div>
                      {classDetails?.studyAt?.map((user, index) => (
                        <div className="flex item-center mb-2 mt-2" key={index}>
                          <Avatar className="mr-2">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="px-5 flex font-bold items-center ">
                            {user.student.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {userId === classDetails?.hostId && (
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Edit Class Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="mb-5 text-3xl font-bold">
                  Edit Class
                </DialogTitle>
                <div>
                  <form className="">
                    <div>
                      <Label className="w-[120px] mb-3 text-1xl font-bold">
                        Class Image:
                      </Label>
                      <div className="mb-2">
                        <input
                          className="hidden"
                          type="file"
                          id="image-upload"
                          name="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className=" mb-4 bg-cyan-300 font-bold rounded-lg text-black px-4 py-2 cursor-pointer hover:bg-blue-300 transition-colors duration-200 inline-block"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                    <div className="mb-5">
                      <Label className="w-[120px] mb-3 text-1xl font-bold">
                        Class Name:
                      </Label>
                      <Input type="text" placeholder="Class Name" />
                    </div>
                    <div className="mb-5">
                      <Label className="w-[120px] mb-3 text-1xl font-bold">
                        Class Code:
                      </Label>
                      <Input type="text" placeholder="Class Code" />
                    </div>
                    <div className="mb-5">
                      <Label className="mb-3 text-1xl font-bold">
                        Class Description:
                      </Label>
                      <Textarea placeholder="Type your description here." />
                    </div>
                    <div className="flex items-center space-x-2 mb-5">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Allow member to invite new member
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-cyan-400 hover:bg-cyan-300 text-black">
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogHeader>

              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="flex gap-10">
        <div className="w-4/5">
          {!isInClass && classDetails ? (
            <div className="px-7 py-5 flex flex-col items-center">
              <Image
                src={classImage.src}
                width={300}
                height={300}
                alt="join class"
              />
              <h1 className="mb-7 font-semibold font-lg">
                Join class to view class&apos;information
              </h1>
              <Button
                className="w-auto ml-3 bg-cyan-400 text-black font-semibold hover:bg-cyan-300 hover:scale-110 transition-all ease-in-out"
                onClick={() => {
                  authApi
                    .requestToClass(Number(params.classId), userId)
                    .then(() => {
                      setRequested(true);
                    });
                }}
              >
                {requested ? "Your request have be make" : "Join class"}
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="post" className="">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="post">Post</TabsTrigger>
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
                <TabsTrigger value="Collection">Collection</TabsTrigger>
              </TabsList>
              {/* Post Part */}
              <TabsContent value="post">
                <Card className="flex flex-col pb-5">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">Post</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow overflow-auto">
                    <div className="justify-center">
                      {/* Card Post */}
                      {classDetails?.posts?.map((post, index) => (
                        <Card className="w-full mb-4 flex flex-col" key={index}>
                          <CardHeader className="px-6 py-4">
                            <CardTitle>
                              <div className="flex gap-3">
                                <Avatar className="mr-2">
                                  <AvatarImage
                                    // src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                  />
                                  <AvatarFallback>Avatar</AvatarFallback>
                                </Avatar>
                                <Badge className="bg-cyan-400 px-5 leading-none h-auto">
                                  {post.byMember.name}
                                </Badge>
                                <p className="text-xs font-medium leading-loose my-auto italic">
                                  {format(post.date, "PPP")}
                                </p>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-1 text-xl font-bold">Title</div>
                            <div className="w-full items-center gap-4">
                              <h2>{post.content}</h2>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between"></CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <div className="flex gap-5 w-full bg-white px-7">
                    <div className="w-full">
                      <input
                        type="text"
                        name={"name"}
                        value={createPost_content}
                        onChange={(e) => {
                          setcreatePost_content(e.target.value);
                        }}
                        id=""
                        placeholder={"any"}
                        className="bg-transparent w-full border-b-2 border-gray-600 focus:outline-0 mb-2 placeholder:text-slate-300 py-3 focus:border-b-4 focus:border-cyan-500"
                      />
                      <label
                        htmlFor={"name"}
                        className="block text-xs text-gray-400 font-medium uppercase tracking-wider"
                      ></label>
                    </div>

                    <button
                      className="mt-1 px-3 py-2 bg-cyan-400 rounded-2xl font-semibold hover:bg-gray-500"
                      onClick={() => {
                        createPost();
                      }}
                    >
                      <Send />
                    </button>
                  </div>
                </Card>
              </TabsContent>
              {/* Assignment Part */}
              <TabsContent value="assignment">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Tabs defaultValue="assignment" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="assignment">Assignment</TabsTrigger>
                        <TabsTrigger value="answer">Answer</TabsTrigger>
                      </TabsList>
                      <TabsContent value="assignment">
                        {userId === classDetails?.hostId && (
                          <CreateAssignment
                            hostId={String(classDetails.hostId)}
                            classId={String(classDetails.id)}
                          ></CreateAssignment>
                          // <Dialog>
                          //   <DialogTrigger asChild>
                          //     <Button
                          //       className="rounded-lg my-4 px-5 py-2 bg-cyan-400 hover:bg-cyan-300 font-semibold text-sm "
                          //       variant="outline"
                          //     >
                          //       Create Assingment
                          //     </Button>
                          //   </DialogTrigger>
                          //   <DialogContent className="sm:max-w-[425px]">
                          //     <DialogHeader>
                          //       <DialogTitle>Create Assignment</DialogTitle>
                          //       <DialogDescription></DialogDescription>
                          //     </DialogHeader>
                          //     <div className="grid gap-4 py-4">
                          //       <div className="grid grid-cols-4 items-center gap-4">
                          //         <Label htmlFor="name" className="text-right">
                          //           Question
                          //         </Label>
                          //         <Input
                          //           id="name"
                          //           value="Pedro Duarte"
                          //           className="col-span-3"
                          //         />
                          //       </div>
                          //       <div className="grid grid-cols-4 items-center gap-4">
                          //         <Label
                          //           htmlFor="username"
                          //           className="text-right"
                          //         >
                          //           Due
                          //         </Label>
                          //         <Input
                          //           id="username"
                          //           value="@peduarte"
                          //           className="col-span-3"
                          //         />
                          //       </div>
                          //       <div className="grid grid-cols-4 items-center gap-4">
                          //         <Label
                          //           htmlFor="username"
                          //           className="text-right"
                          //         >
                          //           Description
                          //         </Label>
                          //         <Input
                          //           id="username"
                          //           value="@peduarte"
                          //           className="col-span-3"
                          //         />
                          //       </div>
                          //     </div>
                          //     <DialogFooter>
                          //       <Button type="submit">Create</Button>
                          //     </DialogFooter>
                          //   </DialogContent>
                          // </Dialog>
                        )}
                        {userId === classDetails?.hostId
                          ? classDetails?.assignments?.map(
                              (item: any, i: any) => (
                                <AssignmentCardAdmin
                                  key={i}
                                  assignment={item}
                                />
                              )
                            )
                          : classDetails?.assignments?.map(
                              (item: any, i: any) => (
                                <AssignmentCard key={i} assignment={item} />
                              )
                            )}
                      </TabsContent>
                      <TabsContent value="answer">
                        {answer?.map((item, i) => (
                          <AnswerCard key={i} answer={item} />
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </TabsContent>

              {/* Collection Part */}
              <TabsContent value="Collection">
                <Card>
                  <CardHeader>
                    <CardTitle>Collection</CardTitle>
                    <CardDescription>
                      <button
                        className="text-sm bg-cyan-400 flex gap-1 px-3 py-1 rounded-2xl text-black font-bold mt-2"
                        onClick={() =>
                          route.push(
                            `/home/class/${params.classId}/create_collection`
                          )
                        }
                      >
                        <PlusIcon size={15} className="my-auto" />
                        <p className="my-auto">Add collection</p>
                      </button>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {classDetails?.collections.map((collection, index) => {
                      return (
                        <CollectionRow key={index} collection={collection} />
                      );
                    })}
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
        <div className="w-1/5 flex flex-col gap-5">
          <h1 className="tracking-wide uppercase text-gray-500 font-bold text-sm">
            Invite class id
          </h1>
          <div className="flex gap-5 w-full">
            <h1 className="bg-white px-5 py-2 rounded-lg border-2 border-gray-700 w-3/4">
              #12345
            </h1>
            <button className="rounded-lg px-5 py-2 bg-cyan-400 hover:bg-cyan-300 font-semibold text-sm">
              Copy
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="tracking-wide uppercase text-gray-500 font-bold text-sm">
              Class detail
            </h1>
            <div className="flex gap-5 font-semibold leading-loose">
              <School /> {classDetails?.name}
            </div>
            <div className="flex gap-5 font-semibold leading-loose">
              <FlashCard size={25} /> {classDetails?.collections.length}{" "}
              collections
            </div>
            <div className="flex gap-5 font-semibold leading-loose">
              <div className="rounded-full bg-slate-100">
                <User className=" h-7 w-7 text-blue-300 fill-blue-300  rounded-full" />
              </div>
              {classDetails?.studyAt.length} Member
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
