import { createReducer } from 'redux-create-reducer'
import {
  SET_PERMISSIONS,
  SET_USER,
  REMOVE_USER
} from './actionTypes'

const state = {
  user: null,
  access_token: null,
  permissions: []
}

const mutations = {
  [REMOVE_USER](state) {
    return {
      ...state,
      user: null,
      access_token: null,
      permissions: []
    }
  },
  [SET_USER](state, { payload }) {
    const { user, access_token } = payload

    return {
      ...state,
      user,
      access_token
    }
  },
  [SET_PERMISSIONS](state, { payload }) {
    const { permissions } = payload

    return {
      ...state,
      permissions
    }
  }
}

export default createReducer(
  state,
  mutations
)
