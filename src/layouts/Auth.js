import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Container
} from '@material-ui/core'
import { AuthRoutes } from './../Routes'

const useStyles = makeStyles(theme => ({
  wrap: {
    backgroundColor: '#007eff15',
    height: '100vh',
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[10],
  }
}))

function Auth() {
  const classes = useStyles()

  return (
    <Box className={classes.wrap}>
      <Container maxWidth="xs">
        <Box className={classes.container}>
          <AuthRoutes />
        </Box>
      </Container>
    </Box>
  )
}

export default Auth