import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import '../styles/Index.css'
//import { Link } from 'react-router-dom'
import agupng from '../assets/AGU.png'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import LinearIndeterminate from '../components/reload';
import { useNavigate } from 'react-router-dom';
import {VerificaEtiqueta} from '../helps/verificaEtiqueta/';
import { getInformationFromSapienForSamirUseCase } from '../triagemFolder';
import { getTarefas } from '../visaoRequest/getTarefas';
import { loginVisao } from '../visaoRequest/loginRequest';
import { getUsuarioRequest } from '../visaoRequest/getUsuarioRequest';
import { getInformationFromPicaPau } from '../visaoRequest/getInformationFromPicaPau';
import { TriagemSapiensComponent } from '../components/TriagemSapiensComponent';
import { FinalizandoTriagem } from '../components/finalizandoTriagem';
import { IniciandoTriagem } from '../components/IniciandoTriagem';
import { buildObjectProcess } from '../Help/BuildObjectProcess';
import { saveProcess } from '../API/SaveProcess';




function TriagemSapiens() {
/*   const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState(""); */
  const navigate = useNavigate();
  const [Etiqueta, setEtiqueta] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [IsContador, setIsContador] = useState(false)
  const stopProcessoRef = useRef(false);
  const [inializandoTriagem, setInializandoTriagem] = useState(false)
  

  useEffect(() => {
  verificarLogin();
  return () => verificarLogin()
}, []);;

  const verificarLogin = async () => {
    // Coloque aqui a lógica da sua verificação
    /* const data = {
        "cpf": `${localStorage.getItem("sapiensCPF")}`,
        "senha": `${localStorage.getItem("sapiensSenha")}`
      }
      console.log(data)
    const response = await axios.post("http://localhost:3001/samir/login",data)
    console.log(data)
    console.log(response) */
    if(localStorage.getItem("sapiensCPF") == null || localStorage.getItem("sapiensSenha") == null || localStorage.getItem("token") == null){
      navigate("/");
    }
  }

  async function handleSubmit(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  
  
  setInializandoTriagem(true)
    const data = {
      "login": {
        "cpf": `${localStorage.getItem("sapiensCPF")}`,
        "senha": `${localStorage.getItem("sapiensSenha")}`
      },
      /* "etiqueta": `${Etiqueta}`,
      "readDosprevAge": isChecked */
    }
    //const response = await axios.post("http://localhost:3001/samir/getInformationFromSapienForSamir",data)



    try{
      
      const cookie = await loginVisao(data.login);
      const usuario =  (await getUsuarioRequest(cookie));
      
 
       const usuario_id = `${usuario[0].id}`; 
       let tarefas = await getTarefas(cookie, "FRODO", usuario_id);
       setInializandoTriagem(false)
       setIsLoading(true);
       let VerificarSeAindExisteProcesso = true;
       let contadorProcessos = 0;
       while(VerificarSeAindExisteProcesso){
         for(var i = 0; i <= tarefas.length - 1; i++){
           if(stopProcessoRef.current){
             console.log("saiu")
             console.log("parou processo")
             setIsContador(false)
             break;
           }
           setIsContador(contadorProcessos+1)
           const processo = await getInformationFromPicaPau({login: data.login, etiqueta: "FRODO", tarefa: tarefas[i], readDosprevAge: isChecked})
           const objectToDataBase = await buildObjectProcess(tarefas[i],processo, tarefas[i])
           const saveProc = await saveProcess(objectToDataBase);
           contadorProcessos++
 
         }
         if(stopProcessoRef.current){
          console.log("saiu")
          stopProcessoRef.current = false;
          console.log("parou processo")
          setIsContador(false)
          break;
        }


         tarefas = await getTarefas(cookie, "FRODO", usuario_id);
         if(tarefas.length == 0){
          VerificarSeAindExisteProcesso = false;
         }

       }
       setIsLoading(false)


    }catch(e){
      console.log("erro triagemk")
      console.log(e)
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

        <span className="login-form-title">Triagem Sapiens</span>

        <span className="login-form-title">
          <img src={agupng} alt="Advocacia Geral da união" />
        </span>

        <div className="wrap-input">
          <input className={Etiqueta != "" ? 'has-val input' : 'input'}
            type="text"
            value={Etiqueta}
            onChange={e => setEtiqueta(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Etiqueta"></span>
        </div>
        
        <div className='checkboxMaternidade'>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor="checkbox" className='labelChakput'>Calcular com Salário Maternidade?</label>
    </div>

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
          {stopProcessoRef.current == false && <TriagemSapiensComponent processosCount={IsContador}/>}
          {isLoading && <LinearIndeterminate/>}
          {stopProcessoRef.current && <FinalizandoTriagem/>}
          {inializandoTriagem && <IniciandoTriagem/>}
        </div>
      </LayoutLoginRegister>
  )
}

export default TriagemSapiens
