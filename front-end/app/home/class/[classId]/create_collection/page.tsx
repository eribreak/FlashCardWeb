"use client";
import React, { useEffect, useId } from "react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import { Label } from "@/components/ui/label";
import { api_collections } from "@/config/axios.config";
import { redirect, useRouter } from "next/navigation";
import collectionApi from "@/lib/CollectionApi";

interface ICollection {
  userId: number;
  name: string;
  description: string | undefined;
  flashCards?: {
    front_text: string;
    front_img: string | null;
    back_text: string;
    back_img: string | null;
  }[];
  belongto: number;
}

interface IWordList {
  front_text: string;
  back_text: string;
}
const Page = ({ params }: { params: { classId: string } }) => {
  const [collection, setCollection] = useState<ICollection>();

  const [wordList, setWordList] = useState<IWordList[]>();

  const [userId, setUserId] = useState(localStorage.getItem("user"));

  const route = useRouter();

  useEffect(() => {
    setUserId(localStorage.getItem("user"));
  }, [userId]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showCreated, setShowCreated] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");
  const [mean, setMean] = useState<string>("");
  const addWord = (word: string, meaning?: string) => {
    if (word && word !== "" && meaning && meaning !== "") {
      setWordList(
        wordList
          ? [...wordList, { front_text: word, back_text: meaning }]
          : [{ front_text: word, back_text: meaning }]
      );
      setWord("");
      setMean("");
    }
  };

  useEffect(() => {
    setShowCreated(!!(userId && wordList && title && description));
    console.log(showCreated);
  }, [userId, wordList, description, title]);

  const createCollection = (
    authorId: number,
    description: string,
    title: string,
    list: IWordList[],
  ) => {
    const collection: ICollection = {
      userId: Number(authorId),
      description: description,
      name: title,
      belongto: Number(params.classId),
      flashCards: list.map((item) => {
        return {
          front_text: item.front_text,
          front_img: null,
          back_text: item.back_text,
          back_img: null,
        };
      }),
    };

    api_collections
      .post("/create-collection", collection)
      .then((res) => {
        collectionApi.viewCollection().then((res) => {
          route.push(`/home/class/${params.classId}`)
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return userId ? (
    <form className="px-16 py-10">
      <h1 className="font-black text-2xl mb-10">Create new collection</h1>
      <div className="w-1/2 flex flex-col gap-7 mb-10">
        {/* <CreateCollectionInput
          name={"Title"}
          label={"Title"}
          placeholder={"Enter title, example: Unit 11..."}
        /> */}
        <Label>Title</Label>
        <Input
          type="text"
          className="focus:border-cyan-500"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter title, example: Unit"
        ></Input>
        {/* <CreateCollectionInput
          name={"Description"}
          label={"Description"}
          placeholder={"Enter description..."}
        /> */}
        <Label>Description</Label>
        <Input
          type="text"
          className="focus:border-cyan-500"
          placeholder="enter description"
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
      </div>
      <div className="flex justify-center gap-10 mb-10">
        <input
          type="text"
          name=""
          id=""
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Word"
          className="px-3 border-2 rounded-lg border-gray-300"
        />
        <input
          type="text"
          name=""
          id=""
          value={mean}
          onChange={(e) => setMean(e.target.value)}
          placeholder="Definition"
          className="px-3 border-2 rounded-lg border-gray-300"
        />
        <button
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg flex gap-3"
          onClick={(e) => {
            addWord(word, mean);
            e?.preventDefault();
          }}
        >
          <div className="mt-1">
            <Plus />
          </div>
          Add
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {wordList?.map((word, index) => (
          <WordEditCard key={index} word={word} index={index + 1} />
        ))}
        <div className="w-full h-32 rounded-lg bg-white flex items-center">
          <button
            className="mx-auto flex gap-2 uppercase font-bold text-lg pb-2 border-b-4 border-cyan-400 hover:border-yellow-400"
            onClick={(e) => {
              e.preventDefault();
              addWord(word, mean);
            }}
          >
            <div className="my-auto">
              <Plus />
            </div>
            Add word
          </button>
        </div>
        <div className="flex justify-end w-full">
          {showCreated ? (
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();

                wordList &&
                  createCollection(
                    Number(userId),
                    description,
                    title,
                    wordList
                  );
              }}
            >
              Create
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="px-5 py-3 bg-cyan-300 rounded-lg font-bold hover:bg-cyan-400">
                  Create
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {!userId && <div>Please login</div>}
                    {!title && <div>Please enter your title</div>}
                    {!(wordList && wordList.length > 0) && (
                      <div>Please enter your card</div>
                    )}
                  </AlertDialogTitle>
                  {/* <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </form>
  ) : (
    <div className=" p-20">
      <Button
        onClick={() => {
          route.push("/auth/login");
        }}
      >
        Please login
      </Button>
    </div>
  );
};

export default Page;
