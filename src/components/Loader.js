import React,{Component} from 'react';
import {Image, View,StyleSheet} from 'react-native';
import loader from '../../assets/loader.gif'

export default class Loader extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


render(){
  return(
    <View style={styles.container}>
      <Image
        style={styles.loadingImage}
        source={loader}
       />
    </View>
  )
}
}

const styles = StyleSheet.create({
  loadingImage:{
    width:50,
    height:50,
  },
  container: {
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
