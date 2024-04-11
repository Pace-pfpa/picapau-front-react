import axios from "axios";

export async function loginVisao(data){


    const UrlLogin = "http://localhost:3000/samir/login"

    try{
        const response = await axios.post(UrlLogin,data);
        
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