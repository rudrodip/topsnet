"use client";

import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Separator } from "@components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Pin } from "lucide-react";
import { useAuthContext } from "@context/AuthContext";
import { Button } from "@components/ui/button";

interface Creators {
  affiliation?: string;
  name: string;
  orcid?: string;
}
interface PaperCardProps {
  id: number;
  published: string;
  resource_type: string;
  access: string;
  title: string;
  creators: Creators[];
  liked?: boolean;
  pinned?: boolean;
  onLike?: () => void;
  onPin?: () => void;
}

const PaperCard = ({
  id,
  published,
  resource_type,
  access,
  title,
  creators,
  liked,
  pinned,
  onLike,
  onPin,
}: PaperCardProps) => {
  const { user } = useAuthContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="break-all">
          <div className="flex text-sm flex-wrap my-1">
            <p className="rounded-sm bg-blue-500 p-1 mr-1">{published}</p>
            <p className="rounded-sm bg-gray-500 p-1 mr-1">
              {resource_type.toUpperCase()}
            </p>
            <p className="rounded-sm bg-green-600 p-1 mr-1">
              {access.toUpperCase()}
            </p>
          </div>
          <div className="flex justify-between table-fixed">
            <Link href={`/record/${id}`}>
              {title}
            </Link>
            {user && onLike && (
              <div className="flex-col items-center my-3 space-y-4">
                <Heart
                  className="cursor-pointer"
                  onClick={onLike}
                  fill={liked ? "red" : "none"}
                />
                <Pin
                  className="cursor-pointer"
                  onClick={onPin}
                  fill={pinned ? "white" : "none"}
                />
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">Contributors</p>
        <Separator />
        <div className="flex flex-wrap my-2">
          {creators?.map((elem, index) => {
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="rounded-sm p-1 mr-1 text-sm my-1">
                      {elem["name"]}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    {elem?.affiliation && (
                      <p>Affiliation: {elem.affiliation}</p>
                    )}
                    {elem?.orcid && <p>ORCID: {elem.orcid}</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
