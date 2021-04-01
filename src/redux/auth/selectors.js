const getAccessToken = ({ auth }) => auth.access_token

const getUserDepartment = ({ auth }) => auth.user.department_id

const getUser = ({ auth }) => auth.user

export {
  getAccessToken,
  getUserDepartment,
  getUser
}