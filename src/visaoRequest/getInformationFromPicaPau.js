import axios from "axios";
import { picapauApiSapiens } from "../global";

export async function getInformationFromPicaPau(objetoArvoreDocumento){

    try{
        const response = await axios.post(`${picapauApiSapiens}getInformationFromSapienForSamir`,objetoArvoreDocumento);
        
        if (response.status == 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(new Error("Erro durante a triagem: " + response.data.resposta))
        }
    }catch(e){
        console.log("erro login sapiens")
        return Promise.reject(new Error("erro no login"))
    }
}
