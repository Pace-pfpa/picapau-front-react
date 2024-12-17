import { useState, useEffect, useRef } from 'react'
import '../styles/Index.css'
import agupng from '../assets/AGU.png'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import LinearIndeterminate from '../components/Progress/LinearProgresss';
import { useNavigate } from 'react-router-dom';
import { getTarefas } from '../visaoRequest/getTarefas';
import { loginVisao } from '../visaoRequest/loginRequest';
import { getUsuarioRequest } from '../visaoRequest/getUsuarioRequest';
import { getInformationFromPicaPau } from '../visaoRequest/getInformationFromPicaPau';
import { TriagemSapiensComponent } from '../../src/components/TriagemSapiensComponent';
import { FinalizandoTriagem } from '../components/FinalizandoTriagem';
import { IniciandoTriagem } from '../../src/components/IniciandoTriagem';
import { buildObjectProcess } from '../Help/BuildObjectProcess';
import { saveProcess } from '../API/UserAPI/SaveProcess';
import { jwtDecode } from 'jwt-decode';



function TriagemSapiens() {
  const navigate = useNavigate();
  const [etiqueta, setEtiqueta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isContador, setIsContador] = useState(false)
  const stopProcessoRef = useRef(false);
  const [inializandoTriagem, setInializandoTriagem] = useState(false)
  const loas = useRef(false);
  const [statusSelecionado, setStatusSelecionado] = useState('0');
  const [iniciarLoas, setIniciarLoas] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [minuta, setMinuta] = useState(false);
  

  useEffect(() => {
    const userRole = jwtDecode(localStorage.getItem("token")).role;
    if(userRole === 2) {
      setIniciarLoas(true);
      console.log('ADMIN')
      setAdmin(true);
    } else if (userRole === 0) {
      setIniciarLoas(true);
    }
  verificarLogin();
  return () => verificarLogin()
}, []);

  const verificarLogin = async () => {

    if(localStorage.getItem("sapiensCPF") == null || localStorage.getItem("sapiensSenha") == null || localStorage.getItem("token") == null){
      navigate("/");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault(); 
  
  
    setInializandoTriagem(true);
    const data = {
      "login": {
        "cpf": `${localStorage.getItem("sapiensCPF")}`,
        "senha": `${localStorage.getItem("sapiensSenha")}`
      },
    }


    try{

      const cookie = await loginVisao(data.login);
      const usuario =  (await getUsuarioRequest(cookie));
      const usuario_id = `${usuario[0].id}`; 
      let tarefas = await getTarefas(cookie, etiqueta, usuario_id);

      setInializandoTriagem(false)
      setIsLoading(true);
      let VerificarSeAindExisteProcesso = true;
      let contadorProcessos = 0;
      
      if(Number(statusSelecionado) == 2){
        loas.current = true;
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
            const tipo_triagem = Number(statusSelecionado);
            const processo = await getInformationFromPicaPau({
              login: data.login,
              etiqueta: etiqueta,
              tarefa: tarefas[i],
              readDosprevAge: tipo_triagem,
              loas: loas.current,
              admin: admin,
              subirMinuta: minuta
            });

            const objectToDataBase = await buildObjectProcess(tarefas[i], processo, tarefas[i]);
            await saveProcess(objectToDataBase);
            contadorProcessos++;
          } catch (error) {
            console.error("Erro ao processar tarefa:", error);
            alert("Ocorreu um erro ao processar a triagem. Por favor, verifique o processo e tente novamente.");
            VerificarSeAindExisteProcesso = false;
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

      loas.current = false;
      setIsLoading(false);


    } catch(e) {
      console.log("Erro na triagem:", e);
      alert("Erro ao iniciar a triagem. Por favor, verifique os dados e tente novamente.");
      setIsLoading(false);
      setIsContador(false);
    }
    


    setIsContador(false);
    
  }  
  // Adicione aqui o código para enviar os dados ao servidor ou realizar outras ações


function sair(){
  localStorage.clear()
  navigate("/");
}

function pararTriagem(){
  console.log("fechou")
  stopProcessoRef.current = true;
  setIsLoading(false);
}







  return (
    <LayoutLoginRegister>
      <form className="login-form" onSubmit={handleSubmit}>
        {admin && (
          <p style={
            {color: "red"}
          }>MODO ADMIN</p>
        )}
        <span className="login-form-title">TRIAGEM SAPIENS</span>

        <span className="login-form-title">
          <img src={agupng} alt="Advocacia Geral da união" />
        </span>

        <div className="wrap-input">
          <input className={etiqueta != "" ? 'has-val input' : 'input'}
            type="text"
            value={etiqueta}
            onChange={e => setEtiqueta(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Etiqueta"></span>
        </div>
        
        <div className='checkboxMaternidade'>
          <p className='selecioneBeneficio'>Selecione o benefício</p>
          <select 
            id='status'
            value={statusSelecionado}
            onChange={(e) => setStatusSelecionado(e.target.value)}>
              <option value="0">Aposentadoria Rural</option>
              <option value="1">Salário Maternidade</option>
              {iniciarLoas && (
                <option value="2">Loas</option>
              )}
          </select>
        </div>

        {admin && (
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
        )}

        <div className="container-login-form-btn">
          <button className="login-form-btn">Triagem Sapiens</button>
        </div>

        <div className="container-login-form-btn">
          <button className="botaoSair" onClick={sair}>SAIR</button>
        </div>        
      </form>
      <div className='classPararTriagem'>
          <button className='botaoPararTriagem' onClick={pararTriagem}>Parar Triagem</button>
      </div> 
      <div className='blocoComponenteTriagem'>
        {stopProcessoRef.current == false && <TriagemSapiensComponent processosCount={isContador}/>}
        {isLoading && <LinearIndeterminate/>}
        {stopProcessoRef.current && <FinalizandoTriagem/>}
        {inializandoTriagem && <IniciandoTriagem/>}
      </div>
    </LayoutLoginRegister>
  )
}

export default TriagemSapiens
