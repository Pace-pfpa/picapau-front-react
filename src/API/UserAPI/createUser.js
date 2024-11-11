import axios from "axios";
import { controleUser } from "../../global";


export async function createUser(user){

    try{
        console.log(user)
        const response = await axios.post(`${controleUser}register/create/user`, user);
        console.log("dasasdsa")
        console.log(response.data)
        if(response.status == 201){
            return Promise.resolve();
        }else{
            return Promise.reject(new Error());
        }
    }catch(e){
        if(e.response.data.trim() == "usuario ja existe"){
            return Promise.reject(new Error("usuario ja existe"));
        }
    }
}