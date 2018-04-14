import _ from 'lodash';
import {ACCESS_KEY} from '../constants';

export const CATEGORY_COLLECTION_REQUESTED = 'category/CATEGORY_COLLECTION_REQUESTED'
export const CATEGORY_COLLECTION_SUCCESS = 'category/CATEGORY_COLLECTION_SUCCESS'
export const CATEGORY_COLLECTION_FAILURE = 'category/CATEGORY_COLLECTION_FAILURE'


const initialState = {
  loading: false,
  loaded: false,
  error: false,
  categoryCollection:[],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_COLLECTION_REQUESTED: {
      return {
        ...state,
        loading:true,
        loaded:false
      }
    }
    case CATEGORY_COLLECTION_SUCCESS: {
      // console.log('actiion', action.result);
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true,
        categoryCollection: action.result
      }
    }
    case CATEGORY_COLLECTION_FAILURE: {
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


export const fetchCategoryCollection = (data) => {
  console.log("dataaaa", data);
  return {
    types: [CATEGORY_COLLECTION_REQUESTED, CATEGORY_COLLECTION_SUCCESS, CATEGORY_COLLECTION_FAILURE],
    promise: (client) => client.get(`categoryCollection/${data}/photos/?client_id=${ACCESS_KEY}`, {
    })
  };
}
