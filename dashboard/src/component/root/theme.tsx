import type {ReactNode} from "react"
import {CssBaseline, ThemeProvider} from '@material-ui/core'
import {theme} from '../../theme'

interface ThemeRootProps{
    children:  ReactNode
}

export function ThemeRoot({children}: ThemeRootProps){
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>;
}