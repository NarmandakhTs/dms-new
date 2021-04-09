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
  PermissionDenied,
  Project,
  ProjectDocuments,
  ProjectOverview,
  Projects,
  Students,
} from './pages'
import {
  ThemeProvider
} from '@material-ui/core/styles'
import {
  AppTheme
} from './Themes'
import {
  getPermissions,
  getUser
} from './redux/auth/selectors'
import { useSelector } from 'react-redux'
import Auth from './layouts/Auth'
import App from './layouts/App'
import { CssBaseline } from '@material-ui/core'

function PermittedRoute({
  permission,
  children,
  ...rest
}) {
  const permissions = useSelector(getPermissions)

  return (
    <Route
      {...rest}
      render={() => permission && permissions.includes(permission)
        ? children
        : <PermissionDenied />
      }
    />
  )
}

function AuthenticatedRoute({
  children,
  ...rest
}) {
  const user = useSelector(getUser)

  return (
    <Route
      {...rest}
      render={({ location }) => !!user ? children : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: location }
          }}
        />
      )}
    />
  )
}

function ProjectRoutes() {
  const { path, url } = useRouteMatch()

  return (
    <Switch>
      <PermittedRoute
        permission="view-project-documents"
        path={`${path}/documents`}
      >
        <ProjectDocuments />
      </PermittedRoute>
      <PermittedRoute
        permission="view-project-overview"
        path={`${path}/overview`}
      >
        <ProjectOverview />
      </PermittedRoute>
      <PermittedRoute path={path}>
        <Redirect to={`${url}/overview`} />
      </PermittedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

function AppRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <PermittedRoute path={`${path}/projects/:id`}>
        <Project />
      </PermittedRoute>
      <PermittedRoute path={`${path}/projects`}>
        <Projects />
      </PermittedRoute>
      <PermittedRoute
        permission="view-students"
        path={`${path}/students`}
      >
        <Students />
      </PermittedRoute>
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
      <Route path={`${path}/login`} exact>
        <Login />
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
          <AuthenticatedRoute path="/app">
            <App />
          </AuthenticatedRoute>
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
  AppRoutes,
  ProjectRoutes
}

export default Routes