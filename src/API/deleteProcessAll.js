import axios from "axios";

export async function deleteProcessAll(){
    const url = "http://localhost:3010/register/deleteAll"
    const response = await axios.delete(url, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    if(response.status == 200) return response.data;
    
}