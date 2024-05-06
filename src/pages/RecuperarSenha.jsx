/* eslint-disable no-unused-vars */

import { Link } from 'react-router-dom'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex'
import agupng from '../assets/AGU.png'
import { useState } from 'react'
import { updatePassword } from '../API/UpdatePassword'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


export const RecuperarSenha = () => {

    const [cpf, setCpf] = useState("");
    const [password ,setPassword] = useState("");
    const [confirmpassword, setConfirmCpf] = useState("");
    const [senhaAlteradaTrue, setSenhaAlteradaTrua] = useState(false);
    const [email, setEmail] = useState("");
    const [cpfIncorreto, setCpfIncorreto] = useState(false);
    const [emailIncorreto, setEmailIncorreto] = useState(false);
    const [emailECpfNaoEncontrado, setEmailECpfNaoEncontrado] = useState(false);
    const [senhaVlida, setSenhaValida] = useState(false);


    //0 - iniciaç
    //1 - senha alterada
    //2 - erro a alterar senha
    async function handleSubmit(event) {
        event.preventDefault();


       if(password !== confirmpassword){

        setSenhaValida(true);
        return
       }

        const data = {
          cpf: `${cpf}`,
          password: `${password}`,
          email: `${email}`
        }

        const updateRepsonse = await updatePassword(data);

        if(updateRepsonse == 1){
          setEmailECpfNaoEncontrado(true)
          return
        }else if(updateRepsonse == 2){
          setCpfIncorreto(true)
          return
        }else if(updateRepsonse == 3){
          setEmailIncorreto(true);
          return
        }
        setSenhaAlteradaTrua(1);
    }


    const handleClick = () => {
      setEmailECpfNaoEncontrado(false);
      setEmailIncorreto(false);
      setCpfIncorreto(false);
      setSenhaValida(false); 
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
          <input className={email != "" ? 'has-val input' : 'input'}
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            onFocus={e => handleClick()}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input className={password != "" ? 'has-val input' : 'input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={e => handleClick()}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="wrap-input">
          <input className={confirmpassword != "" ? 'has-val input' : 'input'}
            type="password"
            value={confirmpassword}
            onChange={e => setConfirmCpf(e.target.value)}
            onFocus={e => handleClick()}
          />
          <span className="focus-input" data-placeholder="Confirme sua senha"></span>
        </div>
        {/* {userIncorret && <p className='userIncorrect'>Usuário Incorreto</p>} */}
        <div className="container-login-form-btn">
          <button className="login-form-btn">Login</button>
        </div>


        
        {cpfIncorreto && (
          <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert severity="error">Cpf incorreto</Alert>
          </Stack>
        )}

        {emailIncorreto  && (
          <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert severity="error">Emil Incorreto</Alert>
          </Stack>
        )}

        {emailECpfNaoEncontrado  && (
          <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert severity="error">Email e Cpf Incorretos</Alert>
          </Stack>
        )}

        {senhaAlteradaTrue  && (
          <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">Senha Alterada com sucesso</Alert>
          </Stack>
        )}

        {senhaVlida  && (
          <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">Senhas não correspondem</Alert>
          </Stack>
        )}  

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