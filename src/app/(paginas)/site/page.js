
'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image"

export default function Site() {
    const router = useRouter()

    function indicar(){
        router.push('/indicar')
    }

    return (<>
        <div className="p-5 flex-1 flex flex-col justify-between items-center">
            <Image
                src="/imagem-inicio.png"
                width={400}
                height={400}
                alt="Imagem do inicio"
            />

            <div className="w-full flex flex-col items-center">
                <p className="text-white py-3 px-2 text-lg md:text-xl">
                    Gostou de um serviço? Indique o(a) prestador(a)
                </p>

                <button onClick={indicar} className="bg-white text-black py-2 px-5 rounded-full hover:bg-gray-800 text-lg md:text-xl">
                    Vamos lá
                </button>

                <button onClick={()=>{router.push("pesquisar-prestadores")}} className="mt-5 bg-white text-black py-2 px-5 rounded-full hover:bg-gray-800 text-lg md:text-xl">
                    pesquisar por prestadores de serviço
                </button>
            </div>
        </div>
    </>)
}
