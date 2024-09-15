
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export default function SitePage() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState(null)

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      } 
    }
    getUser()
  }, [])

  if (!user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Bem-vindo, {user.email}</h1>
      <Button onClick={signOut}>
        Logout
      </Button>
    </div>
  )
}
