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

import IslandModel from '../models/islandModel';

import { fetchIslands } from '../utils/api';

type State = {
  loading: Boolean,
  error: Boolean,
  items: IslandModel[],
  dataSource?: ListViewDataSource,
}

type Props = {
  navigator?: any,
	style?: StyleSheet,
	islandsForItem?: IslandModel[],
	onPressIsland?: (id: String) => void,
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// const listViewDataSource = ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4']);

export default class Islands extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  state = {
    loading: false,
    error: false,
    items: [],
    dataSource: ds.cloneWithRows([]),
  };

  async componentDidMount() {
    this.handleFetchIslands('');
  }

  handleFetchIslands = (search: String) => {
    
  	this.setState({
      loading: true,
      error: false,
      items: [],
      dataSource: ds.cloneWithRows([]),
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
        dataSource: ds.cloneWithRows(islands),
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
    this.props.navigator.push('IslandDetail')
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
       <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource!}
        renderRow={(rowData,sectionID, rowID, highlightRow) => {
         return(
           <View>
             <TouchableOpacity onPress={() => this.handleItemOnPress(rowID)}>
               <Text>{rowData.islandOwner}</Text>
             </TouchableOpacity>
           </View>
         ); 
        }}
      />
  	);
  }
}
