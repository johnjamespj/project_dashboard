import type { DrawerMenuListSection } from './Drawer/List'
import type { LegalsLink } from './Drawer/DrawerLegal' 

import React from 'react'
import { useTheme, useMediaQuery } from '@material-ui/core'
import { AppBar } from './AppBar'
import { Drawer } from './Drawer'

interface ScaffoldProps {
    sections: DrawerMenuListSection[]
    selected?: string | null
    title?: string
    brandImageSRC?: string
    onDrawerLinkClick?: () => void
    copyright?: string
    actions?: React.ReactNode[]
    links?: LegalsLink[]
}

export function Scaffold({
    sections,
    copyright,
    links,
    onDrawerLinkClick,
    brandImageSRC,
    title,
    selected = null,
    
    actions = [],
}: ScaffoldProps) {
    const [isMobileOpen, setMobileOpen] = React.useState(false)
    const theme = useTheme()
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'))

    React.useEffect(() => {
        setMobileOpen(false)
    }, [mobileScreen])

    const onMenuButtonClick = () => {
        setMobileOpen(x => !x)
    }

    return <div>
        <AppBar
            onClickMenuButton={onMenuButtonClick}
            actions={actions}
        />
        <Drawer 
            sections={sections}
            copyright={copyright}
            links={links}
            onClick={() => onDrawerLinkClick && onDrawerLinkClick()}
            brandImageSRC={brandImageSRC}
            title={title}
            selected={selected}
            onDrawerClose={() => setMobileOpen(false)}
            isOpen={isMobileOpen}
        />
    </div>
}