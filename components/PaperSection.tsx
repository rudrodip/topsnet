'use client'

import React, { useEffect, useState } from "react"
import { Skeleton } from "@components/ui/skeleton"
import { Separator } from "@components/ui/separator"
import PaperCard from "./Papers/PaperCard"
import { ZenodoData } from "@src/apiWrapper/types"
import Tag from "./Tag"
import { useExplorerContext } from "@context/ExplorerContext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@src/firebase/config"

interface PaperSectionProps {
  data: ZenodoData | null
}

const getTrendingKeywords = async () => {
  const trendingRef = doc(db, `trending/overall-trending`);
  const trendingIDs: { keywords: string[] } = (await getDoc(trendingRef)).data() as {
    keywords: string[];
  };
  return trendingIDs.keywords;
};

export default function PaperSection({ data }: PaperSectionProps) {
  const [keywords, setKeywords] = useState<string[] | null>(null)

  useEffect(() => {
    getTrendingKeywords().then(
      res => setKeywords(res)
    )
  }, [])

  const { liked, pinned, addToLiked, removeFromLiked, addToPinned, removeFromPinned } = useExplorerContext();
  return (
    <div>
      <Separator className="my-10" />
      <div className="flex justify-center my-10">
        <div className="m-3 max-w-xl">
          <h1 className="text-lg">🔎 Discover more!</h1>
          <Separator className="my-5" />
          <div className="grid grid-cols-3 gap-4">
            {keywords ? keywords.map((word, index) => {
              return (
                <Tag key={index} text={word} url={`/explore/${word}`} />
              )
            }) :
              Array(9).fill(null).map((_, index) => {
                return (
                  <p key={index} className="inline-block w-24 h-6 py-1 px-2 lg:py-2 lg:px-4 bg-secondary animate-pulse rounded-full shadow-md mx-1 my-1"></p>
                )
              })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto">
        {data === null ? (
          Array(20).fill(null).map((_, index) => <ResearchPaper key={index} />)
        ) : (
          Array(data.hits.hits.length).fill(null).map((_, index) => {
            return (
              <PaperCard
                key={index}
                id={data.hits.hits[index].id}
                published={data.hits.hits[index].metadata.publication_date}
                resource_type={data.hits.hits[index].metadata.resource_type.title}
                access={data.hits.hits[index].metadata.access_right}
                title={data.hits.hits[index].metadata.title}
                creators={data.hits.hits[index].metadata.creators}
                liked={liked?.includes(data.hits.hits[index].id)}
                pinned={pinned?.includes(data.hits.hits[index].id)}
                onLike={() => {
                  if (liked?.includes(data.hits.hits[index].id)) {
                    removeFromLiked(data.hits.hits[index].id);
                  } else {
                    addToLiked(data.hits.hits[index].id);
                  }
                }}
                onPin={() => {
                  if (pinned?.includes(data.hits.hits[index].id)) {
                    removeFromPinned(data.hits.hits[index].id);
                  } else {
                    addToPinned(data.hits.hits[index].id);
                  }
                }}
              />
            )
          }
          )
        )}
      </div>
    </div>
  )
}


const ResearchPaper = () => {
  return (
    <div className="flex items-center space-x-4 my-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}