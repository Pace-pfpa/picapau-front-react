import { useState } from 'react'
import agupng from './assets/AGU.png'
import './styles/login.css'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (

    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form  className="login-form">

            <span className="login-form-title">SUPER PICA-PAU</span>

            <span className="login-form-title">
              <img src={agupng} alt="Advocacia Geral da união" />
            </span>

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
              <button className="login-form-btn">Login</button>
            </div>


            <div className="text-center">
              <span className="txt1">Não possui conta?</span>

              <a href="#" className="txt2">Criar Conta.</a>
            </div>

          </form>
        </div>
      </div>
    </div>
    /* { <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </> } */
  )
}

export default App
