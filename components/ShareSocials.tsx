import { Facebook, Inspect, Instagram, Twitter } from 'lucide-react'
import React from 'react'

type Props = {}

const ShareSocial = (props: Props) => {
  return (
    <div className='bg-gray-800 text-gray-300 text-sm container mx-auto max-w-4xl rounded-lg bg-opacity-50 backdrop-blur-lg p-5 my-5'>
      <Facebook />
      <Twitter />
      <Instagram />
    </div>
  )
}

export default ShareSocial