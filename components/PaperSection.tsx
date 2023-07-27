import React from "react"
import { Skeleton } from "@components/ui/skeleton"
import { Separator } from "@components/ui/separator"
import PaperCard from "./Papers/PaperCard"
import { ZenodoData } from "@src/apiWrapper/types"

interface PaperSectionProps {
  data: ZenodoData | null
}

export default function PaperSection({ data }: PaperSectionProps) {
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
                  contributors={data['hits']['hits'][index]['metadata']['creators']}
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

interface TagProps {
  text: string;
  url: string;
}

const Tag: React.FC<TagProps> = ({ text, url }) => {
  return (
    <a href={url} className="inline-block py-2 px-4 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-100 transition duration-200 ease-in-out">
      {text}
    </a>
  );
};