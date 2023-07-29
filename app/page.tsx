import Navbar from "@components/Navbar"
import HeroSection from "@components/HeroSection"
import TrendingSection from "@components/TrendingSection"
import PaperSection from "@components/PaperSection"
import { ZenodoData } from "@src/apiWrapper/types"
import zenodoApi from "@src/apiWrapper/zenodoApiWrapper"

export default async function Home() {
  const data: ZenodoData = await zenodoApi.getRecords({ q: "neuralnetwork", size: 20 })
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="container">
        <TrendingSection />
      </div>
      <PaperSection data={data} />
    </div>
  )
}
