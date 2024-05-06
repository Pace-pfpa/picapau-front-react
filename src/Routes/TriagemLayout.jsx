/* eslint-disable react/prop-types */
import { ResponsiveAppBar } from '../pages/ResponsiveAppBar'


export const TriagemLayout = ({children})=> {
    return (
        <div>
            <ResponsiveAppBar/>
            {children}
        </div>
    )
}