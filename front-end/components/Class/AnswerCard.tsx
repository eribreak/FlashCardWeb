import { IAnswer } from "@/lib/ClassApi"
import { ICollection } from "@/lib/CollectionApi"
import { User } from "lucide-react"
import Link from "next/link"

function AnswerCard({answer}: {answer: IAnswer}) {
    console.log(answer)
  return (
    <div className=" bg-slate-100 shadow-sm rounded-lg pt-3 pb-1 px-5 flex flex-col gap-5 border-b-4 border-transparent cursor-pointer hover:border-cyan-400">
            <div className="flex gap-5">
                <h1 className="text-sm font-bold"> Ten Assignment</h1>
                <div className="flex text-xs gap-2 font-semibold border-x-2 border-gray-200 px-3">
                    <User size={18} color="#19A7CE" className="my-auto"/>
                    <h2 className="leading-loose">{answer.answer}</h2>
                </div>
            </div>
            <div className="flex justify-self-end">
                <h1 className="font-black leading-loose">{answer.point}</h1>
            </div>
    </div>
  )
}

export default AnswerCard;