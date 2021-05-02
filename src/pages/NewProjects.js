import {
  useState,
  useEffect
} from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'

const useStyles = makeStyles((theme) => ({
  projectCard: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 10px #efefef',
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
  },
  projectCardCover: {
    height: theme.spacing(10),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
  },
  projectCardAvatarCover: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    transform: 'translateY(-50%)',
    border: '5px solid white'
  }
}))

function ProjectsGrid({ items, onItemSelected }) {
  const classes = useStyles()

  return (
    <Grid
      container
      item
      xs
      spacing={3}
    >
      {items.map((item, index) =>
        <Grid
          key={index}
          xs={4}
          item
        >
          <Box className={classes.projectCard}>
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
            <Box mt={3}>
              <Button
                onClick={() => onItemSelected(index)}
                fullWidth
                variant="outlined"
                color="primary"
              >Select</Button>
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

function ProjectsList({ items, selectedItem }) {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  )
}

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
    <Box p={3}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          container
          item
          xs
          spacing={3}
        >
          {projects.map((item, index) =>
            <Grid
              key={index}
              item
              xs={isProjectSelected() ? 12 : 4}
            >
              <Box className={classes.projectCard}>
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
                <Box mt={3}>
                  <Button
                    onClick={() => setSelectedProjectIndex(index)}
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >Select</Button>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
        {isProjectSelected() && (
          <Grid item xs={8}>
            <Box className={classes.projectCard}>
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
    </Box>
  )
}

export default NewProjects