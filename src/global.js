const controleUserUrl = import.meta.env.VITE_CONTROLE_USER;
const visaoApi = import.meta.env.VITE_VISAO_API;
console.log(controleUserUrl);
console.log(visaoApi);

export const controleUser = `${controleUserUrl}`;

export const picapauApiSapiens = `${visaoApi}`;
