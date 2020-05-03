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
  StatusBar,
} from 'react-native';

import IslandModel from '../models/IslandModel';
import { fetchIslands } from '../utils/api';
import IslandHeader from '../components/IslandHeader';
import Hashtag from '../components/Hashtag';

type State = {
  loading: Boolean,
  error: Boolean,
  items: IslandModel[],
}

type Props = {
  navigator?: any,
	style?: StyleSheet,
	islandsForItem?: IslandModel[],
	onPressIsland?: (id: String) => void,
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
        return new IslandModel(island.id, island.accountInfo.switchID, island.location, island.hashTagDescription, island.createTime)
      })
    })
    .then(islands => {
      console.log(islands)
      this.setState({
        loading: false,
        error: false,
        items: islands,
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
    this.props.navigator.push('IslandDetail')
  }

  handleOnCreateIsland = () => {

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
  //       <IslandHeader number="25" unit="個" text="當前開放島嶼" image={require('../assets/icon.png')} />
  //       <View style={{flexDirection: "row",alignContent:'stretch', paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
  //         <View style={{flex: 1}}>
  //           <Text style={styles.text}>特産/特性</Text>
  //         </View>
  //         <View style={{flex: 1}}>
  //           <Text style={styles.text}>位置</Text>
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
        <IslandHeader number="25" unit="個" text="當前開放島嶼" image={require('../assets/icon.png')} />
      </View>
    );
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
      <View style={styles.container}>
        <FlatList style={styles.container}
          data={this.state.items}
          refreshing={this.state.loading}
          onRefresh={this.renderRefreshControl}
          ListHeaderComponent= {this.flatListHeader}
          renderItem={({item, index, separators}) => {
            const island = item as IslandModel
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
          maxToRenderPerBatch={10}
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
