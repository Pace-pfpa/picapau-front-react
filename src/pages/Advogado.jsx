import { useState } from "react";
import { LayoutLoginRegister } from "../components/login-register/LoginRegisterIndex";
import { RegisterAdvogado } from "../components/advogado/RegisterAdvogado";
import { ConsultaAdvogado } from "../components/advogado/ConsultaAdvogado";
import styles from '../styles/advogados.module.css';

export const Advogados = () => {

  const [showRegister, setShowRegister] = useState(true); 
  
  return (
    <LayoutLoginRegister>
        <span className="login-form-title">ADVOGADOS</span>
        {showRegister ? (
            <div className={styles.container}>
                <p className={styles.title}>Cadastrar Advogado</p>
                <RegisterAdvogado />
                <p className={styles.redirectContainer}>
                    Deseja consultar o banco?{' '}
                    <button className={styles.btn} onClick={() => setShowRegister(false)}>
                        Consultar
                    </button>
                </p>
            </div>
        ) : (
            <div className={styles.container}>
                <p className={styles.title}>Consultar Advogado</p>
                <ConsultaAdvogado />
                <p className={styles.redirectContainer}>
                    Deseja cadastrar um advogado?{' '}
                    <button className={styles.btn} onClick={() => setShowRegister(true)}>
                        Cadastrar
                    </button>
                </p>
            </div>
        )}
    </LayoutLoginRegister>
  );
};
