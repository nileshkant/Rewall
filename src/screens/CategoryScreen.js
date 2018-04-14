import React from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,BackHandler,RefreshControl } from 'react-native';
import {Header} from 'react-native-elements';
import CategoriesCardView from '../components/CategoriesCardView';
import NavBar from '../components/NavBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

class CategoryScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      // refreshing:false
    }
  }

  static navigationOptions = {
    title: 'Wallrox'
  }


  render() {
    console.log("this.props.navigation",this.props.navigateTo);
    return (
      <View style={{flex:1}}>
          {/* <View style={{flex:1.25,backgroundColor:'#3D024015',paddingTop:10}}>
            <NavBar cartoon={()=>this.props.navigation.navigate('Details')}/>
          </View> */}
        <View style={{flex:10}}>
      <ScrollView>
        <View style={{ flex:1, flexDirection: 'row', flexWrap: 'wrap'}}>
          <CategoriesCardView style={{flex:1}} navigateTo={(categoryId,categoryName)=>this.props.navigation.navigate('CategoryImage', {
                categoryId:categoryId,
                categoryName:categoryName
              })} />
        </View>
      </ScrollView>
      </View>
    </View>
    );
  }
}

export default CategoryScreen;
