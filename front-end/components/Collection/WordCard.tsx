import React from "react";
import Star from "../Svg/Star";
function WordCard({
  word,
}: {
  word: {
    id: number;
    front_text: string;
    front_img: string | null;
    back_text: string;
    back_img: string | null;
    collectionId: number;
  };
}) {
  return (
    <div className="w-full h-autp py-5 px-3 shadow-md flex rounded-lg justify-between bg-white">
      <div className="w-3/4 flex">
        <div className="border-r-2 border-slate-300 w-1/3 px-5">
          <p className="font-semibold leading-loose">{word.front_text}</p>
        </div>
        <div className="px-10">
          <p className="font-semibold leading-loose">{word.back_text}</p>
        </div>
      </div>
      <div className="p-2 rounded-lg hover:bg-slate-200">
        <Star size={20} color="#6B7280" />
      </div>
    </div>
  );
}

export default WordCard;
