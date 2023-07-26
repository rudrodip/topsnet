'use client'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@components/ui/tabs"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@components/ui/card"

import { Button } from "@components/ui/button"

import React, { useState, SyntheticEvent } from 'react'

import signInWithGoogle from "@src/firebase/auth/signInWithGoogle"
import signInWithFB from "@src/firebase/auth/signInWithFB"
import signInWithGithub from "@src/firebase/auth/signInWIthGithub"
import { useAuthContext } from "@context/AuthContext"
import { useRouter } from "next/navigation"

export default function Signin() {
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuthContext()
  const router = useRouter()

  const handleGoogleSignIn = (e: SyntheticEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      signInWithGoogle()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleFBsignIn = (e: SyntheticEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      signInWithFB()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleGithubSignIn = (e: SyntheticEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      signInWithGithub()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  user && router.push('/')
  if (!user) return (
    <div className="flex justify-center align-middle items-center h-screen">
      <Tabs defaultValue="signin" className="w-[400px] my-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Stay connected by signing in. Access your profile and connect with others.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex justify-center flex-col">
              <Button onClick={handleGoogleSignIn} disabled={loading}>Continue with Google</Button>
              <Button onClick={handleFBsignIn} disabled={loading}>Continue with Facebook</Button>
              <Button onClick={handleGithubSignIn} disabled={loading}>Continue with Github</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Join Our Community: Become a part of our growing community and connect with like-minded individuals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex justify-center flex-col">
              <Button onClick={handleGoogleSignIn} disabled={loading}>Continue with Google</Button>
              <Button onClick={handleFBsignIn} disabled={loading}>Continue with Facebook</Button>
              <Button onClick={handleGithubSignIn} disabled={loading}>Continue with Github</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}