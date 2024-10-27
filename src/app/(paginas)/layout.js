
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation';

export default function PaginasLayout({ children }) {
    const supabase = createClient()
    const router = useRouter()
    const [user, setUser] = useState(null)

    async function deslogar() {
        await supabase.auth.signOut()
        router.push('/')
    }

    function inicio(){
        router.push('/site')
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

    const pathname = usePathname(); 

    return (<>
        <div className="h-screen flex flex-col">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                {pathname != "/site" &&
                    <Button onClick={inicio}>
                        Inicio
                    </Button>
                }

                <div className="text-lg">
                    {user.email}
                </div>

                <Button onClick={deslogar}>
                    Deslogar
                </Button>
            </header>

            {children}
        </div>
    </>)
}
