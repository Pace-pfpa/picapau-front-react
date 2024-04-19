import axios from "axios";

export async function deleteProcessById(id){
    const url = "http://localhost:3010/register/deleteById"
    console.log(id)
    console.log(localStorage.getItem("token"))
    const response = await axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        data: {
            idProcess: id  
        }
    });

    if(response.status == 200) return response.data;
    
}