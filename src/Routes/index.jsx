import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { LoginSapiens } from '../pages/LoginSapiens'
import Cadastro from '../pages/Cadastro'
import TriagemSapiens from '../pages/TriagemSapiens'
import { TriagemLayout } from './TriagemLayout'
import { HistoricoTriagem } from '../pages/HistoricoTriagem'
import { LoginPicaPau } from '../pages/LoginPicaPau'
import { RecuperarSenha } from '../pages/RecuperarSenha'
import { PageInteressados } from '../pages/PageInteressados'
import { ServidorManutencao } from '../pages/ServidorManutencao'
import { useState } from 'react'
import { Advogados } from '../pages/Advogado'




export const AppRouter = () => {

    const [isManutencao] = useState(false)

    return (
        <Router>
            <Routes>

                { isManutencao ? <Route path='/' exact element={<ServidorManutencao/>} />
                : 
                <>
                    <Route path='/recuperarSenha' exact element={<RecuperarSenha/>} />
                    <Route path='/loginSapiens' exact element={<LoginSapiens/>} />
                    <Route path='/cadastro' exact element={<Cadastro/>}/>
                    <Route path='/triagem' exact element={
                        <TriagemLayout>
                            <TriagemSapiens/>
                        </TriagemLayout>
                    }/>
                    <Route path='/historico' exact element={
                    <TriagemLayout>
                        <HistoricoTriagem/>
                    </TriagemLayout>
                    }/>
                    <Route path='/interessados' exact element={
                        <TriagemLayout>
                            <PageInteressados/>
                        </TriagemLayout>
                    } />
                    <Route path='/advogados' exact element={
                        <TriagemLayout>
                            <Advogados />
                        </TriagemLayout>
                    } />
                    <Route path='/' exact element={<LoginPicaPau/>} />
                </> }

                
            </Routes>
        </Router>
    )
}