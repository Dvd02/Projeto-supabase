
'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label";
import { cidadesEstados } from "@/dados/cidadesEstados";
import SelectAutocomplet from "@/components/desenvolvidos/SelectAutocomplet";
import { servicos } from "@/dados/servicos";

export default function Pesquisa() {
    const supabase = createClient()
    const router = useRouter()

    const [dados, setDados] = useState([])
    const [estaCarregando, setEstaCarregando] = useState(false)

    const [cidade, setCidade] = useState('')
    const [servico, setServico] = useState('')

    const pesquisar = async () => {
        setDados([])

        if (!cidade && !servico){
            return
        }

        setEstaCarregando(true)

        let resultado

        if (cidade && !servico){
            resultado = await supabase.from('prestadores').select('*').eq('cidade', cidade)
        }
        if (!cidade && servico){
            resultado = await supabase.from('prestadores').select('*').contains('servicos', [servico]);
        }
        if(cidade && servico){
            resultado = await supabase.from('prestadores').select('*').eq('cidade', cidade).contains('servicos', [servico])
        }

        const { data, error } = resultado
        setEstaCarregando(false)

        if (error) {
            return ;
        }
        
        setDados(data)
    }

    const apagaCidade = () => {
        if (cidade){
            setCidade('')
        }
    }

    const apagaServico = () => {
        if (servico){
            setServico('')
        }
    }

    return (<>
        <div className="flex-1 flex flex-col">
            <Card className="mx-auto max-w-sm w-[100%] my-5">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Pesquisar Prestador
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">  
                            <Label>Cidade</Label>
                            <div className="flex flex-row">
                                <SelectAutocomplet
                                    arrayOpcoes={cidadesEstados}
                                    opcaoSelecionada={cidade}
                                    setOpcaoSelecionada={setCidade}
                                    pesquisaMinima={3}
                                />
                                <Button className="w-max ml-1" onClick={apagaCidade}>
                                    X
                                </Button>
                            </div>
                        </div>
                        
                        <div className="grid gap-2">
                            <Label>Serviços:</Label>
                            <div className="flex flex-row">
                                <SelectAutocomplet
                                    arrayOpcoes={servicos}
                                    opcaoSelecionada={servico}
                                    setOpcaoSelecionada={setServico}
                                    pesquisaMinima={-1}
                                />  
                                <Button className="w-max ml-1" onClick={apagaServico}>
                                    X
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <Button className="flex-1" onClick={()=>{router.back()}}>
                            Voltar
                        </Button>

                        <div className="flex-1"/>
                        
                        <Button className="flex-1" onClick={pesquisar}>
                            Pesquisar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {estaCarregando ? 
                <h1 className="text-xl text-center">Carregando...</h1>
            :
                (dados.length ? 
                    <h1 className="text-xl text-center">Prestadores econtrados ({dados.length})</h1>
                :
                    <h1 className="text-xl text-center">Sem Prestadores econtrados</h1>
                ) 
            }

            {dados.map((prestador)=>(
                <Card className="mx-auto max-w-sm w-[100%] my-5" key={prestador.id}>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            {prestador.nome}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>  
                        <Label>Telefone</Label>
                        <Text>{prestador.telefone}</Text>

                        <Label>Cidade</Label>
                        <Text>{prestador.cidade}</Text>

                        <Label>Sexo</Label>
                        <Text>{prestador.sexo}</Text>

                        <Label>Serviços</Label>
                        <Text>{prestador.servicos && prestador.servicos.join(", ")}</Text>
                    </CardContent>
                </Card>
            ))}
        </div>
    </>)
}
