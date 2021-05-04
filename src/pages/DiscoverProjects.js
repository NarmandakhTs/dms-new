import {
  useState,
  useEffect
} from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  InputBase,
  Typography,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from './../plugins/axios'
import moment from 'moment'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    '& input': {
      height: theme.spacing(6),
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(1),
      boxShadow: `0 2px 10px #eee`,
      padding: theme.spacing(0, 2),
      paddingLeft: theme.spacing(6),
      transition: '.2s',
      '&:focus': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 5px ${theme.palette.secondary.main}20`,
      }
    },
  },
  filter: {
    position: 'relative',
    '& select': {
      width: '100%',
      height: theme.spacing(6),
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(1),
      boxShadow: `0 2px 10px #eee`,
      paddingLeft: theme.spacing(6),
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
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [search, category])

  const fetchProjects = async () => {
    const { data } = await axios.get('discover/projects', {
      params: {
        search,
        category
      }
    })
    setProjects(data)
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
          <Typography variant="h6">Discover Projects</Typography>
          <Typography color="textSecondary">Pellentesque sit amet hendrerit augue fusce eu mi condimentum.</Typography>
        </Box>
        <Box mb={2}>
          <Grid
            alignItems="center"
            container
            spacing={2}
          >
            <Grid item xs>
              <Box className={classes.search}>
                <Box className={classes.iconLeft}>
                  <SearchIcon />
                </Box>
                <InputBase
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  placeholder="Search projects..."
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.filter}>
                <Box className={classes.iconLeft}>
                  <FilterListIcon />
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
                  >Categories: {getProjectJoinedCategories(item.categories)}</Box>
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
                  >Date: {moment(item.created_at).format('MMMM d, YYYY')}</Box>
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