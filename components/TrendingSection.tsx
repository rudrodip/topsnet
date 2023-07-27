import { Skeleton } from "@components/ui/skeleton"
import PaperCard from "./Papers/PaperCard"
import { ZenodoData } from "@src/apiWrapper/types"

interface TrendingSectionProps {
  data: ZenodoData | null
}

export default function TrendingSection({ data }: TrendingSectionProps) {
  return (
    <div>
      <h1 className="text-md">📈 Trending on TOPSnet</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data === null ? (
          Array(6).fill(null).map((_, index) => <TrendCard key={index} />)
        ) : (
          Array(6).fill(null).map((_, index) => {
            return (
              <PaperCard
                key = {index}
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
  )
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
  )
}