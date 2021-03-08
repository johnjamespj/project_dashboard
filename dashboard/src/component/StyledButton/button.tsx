import { withStyles, Button as B, ButtonProps, PropTypes, Theme } from "@material-ui/core"

type CommonColors =
    | 'black'
    | 'white'
    | 'sirius'
    | 'earth'
    | 'procyon'
    | 'sun'
    | 'canopus'
    | 'achernar'
    | 'altair'
    | 'antares'
    | 'vega'
    | 'betelgeuse'
    | 'aldebaran'
    | 'pollux'
    | 'rigel'
    | 'agena'
    | 'spica'
    | 'mimosa'

export type ExtendedColor =
    PropTypes.Color
    | CommonColors
    | 'accent'
    | 'decorative'

interface ExtendedColorProps {
    color?: ExtendedColor
}

export type ExtendedButtonProps = ExtendedColorProps & Omit<ButtonProps, 'color'>

function getColor(color: ExtendedColor, theme: Theme): string | null {
    switch (color) {
        case 'inherit':
        case 'primary':
        case 'secondary':
        case 'default':
            return null
        default:
            return theme.palette.common[color] || null
    }
}

function getPropColor(color: ExtendedColor): PropTypes.Color | null {
    switch (color) {
        case 'inherit':
        case 'primary':
        case 'secondary':
        case 'default':
            return color
        default:
            return null
    }
}

export function Button(props: ExtendedButtonProps) {
    const { color = "default", ...rest } = props

    const StyledButton = withStyles((theme) => {
        const colorCode = getColor(color, theme)
        const { variant } = rest

        if (colorCode === null) 
            return ({ root: {} })        

        if (variant === 'contained')
            return ({
                root: {
                    color: theme.palette.getContrastText(colorCode),
                    backgroundColor: colorCode,
                    "&:hover": {
                        backgroundColor: colorCode,
                    },
                },
            })

        if (variant === 'outlined')
            return ({
                root: {
                    color: colorCode,
                    borderColor: colorCode
                },
            })

        return ({
            root: {
                color: colorCode
            },
        })
    })(B)

    var c = getPropColor(color)
    if (c)
        return <StyledButton color={c} {...rest} />
    else
        return <StyledButton {...rest} />
}
