import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ViewPropTypes,
  ActivityIndicator, 
  Platform 
} from 'react-native';

import IslandModel from '../models/islandModel';

import { fetchIslands } from '../utils/api';

type State = {
  loading: Boolean,
  error: Boolean,
  items: IslandModel[],
}

type Props = {
	style: StyleSheet,
	islandsForItem: IslandModel[],
	onPressIsland: (id: String) => void,
}

export default class Islands extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  state = {
    loading: false,
    error: false,
    items: [],
  };

  async componentDidMount() {
    this.handleFetchIslands('');
  }

  handleFetchIslands = (search: String) => {
  	this.setState({
      loading: true,
      error: false,
      items: [],
    });

    fetchIslands({token: '', search: search})
    .then(response => response.json())
    .then(object => {
      return object.data.islands.map(island => { 
        return(
          {"islandOwner": island.accountInfo.switchID, "location": island.location, "hashTagDescription": island.hashTagDescription, "createTime": island.createTime}
        ) 
      })
    })
    .then(islands => {
      console.log(islands)
      this.setState({
        loading: false,
        error: false,
      });
    })
    .catch(error => {
      console.error("error:", error) 
      this.setState({
        loading: false,
        error: true,
        items: [],
      });
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