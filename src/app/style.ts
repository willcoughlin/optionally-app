import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  standardTopMargin: {
    marginTop: 10
  },
  flexRowSpaceBetween: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  nextScreenButton: {
    // marginTop: 50
  },
  navigationHeader: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  },
  navigationProgressBar : {
    marginRight: 56
  }
});

export default Style;