import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ViewPropTypes,
  ActivityIndicator, 
  Platform 
} from 'react-native';

type State = {
  loading: Boolean,
  error: Boolean,
}

type Props = {
	style: StyleSheet,
}

export default class Feedback extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

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

  	const { style } = this.props;
    const { loading, error } = this.state;

  	if (this.state.error) {
      return (
      	<View>
          <Text>Load Page Failure...</Text>
        </View>
      );
    }

  	return (
	  <View>
		  <Text>Feedback page...</Text>
	  </View>
  	);
  }
}