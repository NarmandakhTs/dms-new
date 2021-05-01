import { makeStyles } from '@material-ui/core/styles'
import { ProjectsForm } from './../forms'
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.spacing(1),
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2, 3),
    margin: theme.spacing(5, 0)
  }
}))

function ProjectsNew() {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
    >
      <Grid item xs={8}>
        <Box className={classes.container}>
          <Box mb={1}>
            <Typography>Create Projects</Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >
              <Box fontWeight="fontWeightRegular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Box>
            </Typography>
          </Box>
          <ProjectsForm />
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProjectsNew