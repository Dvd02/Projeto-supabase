'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import supabaseClient from "@/service/supabaseClient"

export default function Home() {
  const [email, setEmail] = useState('david2@gmail.com')
  const [password, setPassword] = useState('12345678')
  const [message, setMessage] = useState(null)
  const router = useRouter()
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession()

      if (session) {
        router.push('/site')
      }
    }
    getUser()
  }, [])
  
  async function signIn(e) {
    e.preventDefault()
    const { user, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      router.push('/site')
    }
  }

  async function signUp() {
    const { error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      setMessage("Error signing up")
    } else {
      setMessage("Sign up successful")
      // signIn({preventDefault:()=>{}})
    }
  }

  return (
    <div class="h-screen flex flex-col justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signIn}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full">
                sign up
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-red-500">
            {message && <p>{message}</p>}
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apost have an account?{" "}
            <button onClick={signUp} className="underline">
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
