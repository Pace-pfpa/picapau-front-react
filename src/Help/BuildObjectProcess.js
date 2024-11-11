export async function buildObjectProcess(data,status,tarefa){
    let valorStatus;
    const agora = new Date();
    const isoString = agora.toISOString();

    if(status.impeditivos){
        valorStatus = '1';
    }else if(status.warning){
        valorStatus = '2';
    }else{  
        valorStatus = '3';
    }
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();
    console.log(`Hora atual: ${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`);
    return {
        nup: data.pasta.NUP,
        dia: isoString,
        hora: `${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`,
        statusProcess: valorStatus,
        tarefadId: `${tarefa.id}`
    }
}