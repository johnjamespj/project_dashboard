import React from 'react'
import { makeStyles } from '@material-ui/core';
import { DrawerLegals as DrawerLegalsComponent } from './DrawerLegal';

const useStyles = makeStyles((theme) => ({
    container: {
        width: theme.size.drawerWidth,
    }
}))

function StoryContainer(){
    const classes = useStyles()

    return <div className={classes.container}>
        <DrawerLegalsComponent />
    </div>
}

export default {
    title: 'Components/Scaffold/Drawer/Drawer Legals',
    component: StoryContainer,
}

export const DrawerLegals = (args: any) => <StoryContainer {...args}/>;