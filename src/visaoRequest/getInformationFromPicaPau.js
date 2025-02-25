import axios from "axios";
import { picapauApiSapiens } from "../global";

export async function getInformationFromPicaPau(objetoArvoreDocumento) {
    try {
        const response = await axios.post(`${picapauApiSapiens}getInformationFromSapienForSamir`,objetoArvoreDocumento);
        return response.data;
    } catch(e) {
        const tarefaId = e.response?.data?.tarefaId || "Desconhecido";
        const errorMessage = e.response?.data?.resposta || "Erro no login";
        throw new Error(`Tarefa ID: ${tarefaId} - ${errorMessage}`);
    }
}
