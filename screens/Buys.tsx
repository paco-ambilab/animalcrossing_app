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
import Hashtag from '../components/Hashtag';

type State = {
  loading: boolean,
  error: boolean,
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
  
  // flatListHeader = () => {
  //   return (
  //     <View>
  //       <StatusBar barStyle="dark-content" backgroundColor="#0000"/>
  //       <IslandHeader number="25" unit="個" text="當前收購項目" image={require('../assets/icon.png')} />
  //       <View style={{flexDirection: "row",alignContent:'stretch', paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
  //         <View style={{flex: 1}}>
  //           <Text style={styles.text}>物品/素材</Text>
  //         </View>
  //         <View style={{flex: 1}}>
  //           <Text style={styles.text}>價格(個)</Text>
  //         </View>
  //         <View style={{flex: 1}}>
  //           <Text style={styles.text}>數量</Text>
  //         </View>
  //         <View style={{flex: 1}}>
  //           <Text style={styles.text}>開放時間</Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  flatListHeader = () => {
    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#0000"/>
        <IslandHeader number="25" unit="個" text="當前收購項目" image={require('../assets/icon.png')} />
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
              <TouchableOpacity style={styles.item} onPress={() => this.handleItemOnPress(index)}>
                <View style={{flexDirection: "row",alignSelf: 'stretch',}}>
                  <Hashtag title={"xxx"}/>
                  <Hashtag title={"yyy"}/>
                </View>
                <View style={{flexDirection: "column",alignSelf: 'stretch',}}>
                  <Text style={{marginTop: 5}}>島名：估你唔島</Text>
                  <Text style={{marginTop: 5}}>在線等：3 人 / 上限：5 人</Text>
                  <Text style={{marginTop: 5}}>開房時間：12:06:45 (+8時區)</Text>
                  <Text style={{marginTop: 5}}>島主：Mico</Text>
                </View>

                <View style={{backgroundColor: '#e0e0d1', marginTop: 5, borderRadius: 5,}}>
                  <Text style={{padding: 5}}>島嶼的特產是橘子，可以來洗水果^^
商店有魔術組合、電漿球、壁掛式黑鱸魚、滾筒式洗衣機
服飾店有工作圍裙、印度傳統長版上衣、耳機穿搭、兒童罩衣、學生服、騎士皮衣組合、迷幻連身工作服、奢華套裝、防毒面具等等...</Text>
                </View>
             </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#e3e3e3',
    borderRadius: 5,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 15,
  },
  text: {
    color: "grey",
    fontSize: 14,
    fontWeight: "bold",
  },
})