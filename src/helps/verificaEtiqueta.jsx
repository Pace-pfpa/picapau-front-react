export function VerificaEtiqueta(etiqueta_min) {
    const etiqueta=etiqueta_min.toUpperCase();
    // Lista de palavras-chave
    
    const palavrasChave = [
        'DOSPREV COM FALHA NA GERACAO',
        'JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF',
        'DOSPREV NAO ENCONTRADO',
        'DOSPREV NAO EXISTE',
        'ERRO AO LE NOVO DOSPREV',
        'CPF NAO ENCONTRADO',
        'ADVOGADO FRAUDE',
        'DOSPREV COM FALHA NA PESQUISA',
        'FALHA AO GERAR DOSSIE SUPER SAPIENS',
        'SISLABRA AUTOR e CONJUGE NAO EXISTE',
        'PROCESSO LIMPO',
        'IMPEDITIVOS',
        'AUSENCIA DE REQUERIMENTO AUTOR',
        'EMPREGO',
        'VINCULO ABERTO',
        'IDADE INDEFINIDA',
        'IDADE',
        'LITISPENDENCIA',
        'CONCESSAO ANTERIOR'
    ];

    if(palavrasChave.includes(etiqueta)) return true
   
    return false;
}
    
    

