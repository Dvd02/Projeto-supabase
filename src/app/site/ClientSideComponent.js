
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function ClientSideComponent({ user }) {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Bem-vindo, {user.email}</h1>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
