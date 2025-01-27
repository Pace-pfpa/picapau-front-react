import axios from "axios";
import { controleUser } from "../../global";

export async function findAllProcess(date,status){
    console.log("chamouuuu")
    const response = await axios.post(`${controleUser}register/findAll`, {dataAtual: date, statusAtual: status} ,{
        headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    for(let i=0; i < response.data.length; i++){
        response.data[i].dia = response.data[i].dia.split("T")[0]
        if(Number(response.data[i].statusProcess) === 3){
            response.data[i].statusProcess = "src/assets/sucess.png"
        }else if(Number(response.data[i].statusProcess) === 2){
            response.data[i].statusProcess = "src/assets/warning.png"
        }else{
            response.data[i].statusProcess = "src/assets/error.png"
        }
    }

    return response.data
}