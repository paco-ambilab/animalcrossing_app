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
  Button
} from 'react-native';

import Hashtag from '../components/Hashtag';
import ButtonEx from '../components/ButtonEx';

type State = {
  loading: boolean,
  error: boolean,
  isInQueue: boolean,
  isInvited: boolean,
  isIslandOwner: boolean,
  usersInIsland: any[],
  queue: any[],
}

type Props = {
	style?: StyleSheet,
  navigator?: any,
}

export default class IslandDetail extends React.Component {

  constructor(props: Props) {
    super(props);
  }

  usersInIslandViews = [];

  state = {
    loading: false,
    error: false,
    isInQueue: false,
    isInvited: false,
    isIslandOwner: false,
    usersInIsland: [],
    queue: [],
  };

  async componentDidMount() {
    this.setState({
      loading: false,
      error: false,
      isInQueue: false,
      isInvited: false,
      isIslandOwner: true,
      usersInIsland: [0,1,2],
      queue: [0,1,2],
    });
  }

  renderRefreshControl = () => {
    this.setState({ 
      loading: false,
      isInvited: this.state.isInvited,
      isInQueue: this.state.isInQueue,
      isIslandOwner: this.state.isIslandOwner,
      usersInIsland: this.state.usersInIsland,
      queue: this.state.queue,
    });

  }

  handleEnterQueue = () => {
    this.setState({ loading: true, isInQueue: true})
  }

  handleLeaveQueue = (id: string) => {
    this.setState({ loading: true, isInQueue: false })
  }

  handleRemoveInIsland = (id: string) => {
    console.log("handleRemoveInIsland"+id) 
    var newUsersInIsland = this.state.usersInIsland.filter((value, index, arr) => {
      return id != value
    })
    this.setState({ loading: true, queue: this.state.queue, usersInIsland: newUsersInIsland})
  }

  handleRemoveInQueue = (id: string) => {
    console.log("handleRemoveInQueue"+id)
    var newQueue = this.state.queue
    newQueue = newQueue.filter((value, index, arr) => {
      return id != value
    })
    this.setState({ loading: true, queue: newQueue, usersInIsland: this.state.usersInIsland})
  }

  handleInvite = (id: string) => {
    var newUsersInIsland = this.state.usersInIsland
    newUsersInIsland.push(1)
    var newQueue = this.state.queue
    newQueue = newQueue.splice(1)
    this.setState({ loading: true, isInvited: true, queue: newQueue, usersInIsland: newUsersInIsland })
  }

  renderUsersInIsland = () => {
    return (
      {

      }
    );
  }

  flatListHeader = () => {

    // this.usersInIslandViews = [];

    // for(let i = 0; i < this.state.usersInIsland.length; i++) {
    //   this.usersInIslandViews.push(
    //     <View style={{flexDirection: "row",alignSelf: 'stretch'}}>
    //       <Text style={{margin: 5, marginRight: 10}}>用戶 {i + 1}</Text>
    //       { this.state.isIslandOwner && (
    //         <View style={{flexDirection: "row", alignSelf: 'stretch'}}>
    //           <ButtonEx 
    //             title='清除' 
    //             backgroundColor="#DF5F33" 
    //             textColor="#FFFFFF" 
    //             onPress={() => {
    //               this.handleRemoveInIsland(i)
    //             }}
    //           />
    //         </View>
    //       )}
    //     </View>
    //   );
    // }
    return (

      <View>
        <View style={styles.item} >
          <StatusBar barStyle="dark-content" backgroundColor="#0000"/>
          <View style={{flexDirection: "row",alignSelf: 'stretch', marginTop: 5}}>
            <Hashtag title={"xxx"}/>
            <Hashtag title={"yyy"}/>
          </View>
          <View style={{flexDirection: "column",alignSelf: 'stretch',}}>
            <Text style={{marginTop: 5}}>島名：估你唔島</Text>
            <Text style={{marginTop: 5}}>在線等：3 人 / 上限：5 人</Text>
            <Text style={{marginTop: 5}}>開房時間：12:06:45 (+8時區)</Text>
            <Text style={{marginTop: 5}}>島主：Mico</Text>
            { this.state.isInvited && (
              <Text style={{marginTop: 5, color: 'red'}}>密碼: XYZQ1234</Text>
            )}
          </View>

          <View style={{backgroundColor: '#e0e0d1', marginTop: 5, borderRadius: 5,}}>
            <Text style={{padding: 5}}>島嶼的特產是橘子，可以來洗水果^^
  商店有魔術組合、電漿球、壁掛式黑鱸魚、滾筒式洗衣機
  服飾店有工作圍裙、印度傳統長版上衣、耳機穿搭、兒童罩衣、學生服、騎士皮衣組合、迷幻連身工作服、奢華套裝、防毒面具等等...</Text>
          </View>
        </View>

        <View>
          <Text style={{marginTop: 5}}>島上玩家:</Text>
            {true && ( this.state.usersInIsland.map(item => 
              <View key={item} style={{flexDirection: "row",alignSelf: 'stretch'}}>
                <Text style={{margin: 5, marginRight: 10}}>用戶</Text>
                { this.state.isIslandOwner && (
                  <View style={{flexDirection: "row", alignSelf: 'stretch'}}>
                    <ButtonEx 
                      title='清除' 
                      backgroundColor="#DF5F33" 
                      textColor="#FFFFFF" 
                      onPress={() => {
                        this.handleRemoveInIsland(item)
                      }}
                    />
                  </View>
                )}
              </View>
            ))}

          <View style={{flexDirection: "row",alignSelf: 'stretch', marginTop: 5}}>  
            <Text style={{marginTop: 5, marginRight: 10}}>隊列玩家:</Text>
            { !this.state.isIslandOwner && !this.state.isInvited && !this.props.isInQueue && (
              <ButtonEx title='排隊' backgroundColor="#58B231" textColor="#FFFFFF" onPress={() => {
                this.handleEnterQueue()
              }}/>
            )} 
            { !this.state.isIslandOwner && !this.state.isInvited && this.props.isInQueue && (
              <ButtonEx title='離開' backgroundColor="#DF5F33" textColor="#FFFFFF" onPress={() => {
                this.handleLeaveQueue(1)
              }}/>
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
  	const { style } = this.props;
    const { loading, error } = this.state;

  	if (this.state.error) {
      return (
      	<View>
          <Text>IslandDetail Page Failure...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList style={styles.container}
          data={this.state.queue}
          refreshing={this.state.loading}
          onRefresh={this.renderRefreshControl}
          ListHeaderComponent= {this.flatListHeader}
          renderItem={({item, index, separators}) => {
            const user = item as any
            return(
              <View style={styles.item}>
                <View style={{flexDirection: "row",alignSelf: 'stretch'}}>
                  <Text style={{marginRight: 10}}>用戶 {index + 3}</Text>
                  { this.state.isIslandOwner && (
                    <View style={{flexDirection: "row",alignSelf: 'stretch'}}>
                      <View style={{marginRight: 10}}>
                        <ButtonEx 
                          title='邀請' 
                          backgroundColor="#58B231" 
                          textColor="#FFFFFF" 
                          onPress={() => {
                            this.handleInvite(1)
                          }}
                        />
                      </View>
                      <View style={{marginRight: 10}}>
                        <ButtonEx 
                          title='清除' 
                          backgroundColor="#DF5F33" 
                          textColor="#FFFFFF" 
                          onPress={() => {
                            this.handleRemoveInQueue(index)
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
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
  }
})