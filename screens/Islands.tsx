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

  flatListHeader = () => {
    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#0000"/>
        <IslandHeader number="25" unit="個" text="當前開放島嶼" image={require('../assets/icon.png')} />
        <View style={{flexDirection: "row",alignContent:'stretch', paddingLeft: 20, paddingTop: 10, paddingRight: 20}}>
          <View style={{flex: 1}}>
            <Text style={styles.text}>特産/特性</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>位置</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>開放時間</Text>
          </View>
        </View>
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
              <View style={styles.item}>
                <TouchableOpacity onPress={() => this.handleItemOnPress(index)}>
                  <Text>{island.islandOwner}</Text>
                </TouchableOpacity>
              </View>
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
