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
import { createClient } from "@/utils/supabase/client"

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                router.push('/site')
            }
        }
        getUser()
    }, [])

    async function signIn(e) {
        e.preventDefault()
        setMessage({ text: "Fazendo o login...", color: "gray" })

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            // Invalid login credentials
            setMessage({ text: "Error ao logar, dados invalidos", color: "red" })
        } else {
            router.push('/site')
        }
    }

    async function signUp() {
        setMessage({ text: "Fazendo o cadastro...", color: "gray" })

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            setMessage({ text: "Erro ao cadastrar, email já cadastrado.", color: "red" })
        } else {
            setMessage({ text: "Cadastrado com sucesso.", color: "green" })
            // signIn({preventDefault:()=>{}})
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <Card className="mx-auto max-w-sm w-[100%]">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Entre com seu email e senha abaixo para logar na sua conta
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
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Logar
                            </Button>
                        </div>
                    </form>

                    {message &&
                        <div className="mt-4 text-center text-sm" style={{ color: message.color }}>
                            {message.text}
                        </div>
                    }

                    <div className="mt-4 text-center text-sm">
                        Não é cadastrado?{" "}
                        <button onClick={signUp} className="underline">
                            Cadastrar-se com os dados atuais
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
