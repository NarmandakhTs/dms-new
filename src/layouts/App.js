import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppRoutes } from './../Routes'
import { useSelector } from 'react-redux'
import {
  getPermissions,
  getUserFullname
} from './../redux/auth/selectors'
import {
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import {
  Avatar,
  Box,
  Drawer,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { removeUser } from './../redux/auth/actions'
import Logo from './../assets/images/logo.svg'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import AssessmentIcon from '@material-ui/icons/Assessment'
import DashboardIcon from '@material-ui/icons/Dashboard'
import EventNoteIcon from '@material-ui/icons/EventNote'
import PeopleIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'
import GradeIcon from '@material-ui/icons/Grade'
import FileCopyIcon from '@material-ui/icons/FileCopy'

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
  const dispatch = useDispatch()
  const permissions = useSelector(getPermissions)
  const userFullname = useSelector(getUserFullname)
  const [userAnchor, setUserAnchor] = useState(null)
  const [menuItems] = useState([
    {
      to: '/students',
      label: 'Төгсөгч оюутан',
      icon: <PeopleIcon />,
      permission: 'view-students',
    },
    {
      to: '/schedules',
      label: 'Хуваарь',
      icon: <EventNoteIcon />,
    },
    {
      to: '/documents',
      label: 'Бичиг баримтууд',
      icon: <FileCopyIcon />,
      permission: 'view-students',
    },
    {
      to: '/reports',
      label: 'Тайлангууд',
      icon: <AssessmentIcon />,
      permission: 'view-students',
    },
    {
      to: '/results',
      label: 'Үнэлгээ',
      icon: <GradeIcon />,
      permission: 'view-my-projects',
    },
    {
      to: '/my/project',
      label: 'Миний төсөл',
      icon: <DashboardIcon />,
      permission: 'view-my-project',
    },
    {
      to: '/my/projects',
      label: 'Минний төслүүд',
      icon: <DashboardIcon />,
      permission: 'view-my-projects',
    },
    {
      to: '/projects',
      label: 'Төслүүд',
      icon: <AccountTreeIcon />,
      permission: 'view-projects',
    },
    // {
    //   to: '/settings',
    //   label: 'Тохиргоо',
    //   icon: <SettingsIcon />,
    // },
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

            return (permissions.includes(item.permission) || item.permission === undefined) && (
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
        <Box>
          <Avatar
            className={classes.userAvatar}
            onClick={({ currentTarget }) => setUserAnchor(currentTarget)}
          >
            {getFirstElementsOfFullname()}
          </Avatar>
          <Menu
            keepMounted
            anchorEl={userAnchor}
            open={Boolean(userAnchor)}
            onClose={() => setUserAnchor(null)}
          >
            <MenuItem onClick={() => dispatch(removeUser())}>
              Гарах
              </MenuItem>
          </Menu>
        </Box>
      </Drawer>
      <main className={classes.content}>
        <AppRoutes />
      </main>
    </>
  )
}

export default App
