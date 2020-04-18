import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ViewPropTypes,
  ActivityIndicator, 
  Platform 
} from 'react-native';
import PropTypes from 'prop-types';

class IslandModel {
  id: String;

  constructor(id: String) {
  	this.id = id
  }

}

type State = {
  loading: Boolean,
  error: Boolean,
  items: IslandModel[],
}

type Props = {
	style: StyleSheet,
	islandsForItem: IslandModel[],
}

export default class Islands extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  async componentDidMount() {
    this.setState({
      loading: false,
      error: false,
      items: [],
    });
  }

  render() {

  	const { islandsForItem, onPressIsland, style } = this.props;
    const { loading, error, items } = this.state;

  	if (this.state.error) {
      return (
      	<View>
          <Text>Load Page Failure...</Text>
        </View>
      );
    }

  	return (
	  <View>
		<Text>Islands page...</Text>
	  </View>
  	);
  }
}