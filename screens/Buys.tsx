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
  SafeAreaView
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
  
  render() {

    if (this.state.error) {
      return (
        <View>
          <Text>Load Page Failure...</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <IslandHeader number="25" unit="個" text="當前收購項目" image={require('../assets/icon.png')} />
        <View style={{flexDirection: "row",alignContent:'stretch', paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
          <View style={{flex: 1}}>
            <Text style={styles.text}>   物品/素材</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>單位價格</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>數量</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>島主</Text>
          </View>
        </View>
        <FlatList
          data={this.state.items}
          refreshing={this.state.loading}
          onRefresh={this.renderRefreshControl}
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
  },
  item: {
    height:80,
    backgroundColor: '#f9c2ff',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 7,
    marginHorizontal: 15,
  },
  text: {
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
  },
})