"use client";
import React, { useEffect, useState } from "react";
import { FakeCollectionData, FakeClassData } from "@/API/FakeData";
import Share from "@/components/Svg/Share";
import Plus from "@/components/Svg/Plus";
import Three_dot from "@/components/Svg/Three_dot";
import CollectionCard from "@/components/Collection/CollectionCard";
import ClassCard from "@/components/Class/ClassCard";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/authApi";
import collectionApi, { ICollection } from "@/lib/CollectionApi";
import classApi, { IClass, IClassDetails } from "@/lib/ClassApi";
import { useRouter } from "next/navigation";

// * list of collections user have
// * list of class user have
const Page = ({ params }: { params: { classId: string } }) => {
  const [userInfo, setUserInfo] = useState<IUser>(
    JSON.parse(localStorage.getItem("userData") as string)
  );
    const route = useRouter()
    const [classDetails, setclassDetails] = useState<IClass[]>();

    const [collections, setcollections] = useState<ICollection[]>();
    const [classes, setClasses] = useState<IClass[]>();
    const [currentUserId, setCurrentUserId] = useState<string>(
        JSON.parse(localStorage.getItem("user") as string)
    );

    console.log(userInfo);
    useEffect(() => {
        classApi
          .ViewAllClasses("all", undefined, String(userInfo.id))
          .then((res) => {const classd:IClass[]=res.data.data
            setclassDetails(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    useEffect(() => {
        Promise.all([
            collectionApi.viewCollection("all", undefined, String(userInfo.id)),
            classApi.ViewAllClasses("all", undefined, String(userInfo.id)),
            classApi.viewStudyAt(Number(userInfo.id)),
        ]).then((result) => {
            setcollections(result[0].data.data);
            setClasses(result[1].data.data);
        });
    }, []);

    if (!localStorage.getItem("userData") && !localStorage.getItem("user")) {
        return <Button onClick={() => route.push(`/auth/login`)}>Please login</Button>;
    }

    return (
        <div className="w-full px-16 py-10 ">
            <div className="w-3/4">
                <div className="flex justify-between">
                    <h1 className="flex gap-5 font-black text-3xl mb-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="40"
                            height="40"
                            viewBox="0,0,256,256"
                            fontStyle="fill:#6B7280"
                        >
                            <g
                                fill="#6B7280"
                                fillRule="nonzero"
                                stroke="none"
                                strokeWidth="1"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeDasharray=""
                                strokeDashoffset="0"
                                fontFamily="none"
                                fontWeight="none"
                                fontSize="none"
                                textAnchor="none"
                                fontStyle="mix-blend-mode: normal"
                            >
                                <g transform="scale(10.66667,10.66667)">
                                    <path d="M4,4c-1.09425,0 -2,0.90575 -2,2v12c0,1.09426 0.90575,2 2,2h16c1.09426,0 2,-0.90574 2,-2v-10c0,-1.09425 -0.90574,-2 -2,-2h-8l-2,-2zM4,6h5.17188l2,2h8.82813v10h-16z"></path>
                                </g>
                            </g>
                        </svg>
                        My library
                    </h1>

                    <div className="flex gap-3">
                        <button className="border-[3px] border-gray-300 rounded-full w-10 h-10 text-gray-500 font-semibold flex gap-3 p-2">
                            <div className="mx-auto my-auto">
                                <Plus />
                            </div>
                        </button>
                        <button className="border-[3px] border-gray-300 rounded-full w-10 h-10 text-gray-500 font-semibold flex gap-3 p-2">
                            <div className="mx-auto my-auto">
                                <Share />
                            </div>
                        </button>
                        <button className="border-[3px] border-gray-300 rounded-full w-10 h-10 text-gray-500 font-semibold flex gap-3">
                            <div className="mx-auto my-auto">
                                <Three_dot />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex px-3 mb-10">
                    <h2 className="font-medium mr-10">
                        {collections?.length} collections
                    </h2>
                    <div className="flex gap-3">
                        <p>Created by</p>
                        <div className="h-6 w-6 rounded-full bg-slate-600"></div>
                        <p className="font-bold">{userInfo.name}</p>
                    </div>
                </div>
            </div>

            <div className="font-bold text-4xl my-10">Collections</div>
            <div className="flex gap-16 flex-wrap">
                {collections?.map((collection, index) => (
                    <CollectionCard key={index} collection={collection} />
                ))}
            </div>
            <div className="font-bold text-4xl my-10">Classes
                <div className="grid gap-10 mt-10 grid-cols-3">
                {classDetails?.filter((x)=>{return x.hostId === (userInfo.id)}).map((x)=>{return <ClassCard class={x}></ClassCard>})}
                </div>
            </div>
            <div className="flex gap-10 mt-10">
                {/* {classes?.map((c, i) => (
          <ClassCard key={i} class={c} />
        ))} */}
                {classes
                    ?.filter((c) => c.hostId?.toString() === currentUserId)
                    .map((c, i) => (
                        <ClassCard key={i} class={c} />
                    ))}
            </div>
            <div className="font-bold text-4xl my-10">Other Classes</div>
            <div className="grid gap-10 mt-10 grid-cols-3">
                {classes
                    ?.filter(
                        (c) =>      
                            c.hostId?.toString() !== currentUserId.toString() 
                    )
                    .map((c, i) => (
                        <ClassCard key={i} class={c} />
                    ))}
            </div>
        </div>
    );
};

export default Page;
