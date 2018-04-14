import React from 'react';
import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native';
import {Header} from 'react-native-elements';
import CardView from '../components/CardView';
import NavBar from '../components/NavBar';


class FeaturedScreen extends React.Component {
  static navigationOptions = {
    title: 'Featured'
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:10}}>
      <FlatList>
        <View style={{ flex:1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {/* <CardView  style={{ flex:1,flexBasis: '50%'}}/> */}

        </View>
      </FlatList>
      </View>
    </View>
    );
  }
}

export default FeaturedScreen;
