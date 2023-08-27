"use client";

import { useState, useEffect } from "react";
import zenodoApi from "@src/apiWrapper/zenodoApiWrapper";
import { Hit } from "@src/apiWrapper/types";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import ChatWindow from "@components/Chat/ChatOptions";
import ShareSocial from "@components/ShareSocials";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Hit | null>(null);

  useEffect(() => {
    zenodoApi
      .getRecord(params.id)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [params.id]);

  const title = data?.metadata.title;
  return (
    <>
      <div className="flex flex-col justify-start lg:ml-24">
        <div className="my-5 max-w-4xl mx-3">
          <h1 className="head_text">{title}</h1>
          <div className="flex my-4">
            <Image
              src={data?.links.badge || ""}
              alt=""
              width={200}
              height={50}
            />
            <p className="rounded-sm p-1 mr-1 bg-green-600 w-32 text-sm mx-3">
              Access: {data?.metadata.access_right.toUpperCase()}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 bg-secondary rounded-lg bg-opacity-60 backdrop-blur-lg p-5">
            <p className="rounded-sm p-1 mr-1">
              Publication date: {data?.metadata.publication_date}
            </p>
            <p className="rounded-sm p-1 mr-1">
              Resource type: {data?.metadata.resource_type.title.toUpperCase()}
            </p>
            <p className="rounded-sm p-1 mr-1">
              Type: {data?.metadata.resource_type.type.toUpperCase()}
            </p>
            <p className="rounded-sm p-1 mr-1">
              File type:{" "}
              <a
                href={data?.files?.[0].links.self}
                target="_blank"
                className="underline"
              >
                {data?.files?.[0].type.toUpperCase()}
              </a>
            </p>
            <p className="rounded-sm p-1 mr-1">ID: {data?.id}</p>
            <p className="rounded-sm p-1 mr-1">
              Downloads: {data?.stats.downloads}
            </p>
            <p className="rounded-sm p-1 mr-1">Views: {data?.stats.views}</p>
            <a
              className="rounded-sm p-1 mr-1 underline"
              href={data?.links.html}
            >
              View Record
            </a>
            <p className="rounded-sm p-1 mr-1">
              Versions: {data?.metadata.relations.version?.[0].count}
            </p>
          </div>
          <h1 className="font-bold text-xl my-2">Creators</h1>
          <div className="flex flex-wrap my-2">
            {data?.metadata.creators.map((elem, index) => {
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="bg-secondary rounded-sm p-1 mr-1 text-sm my-1">
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
          <h1 className="tracking-wide text-2xl my-6 font-bold">Description</h1>
          <article
            className="prose lg:prose-xl text-primary"
            dangerouslySetInnerHTML={{
              __html: data?.metadata.description || "",
            }}
          ></article>
          <p className="text-sm underline mt-4">Keywords:</p>
          <div className="flex flex-wrap">
            {data?.metadata.keywords?.map((elem) => {
              return (
                <p
                  key={data["metadata"]["keywords"]?.indexOf(elem)}
                  className="rounded-sm bg-gray-600 p-1 mr-1 text-sm my-1"
                >
                  {elem}
                </p>
              );
            })}
          </div>
        </div>
        <div className="mx-3 my-3 md:my-10 xl:fixed right-0 top-5 static">
          {data?.metadata?.journal?.title && (
            <div className="container mx-auto max-w-4xl rounded-lg bg-opacity-50 backdrop-blur-lg p-5 my-5">
              <h1 className="">
                Published in: {data?.metadata?.journal?.title}
              </h1>
              <h1 className="">
                Community:
                <a
                  className="underline"
                  href={`https://zenodo.org/communities/${
                    data["metadata"]?.["communities"] &&
                    data["metadata"]?.["communities"][0]["id"]
                  }`}
                >
                  {data.metadata?.journal?.title}
                </a>
              </h1>
            </div>
          )}
          {data?.files && (
            <div className="text-sm container mx-auto max-w-4xl rounded-lg bg-opacity-50 backdrop-blur-lg p-5 my-5">
              <h1 className="text-center font-bold text-xl mb-2 underline">
                Files
              </h1>
              <div className="">
                <div className="flex justify-between">
                  <p>Name</p>
                  <p>Size (MB)</p>
                  <p>Download</p>
                </div>
                {data?.files?.map((file, index) => {
                  return (
                    <div key={index} className="flex justify-between">
                      <p>{file.key}</p>
                      <p>{(file.size * 1e-6).toFixed(3)}MB</p>
                      <a className="underline" href={file["links"]["self"]}>
                        Download
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <ShareSocial />
        </div>
        <ChatWindow recordDesc={data?.metadata.description.toString()} />
      </div>
    </>
  );
}
