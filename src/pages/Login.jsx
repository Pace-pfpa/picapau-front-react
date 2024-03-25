/* eslint-disable react-hooks/rules-of-hooks */
import { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import agupng from '../assets/AGU.png'
import '../styles/Index.css'
/* import { Link } from 'react-router-dom' */
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex'
import axios from 'axios';



export const Login = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [userIncorret, setUserIncorret] = useState(false);
  const navigate = useNavigate();

    
  async function handleSubmit(event) {
    event.preventDefault();
  
    const data = {
      "cpf": `${cpf.replace(/\D/g, '')}`,
      "senha": `${password}`
    }
    try{
      const response = await axios.post("http://localhost:3000/samir/login",data)
      if(response.status == 200){
        localStorage.setItem("sapiensCPF", cpf);
        localStorage.setItem("sapiensSenha", password);
        navigate("/triagem");
      } else{
        console.log('incorreto user')
        setUserIncorret(true)
      } 
    }catch(e){
      setUserIncorret(true)
    }
  
      
    
  }

  const handleClick = () => {
    if(userIncorret){
      setUserIncorret(!userIncorret);
    }
    
  };

  return (

    <LayoutLoginRegister>
      <form className="login-form" onSubmit={handleSubmit}>

        <span className="login-form-title">SUPER PICA-PAU</span>

        <span className="login-form-title">
          <img src={agupng} alt="Advocacia Geral da união" />
        </span>

        <div className="wrap-input">
          <input className={cpf != "" ? 'has-val input' : 'input'}
            type="text"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            onFocus={e => handleClick()}
          />
          <span className="focus-input" data-placeholder="Cpf"></span>
        </div>

        <div className="wrap-input">
          <input className={password != "" ? 'has-val input' : 'input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={e => handleClick()}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>
        {userIncorret && <p className='userIncorrect'>Usuário Incorreto</p>}
        <div className="container-login-form-btn">
          <button className="login-form-btn">Login</button>
        </div>


        {/* <div className="text-center">
          <span className="txt1">Não possui conta?</span>

          <Link to="/cadastro" className="txt2">
            Criar Conta
          </Link>
        </div> */}

      </form>
    </LayoutLoginRegister>
  )
}


