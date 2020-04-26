import {Platform, StyleSheet} from 'react-native';


 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
     fontFamily: 
       Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  title: {
    fontSize: 20,
    fontFamily: 
       Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 
       Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  normalText: {
    fontSize: 14,
    fontFamily: 
       Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  smallText: {
    fontSize: 12,
    fontFamily: 
       Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  }
});

 export default status;