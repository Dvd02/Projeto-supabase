
import { redirect } from 'next/navigation'
import { createClienteServer } from '@/utils/supabase/server'
import ClientSideComponent from './ClientSideComponent'

export default async function SitePage() {
  const supabase = createClienteServer()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <ClientSideComponent user={data.user} />
  )
}
