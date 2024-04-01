import axios from "axios";

export async function getTarefas(cookie, etiqueta, usuario_id){


    const UrlLogin = "http://localhost:3001/samir/getTarefaController"

    try{
        const response = await axios.post(UrlLogin,{cookie: cookie, etiqueta: etiqueta, usuario_id: usuario_id});
        
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