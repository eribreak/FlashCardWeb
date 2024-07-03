"use client";
import React, { useState } from "react";
import classImg0 from "../../assets/classCard.jpg";
import classImg1 from "../../assets/9202732.jpg"
import classImg2 from "../../assets/international-day-education-illustration_23-2151101753.jpg"
import classImg3 from "../../assets/space-cartoon-composition-with-neon-glowing-view-extraterrestrial-terrain-with-characters-spaceman-alien-vector-illustration_1284-80790.jpg"
import classImg4 from "../../assets/organic-flat-people-business-training-illustration_23-2148920666.jpg"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IClass } from "@/lib/ClassApi";
import { CldImage } from "next-cloudinary";

function ClassCard(prop: { class: IClass }) {
  const route = useRouter();
  const [errorImg, setErrorImg] = useState<boolean>(false)
  return (
    <div
      className="relative w-full h-64 group rounded-2xl shadow-md flex flex-col classCard transition-all duration-300 ease-in-out overflow-hidden"
      onClick={() => route.push(`/home/class/${prop?.class?.id}`)}
    > 

      {(prop?.class?.images && !errorImg) ?
      <CldImage  width="500"  height="256"  src={prop?.class?.images} alt="Description of my image" 
      className="object-cover"
      onError={() => setErrorImg(true)}
      />
      :
      <Image
        src={classImg1}
        alt="class image"
        className="w-full rounded-2xl h-full object-cover group-hover:brightness-110"
        
      />
      }
      <div className="py-3 w-full px-5 absolute top-2/3 bg-[rgba(255,255,255,0.9)] h-1/3 rounded-b-xl group-hover:bg-[rgba(255,255,255,0.6)] transition-all duration-500 ease-in-out delay-50">
        <h1 className="font-semibold mb-1">{prop?.class?.name}</h1>
        <p className=" text-ellipsissis text-sm font-medium">{prop?.class?.description?prop?.class?.description:"No description on this class"}</p>
      </div>
    </div>
  );
}

export default ClassCard;
