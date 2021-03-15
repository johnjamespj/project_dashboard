import React from 'react'
import {Typography, makeStyles} from '@material-ui/core'
import BrandIconPlaceholder from '../../assets/logo.svg'

const useStyle = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        width: '100%',
        height: '100%',
    },
    brandIcon: {
        width: 43,
        height: 43,
    }
}))

export interface BrandHeaderProps{
    brandImageSRC?: string;
    title?: string;
}

export function BrandHeader({brandImageSRC = BrandIconPlaceholder, title = "Dashboard"} :BrandHeaderProps){
    const classes = useStyle()

    return <div className={classes.container}>
        <img className={classes.brandIcon} src={brandImageSRC} alt="Icon"/>
        <Typography variant="h2">{title}</Typography>
    </div>
}