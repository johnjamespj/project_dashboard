import { Typography as MUITypography } from '@material-ui/core'

export default {
    title: 'Components/Material-ui Components/Typography',
    component: MUITypography,
}

export const Typography = (args: any) => <MUITypography {...args} />;

Typography.args = {
    children: "Hello world!",
    variant: "h1",
}

Typography.argTypes = {
    variant: {
        control: {
            type: "select",
            options: [
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "subtitle1",
                "subtitle2",
                "body1",
                "body2",
                "button",
                "caption",
                "overline",
            ],
        },
    },
}
