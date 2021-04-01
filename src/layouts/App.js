import { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppRoutes } from './../Routes'
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Grid,
  Breadcrumbs,
  Link as MaterialLink
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Logo from './../assets/images/logo.png'

const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      borderRight: 0,
      backgroundColor: '#1d2b38',
    },
  },
  appBar: {
    position: 'static',
    backgroundColor: '#fff',
    boxShadow: 'none'
  },
  content: {
    marginLeft: drawerWidth
  },
  logo: {
    '& img': {
      height: 40
    },
    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#233143',
  },
  listItem: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  listItemIcon: {
    color: theme.palette.grey[500],
    minWidth: theme.spacing(5)
  },
  listItemText: {
    '& .MuiTypography-body1': {
      color: theme.palette.grey[300],
    }
  },
}))

function Header({
  title,
  breadcrumbs,
  actions
}) {
  return (
    <>
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
      <Box my={3}>
        <Divider />
      </Box>
    </>
  )
}

function App() {
  const classes = useStyles()
  const [menuItems] = useState([
    {
      to: '/',
      label: 'Students',
      icon: <InboxIcon />,
    }
  ])

  return (
    <>
      <Drawer
        variant="permanent"
        className={classes.drawer}
      >
        <Box className={classes.logo}>
          <img alt="App" src={Logo} />
        </Box>
        <Divider />
        <List>
          <ListItem className={classes.listItem}>
            <Typography
              variant="subtitle2"
              color="primary"
            >Pages</Typography>
          </ListItem>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                className={classes.listItemText}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid
              container
              justify="flex-end"
            >
              <Grid item>
                <IconButton>
                  <Badge
                    badgeContent={17}
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton edge="end">
                  <AccountCircle />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box p={6}>
          <AppRoutes />
        </Box>
      </main>
    </>
  )
}

export {
  Header
}

export default App
