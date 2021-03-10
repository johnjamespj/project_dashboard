// Button.stories.tsx

import { Button } from './button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            control: {
                type: "select",
                options: ["outlined", "contained", "text"],
            },
        },
        size: {
            control: {
                type: "select",
                options: ["small", "medium", "large"],
            },
        },
        color: {
            control: {
                type: "select",
                options: [
                    "default",
                    "inherit",
                    "primary",
                    "secondary",
                    'black',
                    'white',
                    'sirius',
                    'earth',
                    'procyon',
                    'sun',
                    'canopus',
                    'achernar',
                    'altair',
                    'antares',
                    'vega',
                    'betelgeuse',
                    'aldebaran',
                    'pollux',
                    'rigel',
                    'agena',
                    'spica',
                    'mimosa',
                ],
            },
        },
    },
    args: {
        children: "Click me!",
        variant: "outlined",
        size: "medium",
        color: "default",
    },
}

export const Primary = (args: any) => <Button {...args}>Button</Button>;
