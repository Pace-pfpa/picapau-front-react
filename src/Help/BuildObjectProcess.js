export async function buildObjectProcess(data,status,tarefa){
    const agora = new Date();
    const isoString = agora.toISOString();

    // if(status.resultadoTriagem){
    //     // Impeditivo
    //     valorStatus = '1';
    // }else if(status.warning){
    //     // Aviso
    //     valorStatus = '2';
    // }else{
    //     // Limpo
    //     valorStatus = '3';
    // }
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();
    console.log(`Hora atual: ${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`);
    return {
        nup: data.pasta.NUP,
        dia: isoString,
        hora: `${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`,
        statusProcess: status.resultadoTriagem,
        tarefadId: `${tarefa.id}`
    }
}