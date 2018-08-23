export const GET_BATCH_PRODUCT = 'nafis-react-native-test/product/GET_BATCH_PRODUCT'
export const GET_PRODUCT_OK = 'nafis-react-native-test/product/GET_PRODUCT_OK'
export const GET_PRODUCT_FAIL = 'nafis-react-native-test/product/GET_PRODUCT_FAIL'

export default function reducer(state = { product: [] }, action) {
  switch(action.type) {
    case GET_BATCH_PRODUCT:       // on start batch load the product
      return { ...state, is_fetching: true }
    case GET_PRODUCT_OK:          // on success batch loading the product
      return { ...state, is_fetching: false, data: action.payload.data }
    case GET_PRODUCT_FAIL:        // on failed batch loading the product
      return { ...state, is_fetching: false, error: 'error fetching product' }
    default:
      return state
  }
}

// dispatch action to batch load the product
export function getBatchProduct() {
  return {
    type: GET_BATCH_PRODUCT,
    payload: {
      request: {
        url: ''
      }
    }
  }
}
