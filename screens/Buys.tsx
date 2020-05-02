import React from 'react';
import { 
  FlatList,
  ListViewDataSource,
  StyleSheet, 
  Text, 
  View, 
  ViewPropTypes,
  ActivityIndicator, 
  Platform ,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';

import BuyModel from '../models/BuyModel';
import { fetchBuys } from '../utils/api';
import IslandHeader from '../components/IslandHeader';

type State = {
  loading: Boolean,
  error: Boolean,
  items: BuyModel[],
}

type Props = {
  navigator?: any,
	style?: StyleSheet,
	buysForItem?: BuyModel[],
	onPressBuy?: (id: String) => void,
}

export default class Buys extends React.Component<Props, State> {

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

  handleItemOnPress = (rowID: any) => {
    console.log(this.state.items[rowID]);
    this.props.navigator.push('BuyDetail')
  }

  renderRefreshControl = () => {
    this.setState({ loading: true })

    this.setState({ 
      loading: false, 
      items : this.state.items 
    });

  }
  
  flatListHeader = () => {
    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#0000"/>
        <IslandHeader number="25" unit="個" text="當前收購項目" image={require('../assets/icon.png')} />
        <View style={{flexDirection: "row",alignContent:'stretch', paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
          <View style={{flex: 1}}>
            <Text style={styles.text}>物品/素材</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>價格(個)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>數量</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>開放時間</Text>
          </View>
        </View>
      </View>
    );
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
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          refreshing={this.state.loading}
          onRefresh={this.renderRefreshControl}
          ListHeaderComponent= {this.flatListHeader}
          renderItem={({item, index, separators}) => {
            const buy = item as BuyModel
            return(
             <View style={styles.item}>
               <TouchableOpacity onPress={() => this.handleItemOnPress(index)}>
                 <Text>{buy.itemName}</Text>
               </TouchableOpacity>
             </View>
           ); 
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF6E6',
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
  },
  item: {
    height:80,
    backgroundColor: '#f9c2ff',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginVertical: 7,
    marginHorizontal: 15,
  },
  text: {
    color: "grey",
    fontSize: 14,
    fontWeight: "bold",
  },
})