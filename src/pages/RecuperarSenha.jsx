/* eslint-disable no-unused-vars */

import { Link } from 'react-router-dom'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex'
import agupng from '../assets/AGU.png'
import { useState } from 'react'


export const RecuperarSenha = () => {

    const [cpf, setCpf] = useState("");
    const [password ,setPassword] = useState("");
    const [confirmCpf, setConfirmCpf] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();


    }


    const handleClick = () => {
        
        
      };
    

    return (
        <div>
            <LayoutLoginRegister>
      <form className="login-form" onSubmit={handleSubmit}>

        <span className="login-form-title">SUPER PICAPAU</span>

        <span className="login-form-title">
          <img src={agupng} alt="Advocacia Geral da união" />
        </span>

        <div className="wrap-input">
          <input className={cpf != "" ? 'has-val input' : 'input'}
            type="text"
            value={cpf}
            required
            onChange={e => setCpf(e.target.value)}
            onFocus={e => handleClick()}
          />
          <span className="focus-input" data-placeholder="Cpf   "></span>
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

        <div className="wrap-input">
          <input className={confirmCpf != "" ? 'has-val input' : 'input'}
            type="password"
            value={confirmCpf}
            onChange={e => setConfirmCpf(e.target.value)}
            onFocus={e => handleClick()}
          />
          <span className="focus-input" data-placeholder="Confirm Password"></span>
        </div>
        {/* {userIncorret && <p className='userIncorrect'>Usuário Incorreto</p>} */}
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
      <div className="text-center">
          <span className="txt1">Não Possui Conta?</span>

          <Link to="/cadastro" className="txt2">
            Criar Conta
          </Link>
        </div>
       <div className='esqueceuSenhaDiv'>
       <span className="txt1">Já tem Conta?</span>
          <Link to="/" className="txt2">
            Login
          </Link>
       </div>

        
    </LayoutLoginRegister>
        </div>
    )
}