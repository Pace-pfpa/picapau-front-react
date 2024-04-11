import { useState } from "react"




export const TriagemSapiensComponent = ({processosCount}) => {
    const [processosNumber, setProcesssoNumber] = useState(false)


    if(!processosCount){
        return null
    }

    return (
        <div className="ProcessosCount"><p>
            Processos Lidos: {processosCount}
            
        </p></div>
        
    )

}