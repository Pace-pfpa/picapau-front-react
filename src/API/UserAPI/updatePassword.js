import axios from "axios"
import { controleUser } from "../../global"

export async function updatePassword(data){

    
    try{
        const url = "http://localhost:3010/register/updatePassword"
        console.log(localStorage.getItem("token"))
        console.log(data)
        const response = await axios.post(`${controleUser}register/updatePassword`,data)
   
        if(response.status == 200){
            return Promise.resolve();
        }else{
            console.log("erro ao update senha")
            return Promise.reject(new Error("erro ao tratar senha"))
        }

    }catch(e){
        if(e.response){
            console.log(e.response.data)
            if(e.response.data.trim() == "cpf e email nao encontrados"){
                return Promise.resolve(1);
            }else if("cpf nao encontrado" == e.response.data.trim()){
                return Promise.resolve(2)
            }else if("email nao encontrado" == e.response.data.trim()){
                return Promise.resolve(3)
            }
            
        }
    }
}