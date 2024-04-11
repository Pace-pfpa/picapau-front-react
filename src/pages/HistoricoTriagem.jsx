import React, { useState, useEffect } from 'react';
import { findAllProcess } from '../API/findAllProcess';
import { useNavigate } from 'react-router-dom';





export const HistoricoTriagem = ()=> {
  const dataAtual = new Date().toISOString().split('T')[0];
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  const [dados, setDados] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(dataAtual);
  const [statusSelecionado, setStatusSelecionado] = useState('');
  const navigate = useNavigate();

useEffect(()=> {
  const processAPI = async () => {
      let data =  new Date().toISOString().split('T')[0];
    const proces = await findAllProcess(data);
 setDados(proces)
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
    const proces = await findAllProcess(date);
    setDados(proces)
  }
  else{
    const date = new Date(dataSelecionada).toISOString().split('T')[0];
    const statusString = String(statusSelecionado)
    const proces = await findAllProcess(date,statusString);
    setDados(proces)
  }
}


const acessarSite = (item) => {
  window.open(`https://sapiens.agu.gov.br/visualizador?nup=${item.nup}&tarefaId=${item.tarefadId}`)
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
        <table>
          <thead>
            <tr>
              <th>Nup</th>
              <th>Dia</th>
              <th>Hora</th>
              <th>Status</th>
            </tr>
          </thead>
            <tbody>
              {dados.map((item,index) => (
                <tr  key={index} onClick={() => acessarSite(item)} className="linha-selecionada">
                  <td>{item.nup}</td>
                  <td>{item.dia}</td>
                  <td>{item.hora}</td>
                  <td><img className='pngStatus' src={item.statusProcess} alt="" /></td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  );
};