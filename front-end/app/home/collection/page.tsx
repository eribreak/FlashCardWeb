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
import { api_collections } from "@/config/axios.config";
import { ICollection } from "@/lib/CollectionApi";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [collection, setCollection] = useState<ICollection>();
  const [collections, setCollections] = useState<ICollection[]>();
  useEffect(() => {
    api_collections.get("/view-collection").then((response) => {
      setCollections(response.data.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    collections && setCollection(collections[0]);
  }, [collections]);

  return (
    <div className="px-32 py-12 flex flex-col gap-12 w-3/4">
      <div className="">
        <h1 className="text-3xl font-bold mb-5">{collection?.name}</h1>
        <div className="flex gap-3">
          <Star size={25} />
          <h2 className="font-medium text-gray-500 text-lg">
            {/* {collection.rate} ({collection.number_of_rate} rate) */}
          </h2>
        </div>
      </div>
      <div className="">
        <h1 className="text-xl font-medium mb-5">Activities</h1>
        <div className="flex text-base gap-5">
          <button className="w-1/3 h-12 shadow-sm border-[1px] border-slate-200 rounded-xl text-left px-5 flex gap-3 hover:border-b-4 hover:border-b-sky-700">
            <div className="my-auto">
              <FlashCard size={30} />
            </div>
            <h3 className="font-semibold my-auto">FlashCard</h3>
          </button>

          <button className="w-1/3 h-14 shadow-sm border-[1px] border-slate-200 rounded-xl text-left px-5 flex gap-3 hover:border-b-4 hover:border-b-sky-700">
            <div className="my-auto">
              <Book />
            </div>
            <h3 className="font-semibold my-auto">Learning</h3>
          </button>

          <button className="w-1/3 h-14 shadow-sm border-[1px] border-slate-200 rounded-xl text-left px-5 flex gap-3 hover:border-b-4 hover:border-b-sky-700">
            <div className="my-auto">
              <Exam />
            </div>
            <h3 className="font-semibold my-auto">Test</h3>
          </button>
        </div>
      </div>

      <div className="group h-96 [perspective:1000px] mb-20">
        <div className="relative h-full w-full rounded-xl shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 bg-slate-50 rounded-xl justify-center items-center flex ">
            <p className="text-3xl">Abcd</p>
          </div>
          <div className="absolute inset-0 h-full w-full rounded-xl bg-slate-50 px-12 text-cente [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              <p className="text-3xl">bacas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-5">
          <div className="h-16 w-16 rounded-full bg-slate-600"></div>
          <div className="flex flex-col">
            <p className="text-sm text-slate-300">Created by</p>
            <h1 className="font-semibold text-lg">{collection?.user?.name}</h1>
            <p className="text-sm text-slate-300">3 months ago</p>
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
          <button className="p-2 border-[3px] border-gray-300 rounded-xl h-12 font-semibold flex hover:bg-slate-100">
            <Three_dot />
          </button>
        </div>
      </div>
      {collection?.description}
      <div>
        <h1 className="text-2xl font-black mb-5">Other Collections</h1>
        <div className="flex gap-10">
          {collections?.map((collection, index) => (
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
