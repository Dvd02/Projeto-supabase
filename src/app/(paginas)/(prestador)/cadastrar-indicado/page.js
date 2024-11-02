
'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import InputNumero from "@/components/ui/InputNumero";

export default function CadastarIndicado() {
    const supabase = createClient()
    const router = useRouter()

    const [telefone, setTelefone] = useState(localStorage.getItem('telefone')+" " || '(XX) XXXXX-XXXX ')
    const [nome, setNome] = useState('')
    const [sexo, setSexo] = useState('Indefinido')
    const [cidade, setCidade] = useState('')
    const [servicos, setServicos] = useState('')
    const [mensagem, setMensagem] = useState({})

    async function cadastrar(e) {
        e.preventDefault();
    
        setMensagem({ texto: "Cadastrando...", cor: "gray" });
    
        const { error } = await supabase.from('prestadores').insert([{ nome: nome, telefone: getTelefone(telefone), cidade: cidade, sexo: sexo, servicos: servicos.replaceAll(", ",",").split(",") }]);
    
        if (error) {
            if (error.message.includes("duplicate key value")) {
                setMensagem({ texto: "Esse número já está sendo usado.", cor: "red" });
                return;
            }

            setMensagem({ texto: "Erro ao inserir prestador.", cor: "red" });
            return;
        }

        localStorage.setItem('telefone', getTelefone());
        setMensagem({ texto: "Novo usuário cadastrado.", cor: "green" });    
    }
    

    return (<>
        <div className="flex-1 flex flex-col justify-center items-center">
            <Card className="mx-auto max-w-sm w-[100%]">
                <CardHeader> 
                    <CardTitle>
                        Cadastro de prestador
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={cadastrar}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Nome</Label>
                                <Input
                                    id="nome"
                                    value={nome}
                                    onChange={(e)=>{setNome(e.target.value)}}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="telefone">Numero de Telefone</Label>
                                <InputNumero telefone={telefone} setTelefone={setTelefone}/>
                            </div>

                            <div className="grid gap-2">
                                <Label>Cidade</Label>
                                <Input
                                    id="cidade"
                                    value={cidade}
                                    onChange={(e)=>{setCidade(e.target.value)}}
                                    required
                                />
                            </div>
                                   
                            <div className="grid gap-2">     
                                <Label>Sexo</Label>
                                <Select
                                    id="opcoes"
                                    value={sexo}
                                    onChange={(e)=>{setSexo(e.target.value)}}
                                >
                                    <option value="Indefinido">Prefiro não dizer</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </Select>
                            </div>
                                
                            <div className="grid gap-2">
                                <Label>Servicos</Label>
                                <Input
                                    id="servicos"
                                    value={servicos}
                                    onChange={(e)=>{setServicos(e.target.value)}}
                                    placeholder="Serviço 1, Serviço 2"
                                    required
                                />
                            </div>
                            
                            <Button type="submit" className="w-full">
                                Cadastar
                            </Button>
                        </div>
                    </form>
                    
                    {mensagem &&
                        <div className="mt-4 text-center text-sm" style={{ color: mensagem.cor }}>
                            {mensagem.texto}
                        </div>
                    }

                    <Button onClick={()=>{router.push('/indicar')}} className="w-full mt-4">
                        Concluir
                    </Button>
                </CardContent>
            </Card>
        </div>
    </>)
}
