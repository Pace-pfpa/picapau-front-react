import axios from "axios";
import { picapauApiSapiens } from "../global";

export async function cobranca(objCobranca) {
   try {
        const response = await axios.post(`${picapauApiSapiens}cobranca`, objCobranca)
        return response.data;
    } catch(error) {
        const tarefaId = error.response?.data?.tarefaId || "Desconhecido";
        const errorMessage = error.response?.data?.resposta || "Erro no login";
        throw new Error(`Tarefa ID: ${tarefaId} - ${errorMessage}`);
    }
}
