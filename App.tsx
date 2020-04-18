import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  ActivityIndicator, 
  Platform 
} from 'react-native';

export default class App extends React.Component {

  state = {
    loading: false,
    error: false,
  };

  async componentDidMount() {
    this.setState({
      loading: false,
      error: false,
    });
  }

  render() {

    if (this.state.error) {
      return (
        <Text>Load Page Failure...</Text>
      );
    }

    return (
      
      <View style={styles.container}>
        <StatusBar barStyle="light-content"
        />
        <ActivityIndicator
          animating={this.state.loading}
          color="white"
          size="large"
        />
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    );  
  }
  
}

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
