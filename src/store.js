import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import ApiClient from './helpers/ApiClient';
import createMiddleware from './reducers/middleware/clientMiddleware';

const client = new ApiClient();
const initialState = {}
const enhancers = []
const middleware = [
  createMiddleware(client),
  thunk
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store;
