import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { createAdvogado } from '../../API/AdvogadoAPI/createAdvogado';
import styles from '../../styles/registerAdvogado.module.css';

export const RegisterAdvogado = () => {
    const [nomeAd, setNomeAd] = useState('');
    const [oab, setOab] = useState('');
    const [local, setLocal] = useState('');
    const [comunicadopor, setComunicadopor] = useState('');
    const [regiao, setRegiao] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const estadosBrasil = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
        'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    
    const regioes = ['PRF1', 'PRF2', 'PRF3', 'PRF4', 'PRF5', 'PRF6'];

    const adicionadopor = jwtDecode(localStorage.getItem("token")).id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        const advogadoData = {
          nomeAd,
          oab,
          local,
          comunicadopor,
          regiao,
          adicionadopor,
        };
    
        try {
            await createAdvogado(advogadoData);
            setSuccess(true);
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {success && <p className={styles.successMessage}>Advogado cadastrado com sucesso!</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text"
                        name="nome"
                        value={nomeAd}
                        onChange={(e) => setNomeAd(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="oab">OAB:</label>
                    <input 
                        type="text"
                        name="oab"
                        value={oab}
                        onChange={(e) => setOab(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="estados">Local:</label>
                    <select value={local} onChange={(e) => setLocal(e.target.value)} required>
                        <option value="">Selecione o Estado</option>
                        {estadosBrasil.map((estado) => (
                            <option key={estado} value={estado}>
                                {estado}
                            </option>
                         ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="comunicadopor">Comunicado por:</label>
                    <input
                        type="text"
                        name="comunicadopor"
                        value={comunicadopor}
                        onChange={(e) => setComunicadopor(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Região:</label>
                    <select value={regiao} onChange={(e) => setRegiao(e.target.value)} required>
                        <option value="">Selecione a Região</option>
                        {regioes.map((regiao) => (
                            <option key={regiao} value={regiao}>
                                {regiao}
                            </option>
                        ))}
                    </select>
                </div>
                <button className={styles.btn} type="submit" disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}