import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Link,
  useRouteMatch
} from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  Grid
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(theme => ({
  userCard: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.grey[600],
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userCardActive: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
  }
}))


function UserSelect() {
  const classes = useStyles()
  const { path } = useRouteMatch()
  const [selectedUser, selectUser] = useState('student')

  const selection = user => ({
    onClick: () => selectUser(user),
    className: selectedUser === user ? classes.userCardActive : classes.userCard
  })

  return (
    <>
      <Typography
        variant="h6"
      >Хэрэглэгч сонгох</Typography>
      <Typography
        variant="caption"
        color="textSecondary"
      >Та хэрэглэгч сонгосноор нэвтрэх боломжтой болно.</Typography>
      <Box my={5}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Box {...selection('student')}>
              <div>icon</div>
              <div>Student</div>
            </Box>
          </Grid>
          <Grid item xs>
            <Box {...selection('teacher')}>
              <div>icon</div>
              <div>Teacher</div>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        endIcon={<ArrowForwardIcon />}
        component={Link}
        to={`${path}/${selectedUser}`}
      >Системд нэвтрэх</Button>
    </>
  )
}

export default UserSelect