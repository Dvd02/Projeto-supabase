
'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label";

export default function Indicado() {
    const supabase = createClient()
    const router = useRouter()
    const telefone = localStorage.getItem('telefone');
    const [dados, setDados] = useState(null)
    const [estaCarregando, setEstaCarregando] = useState(true)

    useEffect(()=>{
        supabase.from('prestadores').select('*').eq('telefone', telefone)
            .then(({ data, error })=>{
                setEstaCarregando(false)

                if (error) {
                    return ;
                }
                
                setDados(data[0])
            });
    },[])

    if (estaCarregando){
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <h1>Carregando pesquisa de indicado...</h1>
            </div>
        )
    }

    return (<>
        <div className="flex-1 flex flex-col justify-center items-center">
            <Card className="mx-auto max-w-sm w-[100%]">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        {dados ?
                            dados.nome
                        :
                            "Prestador não encontrado."
                        }
                    </CardTitle>
                </CardHeader>

                <CardContent>  
                    <Label>Telefone</Label>
                    <Text>{telefone}</Text>

                    {dados && <>
                        <Label>Cidade</Label>
                        <Text>{dados.cidade}</Text>

                        <Label>Sexo</Label>
                        <Text>{dados.sexo}</Text>

                        <Label>Servicos</Label>
                        <Text>{dados.servicos && dados.servicos.join(", ")}</Text>
                    </>}

                    {!dados && <>
                        <Button onClick={()=>{router.push('/cadastrar-indicado')}} className="w-full mt-4">
                            Cadastar novo prestador
                        </Button>
                    </>}

                    <Button onClick={()=>{router.back()}} className="w-full mt-4">
                        Voltar
                    </Button>
                </CardContent>
            </Card>
        </div>
    </>)
}
