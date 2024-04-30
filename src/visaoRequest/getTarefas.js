import axios from "axios";
import { picapauApiSapiens } from "../global";

export async function getTarefas(cookie, etiqueta, usuario_id){

    console.log(cookie)
    console.log(etiqueta)
    console.log(usuario_id)
    const UrlLogin = "http://localhost:3000/samir/getTarefaController"

    try{
        const response = await axios.post(`${picapauApiSapiens}getTarefaController`,{cookie: cookie, etiqueta: etiqueta, usuario_id: usuario_id});
        
        if(response.status == 200){
            return Promise.resolve(response.data);
        }else{
            return Promise.reject(new Error("erro ai fazer login sapiens"))
        }
    }catch(e){
        console.log("erro login sapiens")
        return Promise.reject(new Error("erro no login"))
    }
}