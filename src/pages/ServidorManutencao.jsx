import styles from '../styles/paginaManutencao.module.css'
import sad from '../assets/picapau-sad.png'

export const ServidorManutencao = () => {
    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <img src={sad} alt="Pica-Pau Triste" />
                <h1>Sistema em Manutenção</h1>
                <p>DESCULPE O TRANSTORNO, ASSIM QUE POSSÍVEL DISPONIBILIZAREMOS O ACESSO.</p>
            </div>
        </div>
    )
}