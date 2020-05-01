import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet, ImageBackground } from 'react-native'

interface Props {
  text?: string,
  image: any,
}

interface State {

}


export default class IslandHeader extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.textLayout}>
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
          <Image
            source={this.props.image}
            style={styles.image} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  innerContainer:{
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    backgroundColor: 'powderblue'
  },
  image: {
    width: 100,
    height: 160,
    position: "absolute",
    right: 20,
    bottom: 20,
    justifyContent: "center"
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
  textLayout: {
     position: "absolute",
     left: 20,
     bottom: 20,
  }
})