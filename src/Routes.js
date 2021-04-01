import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom'
import {
  Login,
  NotFound,
  Students,
  UserSelect
} from './pages'
import {
  ThemeProvider
} from '@material-ui/core/styles'
import {
  AppTheme
} from './Themes'
import Auth from './layouts/Auth'
import App from './layouts/App'
import { useSelector } from 'react-redux'
import { getUser } from './redux/auth/selectors'
import { CssBaseline } from '@material-ui/core'

function PrivateRoute({ children, ...rest }) {
  const user = useSelector(getUser)

  return (
    <Route
      {...rest}
      render={({ location }) => !!user ? children : (
        <Redirect
          to={{
            pathname: '/auth',
            state: { from: location }
          }}
        />
      )}
    />
  )
}

function AppRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/students`}>
        <Students />
      </Route>
      <Route path={path}>
        {/* TODO: home page hiiheeree ene redirect path-iig oorchiloorei */}
        <Redirect to={`${path}/students`} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

function AuthRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/login/:user(student|teacher)`}>
        <Login />
      </Route>
      <Route path={`${path}/login`} exact>
        <UserSelect />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

function Routes() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={AppTheme}>
          <CssBaseline />
          <Route path="/auth">
            <Auth />
          </Route>
          <PrivateRoute path="/app">
            <App />
          </PrivateRoute>
        </ThemeProvider>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export {
  AuthRoutes,
  AppRoutes
}

export default Routes