import axios from "axios";
import { controleUser } from "../../global";

export async function saveProcess(data){
    console.log(localStorage.getItem("token"))
    const response = await axios.post(`${controleUser}register/saveProcess`,data, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data
}