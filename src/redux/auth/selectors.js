const getPermissions = ({ auth }) => auth.permissions

const getAccessToken = ({ auth }) => auth.access_token

const getUserDepartment = ({ auth }) => auth.user.department_id

const getUser = ({ auth }) => auth.user

const getUserFullname = ({ auth }) => {
  const { name, surname } = auth.user

  return { name, surname }
}

export {
  getPermissions,
  getAccessToken,
  getUserDepartment,
  getUser,
  getUserFullname,
}