import styles from '../../styles/deleteConfirmation.module.css'; // CSS Modules para o modal

// eslint-disable-next-line react/prop-types
export const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirmar Exclusão</h2>
        <p>Você tem certeza que deseja excluir este advogado?</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.confirmBtn}>Confirmar</button>
          <button onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
