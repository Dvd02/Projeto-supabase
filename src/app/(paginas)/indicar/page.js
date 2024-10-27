
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

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Indicar() {
    const router = useRouter()
    const [telefone, setTelefone] = useState('(XX) XXXXX-XXXX ')

    function proximo(e) {
        e.preventDefault()
        localStorage.setItem('telefone', telefone);
        router.push('/indicado')
    }

    function digitaTelefone (e){
        let novoNumero = e.target.value.replace(/\D/g, '')

        if (e.target.value.length == 15){        
            novoNumero = novoNumero.slice(0, -1)
        }

        let formatacaoTelefone = '(XX) XXXXX-XXXX '
        for (let i = 0; i < 11; i++) {
            if (novoNumero[i]){
                formatacaoTelefone = formatacaoTelefone.replace("X",novoNumero[i])
            }
        }
        setTelefone(formatacaoTelefone);
    };

    return (<>
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
                                    value={telefone}
                                    onChange={digitaTelefone}
                                    pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4} "
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
    </>)
}
