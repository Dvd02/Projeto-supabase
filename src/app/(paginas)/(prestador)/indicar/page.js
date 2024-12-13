
'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputNumero, { getTelefone } from "@/components/desenvolvidos/InputNumero"

export default function Indicar() {
    const router = useRouter()
    const [telefone, setTelefone] = useState(localStorage.getItem('telefone') ? localStorage.getItem('telefone')+" " : '(XX) XXXXX-XXXX ')

    function proximo(e) {
        e.preventDefault()
        localStorage.setItem('telefone', getTelefone(telefone));
        router.push('/indicado')
    }

    return (<>
        <div className="p-5 flex-1 flex flex-col justify-center items-center">
            <Card className="mx-auto max-w-sm w-[100%]">
                <CardHeader>
                    <CardTitle className="text-2xl">Indicar</CardTitle>
                    <CardDescription>
                        Informe abaixo o numero de telefone do prestador de serviço
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={proximo}>
                        <Label htmlFor="telefone">Numero de Telefone</Label>

                        <InputNumero telefone={telefone} setTelefone={setTelefone}/>

                        <Button type="submit" className="w-full">
                            Procurar prestador por esse numero
                        </Button>
                    </form>

                    <Button onClick={()=>{router.back()}} className="w-full mt-4">
                        Voltar
                    </Button>
                </CardContent>
            </Card>
        </div>
    </>)
}
