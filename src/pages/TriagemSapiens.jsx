import { useState, useEffect } from 'react'
import axios from 'axios';
import '../styles/Index.css'
//import { Link } from 'react-router-dom'
import agupng from '../assets/AGU.png'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import LinearIndeterminate from '../components/reload';
import { useNavigate } from 'react-router-dom';
import {VerificaEtiqueta} from '../helps/verificaEtiqueta/';


function TriagemSapiens() {
/*   const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState(""); */
  const navigate = useNavigate();
  const [Etiqueta, setEtiqueta] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
  verificarLogin();
}, []);

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
    if(localStorage.getItem("sapiensCPF") == null || localStorage.getItem("sapiensSenha") == null){
      navigate("/");
    }
  }

  async function handleSubmit(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  setIsLoading(true);
  
  //console.log("Etiqueta:", Etiqueta);
  //console.log("checkbox:", isChecked);
  //console.log("Verificaetiqueta: ", VerificaEtiqueta(Etiqueta));
  const data = {
    "login": {
      "cpf": `${localStorage.getItem("sapiensCPF")}`,
      "senha": `${localStorage.getItem("sapiensSenha")}`
    },
    "etiqueta": `${Etiqueta}`,
    "readDosprevAge": isChecked
  }
  const response = await axios.post("http://10.191.9.26:3000/samir/getInformationFromSapienForSamir",data)
  
  console.log(response)
  setIsLoading(false);
  }
  
 
  // Adicione aqui o código para enviar os dados ao servidor ou realizar outras ações


function sair(){
  localStorage.clear()
  navigate("/");
}

  return (
    <LayoutLoginRegister>
      <form className="login-form" onSubmit={handleSubmit}>

        <span className="login-form-title">Triagem Sapiens</span>

        <span className="login-form-title">
          <img src={agupng} alt="Advocacia Geral da união" />
        </span>

        {/* <div className="wrap-input">
          <input className={cpf != "" ? 'has-val input' : 'input'}
            type="text"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />
          <span className="focus-input" data-placeholder="CPF"></span>
        </div> */}

        {/* <div className="wrap-input">
          <input className={password != "" ? 'has-val input' : 'input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div> */}

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
          <button onClick={sair}>SAIR</button>
        </div>

        
        {isLoading && <LinearIndeterminate/>}
        {/* <div className="text-center">
          <span className="txt1">Já possui conta?</span>

          <Link to="/" className="txt2">
            Acessar com Email e Senha
          </Link>
        </div> */}
      </form>
      
      </LayoutLoginRegister>
  )
}

export default TriagemSapiens
