import type { ReactNode } from "react";
import {ThemeRoot} from "./theme"

interface ThemeRootProps{
    children: ReactNode
}

export function Root({children}: ThemeRootProps){
    return <ThemeRoot>{children}</ThemeRoot>
}