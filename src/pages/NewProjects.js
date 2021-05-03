import {
  useState,
  useEffect
} from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  projects: {
    width: '100%',
    height: '100vh',
    overflowY: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  projectCard: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}20`,
    borderRadius: theme.shape.borderRadius,
    transition: '.15s'
  },
  projectCardActive: {
    color: '#fff',
    backgroundColor: theme.palette.primary.light,
    '& $projectCardAvatar': {
      backgroundColor: '#ffffff20',
    },
  },
  projectCardBody: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
  projectCardAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: '#00000030'
  },
  projectCardCover: {
    height: theme.spacing(10),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
  },
  projectCardAvatarCover: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: theme.palette.primary.light,
    transform: 'translateY(-50%)',
    border: '5px solid white'
  },
  projectMore: {
    padding: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.primary.main}20`,
    height: '100vh',
    position: 'fixed'
  }
}))

function NewProjects() {
  const classes = useStyles()
  const [projects, setProjects] = useState([])
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await axios.get('new/projects')
    setProjects(data)
  }

  const handleApply = async () => {
    const projectId = getSelectedProject().id
    await axios.post(`projects/${projectId}/apply`)
    fetchData()
  }

  const isProjectSelected = () => selectedProjectIndex !== null
  const getSelectedProject = () => projects[selectedProjectIndex]

  return (
    <Grid container>
      <Grid item xs>
        <Container className={classes.projects}>
          {!isProjectSelected() && (
            <Box mb={5}>
              <Typography variant="h6">New Projects</Typography>
              <Typography color="textSecondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </Box>
          )}
          <Grid
            container
            spacing={2}
          >
            {projects.map((item, index) =>
              <Grid
                key={index}
                item
                xs={isProjectSelected() ? 12 : 4}
              >
                <Box
                  onClick={() => setSelectedProjectIndex(index)}
                  className={clsx({
                    [classes.projectCard]: true,
                    [classes.projectCardActive]: index === selectedProjectIndex
                  })}
                >
                  <Avatar
                    variant="rounded"
                    className={classes.projectCardAvatar}
                  >
                    {item.name ? item.name.charAt(0) : ''}
                  </Avatar>
                  <Box mt={2} mb={1}>
                    <Typography>
                      <Box fontWeight="fontWeightMedium">{item.name}</Box>
                    </Typography>
                  </Box>
                  {!isProjectSelected() && (
                    <Box className={classes.projectCardBody}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        <Box lineHeight="22.1px">
                          {item.overview}
                        </Box>
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Grid>
      {isProjectSelected() && (
        <Grid item xs={7}>
          <Box className={classes.projectMore}>
            <Box className={classes.projectCardCover} />
            <Box mx={3}>
              <Avatar
                variant="rounded"
                className={classes.projectCardAvatarCover}
              >
                {getSelectedProject().name ? getSelectedProject().name.charAt(0) : ''}
              </Avatar>
              <Typography variant="h5">
                {getSelectedProject().name}
              </Typography>
              <Box mt={2} mb={1}>
                <Typography>
                  <Box fontWeight="fontWeightMedium">Overview</Box>
                </Typography>
              </Box>
              <Typography color="textSecondary">
                {getSelectedProject().overview}
              </Typography>
              <Box width={150} mt={3}>
                <Button
                  disabled={getSelectedProject().applies_count}
                  onClick={handleApply}
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                >Apply</Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default NewProjects