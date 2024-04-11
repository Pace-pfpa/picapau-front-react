import axios from "axios";

export async function findAllProcess(date,status){
    console.log("chamouuuu")
    const url = "http://localhost:3052/register/findAll"
    const response = await axios.post(url, {dataAtual: date, statusAtual: status} ,{
        headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })


    for(let i=0; i < response.data.length; i++){
        response.data[i].dia = response.data[i].dia.split("T")[0]
        if(Number(response.data[i].statusProcess) == 1){
            response.data[i].statusProcess = "src/assets/sucess.png"
        }else if(Number(response.data[i].statusProcess) == 2){
            response.data[i].statusProcess = "src/assets/warning.png"
        }else{
            response.data[i].statusProcess = "src/assets/error.png"
        }
    }

    return response.data
}