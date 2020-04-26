import React from 'react';
import { 
  ListView,
  ListViewDataSource,
  StyleSheet, 
  Text, 
  View, 
  ViewPropTypes,
  ActivityIndicator, 
  Platform ,
  TouchableOpacity
} from 'react-native';

import BuyModel from '../models/BuyModel';
import { fetchBuys } from '../utils/api';

type State = {
  loading: Boolean,
  error: Boolean,
  items: BuyModel[],
  dataSource?: ListViewDataSource,
}

type Props = {
  navigator?: any,
	style?: StyleSheet,
	buysForItem?: BuyModel[],
	onPressBuy?: (id: String) => void,
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Buys extends React.Component<Props, State> {

  state = {
    loading: false,
    error: false,
    items: [],
    dataSource: ds.cloneWithRows([]),
  };

  async componentDidMount() {
    this.handleFetchBuys('');
  }

  handleFetchBuys = (search: String) => {
  	this.setState({
      loading: true,
      error: false,
      items: [],
      dataSource: ds.cloneWithRows([]),
    });

    fetchBuys({token: '', search: search})
    .then(response => response.json())
    .then(object => {
      return object.data.buys.map(buy => { 
        return new BuyModel(buy.id, buy.itemName, buy.unitPrice, buy.numberOfItem, buy.islandPassCode, buy.createTime)
        // return(
        //   {"itemName": buy.itemName, "unitPrice": buy.unitPrice, "numberOfItem": buy.numberOfItem, "islandPassCode": buy.islandPassCode, "createTime": buy.createTime}
        // ) 
      })
    })
    .then(buys => {
      console.log(buys)
      this.setState({
        loading: false,
        error: false,
        items: buys,
        dataSource: ds.cloneWithRows(buys),
      });
    })
    .catch(error => {
      console.error("error:", error) 
      this.setState({
        loading: false,
        error: true,
        items: [],
        dataSource: ds.cloneWithRows([]),
      });
    });
  }

  handleItemOnPress = (rowID: any) => {
    console.log(this.state.items[rowID]);
    this.props.navigator.push('BuyDetail')
  }

  render() {

    if (this.state.error) {
      return (
        <View>
          <Text>Load Page Failure...</Text>
        </View>
      );
    }

    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource!}
        renderRow={(rowData,sectionID, rowID, highlightRow) => {
         return(
           <View>
             <TouchableOpacity onPress={() => this.handleItemOnPress(rowID)}>
               <Text>{rowData.itemName}</Text>
             </TouchableOpacity>
           </View>
         ); 
        }}
      />
    );
  }
}