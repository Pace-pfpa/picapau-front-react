import axios from "axios";


export async function createUser(user){

    try{
        console.log(user)
        const Url = "http://localhost:3052/register/create/user"
        const response = await axios.post(Url, user);
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