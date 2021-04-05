import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getUserFullname } from './../redux/auth/selectors'
import { AppRoutes } from './../Routes'
import {
  Link,
  useLocation,
  useRouteMatch
} from 'react-router-dom'
import {
  Avatar,
  Box,
  Breadcrumbs,
  Drawer,
  Typography,
  Tooltip,
  Grid,
  Link as MaterialLink,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core'
import Logo from './../assets/images/logo.svg'
import HomeIcon from '@material-ui/icons/HomeOutlined'

const drawerWidth = 60

const useStyles = makeStyles((theme) => ({
  userAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 15
  },
  content: {
    marginLeft: drawerWidth,
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(2, null),
      backgroundColor: theme.palette.primary.main,
      borderRight: 0,
    },
  },
  listItem: {
    padding: 0,
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: 'rgba(255, 255, 255, .1)',
    },
  },
  listItemIcon: {
    color: '#fff',
    minWidth: drawerWidth,
    justifyContent: 'center',
    padding: theme.spacing(2, null)
  }
}))

function Header({
  title,
  breadcrumbs,
  actions
}) {
  return (
    <Box mb={3}>
      <Grid
        container
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item>
          <Typography variant="h5">
            <Box fontWeight="fontWeightMedium">
              {title}
            </Box>
          </Typography>
          <Box mt={1}>
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, i) => breadcrumb.to ? (
                <MaterialLink
                  key={i}
                  to={breadcrumb.to}
                  component={Link}
                  color="primary"
                >
                  {breadcrumb.label}
                </MaterialLink>
              ) : (
                <Typography
                  key={i}
                  color="textSecondary"
                >
                  {breadcrumb.label}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>
        </Grid>
        <Grid item>
          {actions}
        </Grid>
      </Grid>
    </Box>
  )
}

function ListItemLink(props) {
  return <ListItem
    button
    component={Link}
    {...props}
  />
}


function App() {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { path } = useRouteMatch()
  const userFullname = useSelector(getUserFullname)
  const [menuItems] = useState([
    {
      to: '/students',
      label: 'Students',
      icon: <HomeIcon />,
    },
    {
      to: '/projects',
      label: 'Projects',
      icon: <HomeIcon />,
    },
    {
      to: `/projects/2`,
      label: 'My Project',
      icon: <HomeIcon />,
    }
  ])

  const getFirstElementsOfFullname = () => `${userFullname.surname.charAt(0)}${userFullname.name.charAt(0)}`

  return (
    <>
      <Drawer
        open
        variant="permanent"
        className={classes.drawer}
      >
        <img
          alt="Logo"
          src={Logo}
        />
        <List
          disablePadding
          component="nav"
        >
          {menuItems.map((item, index) => {
            const joinedPath = `${path}${item.to}`

            return (
              <ListItemLink
                key={index}
                to={joinedPath}
                className={classes.listItem}
                selected={pathname === joinedPath}
                disableGutters
              >
                <Tooltip
                  arrow
                  title={item.label}
                  placement="right"
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
              </ListItemLink>
            )
          })}
        </List>
        <Avatar className={classes.userAvatar}>
          {getFirstElementsOfFullname()}
        </Avatar>
      </Drawer>
      <main className={classes.content}>
        <AppRoutes />
      </main>
    </>
  )
}

export {
  Header
}

export default App
