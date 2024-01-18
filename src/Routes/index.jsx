import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login } from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import TriagemSapiens from '../pages/TriagemSapiens'




export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Login/>} />
                <Route path='/cadastro' exact element={<Cadastro/>}/>
                <Route path='/triagem' exact element={<TriagemSapiens/>}/>
            </Routes>
        </Router>
    )
}