import React from 'react';
import { joinClass } from '../../../helper/utils';
import { makeStyles, AppBar as MUIAppBar, Toolbar, Icon, IconButton, InputBase, fade, useMediaQuery, useTheme } from '@material-ui/core';
import { BrandHeader } from '../BrandHeader/BrandHeader';

export interface AppBarProps {
    isStatic?: boolean
    onClickMenuButton?: () => void
    actions?: React.ReactNode[]
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawer: {
        width: theme.size.drawerWidth,
    },
    content: {
        flex: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    fullWidth: {
        width: '100%'
    },
    actionArea: {
        display: 'flex',
        gap: 20
    },
}));

export function AppBar({ isStatic = false, onClickMenuButton, actions = [] }: AppBarProps) {
    const classes = useStyles();
    const theme = useTheme()

    const mobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <div className={classes.root}>
            <MUIAppBar position={isStatic ? "static" : "fixed"}>
                <Toolbar>
                    {mobile && (
                        <IconButton
                            onClick={() => onClickMenuButton && onClickMenuButton()}
                            className={classes.menuButton}
                            edge="end"
                            color="inherit"
                            aria-label="menu">
                            <Icon>menu</Icon>
                        </IconButton>
                    )}

                    {!mobile && <div className={classes.drawer}>
                        <BrandHeader />
                    </div>}
                    <div className={joinClass(classes.search, {
                        [classes.fullWidth]: mobile
                    })}>
                        <div className={classes.searchIcon}>
                            <Icon>search</Icon>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            fullWidth={false}
                        />
                    </div>
                    <div className={joinClass("", {
                        [classes.content]: !mobile
                    })} />
                    <div className={classes.actionArea}>
                        {actions}
                    </div>
                </Toolbar>
            </MUIAppBar>
        </div>
    )
}