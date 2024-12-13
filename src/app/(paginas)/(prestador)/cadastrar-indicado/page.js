
'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputNumero, { getTelefone } from "@/components/desenvolvidos/InputNumero";
import { cidadesEstados } from "@/dados/cidadesEstados";
import { servicos } from "@/dados/servicos";
import SelectAutocomplet from "@/components/desenvolvidos/SelectAutocomplet";

export default function CadastarIndicado() {
    const supabase = createClient()
    const router = useRouter()

    const [telefone, setTelefone] = useState(localStorage.getItem('telefone') ? localStorage.getItem('telefone') + " " : '(XX) XXXXX-XXXX ')
    const [nome, setNome] = useState('')
    const [genero, setGenero] = useState('')
    const [cidade, setCidade] = useState('')
    const [servico, setServico] = useState('')
    const [mensagem, setMensagem] = useState(null)
    
    async function cadastrar(e) {
        e.preventDefault();

        if (!cidade || ! servico || !genero || !nome){
            setMensagem({ texto: "Selecione os campos faltando.", cor: "red" });
            return
        }

        setMensagem({ texto: "Cadastrando...", cor: "gray" });

        const { error } = await supabase.from('prestadores').insert([{ nome: nome, telefone: getTelefone(telefone), cidade: cidade, sexo: genero, servicos: servico.split(",") }]);

        if (error) {
            if (error.message.includes("duplicate key value")) {
                setMensagem({ texto: "Esse número já está sendo usado.", cor: "red" });
                return;
            }

            setMensagem({ texto: "Erro ao inserir prestador.", cor: "red" });
            return;
        }

        localStorage.setItem('telefone', getTelefone(telefone));
        setMensagem({ texto: "Novo usuário cadastrado.", cor: "green" });
    }


    return (<>
        <div className="flex-1 flex flex-col justify-center items-center">
            <Card className="mx-auto max-w-sm my-5 w-[100%]">
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
                                    onChange={(e) => { setNome(e.target.value) }}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="telefone">Numero de Telefone</Label>
                                <InputNumero telefone={telefone} setTelefone={setTelefone} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Cidade</Label>
                                <SelectAutocomplet
                                    arrayOpcoes={cidadesEstados}
                                    opcaoSelecionada={cidade}
                                    setOpcaoSelecionada={setCidade}
                                    pesquisaMinima={3}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Sexo</Label>

                                <SelectAutocomplet
                                    arrayOpcoes={["Prefiro não dizer", "Masculino", "Feminino"]}
                                    opcaoSelecionada={genero}
                                    setOpcaoSelecionada={setGenero}
                                    pesquisaMinima={-1}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Servicos</Label>
                                <SelectAutocomplet
                                    arrayOpcoes={servicos}
                                    opcaoSelecionada={servico}
                                    setOpcaoSelecionada={setServico}
                                    pesquisaMinima={-1}
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

                    <Button onClick={() => { router.back() }} className="w-full mt-4">
                        { (mensagem && mensagem.cor == "green") ?
                            "Concluir"
                        :   
                            "Voltar"
                        }
                    </Button>
                </CardContent>
            </Card>
        </div>
    </>)
}
