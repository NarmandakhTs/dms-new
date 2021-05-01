import {
  useState,
  useEffect
} from 'react'
import {
  Avatar,
  Button,
  Box,
  Grid,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'

const useStyles = makeStyles((theme) => ({
  projectCard: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 5px #efefef',
  },
  projectAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

function MyProjects() {
  const classes = useStyles()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data } = await axios.get('my/projects')

      setProjects(data)
    } catch (e) {
      // 
    }
  }

  return (
    <Box p={3}>
      <Box mb={5}>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h6">
              <Box fontWeight="fontWeightMedium">My Projects</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              component={Link}
              to="my/new"
            >Create Project</Button>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        spacing={3}
      >
        {projects.map((item, index) =>
          <Grid
            key={index}
            item
            xs={4}
          >
            <Box className={classes.projectCard}>
              <Avatar
                variant="rounded"
                className={classes.projectAvatar}
              >
                {item.name ? item.name.charAt(0) : ''}
              </Avatar>
              <Box mt={2} mb={1}>
                <Typography>
                  <Box fontWeight="fontWeightMedium">{item.name}</Box>
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                <Box lineHeight="22.1px">
                  {item.overview}
                </Box>
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default MyProjects