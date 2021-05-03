import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import {
  Link,
  useLocation,
  useRouteMatch
} from 'react-router-dom'
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core'
import { ProjectsRoutes } from './../Routes'
import { useSelector } from 'react-redux'
import { getPermissions } from './../redux/auth/selectors'
import DocumentIcon from '@material-ui/icons/DescriptionOutlined'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswerOutlined'

const useStyles = makeStyles((theme) => ({
  sideBar: {
    backgroundColor: `${theme.palette.primary.main}05`,
    borderRight: `1px solid ${theme.palette.primary.main}20`,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    bottom: 0
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
  },
  listItemText: {
    minWidth: theme.spacing(25)
  }
}))

function ListItemLink(props) {
  return <ListItem
    button
    component={Link}
    {...props}
  />
}

function Projects() {
  const classes = useStyles()
  const permissions = useSelector(getPermissions)
  const { pathname } = useLocation()
  const { url } = useRouteMatch()
  const [menuItems] = useState([
    {
      to: '/new',
      label: 'New Projects',
      icon: <DocumentIcon />,
    },
    {
      to: '/discover',
      label: 'Discover Projects',
      icon: <QuestionAnswerIcon />,
    },
  ])

  return (
    <Grid container>
      <Grid item xs={3}>
        <Box className={classes.sideBar}>
          <Box mb={3}>
            <Typography variant="h5">Projects</Typography>
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
                  <ListItemText
                    className={classes.listItemText}
                    primary={item.label}
                  />
                </ListItemLink>
              )
            })}
          </List>
        </Box>
      </Grid>
      <Grid item xs>
        <ProjectsRoutes />
      </Grid>
    </Grid>
  )
}

export default Projects