
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabaseClient from "@/service/supabaseClient"
import { Button } from '@/components/ui/button'

export default function SitePage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  async function signOut() {
    await supabaseClient.auth.signOut()
    router.push('/')
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession()

      if (error) {
        router.push('/') 
      }

      if (session) {
        setUser(session.user)
      } else {
        router.push('/')
      }
    }

    getUser()
  }, [])

  if (!user) {
    return (
      <div class="h-screen flex flex-col justify-center items-center">
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <div class="h-screen flex flex-col justify-center items-center">
      <h1>Bem-vindo, {user.email}</h1>
      <Button onClick={signOut}>
        Logout
      </Button>
    </div>
  )
}
