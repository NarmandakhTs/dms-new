import { createReducer } from 'redux-create-reducer'
import {
  SET_USER,
  REMOVE_USER
} from './actionTypes'

const state = {
  user: null,
  access_token: null
}

const mutations = {
  [REMOVE_USER](state) {
    return {
      ...state,
      user: null,
      access_token: null
    }
  },
  [SET_USER](state, { payload }) {
    const { user, access_token } = payload

    return {
      ...state,
      user,
      access_token
    }
  }
}

export default createReducer(
  state,
  mutations
)
