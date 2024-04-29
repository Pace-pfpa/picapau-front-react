import axios from "axios";

export async function getInformationFromPicaPau(objetoArvoreDocumento){
    console.log(objetoArvoreDocumento)

    const UrlLogin = "http://localhost:3000/samir/getInformationFromSapienForSamir"

    try{
        const response = await axios.post(UrlLogin,objetoArvoreDocumento);
        
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