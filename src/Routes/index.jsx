import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { LoginSapiens } from '../pages/LoginSapiens'
import Cadastro from '../pages/Cadastro'
import TriagemSapiens from '../pages/TriagemSapiens'
import { ResponsiveAppBar } from '../pages/ResponsiveAppBar'
import { TriagemLayout } from './TriagemLayout'
import { HistoricoTriagem } from '../pages/HistoricoTriagem'
import { LoginPicaPau } from '../pages/LoginPicaPau'




export const AppRouter = () => {
    return (
        <Router>
            <Routes>
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
                <Route path='/' exact element={<LoginPicaPau/>} />
            </Routes>
        </Router>
    )
}