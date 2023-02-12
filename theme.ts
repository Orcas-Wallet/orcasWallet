import { extendTheme } from 'native-base';

const theme = extendTheme({
    components: {
        Button: {
            // Can simply pass default props to change default behaviour of components.
            baseStyle: {
                rounded: 'md',
            },
            defaultProps: {
                colorScheme: 'red',
            },
        },
        Heading: {
            // Can pass also function, giving you access theming tools
            baseStyle: ({ colorMode }) => {
                return {
                    color: colorMode === 'dark' ? 'red.300' : 'blue.300',
                    fontWeight: 'normal',
                };
            },
        },
        Toast: {
            baseStyle: {
                zIndex: 100,
                color: "red"
            }
        }
    },
});