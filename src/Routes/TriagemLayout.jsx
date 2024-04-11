import { ResponsiveAppBar } from '../pages/ResponsiveAppBar'


export const TriagemLayout = ({children})=> {
    return (
        <div>
            <ResponsiveAppBar/>
            {children}
        </div>
    )
}