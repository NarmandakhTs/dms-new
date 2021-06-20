import {
  useState,
  useEffect
} from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'
import moment from 'moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import { SearchBox } from './../components'

const useStyles = makeStyles((theme) => ({
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
  projectCard: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}20`,
    borderRadius: theme.shape.borderRadius,
    transition: '.15s',
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
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
}))

function DiscoverProjects() {
  const classes = useStyles()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [teachers, setTeachers] = useState([])
  const [teacher, setTeacher] = useState('')
  const [season, setSeason] = useState('')
  const [year, setYear] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchTeachers()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [
    category,
    teacher,
    search,
    season,
    year
  ])

  const fetchProjects = async () => {
    const { data } = await axios.get('discover/projects', {
      params: {
        category,
        teacher,
        search,
        season,
        year,
      }
    })
    setProjects(data)
  }

  const fetchTeachers = async () => {
    const { data } = await axios.get('teachers/all')
    setTeachers(data)
  }

  const fetchCategories = async () => {
    const { data } = await axios.get('projects/categories')
    setCategories(data)
  }

  const getProjectJoinedCategories = categories => {
    return categories.map(val => val.name).join(',')
  }

  return (
    <Container>
      <Box my={2}>
        <Box mb={5}>
          <Typography variant="h6">Төслийн сан</Typography>
          <Typography color="textSecondary">Pellentesque sit amet hendrerit augue fusce eu mi condimentum.</Typography>
        </Box>
        <Box mb={2}>
          <Grid
            alignItems="center"
            container
            spacing={2}
          >
            <Grid item xs={8}>
              <SearchBox
                value={search}
                onChange={setSearch}
                placeholder="Search projects..."
              />
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <Box className={classes.filter}>
                <Box className={classes.filterLabel}>
                  <Typography variant="subtitle2">
                    Улирал:
                    </Typography>
                </Box>
                <Box className={classes.iconRight}>
                  <ExpandMoreIcon />
                </Box>
                <select
                  value={season}
                  onChange={({ target }) => setSeason(target.value)}
                >
                  <option value="">Бүгд</option>
                  <option value="хавар">Хавар</option>
                  <option value="намар">Намар</option>
                </select>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.filter}>
                <Box className={classes.filterLabel}>
                  <Typography variant="subtitle2">
                    Он:
                    </Typography>
                </Box>
                <Box className={classes.iconRight}>
                  <ExpandMoreIcon />
                </Box>
                <select
                  value={year}
                  onChange={({ target }) => setYear(target.value)}
                >
                  <option value="">Бүгд</option>
                  {[...Array(50)].map((num, i) =>
                    <option>{new Date().getFullYear() - i}</option>
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
              xs={4}
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
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  color="grey.800"
                >
                  <CategoryOutlinedIcon fontSize="small" />
                  <Box
                    component="span"
                    ml={1}
                  >Төрлүүд: {getProjectJoinedCategories(item.categories)}</Box>
                </Box>
                <Box
                  mt={1}
                  display="flex"
                  alignItems="center"
                  color="grey.800"
                >
                  <CalendarTodayIcon fontSize="small" />
                  <Box
                    component="span"
                    ml={1}
                  >Он сар: {moment(item.created_at).format('MMMM d, YYYY')}</Box>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  )
}

export default DiscoverProjects