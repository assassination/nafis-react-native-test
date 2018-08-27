import { isEmpty } from 'Utils'

export const GET_BATCH_PRODUCT = 'nafis-react-native-test/product/GET_BATCH_PRODUCT'
export const GET_BATCH_PRODUCT_SUCCESS = 'nafis-react-native-test/product/GET_BATCH_PRODUCT_SUCCESS'
export const GET_BATCH_PRODUCT_FAIL = 'nafis-react-native-test/product/GET_BATCH_PRODUCT_FAIL'
export const RESET = 'nafis-react-native-test/product/RESET'

export default function reducer(state = { data: [], error: null, is_batch_complete: false }, action) {
  switch(action.type) {
    case GET_BATCH_PRODUCT:       // on start batch load the product
      return { ...state, is_fetching: true }
    case GET_BATCH_PRODUCT_SUCCESS:          // on success batch loading the product
      return {
        ...state,
        is_fetching: false,
        data: !isEmpty(action.payload.data) ? state.data.concat(action.payload.data) : state.data,  // append product to list
        is_batch_complete: !isEmpty(action.payload.data) ? false : true,                            // all product has been downloaded
      }
    case GET_BATCH_PRODUCT_FAIL:        // on failed batch loading the product
      return { ...state, is_fetching: false, error: 'error fetching product' }
    case RESET:
      return { data: [], error: null, is_batch_complete: false, is_fetching: false }
    default:
      return state
  }
}

// dispatch action to batch load the product
export function getBatchProduct(param) {
  return {
    type: GET_BATCH_PRODUCT,
    payload: {
      request: {
        url: 'products?'+param
      }
    }
  }
}

// reset all state in redux store
export function reset() {
  return {
    type: RESET,
    payload: null
  }
}
