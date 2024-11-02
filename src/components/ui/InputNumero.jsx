
import { Input } from "@/components/ui/input"

export function getTelefone(telefone){
    return telefone.replace(" ","*").replace(" ","").replace("*"," ")
}

export default function InputNumero({telefone, setTelefone}){
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

    return (
        <Input
            type="text"
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={digitaTelefone}
            pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4} "
            required
            className="mt-3 mb-3"
        />
    )
}
