
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation';

export default function PaginasLayout({ children }) {
    const pathname = usePathname(); 
    const supabase = createClient()
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [deslogando, setDeslogando] = useState("Deslogar")

    async function deslogar() {
        setDeslogando("Deslogando...")
        await supabase.auth.signOut()
        router.replace('/')
    }

    function irParaOInicio(){
        router.push('/site')
    }

    useEffect(() => {
        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                if (session) {
                    setUser(session.user)
                }
            })
            .catch(error => {
                console.log('Erro ao obter sessão:', error);
            });
    }, [pathname])

    if (!user) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (<>
        <div className="h-screen flex flex-col">
            <header className="relative flex p-4 bg-gray-800 text-white">
                {pathname != "/site" &&
                    <Button onClick={irParaOInicio}>
                        Inicio
                    </Button>
                }

                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-lg">
                    {user.email}
                </div>

                <Button className="ml-auto" onClick={deslogar}>
                    {deslogando}
                </Button>
            </header>

            {children}
        </div>
    </>)
}
