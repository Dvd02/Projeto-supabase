"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

export default function SelectAutocomplet({ arrayOpcoes, opcaoSelecionada, setOpcaoSelecionada, pesquisaMinima = 3 }) {
  const [open, setOpen] = React.useState(false)
  const [pesquisa, setPesquisa] = React.useState("")

  const resultadosFiltradosPelaPesquisa = React.useMemo(() => {
    if (pesquisa.length < pesquisaMinima) return [];

    return arrayOpcoes.filter((elemento) =>
      elemento.toLowerCase().includes(pesquisa.toLowerCase())
    );
  }, [pesquisa]);

  return (<>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full mx-auto justify-between"
        >
          {opcaoSelecionada ?
            opcaoSelecionada
            :
            "Selecione..."
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          <Input
            value={pesquisa}
            placeholder="Pesquise..."
            onChange={(e) => { setPesquisa(e.target.value) }}
            required
          />

          <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            {resultadosFiltradosPelaPesquisa.length == 0 ?
              <p className="p-6 text-center text-sm">Ainda não foi encontrado nada...</p>
              :
              <div className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                {resultadosFiltradosPelaPesquisa.map((elemento) => (
                  <div
                    className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                    key={elemento}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpcaoSelecionada(elemento)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        opcaoSelecionada === elemento ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {elemento}
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </>)
}

