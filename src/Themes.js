import { createMuiTheme } from '@material-ui/core/styles'

const AppTheme = createMuiTheme({
  shape: {
    borderRadius: 10
  },
  palette: {
    primary: {
      main: '#007eff'
    },
    background: {
      default: "#f7f9fc"
    },
  },
  typography: {
    fontSize: 13,
  },
})

export {
  AppTheme
}