import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from 'Config'

export default StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.09,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    elevation: 5,
    shadowColor: Colors.themeLight,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: Colors.themeDark,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
    alignSelf: 'center',
  },
  itemWrapper: {
    paddingRight: 12,
  },
  itemContainer: {
    flex: 1,
    height: Metrics.height / 100 * 30,
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 6,
    marginLeft: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: 'gray',
    elevation: 5,
    shadowColor: Colors.themeLight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  itemFaceContainer: {
    flex: 3,
    justifyContent:'center'
  },
  itemDetailContainer: {
    flex: 1,
    alignSelf: 'flex-end'
  },
  itemPrice: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.theme,
  },
  itemFace: {
    color: Colors.themeDark
  },
  itemDate: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: Colors.themeLight,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTitle: {
    color: Colors.themeDark,
    fontSize: 36,
    fontWeight: 'bold',
  },
  loadingDot: {
    fontSize: 36,
  }
})
