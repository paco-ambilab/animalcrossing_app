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

import IslandModel from '../models/IslandModel';

import { fetchIslands } from '../utils/api';

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

  renderRefreshControl = () => {
    this.setState({ loading: true })

    this.setState({ 
      loading: false, 
      items : this.state.items 
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
      <SafeAreaView>
       <FlatList
        data={this.state.items}
        refreshing={this.state.loading}
        onRefresh={this.renderRefreshControl}
        renderItem={({item, index, separators}) => {
          const island = item as IslandModel
          return(
           <View>
             <TouchableOpacity onPress={() => this.handleItemOnPress(index)}>
               <Text>{island.islandOwner}</Text>
             </TouchableOpacity>
           </View>
         ); 
        }}
      />
    </SafeAreaView>
  	);
  }
}
