import { useState } from "react";
import styles from '../../styles/consultaAdvogado.module.css';
import { buscaAdvogado } from "../../API/AdvogadoAPI/buscaAdvogado";
import { deleteAdvogado } from "../../API/AdvogadoAPI/deleteAdvogado";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

export const ConsultaAdvogado = () => {
  const [regiao, setRegiao] = useState("");
  const [advogados, setAdvogados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [advogadoToDelete, setAdvogadoToDelete] = useState(null);

  const regioes = ["PRF1", "PRF2", "PRF3", "PRF4", "PRF5", "PRF6"];

  const handleConsulta = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await buscaAdvogado(regiao);
      if (response instanceof Error) {
        setAdvogados([]);
        throw new Error('Sem advogados para essa região.')
      }
      setAdvogados(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
        const response = await deleteAdvogado(advogadoToDelete);
        if (response instanceof Error) {
            throw new Error('Oops!')
        }
        setAdvogados(advogados.filter(advogado => advogado.id !== advogadoToDelete));
        setShowModal(false);
    } catch (error) {
        setError('Erro ao deletar advogado');
        setShowModal(false)
    }
  }

  const openModal = (advogadoId) => {
    setAdvogadoToDelete(advogadoId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleConsulta}>
      <div className={styles.formGroup}>
          <label htmlFor="regiao">Região:</label>
          <select
            name="regiao"
            id="regiao"
            value={regiao}
            onChange={(e) => setRegiao(e.target.value)}
          >
            <option value="">Selecione a Região</option>
            {regioes.map((regiao) => (
              <option key={regiao} value={regiao}>
                {regiao}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.btn} type="submit" disabled={loading || !regiao}>
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>

    {error && <p>{error}</p>}

    {advogados.length > 0 && (
        <div className={styles.advogadoList}>
          <h3>Advogados na Região {regiao}:</h3>
          <ul>
            {advogados.map((advogado, index) => (
              <li key={index}>
                <strong>Nome:</strong> {advogado.nome}<br/><strong>OAB:</strong>{" "}
                {advogado.oab}
                <span className={styles.deleteIcon} onClick={() => openModal(advogado.id)} title="Excluir Advogado">
                🗑️
                </span>
              </li>
            ))}
          </ul>
        </div>
    )}

    {advogados.length === 0 && !loading && !error && (
        <p className={styles.noResultMessage}>
          Nenhum advogado encontrado para essa região.
        </p>
    )}

    {showModal && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
    )}
    </div>
  );
};
