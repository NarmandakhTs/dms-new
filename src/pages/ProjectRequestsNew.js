import { useState } from 'react'
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RequestForm } from './../forms'

const useStyles = makeStyles((theme) => ({
  container: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1, 2),
    margin: theme.spacing(5, 0),
  }
}))

function ProjectRequestsNew() {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
    >
      <Grid item xs={6}>
        <Box className={classes.container}>
          <Box mb={1}>
            <Typography>Create Request</Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >
              <Box fontWeight="fontWeightRegular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Box>
            </Typography>
          </Box>
          <RequestForm />
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProjectRequestsNew