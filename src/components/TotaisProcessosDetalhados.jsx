import { useState, useEffect } from "react"

export const TotaisProcessosDetalhado = ({processos}, ) =>{
    const [totaisProcessos, setTotaisProcessos] = useState(0);
    const [totaisProcessosSucesso, setTotaisProcessosSucesso] = useState(0);
    const [totaisProcessosWarning, setTotaisProcessosWarning] = useState(0);
    const [totaisProcessosErro, setTotaisProcessosErro] = useState(0);
    
    useEffect(() => {
        let totaisProcessosSucessoVar = 0;
        let totaisProcessosWarningVar = 0;
        let totaisProcessosErrorVar = 0;
        let totaisProcessosVar = 0;
        const filtrar = async ()=> {
            for(let i = 0;i<processos.length; i++){
                if(processos[i].statusProcess == "src/assets/sucess.png"){
                    totaisProcessosSucessoVar = totaisProcessosSucessoVar + 1
                }
                if(processos[i].statusProcess === "src/assets/warning.png"){
                    totaisProcessosWarningVar = totaisProcessosWarningVar + 1
                }
                if(processos[i].statusProcess === "src/assets/error.png"){
                    totaisProcessosErrorVar = totaisProcessosErrorVar + 1
                }
                totaisProcessosVar = totaisProcessosVar + 1
            }
            setTotaisProcessosSucesso(totaisProcessosSucessoVar)
            setTotaisProcessosWarning(totaisProcessosWarningVar)
            setTotaisProcessos(totaisProcessosVar)
            setTotaisProcessosErro(totaisProcessosErrorVar)
        }

        filtrar();
    })
    
    return (
        <div>
            <div className="status-container">
            <span className="status-item">Total: {totaisProcessos}</span>
            <span className="status-item">Limpos: {totaisProcessosSucesso}</span>
            <span className="status-item">Avisos: {totaisProcessosWarning}</span>
            <span className="status-item">Impeditivos: {totaisProcessosErro}</span>
        </div>
        </div>
    )
}