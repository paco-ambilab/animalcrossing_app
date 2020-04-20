import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'

interface Props {
  title?: String,
  imageSource: any,
  onPress?: () => void,
}

interface State {

}


export default class ImageButton extends React.Component<Props, State> {
  render() {
    return (
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.view}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
        <Image
          source={this.props.imageSource}
          style={styles.image} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  image: {
    width: 50,
    height: 50,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  }
})