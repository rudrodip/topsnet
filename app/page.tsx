'use client'

import React, { useState, useEffect } from 'react'
import Navbar from "@components/Navbar"
import HeroSection from "@components/HeroSection"
import TrendingSection from "@components/TrendingSection"
import PaperSection from "@components/PaperSection"
import { ZenodoData } from "@src/apiWrapper/types"
import zenodoApi from "@src/apiWrapper/zenodoApiWrapper"

export default function Home() {
  const [data, setData] = useState<ZenodoData | null>(null)

  useEffect(() => {
    zenodoApi.getRecords({ q: "physics", size: 1 })
      .then(res => setData(res))
  }, [])

  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="container">
        <TrendingSection />
      </div>
      <PaperSection />
    </div>
  )
}
