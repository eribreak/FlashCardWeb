"use client";
import { FakeCollectionData } from "@/API/FakeData";
import CollectionCard from "@/components/Collection/CollectionCard";
import WordCard from "@/components/Collection/WordCard";
import Book from "@/components/Svg/Book";
import Copy from "@/components/Svg/Copy";
import Exam from "@/components/Svg/Exam";
import FlashCard from "@/components/Svg/FlashCard";
import Share from "@/components/Svg/Share";
import Star from "@/components/Svg/Star";
import Three_dot from "@/components/Svg/Three_dot";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { api_collections } from "@/config/axios.config";
import { ICollection } from "@/lib/CollectionApi";

const Page = ({ params }: { params: { collectionId: string } }) => {
  const [collection, setCollection] = useState<ICollection>();
  const [collections, setCollections] = useState<ICollection[]>();
  useEffect(() => {
    api_collections.get("/view-collection").then((response) => {
      setCollections(response.data.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    setCollection(
      collections?.filter((item) => item.id === Number(params.collectionId))[0]
    );
  }, [collections]);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserId(Number(localStorage.getItem("user")));
    }
  }, []);

  const settings = {
    dots: true, // Hiển thị dấu chấm
    infinite: true, // Lặp lại vô hạn
    speed: 500, // Tốc độ chuyển đổi (ms)
    slidesToShow: 1, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số lượng slide cuộn khi sử dụng next/prev buttons
    swipeToSlide: true,
  };

  return (
    <div className="px-32 py-12 flex flex-col gap-12 w-3/4">
      <div className="">
        <h1 className="text-3xl font-bold flex gap-1">{collection?.name}<Star size={15} /></h1>
        {/* <div className="flex gap-3">
          <Star size={15} />
          <h2 className="font-medium text-gray-500 text-lg">
            {collection?.rate} ({collection?.number_of_rate} rate) 
          </h2>
        </div> */}
      </div>
      <div className="">
        <h1 className="text-xl font-medium mb-5">Activities</h1>
        <div className="flex text-base gap-5">
          <button className="w-1/3 h-12 shadow-sm border-[1px] border-slate-200 rounded-xl text-left px-5 flex gap-3 hover:border-b-4 hover:border-b-sky-700 bg-white">
            <div className="my-auto">
              <FlashCard size={30} />
            </div>
            <h3 className="font-semibold my-auto">FlashCard</h3>
          </button>

          <button className="w-1/3 h-14 shadow-sm border-[1px] border-slate-200 rounded-xl text-left px-5 flex gap-3 hover:border-b-4 hover:border-b-sky-700 bg-white">
            <div className="my-auto">
              <Book />
            </div>
            <h3 className="font-semibold my-auto">Learning</h3>
          </button>

          <button className="w-1/3 h-14 shadow-sm border-[1px] border-slate-200 rounded-xl text-left px-5 flex gap-3 hover:border-b-4 hover:border-b-sky-700 bg-white">
            <div className="my-auto">
              <Exam />
            </div>
            <h3 className="font-semibold my-auto">Test</h3>
          </button>
        </div>
      </div>
      <div className="">
        <Slider {...settings}>
          {collection?.flashcards.map((word, index) => (
            <div className="group h-96 [perspective:1000px] mb-8" key={index}>
              <div className="relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 bg-slate-50 rounded-xl justify-center items-center flex shadow-md">
                  <p className="text-3xl">{word.front_text}</p>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-slate-50 px-12 text-cente [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md">
                  <div className="flex min-h-full flex-col items-center justify-center">
                    <p className="text-3xl">{word.back_text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex justify-between border-t-2 border-gray-600 pt-5">
        <div className="flex gap-5">
          <div className="h-16 w-16 rounded-full bg-slate-600"></div>
          <div className="flex flex-col">
            <p className="text-sm text-slate-400">Created by</p>
            <h1 className="font-semibold text-lg">{collection?.user?.name}</h1>
            <p className="text-sm text-slate-400">3 months ago</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="p-2 border-[3px] border-gray-300 rounded-xl h-12 text-gray-500 font-semibold flex gap-3 hover:bg-slate-100">
            <div className="mt-1">
              <Share />
            </div>
            <p className="leading-loose">Share</p>
          </button>
          <button className="p-2 border-[3px] border-gray-300 rounded-xl h-12 font-semibold flex hover:bg-slate-100">
            <Copy />
          </button>
          {userId === collection?.user?.id && (
            <Link
              className="p-2 border-[3px] border-gray-300 rounded-xl h-12 font-semibold flex hover:bg-slate-100"
              href={`/home/collection/${params.collectionId}/edit`}
            >
              edit
            </Link>
          )}
          <button className="p-2 border-[3px] border-gray-300 rounded-xl h-12 font-semibold flex hover:bg-slate-100">
            <Three_dot />
          </button>
        </div>
      </div>
      {collection?.description}
      <div>
        <h1 className="text-2xl font-black mb-5">Other Collections</h1>
        <div className="flex gap-10">
          {collections?.slice(0,3).map((collection, index) => (
            <CollectionCard key={index} collection={collection} />
          ))}
        </div>
      </div>

      <div className="">
        <h1 className="text-xl font-semibold mb-5">Words in collection</h1>
        <div className="flex flex-col gap-5">
          {collection?.flashcards.map((word, i) => (
            <WordCard key={i} word={word} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

/**/
