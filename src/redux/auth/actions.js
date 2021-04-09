import {
  SET_PERMISSIONS,
  SET_USER,
  REMOVE_USER
} from './actionTypes'

const setPermissions = (permissions) => ({
  type: SET_PERMISSIONS,
  payload: {
    permissions
  }
})

const setUser = (user, access_token) => ({
  type: SET_USER,
  payload: {
    user,
    access_token
  }
})

const removeUser = () => ({
  type: REMOVE_USER
})

export {
  setPermissions,
  setUser,
  removeUser
}
