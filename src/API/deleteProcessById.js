import axios from "axios";
import { controleUser } from "../global";

export async function deleteProcessById(id){
    const url = "http://localhost:3010/register/deleteById"
    console.log(id)
    console.log(localStorage.getItem("token"))
    const response = await axios.delete(`${controleUser}register/deleteById`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        data: {
            idProcess: id  
        }
    });

    if(response.status == 200) return response.data;
    
}