import axios from "axios";

export async function saveProcess(data){
    const url = "http://localhost:3052/register/saveProcess"
    console.log(localStorage.getItem("token"))
    const response = await axios.post(url,data, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data
}