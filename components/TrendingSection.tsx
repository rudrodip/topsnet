'use client'

import { Skeleton } from "@components/ui/skeleton";
import PaperCard from "./Papers/PaperCard";
import { useExplorerContext } from "@context/ExplorerContext";

export default function TrendingSection() {
  const { data, liked, pinned, addToLiked, removeFromLiked, addToPinned, removeFromPinned } = useExplorerContext();
  return (
    <div>
      <h1 className="text-md">📈 Trending on TOPSnet</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data === null ? (
          Array(6).fill(null).map((_, index) => <TrendCard key={index} />)
        ) : (
          Array(data.hits.hits.length).fill(null).map((_, index) => {
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
            );
          })
        )}
      </div>
    </div>
  );
}

const TrendCard = () => {
  return (
    <div className="flex items-center space-x-4 my-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
