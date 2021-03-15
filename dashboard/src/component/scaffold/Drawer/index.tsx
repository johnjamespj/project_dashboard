import type { DrawerLegalsProps } from './DrawerLegal'
import type { DrawerMenuProps } from './List'
import type { BrandHeaderProps } from '../BrandHeader/BrandHeader'

import React from 'react'
import { DrawerLegals } from './DrawerLegal'
import { List } from './List'
import { Drawer as MUIDrawer, makeStyles, Hidden, useTheme, Toolbar } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars';
import { BrandHeader } from '../BrandHeader/BrandHeader';

const useStyle = makeStyles((theme) => ({
    root: {
        width: theme.size.drawerWidth,
    },
    drawerZIndex: {
        width: theme.size.drawerWidth,
        zIndex: theme.zIndex.appBar - 10,
    }
}))

const renderThumb = ({ style, ...props }: any) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props: any) => (
    <Scrollbars
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        {...props}
    />
);

export interface DrawerProps extends DrawerMenuProps, DrawerLegalsProps, BrandHeaderProps {
    onDrawerClose?: () => void
    isOpen?: boolean
}

export function Drawer({
    sections,
    copyright,
    links,
    onClick,
    brandImageSRC,
    title,
    selected = null,

    onDrawerClose,
    isOpen = false,
}: DrawerProps) {
    const classes = useStyle()
    const theme = useTheme()

    const drawer = <CustomScrollbars>
        <List onClick={onClick} sections={sections} selected={selected} />
        <div><DrawerLegals links={links} copyright={copyright} /></div>
    </CustomScrollbars>

    return <>
        <Hidden mdUp implementation="css">
            <MUIDrawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={isOpen}
                onClose={() => onDrawerClose && onDrawerClose()}
                classes={{
                    paper: classes.root,
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Toolbar>
                    <BrandHeader brandImageSRC={brandImageSRC} title={title} />
                </Toolbar>
                {drawer}
            </MUIDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
            <MUIDrawer
                variant="persistent"
                classes={{
                    paper: classes.drawerZIndex,
                }}
                open
            >
                <Toolbar />
                {drawer}
            </MUIDrawer>
        </Hidden>
    </>
}