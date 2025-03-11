import { useState, useRef } from 'react';
import '../styles/Index.css'
import agupng from '../assets/AGU.png'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import { TriagemSapiensComponent } from '../../src/components/TriagemSapiensComponent';
import LinearIndeterminate from '../components/Progress/LinearProgresss';	
import { AlertsError } from '../components/Alerts/AlertsError';
import { useNavigate } from 'react-router-dom';
import { cobranca } from '../visaoRequest/cobranca';
import { getTarefas } from '../visaoRequest/getTarefas';
import { loginVisao } from '../visaoRequest/loginRequest';
import { getUsuarioRequest } from '../visaoRequest/getUsuarioRequest';
import { FinalizandoTriagem } from '../components/FinalizandoTriagem';
import { IniciandoTriagem } from '../../src/components/IniciandoTriagem';

export const PageCobranca = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [etiqueta, setEtiqueta] = useState("");
  const [inializandoTriagem, setInializandoTriagem] = useState(false);
  const [isContador, setIsContador] = useState(false);
  const [minuta, setMinuta] = useState(false);
  const stopProcessoRef = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setInializandoTriagem(true)
    const data = {
        "login": {
          "cpf": `${localStorage.getItem("sapiensCPF")}`,
          "senha": `${localStorage.getItem("sapiensSenha")}`
        },
    }

    try {
        const cookie = await loginVisao(data.login);
        const usuario =  (await getUsuarioRequest(cookie));
        const usuario_id = `${usuario[0].id}`; 
        let tarefas = await getTarefas(cookie, etiqueta, usuario_id);
        
        setInializandoTriagem(false)
        setIsLoading(true);
        let VerificarSeAindExisteProcesso = true;
        let contadorProcessos = 0;

        if (!etiqueta || tarefas.length === 0) {
            VerificarSeAindExisteProcesso = false; 
            setIsLoading(false)
        }

        while (VerificarSeAindExisteProcesso) {
            for (let i = 0; i <= tarefas.length - 1; i++) {
                if (stopProcessoRef.current) {
                    console.log("Processo interrompido pelo usuário");
                    setIsContador(false);
                    break;
                }
        
                setIsContador(contadorProcessos + 1);
        
                try {
                    await cobranca({
                      login: data.login,
                      etiqueta: etiqueta,
                      tarefa: tarefas[i],
                      subirMinuta: minuta
                    });
                    contadorProcessos++;
                } catch (error) {
                    console.error("Erro ao processar tarefa:", error.message);
                    alert(
                      `Ocorreu um erro ao processar a triagem: ${error.message}`
                    );
                    setIsLoading(false);
                    setIsContador(false);
                    return;
                }
            }
        
            if (stopProcessoRef.current) {
                console.log("Processo interrompido pelo usuário");
                stopProcessoRef.current = false;
                setIsContador(false);
                break;
            }
        
            tarefas = await getTarefas(cookie, etiqueta, usuario_id);
            if (tarefas.length === 0) {
                VerificarSeAindExisteProcesso = false;
            }
        }
        setError(false)
        setIsLoading(false);
    } catch (error) {
        setError(true)
        setIsLoading(false);
        setIsContador(false);
    }

    setIsContador(false);
  }

  const sair = () => {
    localStorage.clear()
     navigate("/");
  }

  return (
    <LayoutLoginRegister>
    <form className="login-form" onSubmit={handleSubmit}>

      <span className="login-form-title">COBRANÇA</span>

      <span className="login-form-title">
        <img src={agupng} alt="Advocacia Geral da união" />
      </span>

      <span>
        <div className='checkboxMinuta'>
          <input
            type="checkbox"
            name="minuta"
            id="minuta"
            checked={minuta}
            onChange={e => setMinuta(e.target.checked)}
          />
          <label htmlFor="minuta" className='minuta-question'>Deseja incluir os impeditivos na minuta?</label>
        </div>
        <br></br>
      </span>

      <div className="wrap-input">
        <input className={etiqueta != "" ? 'has-val input' : 'input'}
          type="text"
          value={etiqueta}
          onChange={e => setEtiqueta(e.target.value)}
        />
        <span className="focus-input" data-placeholder="Etiqueta"></span>
      </div>
      
      <div className='checkboxMaternidade'></div>

      <div className="container-login-form-btn">
        <button className="login-form-btn">Iniciar Triagem</button>
      </div>

      <div className="container-login-form-btn">
        <button className="botaoSair" onClick={sair} type='button'>SAIR</button>
      </div>        
      
    </form>
    <div className='classLoadingAndError'>
      {error && <AlertsError />}
    </div>
      <div className='blocoComponenteTriagem'>
        <div className='blocoComponenteTriagem'>
                {!stopProcessoRef.current && <TriagemSapiensComponent processosCount={isContador}/>}
                {isLoading && <LinearIndeterminate/>}
                {stopProcessoRef.current && <FinalizandoTriagem/>}
                {inializandoTriagem && <IniciandoTriagem/>}
              </div>
      </div>

    </LayoutLoginRegister>
  )
};

