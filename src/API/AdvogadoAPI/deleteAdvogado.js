import axios from "axios";
import { controleUser } from "../../global";

export async function deleteAdvogado(id) {
    try {
        const response = await axios.delete(`${controleUser}register/advogados/${id}`)
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return new Error("Erro ao deletar advogado");
    }
}
