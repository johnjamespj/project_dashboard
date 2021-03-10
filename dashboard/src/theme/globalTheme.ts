import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"
import { typography } from "./typography"
import { palette } from "./palette"
import { size } from "./size"

const themeLight = createMuiTheme({
  palette,
  typography,
  size,
  scaffoldTheme: {
    appBarColor: (theme) => theme.palette.primary.main,
    drawerColor: (theme) => theme.palette.common.white,
  },
})

export const theme = responsiveFontSizes(themeLight)