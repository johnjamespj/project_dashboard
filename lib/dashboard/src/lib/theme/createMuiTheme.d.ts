import * as createMuiTheme from '@material-ui/core/styles/createMuiTheme'

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Size {
        drawerWidth: number
        utilityDrawerWidth: number
        navigationRailWidth: number
    }

    interface ScaffoldTheme{
        appBarColor: (theme: Theme) => string
        drawerColor: (theme: Theme) => string
    }

    interface ThemeOptions {
        size?: Size
        scaffoldTheme?: ScaffoldTheme
    }

    interface Theme{
        size: Size
        scaffoldTheme: ScaffoldTheme
    }
}