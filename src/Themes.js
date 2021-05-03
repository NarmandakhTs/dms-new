import { createMuiTheme } from '@material-ui/core/styles'

const AppTheme = createMuiTheme({
  shape: {
    borderRadius: 10
  },
  palette: {
    primary: {
      main: '#262F3E'
    },
    secondary: {
      main: '#5446e2'
    },
    background: {
      default: "#fff"
    },
  },
  typography: {
    fontSize: 13,
  },
})

export {
  AppTheme
}