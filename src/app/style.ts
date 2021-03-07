import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  standardTopMargin: {
    marginTop: 10
  },
  flexRowSpaceBetween: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  navigationHeader: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  },
});

export default Style;