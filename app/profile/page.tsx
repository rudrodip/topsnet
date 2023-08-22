'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@context/AuthContext"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Input } from '@components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { getUserData } from "@src/firebase/getUserData";
import { updateUserData } from "@src/firebase/createUserData";
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  openaikey: z.string().optional(),
  orcid: z.string().optional(),
});

interface UserData {
  liked: number[],
  pinned: number[],
  recommended: number[],
  openaikey?: string,
  orcid?: string,
}

function Page() {
  const { toast } = useToast()
  const { user } = useAuthContext()
  const [userData, setUserData] = useState<UserData | null>(null)

  getUserData(user).then(snapshot => setUserData(snapshot))

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const openaikey = data.openaikey
    const orcid = data.orcid
    const formData: {
      [x: string]: any;
    } = {}
    openaikey ? formData['openaikey'] = openaikey : ''
    orcid ? formData['orcid'] = orcid : ''
    updateUserData(user, formData)
      .then(() => {
        toast({
          title: "Successfully updated",
        })
      })
      .catch(err => {
        toast({
          title: "Oops, error",
          variant: "destructive"
        })
      })
  }

  if (user) {
    return (
      <div className="container mx-auto max-w-3xl mt-10">
        <Image
          src={user.photoURL || 'https://dummyimage.com/200x200'}
          alt={user.displayName || 'profile'}
          width={200}
          height={200}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-center">{user.displayName}</h1>
        <h1 className="text-center">
          <a className="text-gray-500" href={`mailto:${user.email}`}>{user.email}</a>
        </h1>
        <Card className="bg-gray-800 bg-opacity-40 rounded-xl backdrop-blur-lg my-10">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 flex justify-center flex-col">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="openaikey"
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OpenAI API Key</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder={userData?.openaikey || "OPENAI Key"} {...field} className="bg-gray-800 bg-opacity-30 shadow-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orcid"
                  defaultValue=''
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ORCID</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder={userData?.orcid || "e.g. 0009000676737078"} {...field} className="bg-gray-800 bg-opacity-30 shadow-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="flex justify-center align-middle items-center w-full min-h-screen text-3xl font-bold tracking-wide">
        <Link href='/signin' className="bg-gray-300 p-5 rounded-lg text-gray-800 shadow-lg hover:scale-105 transition-all ease-in-out delay-100 hover:-translate-y-2">
          Please sign in
        </Link>
      </div>
    )
  }
}

export default Page