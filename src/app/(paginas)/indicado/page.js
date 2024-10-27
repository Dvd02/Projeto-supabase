
'use client'

import { useState } from 'react';

export default function Indicado() {
    const [telefone, setTelefone] = useState(localStorage.getItem('telefone'));

    return (<>
        <h1 className="m-1">
            Telefone do prestador indicado: {telefone}
        </h1>
    </>)
}
