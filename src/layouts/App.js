import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getUserFullname } from './../redux/auth/selectors'
import { AppRoutes } from './../Routes'
import {
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import {
  Avatar,
  Drawer,
  Tooltip,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core'
import Logo from './../assets/images/logo.svg'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import AccountTreeIcon from '@material-ui/icons/AccountTree'

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

function ListItemLink(props) {
  return <ListItem
    button
    component={Link}
    {...props}
  />
}


function App() {
  const classes = useStyles()
  const { url } = useRouteMatch()
  const { pathname } = useLocation()
  const userFullname = useSelector(getUserFullname)
  const [menuItems] = useState([
    {
      to: `/projects/2`,
      label: 'My Project',
      icon: <DashboardIcon />,
    },
    {
      to: '/students',
      label: 'Students',
      icon: <PeopleIcon />,
    },
    {
      to: '/projects',
      label: 'Projects',
      icon: <AccountTreeIcon />,
    },
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
            const joinedPath = `${url}${item.to}`

            return (
              <ListItemLink
                key={index}
                to={joinedPath}
                className={classes.listItem}
                selected={pathname === joinedPath}
                exact={item.exact}
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

export default App
