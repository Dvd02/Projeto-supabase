
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Site() {
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

    return (<>
        <div className="h-screen flex flex-col">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <div/>
                
                <div className="text-lg">
                    {user.email}
                </div>

                <Button onClick={signOut}>
                    Logout
                </Button>
            </header>
            
            <div className="p-5 flex-1 flex flex-col justify-between items-center">
                <Image
                    src="/imagem-inicio.png"
                    width={450}
                    height={450}
                    alt="Imagem do inicio"
                />

                <div className="w-full flex flex-col items-center">
                    <p className="text-white py-3 px-2 text-lg md:text-xl">
                        Gostou de um serviço? Indique o(a) prestador(a)
                    </p>

                    <button onClick={()=>{ router.push('/indicar')}} className="bg-white text-black py-2 px-5 rounded-full hover:bg-gray-800 text-lg md:text-xl">
                        Vamos lá
                    </button>
                </div>
            </div>
        </div>
    </>)
}
