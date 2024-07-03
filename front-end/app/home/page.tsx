"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FakeCollectionData, FakeClassData } from "../../API/FakeData";
import CollectionCard from "@/components/Collection/CollectionCard";
import ClassCard from "@/components/Class/ClassCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "@/components/ui/button";
import api, { api_collections } from "@/config/axios.config";
import classApi, { IClass } from "@/lib/ClassApi";
import collectionApi, { ICollection } from "@/lib/CollectionApi";

const Page = () => {
  useEffect(() => {
    // window.localStorage.setItem("user", "1");
  }, []);

  const settings = {
    dots: true, // Hiển thị dấu chấm
    infinite: true, // Lặp lại vô hạn
    speed: 2000, // Tốc độ chuyển đổi (ms)
    slidesToShow: 3, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số lượng slide cuộn khi sử dụng next/prev buttons
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };

  const [collections, setCollections] = useState<ICollection[]>();
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

  useEffect(() => {
    collectionApi
      .viewCollection()
      .then((res) => {
        setCollections(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const router = useRouter();
  return (
    <div className="px-16 py-12 flex flex-col gap-12">
      <div className="">
        <h1 className="text-2xl font-bold mb-10">Collections</h1>
        {collections?.length?((collections?.length<3)
        ?
        <div className="flex gap-10">
        {collections?.map((collection, index) => (
          <CollectionCard key={index} collection={collection} />
        ))}
        </div>
        :
        <Slider {...settings}>
          {collections?.map((collection, index) => (
            <CollectionCard key={index} collection={collection} />
          ))}
        </Slider>
       )
       :""}
      </div>

      <div className="">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-10">Classes</h1>

          <Button
            className="font-bold text-[20px] text-blue-500 "
            variant="link"
            onClick={() => router.push("/home/class-list")}
          >
            See more...
          </Button>
        </div>

        <div className="grid gap-10 grid-cols-3">
          {classes?.slice(0, 6)?.map((item, index) => (
            <ClassCard key={index} class={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

/**/
