export const GET_BATCH_PRODUCT = 'nafis-react-native-test/product/GET_BATCH_PRODUCT'
export const GET_BATCH_PRODUCT_SUCCESS = 'nafis-react-native-test/product/GET_BATCH_PRODUCT_SUCCESS'
export const GET_BATCH_PRODUCT_FAIL = 'nafis-react-native-test/product/GET_BATCH_PRODUCT_FAIL'

export default function reducer(state = { data: [] }, action) {
  switch(action.type) {
    case GET_BATCH_PRODUCT:       // on start batch load the product
      return { ...state, is_fetching: true }
    case GET_BATCH_PRODUCT_SUCCESS:          // on success batch loading the product
      return { ...state, is_fetching: false, data: state.data.concat(action.payload.data) }
    case GET_BATCH_PRODUCT_FAIL:        // on failed batch loading the product
      return { ...state, is_fetching: false, error: 'error fetching product' }
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
