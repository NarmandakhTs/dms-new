import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  Button,
  Grid,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from './../plugins/axios'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  group: {
    borderRadius: 5,
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  roleCard: {
    borderRadius: 5,
    backgroundColor: '#fff',
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  }
}))

function Users() {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    fetchRoles()
    fetchUsers()
  }, [])

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get('roles')

      setRoles(data)
    } catch (e) {
      // 
    }
  }

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('users')

      setUsers(data)
    } catch (e) {
      // 
    }
  }

  return (
    <Box p={3}>
      <Box className={classes.group}>
        <Box mb={3}>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h6">Roles</Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="roles/new"
                variant="outlined"
                color="primary"
              >Create Role</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          spacing={2}
        >
          {roles.map(role =>
            <Grid item xs={4}>
              <Box className={classes.roleCard}>
                <Typography>
                  <Box fontWeight="fontWeightMedium">{role.title}</Box>
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box className={classes.group}>
        <Box mb={3}>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h6">Users</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
              >Add Users</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          spacing={2}
        >
          {/*  */}
        </Grid>
      </Box>
    </Box>
  )
}

export default Users