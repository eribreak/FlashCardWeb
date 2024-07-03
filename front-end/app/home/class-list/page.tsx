"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FakeClassData } from "@/API/FakeData";
import { FakeCollectionData } from '@/API/FakeData';
import Share from '@/components/Svg/Share'
import ClassCard from "@/components/Class/ClassCard";
import Plus from '@/components/Svg/Plus';
import Three_dot from '@/components/Svg/Three_dot';
import classApi, { IClass } from "@/lib/ClassApi";

// * list of collections user have
// * list of class user have

        

const Page = () => {

  const [classes, setClasses] = useState<IClass[]>();

  useEffect(() => {
    classApi
        .ViewAllClasses()
          .then((res) => {
        setClasses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const router = useRouter();
  return (
    <div className='w-full px-16 py-10 '>
      <div className='w-full'>
          <div className='flex justify-between'>
            <h1 className='flex gap-5 font-black text-3xl mb-5'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256" fontStyle="fill:#6B7280">
                <g fill="#6B7280" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" fontStyle="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M4,4c-1.09425,0 -2,0.90575 -2,2v12c0,1.09426 0.90575,2 2,2h16c1.09426,0 2,-0.90574 2,-2v-10c0,-1.09425 -0.90574,-2 -2,-2h-8l-2,-2zM4,6h5.17188l2,2h8.82813v10h-16z"></path></g></g>
            </svg>
              Class list
            </h1>
          </div>

          <div className='flex px-3 mb-10'>
              <div className='flex gap-3'>
              </div>
          </div>
        </div>
        <div className='flex gap-5 flex-wrap'>
        <div className="w-3/4 grid gap-10 grid-cols-3">

          {classes?.map((item, index) => (
            <ClassCard key={index} class={item} />
          ))}
          
        </div>
                  
        </div>

    </div>
  )
};

export default Page;

