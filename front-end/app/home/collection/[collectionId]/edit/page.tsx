'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import CreateCollectionInput from '@/components/Input/CreateCollectionInput';
import Plus from '@/components/Svg/Plus';
import WordEditCard from '@/components/Collection/WordEditCard';
import { FakeCollectionData } from '@/API/FakeData';
import collectionApi, { ICollection, IFlashCardRequest } from '@/lib/CollectionApi';
import { useRouter } from 'next/navigation';
// * name field
// * description field
// * summary field
// * list of created flashcards
// * fields to create new flashcards : frond image + frond text + back image + back text
// * create new buttons



const Page = ({params} :{params : {collectionId : string}}) => {
    const router = useRouter()
    const [collection, setCollection] = useState<ICollection>()
 useEffect(() => {
    collectionApi.viewCollection().then((res) => {
      setCollection(res.data.data.find((item) => {return item.id == Number(params.collectionId)}))
    })
 },[])

  useEffect(() => {
    if(collection) {
      setWordList(collection?.flashcards) 
      setTitle(collection?.name)
      setDescription(collection?.description)
    }
  },[collection])

  const [wordList, setWordList] = useState<IFlashCardRequest[]>()
  const [word, setWord] = useState<string>()
  const [mean, setMean] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const addWord = () => {
    wordList && word && mean && setWordList([...wordList,{back_text: mean, front_text: word}])
    setWord('')
    setMean('')
    }
  
  const handleSave = async  () => {
    title &&
    collection?.user &&
    description &&
    await collectionApi.createCollection({
      name: title,
      userId: collection?.user.id,
      description: description,
      flashCards: wordList,
    });

    const collections = await collectionApi.viewCollection();
    const latestCollectionId = collections.data.data.pop()?.id;
    router.push(`/home/collection/${latestCollectionId}`);
    await collectionApi.deleteConllection(Number(params.collectionId));



    
    
  }



  return (
    <div className='px-16 py-10'>
      <h1 className='font-black text-2xl mb-10'>Edit collection</h1>
      <div className='w-1/2 flex flex-col gap-7 mb-10'>
        <div className='w-full'>
          <input type="text" name='Title' placeholder='Enter title, example: Unit 11...' className='bg-transparent w-full border-b-2 border-gray-600 focus:outline-0 mb-2 placeholder:text-slate-300 py-3 focus:border-b-4 focus:border-sky-700' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
          <label htmlFor='Title' className='block text-xs text-gray-400 font-medium uppercase tracking-wider'>Title</label>
        </div>

        <div className='w-full'>
          <input type="text" name='Description' placeholder='Enter description...' className='bg-transparent w-full border-b-2 border-gray-600 focus:outline-0 mb-2 placeholder:text-slate-300 py-3 focus:border-b-4 focus:border-sky-700' 
          value={description}
          onChange={(e) => setDescription(e.target.value)}/>
          <label htmlFor='Description' className='block text-xs text-gray-400 font-medium uppercase tracking-wider'>Description</label>
        </div>

        </div>
      <div className="flex justify-center gap-10 mb-10">
        <input type="text" name="" id="" value={word} onChange={ (e) => setWord(e.target.value)} placeholder='Word' className='px-3 border-2 rounded-lg border-gray-300'/>
        <input type="text" name="" id="" value={mean} onChange={ (e) => setMean(e.target.value)} placeholder='Definition' className='px-3 border-2 rounded-lg border-gray-300'/>
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg flex gap-3" onClick={() => addWord()}>
          <div className='mt-1'>
            <Plus />
          </div>
          Add
        </button>
      </div>

      <div className='flex flex-col gap-5'>
          { wordList && (wordList.map( (word, index) => <WordEditCard key={index} word={word} index={index+1}/>))}
          <div className='w-full h-32 rounded-lg bg-white flex items-center'>
              <button className='mx-auto flex gap-2 uppercase font-bold text-lg pb-2 border-b-4 border-cyan-400 hover:border-yellow-400' onClick={() => addWord()}>
                <div className='my-auto'><Plus /></div>
                Add word
                </button>
          </div>
          <div className='flex justify-end w-full'>
              <button className='px-5 py-3 bg-cyan-300 rounded-lg font-bold hover:bg-cyan-400' onClick={() => handleSave()}>Save</button>
          </div>
      </div>
    </div>
  );
};

export default Page