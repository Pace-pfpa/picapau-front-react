import { useState } from 'react'
import '../styles/Index.css'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import { Link } from 'react-router-dom'
import agupng from '../assets/AGU.png'
import { createUser } from '../API/CreateUser';
import { useNavigate } from 'react-router-dom';


function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const [cpf, setCpf] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const data = {
        "nome": name,
        "email": email,
        "password": password,
        "cpf": cpf
      }

      await createUser(data);
      navigate("/")
    }catch(e){
      if(e.message.trim() == "usuario ja existe"){
        setUsuarioExiste(true)
      }
      console.log(e.message)
    }
    
  }

  return (

    <LayoutLoginRegister>
      <form onSubmit={handleSubmit} className="login-form">

        <span className="login-form-title">Criar Conta</span>

        <span className="login-form-title">
          <img src={agupng} alt="Advocacia Geral da união" />
        </span>

        <div className="wrap-input">
          <input className={name != "" ? 'has-val input' : 'input'}
            type="text"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

        <div className="wrap-input">
          <input className={email != "" ? 'has-val input' : 'input'}
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input className={password != "" ? 'has-val input' : 'input'}
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>

        <div className="wrap-input">
          <input className={cpf != "" ? 'has-val input' : 'input'}
            type="text"
            value={cpf}
            required
            onChange={e => setCpf(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Cpf"></span>
        </div>

        {usuarioExiste && <p className='userIncorrect'>Usuário Incorreto</p>}
        <div className="container-login-form-btn">
          <button className="login-form-btn">Cadastrar</button>
        </div>

        <div className="text-center">
          <span className="txt1">Já possui conta?</span>

          <Link to="/" className="txt2">
            Acessar com Email e Senha
          </Link>
        </div>
      </form>
    </LayoutLoginRegister>
  )
}

export default Cadastro
