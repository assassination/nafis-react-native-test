import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from 'Config'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.25,
    flexBasis: 15,
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingBottom: 10,
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.themeLight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.themeDark,
    fontSize: 20,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    paddingTop: 5,
  },
  button: {
    position: 'absolute',
    right: 12,
    bottom: 10,
  },
  buttonTitle: {
    color: Colors.themeDark,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
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
  adsContainer: {
    flex: 1,
    height: Metrics.height / 100 * 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginVertical: 6,
    marginLeft: 12,
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
  loadingFooterTitle: {
    color: Colors.themeLight,
    fontSize: 16,
    marginVertical: 15,
  },
  loadingDot: {
    fontSize: 36,
  },
  loadingFooterDot: {
    fontSize: 35,
  },
  loadingButton: {
    fontSize: 14,
  },
  sortInfo: {
    textAlign: 'right',
    color: Colors.themeLight,
    paddingRight: 15,
    backgroundColor: Colors.white,
  }
})
