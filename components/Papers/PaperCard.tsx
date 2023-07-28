'use client'

import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip"
import { useAuthContext } from "@context/AuthContext"
import { addLike, removeLike, addPinned, removePinned } from "@src/firebase/firestore_utils"
import { Heart, Pin } from "lucide-react"
import { useState } from "react"

interface Creators {
  affiliation?: string,
  name: string,
  orcid?: string
}
interface PaperCardProps {
  id: number,
  published: string,
  resource_type: string,
  access: string,
  title: string,
  creators: Creators[],
}

const PaperCard = ({ id, published, resource_type, access, title, creators }: PaperCardProps) => {
  const { user } = useAuthContext()
  const [liked, setLiked] = useState<boolean>(false)
  const [pinned, setPinned] = useState<boolean>(false)

  const handleLike = () => {
    liked ? removeLike(user, id) : addLike(user, id)
    setLiked(!liked)
  }

  const handlePin = () => {
    pinned ? removePinned(user, id) : addPinned(user, id)
    setPinned(!pinned)
  }

  return (
    <div className="flex justify-between bg-gray-700 bg-opacity-40 backdrop-blur-lg max-w-xl p-4 rounded-lg text-gray-300 hover:bg-gray-900 delay-75 transition-all ease-in-out m-2 z-10">
      <div>
        <div className="flex text-sm flex-wrap">
          <p className="rounded-sm bg-blue-600 p-1 mr-1">{published}</p>
          <p className="rounded-sm bg-gray-500 p-1 mr-1">{resource_type.toUpperCase()}</p>
          <p className="rounded-sm bg-green-600 p-1 mr-1">{access.toUpperCase()}</p>
        </div>
        <Link href={`/record/${id}`}>
          <h1 className="hover:text-white text-lg font-bold my-2">{title}</h1>
        </Link>
        <p>Contributors</p>
        <div className="flex flex-wrap my-2">
          {creators?.map((elem, index) => {
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="rounded-sm bg-gray-600 p-1 mr-1 text-sm my-1">{elem['name']}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    {elem?.affiliation && <p>Affiliation: {elem.affiliation}</p>}
                    {elem?.orcid && <p>ORCID: {elem.orcid}</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </div>
      {user && <div className="flex-col items-center my-3 space-y-4">
        <Heart className="curson-pointer" onClick={handleLike} fill={liked ? 'red' : 'none'} />
        <Pin className="curson-pointer" onClick={handlePin} fill={pinned ? 'white' : 'none'} />
      </div>
      }
    </div>
  );
};

export default PaperCard