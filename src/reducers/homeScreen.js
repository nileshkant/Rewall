import _ from 'lodash';
import {ACCESS_KEY} from '../constants';

export const HOME_COLLECTION_REQUESTED = 'homeScreen/HOME_COLLECTION_REQUESTED'
export const HOME_COLLECTION_SUCCESS = 'homeScreen/HOME_COLLECTION_SUCCESS'
export const HOME_COLLECTION_FAILURE = 'homeScreen/HOME_COLLECTION_FAILURE'

export const COLLECTION_DETAILS_REQUESTED = 'homeScreen/COLLECTION_DETAILS_REQUESTED'
export const COLLECTION_DETAILS_SUCCESS = 'homeScreen/COLLECTION_DETAILS_SUCCESS'
export const COLLECTION_DETAILS_FAILURE = 'homeScreen/COLLECTION_DETAILS_FAILURE'

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  collectionData:[],
  collectionDetails:null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_COLLECTION_REQUESTED: {
      return {
        ...state,
        loading:true,
        loaded:false
      }
    }
    case HOME_COLLECTION_SUCCESS: {
      console.log('actiion', action.result);
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true,
        collectionData: action.payload===1 ? action.result:state.collectionData.concat(action.result)
      }
    }
    case HOME_COLLECTION_FAILURE: {
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true
      }
    }
    case COLLECTION_DETAILS_REQUESTED: {
      return {
        ...state,
        loading:true,
        loaded:false
      }
    }
    case COLLECTION_DETAILS_SUCCESS: {
      console.log('actiion', action.result);
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true,
        collectionDetails: action.result
    }
  }
    case COLLECTION_DETAILS_FAILURE: {
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


export const fetchHomeCollection = (id,payload) => {
  return {
    types: [HOME_COLLECTION_REQUESTED, HOME_COLLECTION_SUCCESS, HOME_COLLECTION_FAILURE],
    promise: (client) => client.get(`homeCollection/${id}/photos/?page=${payload}&client_id=${ACCESS_KEY}`, {
    }),
    payload:payload
  };
}

export const fetchCollectionDetails = (id) => {
  return {
    types: [COLLECTION_DETAILS_REQUESTED, COLLECTION_DETAILS_SUCCESS, COLLECTION_DETAILS_FAILURE],
    promise: (client) => client.get(`homeCollection/${id}/?client_id=${ACCESS_KEY}`, {
    })
  };
}
