import { useState } from 'react';
import '../styles/Index.css'
import agupng from '../assets/AGU.png'
import { LayoutLoginRegister } from '../components/login-register/LoginRegisterIndex';
import { Modal } from '../components/modal/Modal';
import { interessados } from '../visaoRequest/interessados';
import { CircularProgresss } from '../components/Progress/CircularProgresss';	
import { AlertsError } from '../components/Alerts/AlertsError';
import { useNavigate } from 'react-router-dom';


export const PageInteressados = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [Etiqueta, setEtiqueta] = useState("");
   const [resultado, setResultado] = useState(null);
   const [showModal, setShowModal] = useState(false); 



  const handleSubmit = async (event) => {
    event.preventDefault(); 



    try {
        setError(false)
        setLoading(true)
        const response = await interessados(Etiqueta)
        setResultado(response);
        setShowModal(true);
        setLoading(false)
        setError(false)
    } catch (error) {
        setError(true)
        setLoading(false)
    }
  }

  const sair = () => {
    localStorage.clear()
     navigate("/");
  }




  return (
    <LayoutLoginRegister>
    <form className="login-form" onSubmit={handleSubmit}>

      <span className="login-form-title">ENVOLVIDOS</span>

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
   
    
  </div>

      <div className="container-login-form-btn">
        <button className="login-form-btn">Iniciar Triagem</button>
      </div>

      <div className="container-login-form-btn">
        <button className="botaoSair" onClick={sair} type='button'>SAIR</button>
      </div>        
      
    </form>
    <div className='classLoadingAndError'>
      {loading && <CircularProgresss />}
      {error && <AlertsError />}
    </div>
    {/* <div className='classPararTriagem'>
        <button className='botaoPararTriagem' >Parar Triagem</button>
      </div>  */}
      <div className='blocoComponenteTriagem'></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} resultado={resultado} />
      )}

    </LayoutLoginRegister>
  )
};

