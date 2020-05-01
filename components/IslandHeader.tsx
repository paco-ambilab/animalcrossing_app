import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet, ImageBackground } from 'react-native'

interface Props {
  text?: string,
  number?: string,
  unit?: string,
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
          <View style={styles.titleLayout}>
            <Text>
              <Text style={styles.numberTextStyle}>{this.props.number}</Text><Text style={styles.unitTextStyle}>  {this.props.unit}</Text>  
            </Text>
          </View>
          <View style={styles.titleLayout1}>
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
    marginTop: 25,
    height: 200,
  },
  innerContainer:{
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    backgroundColor: 'powderblue'
  },
  image: {
    width: 220,
    height: 220,
    position: "absolute",
    right: 20,
    bottom: 0,
    justifyContent: "center"
  },
  numberTextStyle: {
    color: "grey",
    fontSize: 50,
    fontWeight: "bold",
  },
  unitTextStyle: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
  titleLayout: {
     position: "absolute",
     left: 80,
     bottom: 60,
  },
  titleLayout1: {
     position: "absolute",
     left: 30,
     bottom: 20,
  }
})