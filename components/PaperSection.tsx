import React from "react"
import { Skeleton } from "@components/ui/skeleton"
import { Separator } from "@components/ui/separator"

export default function PaperSection() {
  return (
    <div>
      <Separator className="my-10" />
      <div className="flex justify-around">
        <div>
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
          <ResearchPaper />
        </div>
        <div>
          <h1 className="text-lg">Discover more!</h1>
          <Separator className="my-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
            <Tag text="Neural Network" url=""/>
          </div>
        </div>
      </div>
    </div>
  )
}


const ResearchPaper = () => {
  return (
    <div className="flex items-center space-x-4 my-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
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