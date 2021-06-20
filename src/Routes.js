import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom'
import {
  DiscoverProjects,
  Documents,
  Login,
  MyProjects,
  NewProjects,
  NotFound,
  PermissionDenied,
  Project,
  ProjectDocuments,
  ProjectOverview,
  ProjectRequest,
  ProjectRequests,
  ProjectRequestsNew,
  Projects,
  ProjectsNew,
  Reports,
  Results,
  RolesNew,
  Schedules,
  Settings,
  Students,
  Users,
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
  permissions = [],
  permission,
  children,
  ...rest
}) {
  const userPermissions = useSelector(getPermissions)
  const requiredPermissions = [...permissions, permission].filter(val => val !== undefined)
  const isPermitted = requiredPermissions.some(val => userPermissions.includes(val))

  return (
    <Route
      {...rest}
      render={() => isPermitted
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

function SettingsRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <PermittedRoute
        permission="create-role"
        path={`${path}/roles/new`}
      >
        <RolesNew />
      </PermittedRoute>
      <PermittedRoute
        permissions={[
          'view-all-users',
          'view-all-roles'
        ]}
        path={`${path}/users`}
      >
        <Users />
      </PermittedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

function ProjectsRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <NewProjects />
      </Route>
      <Route path={`${path}/discover`}>
        <DiscoverProjects />
      </Route>
    </Switch>
  )
}

function ProjectRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/requests/new`}>
        <ProjectRequestsNew />
      </Route>
      <Route path={`${path}/requests/:sid`}>
        <ProjectRequest />
      </Route>
      <Route path={`${path}/requests`}>
        <ProjectRequests />
      </Route>
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
      <PermittedRoute
        permission="view-my-project"
        path={`${path}/my/project`}
      >
        <Project />
      </PermittedRoute>
      <Route path={`${path}/my/projects/new`}>
        <ProjectsNew />
      </Route>
      <PermittedRoute
        permission="view-my-projects"
        path={`${path}/my/projects/:id`}
      >
        <Project />
      </PermittedRoute>
      <PermittedRoute
        permission="view-my-projects"
        path={`${path}/my/projects`}
      >
        <MyProjects />
      </PermittedRoute>
      <Route path={`${path}/settings`}>
        <Settings />
      </Route>
      <PermittedRoute
        permission="view-projects"
        path={`${path}/projects`}
      >
        <Projects />
      </PermittedRoute>
      <PermittedRoute
        permission="view-students"
        path={`${path}/students`}
      >
        <Students />
      </PermittedRoute>
      <Route path={`${path}/reports`}>
        <Reports />
      </Route>
      <Route path={`${path}/documents`}>
        <Documents />
      </Route>
      <Route path={`${path}/results`}>
        <Results />
      </Route>
      <Route path={`${path}/schedules`}>
        <Schedules />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch >
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
  ProjectsRoutes,
  ProjectRoutes,
  SettingsRoutes
}

export default Routes