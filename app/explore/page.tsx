'use client'

import React, { useState, useEffect } from 'react'
import Tag from "@components/Tag"
import PaperCard from '@components/Papers/PaperCard'
import LoadSpinner from '@components/LoadSpinner'
import { ZenodoData } from '@src/apiWrapper/types'
import zenodoApi from '@src/apiWrapper/zenodoApiWrapper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useExplorerContext } from '@context/ExplorerContext'

const FormSchema = z.object({
  search: z.string().min(2, {
    message: "Search query must be at least 2 characters.",
  }),
  status: z.string().optional(),
  size: z.string().default("12"),
  sort: z.string().default("bestmatch"),
});

const Explore = () => {
  // query parameters
  const [page, setPage] = useState<number | undefined>(1)
  const [loading, setLoading] = useState<boolean>(false)

  // api response ZenodoData
  const { data: contextData, setData: setContextData } = useExplorerContext();
  const [data, setData] = useState<ZenodoData | null>(contextData);
  
  useEffect(() => {
    setData(contextData);
  }, [contextData]);  

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const fetchData = (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    zenodoApi
      .getRecords({
        q: data.search,
        sort: data.sort,
        page: page,
        size: parseInt(data.size),
        ...(data.status && { status: data.status })
      })
      .then(res => {
        setData(res);
        setContextData(res)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };


  function onSubmit(data: z.infer<typeof FormSchema>) {
    fetchData(data)
  }

  return <>
    <div className="my-5 mx-1">
      <h1 className="text-center font-extrabold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl">Explore</h1>
      <div className="lg:flex justify-center items-center my-5 hidden">
        <div className="flex flex-wrap justify-evenly">
          <Tag url="https://google.com" text="Neural Network" />
          <Tag url="https://google.com" text="Transformers" />
          <Tag url="https://google.com" text="Linear Algebra" />
          <Tag url="https://google.com" text="Activation Functions" />
          <Tag url="https://google.com" text="Quantum Mechanics" />
          <Tag url="https://google.com" text="Physics Engine" />
          <Tag url="https://google.com" text="AlphaZero" />
          <Tag url="https://google.com" text="Reinforcement Learning" />
        </div>
      </div>
      <div className="container mx-auto my-3">
        <div className='flex flex-wrap flex-col md:flex-col align-middle items-center justify-evenly my-3'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-2 md:space-y-6">
              <FormField
                control={form.control}
                name="search"
                defaultValue=''
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Search" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-evenly flex-wrap w-full lg:max-w-7xl'>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sort" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bestmatch">Best Match</SelectItem>
                          <SelectItem value="mostrecent">Most Recent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result per page</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <div className='flex my-3 justify-center flex-wrap'>
          <p>Recommended: </p>
          <a href="" className='underline mx-2'>Neural Network</a>
          <a href="" className='underline mx-2'>Neural Network</a>
          <a href="" className='underline mx-2'>Neural Network</a>
        </div>
      </div>
      <div className='container mx-auto'>
        {loading && <LoadSpinner />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data &&
            Array(data['hits']['hits'].length).fill(null).map((_, index) => {
              return (
                <PaperCard
                  key={index}
                  id={data['hits']['hits'][index]['id']}
                  published={data['hits']['hits'][index]['metadata']['publication_date']}
                  resource_type={data['hits']['hits'][index]['metadata']['resource_type']['title']}
                  access={data['hits']['hits'][index]['metadata']['access_right']}
                  title={data['hits']['hits'][index]['metadata']['title']}
                  creators={data['hits']['hits'][index]['metadata']['creators']}
                />
              )
            }
            )}
        </div>
      </div>
    </div>
  </>
}

export default Explore