import {
  useState,
  useEffect
} from 'react'
import {
  Avatar,
  Button,
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import {
  Link,
  useRouteMatch
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'

const useStyles = makeStyles((theme) => ({
  projectCard: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 5px #efefef',
  },
  projectAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: '#ffffff20',
  },
  projectTitle: {
    color: '#fff',
    textDecoration: 'none'
  }
}))

function MyProjects() {
  const classes = useStyles()
  const { url } = useRouteMatch()
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
    <Container>
      <Box my={4}>
        <Box mb={5}>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h6">
                <Box fontWeight="fontWeightMedium">Миний төслүүд</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                component={Link}
                to={`${url}/new`}
              >Төсөл үүсгэх</Button>
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
              xs={4}
              item
            >
              <Box className={classes.projectCard}>
                <Avatar
                  variant="rounded"
                  className={classes.projectAvatar}
                >
                  {item.name ? item.name.charAt(0) : ''}
                </Avatar>
                <Box mt={2} mb={1}>
                  <Link
                    to={`${url}/${item.id}`}
                    className={classes.projectTitle}
                  >
                    <Typography>
                      <Box fontWeight="fontWeightMedium">{item.name}</Box>
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  )
}

export default MyProjects