import AppMore from './../layouts/AppMore'
import { SettingsRoutes } from './../Routes'
import PeopleIcon from '@material-ui/icons/People'

function Settings() {
  return (
    <AppMore
      title="Settings"
      menuItems={[
        {
          to: '/users',
          label: 'Users',
          icon: <PeopleIcon />,
          permissions: [
            'view-all-users',
            'view-all-roles',
          ],
        },
      ]}
    >
      <SettingsRoutes />
    </AppMore>
  )
}

export default Settings