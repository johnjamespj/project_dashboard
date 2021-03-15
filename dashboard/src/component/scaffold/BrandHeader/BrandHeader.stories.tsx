import React from 'react'
import { makeStyles } from '@material-ui/core';
import { BrandHeader } from './BrandHeader';

const useStyles = makeStyles((theme) => ({
    container: {
        width: theme.size.drawerWidth,
        height: 64,
    }
}))

function StoryContainer(){
    const classes = useStyles()

    return <div className={classes.container}>
        <BrandHeader />
    </div>
}

export default {
    title: 'Components/Scaffold',
    component: StoryContainer,
}

export const BrandDrawer = (args: any) => <StoryContainer {...args}/>;