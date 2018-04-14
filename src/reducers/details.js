import _ from 'lodash';
import {ACCESS_KEY} from '../constants'

export const FULLIMAGE_REQUESTED = 'details/FULLIMAGE_REQUESTED'
export const FULLIMAGE_SUCCESS = 'details/FULLIMAGE_SUCCESS'
export const FULLIMAGE_FAILURE = 'details/FULLIMAGE_FAILURE'


const initialState = {
  loading: false,
  loaded: false,
  error: false,
  singlePhoto:null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FULLIMAGE_REQUESTED: {
      return {
        ...state,
        loading:true,
        loaded:false
      }
    }
    case FULLIMAGE_SUCCESS: {
      // console.log('actiion', action.result);
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true,
        singlePhoto: action.result
      }
    }
    case FULLIMAGE_FAILURE: {
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true
      }
    }
    default:
      return state
  }
}


export const fullPhoto = (id,width,height) => {
  return {
    types: [FULLIMAGE_REQUESTED, FULLIMAGE_SUCCESS, FULLIMAGE_FAILURE],
    promise: (client) => client.get(`fullPhoto/${id}/?w=${width}&h=${height}&client_id=${ACCESS_KEY}`, {
    })
  };
}
