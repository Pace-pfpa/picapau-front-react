import axios from "axios";
import { picapauApiSapiens } from "../global";

export const interessados = async (etiqueta) => {
    
   try{

    const data = {
        login: {
            cpf: `${localStorage.getItem('sapiensCPF')}`,
            senha: `${localStorage.getItem('sapiensSenha')}`
        },
        etiqueta: etiqueta
    }

        const response = await axios.post(`${picapauApiSapiens}createInteressados`, data)
        if(response.status === 200){
            return Promise.resolve(response.data)
        }else{
            return Promise.reject(new Error("error buscando interessados"))
        }
   }catch(error){
        console.log(error)
        return Promise.reject(error)
   }
}

