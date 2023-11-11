import { useState } from 'react'
import '../styles/Index.css'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import { Link } from 'react-router-dom'

function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (

    <LayoutLoginRegister>
      <form className="login-form">

        <span className="login-form-title">Cadastro</span>

        <div className="wrap-input">
          <input className={name != "" ? 'has-val input' : 'input'}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

        <div className="wrap-input">
          <input className={email != "" ? 'has-val input' : 'input'}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input className={password != "" ? 'has-val input' : 'input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>

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
