import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Cadastro from "./components/Cadastro";




function App(){
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}


export default App;