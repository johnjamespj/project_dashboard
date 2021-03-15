import React from 'react'
import { AppBar as SAppBar } from '.';

export default {
    title: 'Components/Scaffold/App Bar',
    component: SAppBar,
}

export const AppBar = (args: any) => <SAppBar isStatic {...args}/>;
