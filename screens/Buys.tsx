import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ViewPropTypes,
  ActivityIndicator, 
  Platform 
} from 'react-native';

import BuyModel from '../models/BuyModel';
import { fetchBuys } from '../utils/api';

type State = {
  loading: Boolean,
  error: Boolean,
}

type Props = {
	style: StyleSheet,
	buysForItem: BuyModel[],
	onPressBuy: (id: String) => void,
}

export default class Buys extends React.Component {

  // constructor(props: Props) {
  //   super(props);
  // }

  state = {
    loading: false,
    error: false,
    items: [],
  };

  async componentDidMount() {
    this.handleFetchBuys('');
  }

  handleFetchBuys = (search: String) => {
  	this.setState({
      loading: true,
      error: false,
      items: [],
    });

    fetchBuys({token: '', search: search})
    .then(response => response.json())
    .then(object => {
      return object.data.buys.map(buy => { 
        return(
          {"itemName": buy.itemName, "unitPrice": buy.unitPrice, "numberOfItem": buy.numberOfItem, "islandPassCode": buy.islandPassCode, "createTime": buy.createTime}
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

  	const { buysForItem, onPressIsland, style } = this.props;
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
		<Text>Buy page...</Text>
	  </View>
  	);
  }
}