import { makeStyles } from '@material-ui/core/styles'
import {
  useState,
  useEffect
} from 'react'
import {
  Link,
  useParams,
  useLocation,
  useRouteMatch
} from 'react-router-dom'
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getPermissions } from './../redux/auth/selectors'
import { ProjectRoutes } from './../Routes'
import axios from './../plugins/axios'
import DocumentIcon from '@material-ui/icons/DescriptionOutlined'
import CommentIcon from '@material-ui/icons/CommentOutlined'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswerOutlined'

const useStyles = makeStyles((theme) => ({
  sideBar: {
    backgroundColor: `${theme.palette.primary.main}05`,
    borderRight: `1px solid ${theme.palette.primary.main}20`,
    padding: theme.spacing(3),
    height: '100vh',
  },
  sideBarAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  list: {
    padding: 0,
  },
  listItem: {
    borderRadius: theme.shape.borderRadius,
    border: '1px solid transparent',
    margin: theme.spacing(1, 0),
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: `${theme.palette.primary.main}10`,
      border: `1px solid ${theme.palette.primary.main}40`
    },
  }
}))

function ListItemLink(props) {
  return <ListItem
    button
    component={Link}
    {...props}
  />
}

function Project() {
  const classes = useStyles()
  const params = useParams()
  const permissions = useSelector(getPermissions)
  const { pathname } = useLocation()
  const { url } = useRouteMatch()
  const [project, setProject] = useState({})
  const [menuItems] = useState([
    {
      to: '/overview',
      label: 'Танилцуулга',
      icon: <HomeIcon />,
    },
    {
      to: '/documents',
      label: 'Бичиг баримтууд',
      icon: <DocumentIcon />,
    },
    {
      to: '/applies',
      label: 'Хамрагдах хүсэлтүүд',
      icon: <CheckCircleOutlineIcon />,
      permission: 'view-project-applies'
    }
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const path = params.id ? `projects/${params.id}` : 'my/project'
    const { data } = await axios.get(path)
    setProject(data)
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <Box className={classes.sideBar}>
          <Box mb={3}>
            <Grid
              container
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  variant="rounded"
                  className={classes.sideBarAvatar}
                >
                  {project.name ? project.name.charAt(0) : 'Н'}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography>
                  <Box fontWeight="fontWeightMedium">
                    {project.name ? project.name : 'Төслийн нэр'}
                  </Box>
                </Typography>
                <Typography variant="caption">
                  {project.id ? `#${project.id}` : '#0'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <List
            component="nav"
            className={classes.list}
          >
            {menuItems.map((item, index) => {
              const joinedPath = `${url}${item.to}`

              return (item.permission === undefined || permissions.includes(item.permission)) && (
                <ListItemLink
                  key={index}
                  to={joinedPath}
                  selected={joinedPath === pathname}
                  className={classes.listItem}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemLink>
              )
            })}
          </List>
        </Box>
      </Grid>
      <Grid item xs>
        <ProjectRoutes />
      </Grid>
    </Grid>
  )
}

export default Project