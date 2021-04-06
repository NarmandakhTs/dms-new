import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Link,
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
import { ProjectRoutes } from './../Routes'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import DocumentIcon from '@material-ui/icons/DescriptionOutlined'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswerOutlined'
import CommentIcon from '@material-ui/icons/CommentOutlined'

const useStyles = makeStyles((theme) => ({
  sideBar: {
    backgroundColor: '#fff',
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
  const { pathname } = useLocation()
  const { url } = useRouteMatch()
  const [menuItems] = useState([
    {
      to: '/overview',
      label: 'Overview',
      icon: <HomeIcon />,
    },
    {
      to: '/documents',
      label: 'Documents',
      icon: <DocumentIcon />,
    },
    {
      to: '/requests',
      label: 'Requests',
      icon: <QuestionAnswerIcon />,
    },
    {
      to: '/notes',
      label: 'Notes',
      icon: <CommentIcon />,
    }
  ])

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
                >LOL</Avatar>
              </Grid>
              <Grid item xs>
                <Typography>
                  <Box fontWeight="fontWeightMedium">Document Management System</Box>
                </Typography>
                <Typography variant="caption">#20179040</Typography>
              </Grid>
            </Grid>
          </Box>
          <List
            component="nav"
            className={classes.list}
          >
            {menuItems.map((item, index) => {
              const joinedPath = `${url}${item.to}`

              return (
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