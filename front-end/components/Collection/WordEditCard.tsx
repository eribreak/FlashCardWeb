import React from "react";
import CreateCollectionInput from "../Input/CreateCollectionInput";
function WordEditCard({ word, index }: { word: any; index: number }) {
  return (
    <div className="w-full rounded-lg shadow-md bg-white">
      <div className="border-b-2 border-gray-100 mb-5 px-5 py-3 font-semibold text-gray-300">
        {index}
      </div>
      <div className="flex gap-10 px-10 pb-5">
        <div className="w-1/2">
          <CreateCollectionInput
            label="Word"
            placeholder="Word"
            name={word.front_text}
            defaultValue={word.front_text}
          />
        </div>
        <div className="w-1/2">
          <CreateCollectionInput
            label="Definition"
            placeholder="Definition"
            name={word.back_text}
            defaultValue={word.back_text}
          />
        </div>
      </div>
    </div>
  );
}

export default WordEditCard;
