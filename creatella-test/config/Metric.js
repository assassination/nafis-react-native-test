import { Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const metrics = {
  height: deviceHeight,
  width: deviceWidth,
  baseHeight: deviceHeight / 100,
  baseWidth: deviceWidth / 100,
}

export default metrics
