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
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'
import clsx from 'clsx'
import FilterListIcon from '@material-ui/icons/FilterList'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
    cursor: 'pointer',
    transition: '.15s',
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
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
  },
  filter: {
    position: 'relative',
    '& select': {
      width: '100%',
      height: theme.spacing(6),
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(1),
      boxShadow: `0 2px 10px #eee`,
      paddingLeft: theme.spacing(10),
      transition: '.2s',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      '&:focus': {
        outline: 0,
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 5px ${theme.palette.secondary.main}20`,
      },
    },
  },
  filterLabel: {
    position: 'absolute',
    left: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
  },
  iconLeft: {
    position: 'absolute',
    left: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-45%)',
  },
  iconRight: {
    position: 'absolute',
    right: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-45%)',
  },
}))

function NewProjects() {
  const classes = useStyles()
  const [teachers, setTeachers] = useState([])
  const [teacher, setTeacher] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [projects, setProjects] = useState([])
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)

  useEffect(() => {
    fetchTeachers()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [teacher, category])

  const fetchTeachers = async () => {
    const { data } = await axios.get('my/graduation/teachers')
    setTeachers(data)
  }

  const fetchCategories = async () => {
    const { data } = await axios.get('projects/categories')
    setCategories(data)
  }

  const fetchProjects = async () => {
    const { data } = await axios.get('new/projects', {
      params: {
        teacher,
        category
      }
    })
    setProjects(data)
  }

  const handleApply = async () => {
    const projectId = getSelectedProject().id
    await axios.post(`projects/${projectId}/apply`)
    fetchProjects()
  }

  const handleSelect = index => {
    setSelectedProjectIndex(prevIndex => prevIndex === index ? null : index)
  }

  const isProjectSelected = () => selectedProjectIndex !== null
  const getSelectedProject = () => projects[selectedProjectIndex]

  return (
    <Grid container>
      <Grid item xs>
        <Container className={classes.projects}>
          {!isProjectSelected() && (
            <Box mb={5}>
              <Typography variant="h6">Төслийн сэдэвүүд</Typography>
              <Typography color="textSecondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </Box>
          )}
          <Box mb={2}>
            <Grid
              container
              spacing={2}
            >
              <Grid item xs>
                <Box className={classes.filter}>
                  <Box className={classes.filterLabel}>
                    <Typography variant="subtitle2">
                      Удирдагч:
                    </Typography>
                  </Box>
                  <Box className={classes.iconRight}>
                    <ExpandMoreIcon />
                  </Box>
                  <select
                    value={teacher}
                    onChange={({ target }) => setTeacher(target.value)}
                  >
                    <option value="">Бүгд</option>
                    {teachers.map(value =>
                      <option
                        key={value.id}
                        value={value.id}
                      >
                        {`${value.surname.charAt(0)}. ${value.name}`}
                      </option>
                    )}
                  </select>
                </Box>
              </Grid>
              <Grid item xs>
                <Box className={classes.filter}>
                  <Box className={classes.filterLabel}>
                    <Typography variant="subtitle2">
                      Төрөл:
                    </Typography>
                  </Box>
                  <Box className={classes.iconRight}>
                    <ExpandMoreIcon />
                  </Box>
                  <select
                    value={category}
                    onChange={({ target }) => setCategory(target.value)}
                  >
                    <option value="">Бүгд</option>
                    {categories.map(value =>
                      <option
                        key={value.id}
                        value={value.id}
                      >
                        {value.name}
                      </option>
                    )}
                  </select>
                </Box>
              </Grid>
            </Grid>
          </Box>
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
                  onClick={() => handleSelect(index)}
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
                  <Box fontWeight="fontWeightMedium">Танилцуулга</Box>
                </Typography>
              </Box>
              <Typography color="textSecondary" style={{ lineHeight: '26px' }}>
                {getSelectedProject().overview}
              </Typography>
              <Grid
                container
                spacing={5}
              >
                <Grid item>
                  <Box mt={2} mb={1}>
                    <Typography>
                      <Box fontWeight="fontWeightMedium">Удирдагч</Box>
                    </Typography>
                  </Box>
                  {getSelectedProject().users.map(val =>
                    <Typography color="textSecondary" >
                      {`${val.surname.charAt(0)}. ${val.name}`}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Box mt={2} mb={1}>
                    <Typography>
                      <Box fontWeight="fontWeightMedium">Төрөл</Box>
                    </Typography>
                  </Box>
                  {getSelectedProject().categories.map(val =>
                    <Typography color="textSecondary" >
                      {val.name}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Box width={200} mt={3}>
                <Button
                  disabled={getSelectedProject().applies_count}
                  onClick={handleApply}
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                >Хүсэлт илгээх</Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      )
      }
    </Grid >
  )
}

export default NewProjects