import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'

interface Props {
  title?: String,
  onPress?: () => void,
}

interface State {

}


export default class Hashtag extends React.Component<Props, State> {

  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
        <View style={styles.view}>
          <Text style={[styles.text, styles.textLayout]}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    marginRight: 10,
    height: 25,
    borderColor: '#e3e3e3',
    borderWidth:0.5,
    borderRadius: 15,
    backgroundColor: 'transparent'
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: '#58B231',
    fontSize: 14,
    textAlign: 'center'
  },
  textLayout: {
    paddingLeft: 15,
    paddingRight: 15,
  }
})