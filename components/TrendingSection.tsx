import { Skeleton } from "@components/ui/skeleton"

export default function TrendingSection() {
  return (
    <div>
      <h1 className="text-md">📈 Trending on TOPSnet</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <TrendCard />
        <TrendCard />
        <TrendCard />
        <TrendCard />
        <TrendCard />
        <TrendCard />
      </div>
    </div>
  )
}


const TrendCard = () => {
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