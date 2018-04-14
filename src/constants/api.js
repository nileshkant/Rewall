import {ACCESS_KEY} from './config'

export default {
  // The URL we're connecting to
  hostname: 'https://api.unsplash.com',
  // Map shortnames to the actual endpoints, so that we can use them in the middleware
  endpoints: {
    'users': '/users',
    'deleteUser': '/users',
    'getUser': '/users',
    'homeCollection':`/collections`,
    'fullPhoto':`/photos`,
    'categoryCollection':`/collections`,
  }
};
