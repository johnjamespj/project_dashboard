import type { ThemeRootProps } from "./Root.types"

import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from '../lib/theme'

export default function RootTheme({children}: ThemeRootProps){
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>;
}
