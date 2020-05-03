import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

interface Props {
  title?: string,
  backgroundColor?: string,
  textColor?: string,
  onPress?: () => void,
}

interface State {

}


export default class ButtonEx extends React.Component<Props, State> {

  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
        <View style={[styles.view,{backgroundColor: this.props.backgroundColor}]}>
          <Text style={[styles.text, styles.textLayout, {color: this.props.textColor}]}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    borderRadius:3,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: 'transparent'
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  },
  textLayout: {
    marginLeft: 10,
    marginRight: 10, 
  }
})