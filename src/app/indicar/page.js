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
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function Indicar() {
    const supabase = createClient()
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [numerosTelefone, setNumerosTelefone] = useState('')
    const [telefone, setTelefone] = useState('(XX) XXXXX-XXXX')

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

    async function proximo() {
        router.push('/site')
        // router.push('/indicado')
    }

    function digitaTelefone (e){
        let novoNumero = numerosTelefone

        if (e.target.value.length == 14){
            novoNumero = novoNumero.slice(0, -1)
            setNumerosTelefone(novoNumero)

        } else {
            const ultimaTeclaDigitada = e.target.value[15]
            const ultimoNumeroDigitado = ultimaTeclaDigitada.replace(/\D/g, '')
            if (novoNumero.length < 11 && ultimoNumeroDigitado != ''){
                novoNumero += ultimoNumeroDigitado
                setNumerosTelefone(novoNumero)
            }
        }

        let formatacaoTelefone = '(XX) XXXXX-XXXX'
        for (let i = 0; i < 11; i++) {
            if (novoNumero[i]){
                formatacaoTelefone = formatacaoTelefone.replace("X",novoNumero[i])
            }
        }
        setTelefone(formatacaoTelefone);
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <Button onClick={()=>{router.push("/site")}}>
                    Voltar
                </Button>

                <div className="text-lg">
                    {user.email}
                </div>

                <Button onClick={signOut}>
                    Logout
                </Button>
            </header>
            
            <div className="p-5 flex-1 flex flex-col justify-center items-center">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Indicar</CardTitle>
                        <CardDescription>
                            Informe abaixo o numero de telefone do prestador de serviço
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={proximo}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="telefone">Numero de Telefone</Label>
                                    <Input
                                        type="text"
                                        id="telefone"
                                        name="telefone"
                                        placeholder="(!!) !!!!!-!!!!"
                                        value={telefone}
                                        onChange={digitaTelefone}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
