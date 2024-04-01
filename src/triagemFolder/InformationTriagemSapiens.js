// eslint-disable-next-line no-undef
/* const { JSDOM } = require('jsdom'); */
/* import { getUsuarioUseCase } from '../GetUsuario'; */

/* import { getTarefaUseCase } from '../GetTarefa'; */


/* import { getArvoreDocumentoUseCase } from '../GetArvoreDocumento/index'; */

/* import { getDocumentoUseCase } from '../GetDocumento';
import { updateEtiquetaUseCase } from '../UpdateEtiqueta';
import { getXPathText } from "../../helps/GetTextoPorXPATH";

import { getCapaDoPassivaUseCase } from '../GetCapaDoPassiva';
import { verificarCapaTrue } from './helps/verificarCapaTrue';
import { buscarTableCpf } from './helps/procurarTableCpf';
import { superDossie } from './DossieSuperSapiens'; */

/* import { getInformationDossieForPicaPau } from './GetInformationFromDossieForPicaPau';
import { getDocumentSislabraFromSapiens } from './GetDocumentSislabraFromSapiens';
import { getInformationCapa } from './GetInformationCapa';
import { compararNup } from "./helps/ComparaNUP";
import MessageService from '../../MessageService';
 */

import { getArvoreDocumento } from '../visaoRequest/getArvoreDocumento';
import { getTarefas } from '../visaoRequest/getTarefas';
import { getUsuarioRequest } from '../visaoRequest/getUsuarioRequest';
import { loginVisao } from '../visaoRequest/loginRequest';
import { updateEtiqueta } from '../visaoRequest/updateEtiqueta';



export class GetInformationFromSapienForSamirUseCase {
    
    async execute(data) {
        
        const cookie = await loginVisao(data.login);
        
        const usuario = (await getUsuarioRequest(cookie));
        
        let impedDossie = '';

        const usuario_id = `${usuario[0].id}`;
        let novaCapa = false;
        var objectDosPrev
        let response = '';
        let dosprevThisTrue = true;
        let nupInicio = undefined;
        // eslint-disable-next-line no-unused-vars
        let nupFim = undefined;
        try {
            let tarefas = await getTarefas(cookie, "t8", usuario_id);
            console.log(tarefas)
            nupInicio = tarefas[0].pasta.NUP
            console.log("NupInicio: ",nupInicio)
            
            /* const tarefas = await getTarefaUseCaseNup.execute({ cookie, usuario_id, nup: data.nup }); */
            let VerificarSeAindExisteProcesso = true;
            while(VerificarSeAindExisteProcesso){
                            
                for (var i = 0; i <= tarefas.length - 1; i++) {
                    console.log("Qantidade faltando triar", (tarefas.length - i));

                    
                    let superDosprevExist = false;
                    const tarefaId = tarefas[i].id;
                    const etiquetaParaConcatenar = tarefas[i].postIt
                    const objectGetArvoreDocumento = { nup: tarefas[i].pasta.NUP, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id }
                    let arrayDeDocumentos;
                    
//SOLICITA ARVORE DE DOCUMENTOS
                    try {
                        arrayDeDocumentos = (await getArvoreDocumento(objectGetArvoreDocumento)).reverse();
                        
                      
                    } catch (error) {
                        console.log("Erro ao aplicar getArvoreDocumentoUseCase!!!!");
                        (await updateEtiqueta({ cookie, etiqueta: "DOSPREV COM FALHA NA GERAÇAO", tarefaId }));
                        continue
                    }

//



                    
//CAPA DO PROCESSO
                    const tcapaParaVerificar = await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie);
                    const tcapaFormatada = new JSDOM(tcapaParaVerificar)
                    
                    const tinfoClasseExist = await verificarCapaTrue(tcapaFormatada)
//SE POSSUIR INFORMAÇÃO DE CLASSE
                    if(tinfoClasseExist){
//DOSPREV

                            objectDosPrev = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
//SE EXISTIR NA ARVORE DE DOCUMENTOS COM SIGLA DOSPREV
                            if(objectDosPrev){
                                //SE EM  MOVIMENTO EXISTIR O TEXTO "JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF", IDENTIFICAR COMO DOSPREV2, OUSEJA É O NEWDOSSIE
                                var objectDosPrev2 = arrayDeDocumentos.find(Documento => {
                                    const movimento = (Documento.movimento).split(".");
                                    return movimento[0] == "JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF";
                                });
                                
                                if(objectDosPrev == undefined && objectDosPrev2 == undefined){
                                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ENCONTRADO", tarefaId }));
                                    continue
                                }else if(objectDosPrev2 != undefined && objectDosPrev == undefined){
                                    objectDosPrev = objectDosPrev2;
                                    superDosprevExist = true;
                                    
                                }else if(objectDosPrev != undefined &&  objectDosPrev2 != undefined){
                                   
                                    if(objectDosPrev.numeracaoSequencial <= objectDosPrev2.numeracaoSequencial){
                                        objectDosPrev = objectDosPrev2;
                                        superDosprevExist = true;
                                        
                                    }
                                    
                                }
                            }else{
                                dosprevThisTrue = false;
                                response = response + " DOSPREV NÃO EXISTE -"
                            }
                            
                            

                    } else{
                        
                        const capaParaVerificar = await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie);
                        const capaFormatada = new JSDOM(capaParaVerificar)
                        const xpathNovaNup = "/html/body/div/div[4]/table/tbody/tr[13]/td[2]/a[1]/b"
                        const novaNup = await getXPathText(capaFormatada, xpathNovaNup)
                        const novoObjectGetArvoreDocumento = { nup: novaNup, chave: tarefas[i].pasta.chaveAcesso, cookie, tarefa_id: tarefas[i].id }
                        try { 
                            const novaNupTratada = novaNup.split("(")[0].trim().replace(/[-/.]/g, "")
                            novoObjectGetArvoreDocumento.nup = novaNupTratada
                            arrayDeDocumentos = (await getArvoreDocumentoUseCase.execute(novoObjectGetArvoreDocumento)).reverse();
                            objectDosPrev = arrayDeDocumentos.find(Documento => Documento.documentoJuntado.tipoDocumento.sigla == "DOSPREV");
    
                            if(objectDosPrev){
                                let objectDosPrev2 = arrayDeDocumentos.find(Documento => {
                                    const movimento = (Documento.movimento).split(".");
                                    return movimento[0] == "JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF";
                                });


                                if(objectDosPrev == undefined && objectDosPrev2 == undefined){
                                    (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV NÃO ENCONTRADO -", tarefaId }));
                                    continue
                                }else if(objectDosPrev2 != undefined && objectDosPrev == undefined){
                                    objectDosPrev = objectDosPrev2;
                                    superDosprevExist = true;
                                }else if(objectDosPrev != undefined &&  objectDosPrev2 != undefined){
                                    if(objectDosPrev.numeracaoSequencial < objectDosPrev2.numeracaoSequencial){
                                        objectDosPrev = objectDosPrev2;
                                        superDosprevExist = true;
                                    }
                                }
                                dosprevThisTrue = false;
                                response = response + ' ERRO AO LÊ NOVO DOSPREV -'
                            }else{
                                dosprevThisTrue = false;
                                response = response + " DOSPREV NÃO EXISTE -"
                            }
                                


                        } catch (error) {
                            console.log(error);
                            (await updateEtiquetaUseCase.execute({ cookie, etiqueta: "DOSPREV COM FALHA NA GERAÇAO", tarefaId }));
                            continue
                        }
                    }


                    



                    

                    //Verificar a capa caso exista outra capa com os dados necessários
                    const capaParaVerificar = await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie);
                    const capaFormatada = new JSDOM(capaParaVerificar)
                    //const xPathClasse = "/html/body/div/div[4]/table/tbody/tr[2]/td[1]"
                    const infoClasseExist = await verificarCapaTrue(capaFormatada) 
                    let capa = ""
                    if(!infoClasseExist){
                
                        const xpathNovaNup = "/html/body/div/div[4]/table/tbody/tr[13]/td[2]/a[1]/b"
                        const novaNup = await getXPathText(capaFormatada, xpathNovaNup)
                        const nupFormatada = (novaNup.split('(')[0]).replace(/[./-]/g, "").trim();
                        capa = (await getCapaDoPassivaUseCase.execute(nupFormatada, cookie));
                        novaCapa = new JSDOM(capa)
                    }else{
                        
                        capa = (await getCapaDoPassivaUseCase.execute(tarefas[i].pasta.NUP, cookie));
                        novaCapa = new JSDOM(capa)
                    }
                    
                    
                    
                
                    const cpfCapa = buscarTableCpf(novaCapa);
                    if(!cpfCapa){
                        (await updateEtiquetaUseCase.execute({ cookie, etiqueta: ` CPF NÃO ENCONTRADO -`, tarefaId }))
                        continue;
                    }

                    const informationcapa = await getInformationCapa.ImpedimentosCapa(capa);
                    if(!informationcapa){
                        response= response + " ADVOGADO FRAUDE -"
                    }
                

                    let parginaDosPrev;
                    let parginaDosPrevFormatada;
                    if(dosprevThisTrue){

                        const dosPrevSemIdParaPesquisa = (objectDosPrev.documentoJuntado.componentesDigitais.length) <= 0;
                        if (dosPrevSemIdParaPesquisa) {
                            console.log("DOSPREV COM FALHA NA PESQUISA");
                            (await updateEtiquetaUseCase.execute({ cookie, etiqueta: `DOSPREV COM FALHA NA PESQUISA`, tarefaId }))
                            continue;
                        }
                        
                        if(!superDosprevExist){

                            //vericacao para saber se foi gerado o super dossie
                            
                            const idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                            parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });

                            parginaDosPrevFormatada = new JSDOM(parginaDosPrev); 

                            impedDossie = await getInformationDossieForPicaPau.impedimentos(parginaDosPrevFormatada, parginaDosPrev, data.readDosprevAge);
                            response = response + impedDossie
                        }else{
                            
                            

                            
                            const idDosprevParaPesquisa = objectDosPrev.documentoJuntado.componentesDigitais[0].id;
                            parginaDosPrev = await getDocumentoUseCase.execute({ cookie, idDocument: idDosprevParaPesquisa });
                            parginaDosPrevFormatada = new JSDOM(parginaDosPrev);

                            const verifarSeFoiGerado = (getXPathText(parginaDosPrevFormatada, "/html/body/div")).trim() == "Não foi possível a geração do dossiê previdenciário.";
                            console.log("verficarSeFoiGerado: "+verifarSeFoiGerado)
                            if(verifarSeFoiGerado) {
                                await updateEtiquetaUseCase.execute({ cookie, etiqueta: " Falha ao gerar Super DOSPREV ", tarefaId });
                                //response = response + " Falha ao gerar Super DOSPREV ";
                                continue
                            }


                            const NewDossiewithErro = (await getXPathText(parginaDosPrevFormatada, '/html/body/div')).trim() == 'Falha ao gerar dossiê. Será necessário solicitá-lo novamente.'
                            if(NewDossiewithErro) {
                                await updateEtiquetaUseCase.execute({ cookie, etiqueta: `Falha ao gerar dossiê super sapiens`, tarefaId })
                                response = '';
                                continue 
                            }
                            
                            
                            impedDossie = await superDossie.impedimentos(parginaDosPrevFormatada, parginaDosPrev, data.readDosprevAge);
                            response = response + impedDossie
                        }
                        


        

                        

                    }    
                        


                    
                    const paginaSislabraPoloAtivo = arrayDeDocumentos.find((Documento) => {
                        const nomeMovimentacao = Documento.movimento;
                        const name = nomeMovimentacao.indexOf("PÓLO ATIVO");
                        //const name2 = nomeMovimentacao.indexOf("nova string");
                        //if(name !=-1 || name2 !=-1)
                        if(name != -1){
                            return Documento

                        }
                    });
                    
                    
                    const paginaSislabraConjuge =  arrayDeDocumentos.find((Documento) => {
                        const nomeMovimentacao = Documento.movimento;       
                        const name = nomeMovimentacao.indexOf("POSSÍVEL CÔNJUGE");
                        if(name != -1){
                            const typeDpcumento = Documento.documentoJuntado.componentesDigitais[0].mimetype.split("/")[1].trim()
                            if(typeDpcumento == "html"){
                                return Documento
                            }
                        }
                    });
                    
                    if(paginaSislabraPoloAtivo && paginaSislabraConjuge){
                        const idSislabraParaPesquisaAutor = paginaSislabraPoloAtivo.documentoJuntado.componentesDigitais[0].id;
                        const parginaSislabraAutor = await getDocumentoUseCase.execute({ cookie, idDocument: idSislabraParaPesquisaAutor });

                        const paginaSislabraFormatadaAutor = new JSDOM(parginaSislabraAutor);

                        const sislabraAutor = await getDocumentSislabraFromSapiens.execute(paginaSislabraFormatadaAutor, "AUTOR")
                        response = response + sislabraAutor


                        const idSislabraParaPesquisaConjuge = paginaSislabraConjuge.documentoJuntado.componentesDigitais[0].id;
                        const parginaSislabraConjuge = await getDocumentoUseCase.execute({ cookie, idDocument: idSislabraParaPesquisaConjuge });

                        const paginaSislabraFormatadaConjuge = new JSDOM(parginaSislabraConjuge);

                        const sislabraConjuge = await getDocumentSislabraFromSapiens.execute(paginaSislabraFormatadaConjuge, "CONJUGE")

                        response = response + sislabraConjuge

                    }else if(paginaSislabraPoloAtivo && !paginaSislabraConjuge){

                        const idSislabraParaPesquisaAutor = paginaSislabraPoloAtivo.documentoJuntado.componentesDigitais[0].id;
                        const parginaSislabraAutor = await getDocumentoUseCase.execute({ cookie, idDocument: idSislabraParaPesquisaAutor });

                        const paginaSislabraFormatadaAutor = new JSDOM(parginaSislabraAutor);

                        const sislabraAutor = await getDocumentSislabraFromSapiens.execute(paginaSislabraFormatadaAutor, "AUTOR")
                        response = response + sislabraAutor

                    }else if(!paginaSislabraPoloAtivo && paginaSislabraConjuge){
                        const idSislabraParaPesquisaConjuge = paginaSislabraConjuge.documentoJuntado.componentesDigitais[0].id;
                        const parginaSislabraConjuge = await getDocumentoUseCase.execute({ cookie, idDocument: idSislabraParaPesquisaConjuge });

                        const paginaSislabraFormatadaConjuge = new JSDOM(parginaSislabraConjuge);

                        const sislabraConjuge = await getDocumentSislabraFromSapiens.execute(paginaSislabraFormatadaConjuge, "CONJUGE")

                        response = response + sislabraConjuge
                    }else{
                        response = response + " SISLABRA (AUTOR) e (CONJUGE) NÃO EXISTE"
                    }
                    
                    
                    
                    

                        

                    if(response.length == 0){
                        await updateEtiquetaUseCase.execute({ cookie, etiqueta: `PROCESSO LIMPO`, tarefaId })
                        response = '';
                        continue 
                    }else{
                        await updateEtiquetaUseCase.execute({ cookie, etiqueta: `IMPEDITIVOS:  ${response}`, tarefaId })
                        response = '';
                        continue  
                    }
                    
                        

                }
                tarefas = await getTarefaUseCase.execute({ cookie, usuario_id, etiqueta: data.etiqueta });
                console.log("Etiqueta: ", data.etiqueta )
                console.log("tarefassssssssss = " + tarefas.length)
                
                    if(tarefas.length==0){
                        VerificarSeAindExisteProcesso = false;
                    }else{
                        if(compararNup){
                            VerificarSeAindExisteProcesso = false;
                        }else{VerificarSeAindExisteProcesso = true; }
                    }      

            }    
            return await response
        } catch (error) {
            console.log(error);
            //console.log(response.length)
            if (response.length > 0) {
                return response
            }
            else {
                return error;
            }
        }
    }

}

