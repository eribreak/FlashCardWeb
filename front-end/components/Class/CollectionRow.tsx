import { IAnswer } from "@/lib/ClassApi"
import { ICollection } from "@/lib/CollectionApi"
import { User } from "lucide-react"
import Link from "next/link"

function CollectionRow({collection}: {collection: ICollection}) {
    console.log(collection)
  return (
    <div className=" bg-slate-100 shadow-sm rounded-lg pt-3 pb-1 px-5 flex flex-col gap-5 border-b-4 border-transparent cursor-pointer hover:border-cyan-400">
            <div className="flex gap-5">
                <h1 className="text-sm font-bold"> Words</h1>
                <div className="flex text-xs gap-2 font-semibold border-x-2 border-gray-200 px-3">
                    <User size={18} color="#19A7CE" className="my-auto"/>
                    <h2 className="leading-loose">{collection.user?.name}</h2>
                </div>
                    <h2 className="text-gray-600 text-xs font-medium leading-loose">Class</h2>
            </div>
            <div className="flex justify-between">
                <h1 className="font-black leading-loose">{collection.name}</h1>
                {/* <Link href="abc" className="bg-cyan-400 text-sm font-semibold px-2 py-1 rounded-lg">View</Link> */}
            </div>
    </div>
  )
}

export default CollectionRow