import { useState } from 'react'
import axios from 'axios';
import '../styles/Index.css'
//import { Link } from 'react-router-dom'
import agupng from '../assets/AGU.png'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import  CircularIndeterminate  from '../components/reload'

function TriagemSapiens() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [Etiqueta, setEtiqueta] = useState("");
  const [isChecked, setIsChecked] = useState(false);
/*   const [isLoading, setIsLoading] = useState(false); */


  async function handleSubmit(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  /* setIsLoading(true); */
  console.log("CPF:", cpf);
  console.log("Senha:", password);
  console.log("Etiqueta:", Etiqueta);
  console.log("checkbox:", isChecked);
  const data = {
    "login": {
      "cpf": `${cpf}`,
      "senha": `${password}`
    },
    "etiqueta": `${Etiqueta}`,
    "readDosprevAge": isChecked
  }
  const response = await axios.post("http://localhost:3001/samir/getInformationFromSapienForSamir",data)
  console.log(response)
 /*  setIsLoading(false); */
  // Adicione aqui o código para enviar os dados ao servidor ou realizar outras ações
}

  return (
    <LayoutLoginRegister>
      <form className="login-form" onSubmit={handleSubmit}>

        <span className="login-form-title">Triagem Sapiens</span>

        <span className="login-form-title">
          <img src={agupng} alt="Advocacia Geral da união" />
        </span>

        <div className="wrap-input">
          <input className={cpf != "" ? 'has-val input' : 'input'}
            type="text"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />
          <span className="focus-input" data-placeholder="CPF"></span>
        </div>

        <div className="wrap-input">
          <input className={password != "" ? 'has-val input' : 'input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

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
