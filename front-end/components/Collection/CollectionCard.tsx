"use client";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { ICollection } from "@/app/home/page";
function CollectionCard({ collection }: { collection: ICollection }) {
  const router = useRouter();

  return (
    <div
      className="w-[400px] h-48  rounded-xl px-10 py-5 shadow-md flex flex-col justify-between hover:border-b-4 hover:border-b-sky-700 bg-white"
      onClick={() => router.push(`/home/collection/${collection.id}`)}
    >
      <div>
        <h1 className="text-xl font-semibold mb-3">{collection.name}</h1>
        <h2 className="bg-slate-200 rounded-full w-auto inline-block px-2 py-1 font-semibold text-sm">
          {collection.flashcards?.length} words
        </h2>
      </div>
      <div className="flex gap-5">
        <div className="p-1 rounded-full bg-slate-100">
          <User className=" h-7 w-7 text-blue-300 fill-blue-300  rounded-full p-1.5" />
        </div>
        <h2 className="leading-loose font-bold text-sm mt-1">
          {collection.user?.name}
        </h2>
      </div>
    </div>
  );
}

export default CollectionCard;
