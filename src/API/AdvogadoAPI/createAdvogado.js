import axios from "axios";
import { controleUser } from "../../global";

export async function createAdvogado (advogado){

    try{
        const response = await axios.post(`${controleUser}register/create/advogado`, advogado);
        console.log(response.data)
        if(response.status == 201){
            return Promise.resolve();
        } else if (response.status == 400) {
            console.log("Erro here")
            return Promise.reject(new Error("Erro ao adicionar advogado"));
        }
    }catch(e){
        console.log('ZIP ZIP ZIP', e)
        return Promise.reject(new Error("Advogado ja existe"));
    }
}