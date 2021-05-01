import { makeStyles } from '@material-ui/core/styles'
import { RoleForm } from './../forms'
import {
  Box,
  Divider,
  Typography,
  Grid
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2, 3),
    margin: theme.spacing(5, 0)
  }
}))

function RolesNew() {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
    >
      <Grid item xs={8}>
        <Box className={classes.wrapper}>
          <Box mb={1}>
            <Typography>Create Role</Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >
              <Box fontWeight="fontWeightRegular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Box>
            </Typography>
          </Box>
          <RoleForm />
        </Box>
      </Grid>
    </Grid>
  )
}

export default RolesNew