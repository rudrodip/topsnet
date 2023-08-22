import { Skeleton } from "@components/ui/skeleton";
import PaperCard from "./Papers/PaperCard";
import { db } from "@src/firebase/config";
import { Hit } from "@src/apiWrapper/types";
import zenodoApi from "@src/apiWrapper/zenodoApiWrapper";
import { doc, getDoc } from "firebase/firestore";

const getTrending = async () => {
  const trendingRef = doc(db, `trending/overall-trending`);
  const trendingIDs: { trending: number[] } = (await getDoc(trendingRef)).data() as {
    trending: number[];
  };
  let data: Hit[] = [];
  // Use Promise.all to wait for all the Promises to resolve
  await Promise.all(
    trendingIDs.trending.map((id) =>
      zenodoApi
        .getRecord(id.toString())
        .then((res) => {
          data.push(res);
        })
        .catch((err) => console.log(err))
    )
  );
  return data;
};

export default async function TrendingSection() {
  const data = await getTrending()
  return (
    <div>
      <h1 className="text-md mx-3">📈 Trending on TOPSnet</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data ?
        data.map((data, index) => {
          return (
            <PaperCard
              key={index}
              id={data['id']}
              published={data.metadata.publication_date}
              resource_type={data.metadata.resource_type.title}
              access={data.metadata.access_right}
              title={data.metadata.title}
              creators={data.metadata.creators}
            />
          )
        })
        :
        Array(6).fill(null).map((_, index) => {
          return (
            <TrendCard key={index} />
          )
        })
      }
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
