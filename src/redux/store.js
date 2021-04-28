import {
  createStore,
  combineReducers
} from 'redux'
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'

const config = {
  storage,
  key: 'redux',
  whitelist: [
    'auth',
  ]
}

const persistedReducer = persistReducer(config, combineReducers({
  auth,
}))

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
  store,
  persistor
}
