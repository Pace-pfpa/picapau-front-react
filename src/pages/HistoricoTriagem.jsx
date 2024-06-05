import React, { useState, useEffect } from 'react';
import { findAllProcess } from '../API/UserAPI/findAllProcess';
import { useNavigate } from 'react-router-dom';
import { TotaisProcessosDetalhado } from '../components/TotaisProcessosDetalhados';
import { deleteProcessById } from '../API/UserAPI/deleteProcessById';
import { TelaInformarExisteProcessoNoBanco } from '../components/TelaInformarExisteProcessoNoBanco';
import { LoadBancoDeDados } from '../components/LoadBancoDeDados';





export const HistoricoTriagem = ()=> {
  const dataAtual = new Date().toISOString().split('T')[0];
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  const [dados, setDados] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(dataAtual);
  const [statusSelecionado, setStatusSelecionado] = useState('');
  const [dadosParaContador, setDadosParaContador] = useState([]);
  const [carregandoBanco, setCarregandoBanco] = useState(false)
  const navigate = useNavigate();

useEffect(()=> {
  setCarregandoBanco(true);
  const processAPI = async () => {
      let data =  new Date().toISOString().split('T')[0];
      const proces = await findAllProcess(data);
      setDados(proces)
      setCarregandoBanco(false)
      setDadosParaContador(proces)
  }

verificarLogin();
processAPI()
},[])
const verificarLogin = async () => {
  // Coloque aqui a lógica da sua verificação
  /* const data = {
      "cpf": `${localStorage.getItem("sapiensCPF")}`,
      "senha": `${localStorage.getItem("sapiensSenha")}`
    }
    console.log(data)
  const response = await axios.post("http://localhost:3001/samir/login",data)
  console.log(data)
  console.log(response) */
  if(localStorage.getItem("sapiensCPF") == null || localStorage.getItem("sapiensSenha") == null || localStorage.getItem("token") == null){
    navigate("/");
  }
}

async function filtrarDados(){
  if(dataSelecionada && statusSelecionado.length==0){
    const date = new Date(dataSelecionada).toISOString().split('T')[0];
    setCarregandoBanco(true);
    const proces = await findAllProcess(date);
    setDados(proces)
    setCarregandoBanco(false);
    setDadosParaContador(proces)
  }
  else{
    const date = new Date(dataSelecionada).toISOString().split('T')[0];
    const procesContador = await findAllProcess(date);
    setDadosParaContador(procesContador)
    const statusString = String(statusSelecionado)
    setCarregandoBanco(true);
    const proces = await findAllProcess(date,statusString);
    setDados(proces)
    setCarregandoBanco(false);
  }
}


const acessarSite = (item) => {
  window.open(`https://sapiens.agu.gov.br/visualizador?nup=${item.nup}&tarefaId=${item.tarefadId}`)
}

const deletarProcessoPorId = async (value) => {
  try{
    await deleteProcessById(value.id)
    const elementosAtualizado = dados.filter((elementos) => elementos.id !== value.id);
    const elementosAtualizadosContadoor = dadosParaContador.filter((elementos) => elementos.id !== value.id);
    setDadosParaContador(elementosAtualizadosContadoor);
    setDados(elementosAtualizado);
    
  }catch{

  }
}



  return (
    <div className='ola'>
      <div className='inputDate'>
        <label htmlFor="">Filtrar por Data</label>
        <input type="date"
        id='data'
        value={dataSelecionada}
        onChange={(e) => setDataSelecionada(e.target.value)} />
        <br />
        <br />
        <label htmlFor="">Filtrar por Status</label>
        <select 
        id='status'
        value={statusSelecionado}
        onChange={(e) => setStatusSelecionado(e.target.value)}>
          <option value="0">Tudo</option>
          <option value="1">Sucesso</option>
          <option value="2">Aviso</option>
          <option value="3">Error</option>
        </select>
        <br />
        <button onClick={async () =>  filtrarDados()}>Filtrar</button>
      </div>
         
          <TotaisProcessosDetalhado processos={dadosParaContador} />
          {carregandoBanco ? (
            <LoadBancoDeDados/>
          ) : (
            dados.length <= 0 ? (
              <TelaInformarExisteProcessoNoBanco />
            ) : (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Nup</th>
                      <th>Dia</th>
                      <th>Hora</th>
                      <th>Status</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                    <tbody>
                      {dados.map((item,index) => (
                        <tr  key={index}  className="linha-selecionada">
                          <td onClick={() => acessarSite(item)}>{item.nup}</td>
                          <td onClick={() => acessarSite(item)}>{item.dia}</td>
                          <td onClick={() => acessarSite(item)}>{item.hora}</td>
                          <td onClick={() => acessarSite(item)}><img className='pngStatus' src={item.statusProcess} alt="" /></td>
                          <td className='dleteClass'><button className='buttonDelete' onClick={()=> deletarProcessoPorId(item)}><img className='imagenDelete' src="src/assets/deleteIcon.png" alt="" /></button></td>
                        </tr>
                      )).reverse()}
                    </tbody>
                </table>
  
              </div>
  
            )
          )}
        
    </div>
  );
};