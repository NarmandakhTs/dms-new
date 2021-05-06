import { useState } from 'react'
import {
  Box,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  // 
}))

function Schedules() {
  const classes = useStyles()
  const [tasks, setTasks] = useState([])

  return (
    <Grid container>
      <Grid item xs>
        lol
      </Grid>
      <Grid item xs>
        ll
      </Grid>
    </Grid>
  )
}

export default Schedules