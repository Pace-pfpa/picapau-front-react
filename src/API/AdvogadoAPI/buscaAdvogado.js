import axios from "axios";
import { controleUser } from "../../global";

export async function buscaAdvogado(regiao) {
    try {
        const response = await axios.get(`${controleUser}register/search/advogado`, {
            params: { regiao }
        })
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return new Error("Erro ao buscar advogado");
    }
}
