import { Typography, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: theme.spacing(2),
        justifyContent: 'center',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        alignContent: 'center'
    },
    copyright: {
        width: '100%',
        textAlign: 'center'
    }
}))

const sampleLinks: LegalsLink[] = ["Terms" , "Privacy", "Security", "Status", "Docs", "Contact", "Pricing", "API", "Training", "Blog"]
    .map((x) => ({name: x}))

export interface LegalsLink{
    name: string;
    url?: string;
}

export interface DrawerLegalsProps{
    copyright?: string;
    links?: LegalsLink[];
}

export function DrawerLegals({copyright = "© 2021 Dashboard, Inc.", links=sampleLinks} : DrawerLegalsProps){
    const classes = useStyles()

    return <div className={classes.container}>
        <Typography className={classes.copyright} variant="overline">{copyright}</Typography>
        {sampleLinks.map((x, i) => <Link key={i} href={x.url || "#"}>{x.name}</Link>)}
    </div>
}