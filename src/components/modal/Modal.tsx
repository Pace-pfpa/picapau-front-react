import React from 'react';
import './Modal.css';

// Tipagem do objeto `resultado`, garantindo que o Modal receba os dados esperados
interface Resultado {
    totalTarefas: number;
    envolvidosCadastrados: number;
    cpfNaoConstaNaReceita: number;
    erroAoCadastrarEnvolvidos: string[];
}

interface ModalProps {
    onClose: () => void;
    resultado: Resultado | null;
}

export const Modal: React.FC<ModalProps> = ({ onClose, resultado }) => {
    if (!resultado) return null; // Garante que resultado existe antes de renderizar

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Resultado da Triagem</h2>
                <p><strong>Total de Tarefas:</strong> {resultado.totalTarefas}</p>
                <p><strong>Envolvidos Cadastrados:</strong> {resultado.envolvidosCadastrados}</p>
                <p><strong>CPF Não Consta na Receita:</strong> {resultado.cpfNaoConstaNaReceita}</p>
                {resultado.erroAoCadastrarEnvolvidos.length > 0 && (
                    <div>
                        <p><strong>Erros ao Cadastrar Envolvidos:</strong></p>
                        <ul>
                            {resultado.erroAoCadastrarEnvolvidos.map((nup, index) => (
                                <li key={index}>NUP: {nup}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={onClose} className="modal-close-btn">Fechar</button>
            </div>
        </div>
    );
};
