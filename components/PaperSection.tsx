'use client'

import React from "react"
import { Skeleton } from "@components/ui/skeleton"
import { Separator } from "@components/ui/separator"
import PaperCard from "./Papers/PaperCard"
import { ZenodoData } from "@src/apiWrapper/types"
import Tag from "./Tag"
import { useExplorerContext } from "@context/ExplorerContext"

interface PaperSectionProps {
  data: ZenodoData | null
}

export default function PaperSection({ data }: PaperSectionProps) {
  const { liked, pinned, addToLiked, removeFromLiked, addToPinned, removeFromPinned } = useExplorerContext();
  return (
    <div>
      <Separator className="my-10" />
      <div className="lg:flex lg:flex-row-reverse justify-evenly">
        <div className="m-3">
          <h1 className="text-lg">🔎 Discover more!</h1>
          <Separator className="my-5" />
          <div className="grid grid-cols-3 gap-4">
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
            <Tag text="Neural Network" url="" />
          </div>
        </div>
        <div>
          {data === null ? (
            Array(20).fill(null).map((_, index) => <ResearchPaper key={index} />)
          ) : (
            Array(data['hits']['hits'].length).fill(null).map((_, index) => {
              return (
                <PaperCard
                  key={index}
                  id={data['hits']['hits'][index]['id']}
                  published={data['hits']['hits'][index]['metadata']['publication_date']}
                  resource_type={data['hits']['hits'][index]['metadata']['resource_type']['title']}
                  access={data['hits']['hits'][index]['metadata']['access_right']}
                  title={data['hits']['hits'][index]['metadata']['title']}
                  creators={data['hits']['hits'][index]['metadata']['creators']}
                  liked={liked?.includes(data['hits']['hits'][index]['id'])} // Check if the id is present in the liked array
                  pinned={pinned?.includes(data['hits']['hits'][index]['id'])} // Check if the id is present in the pinned array
                  onLike={() => {
                    if (liked?.includes(data['hits']['hits'][index]['id'])) {
                      removeFromLiked(data['hits']['hits'][index]['id']);
                    } else {
                      addToLiked(data['hits']['hits'][index]['id']);
                    }
                  }}
                  onPin={() => {
                    if (pinned?.includes(data['hits']['hits'][index]['id'])) {
                      removeFromPinned(data['hits']['hits'][index]['id']);
                    } else {
                      addToPinned(data['hits']['hits'][index]['id']);
                    }
                  }}
                />
              )
            }
            )
          )}
        </div>
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