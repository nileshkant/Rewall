import React,{Component} from 'react';
import {View,Image,Dimensions,Text,StyleSheet,FlatList,RefreshControl, TouchableHighlight} from 'react-native';
import Loader from './Loader';

class CardView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    };
  }

// renderItem=()=>{
//   return this.props.collection.map(photos => {
//   return(
//
//   )
// }
// }

render(){
  const {collection}=this.props;
  console.log("collection",collection );
  return (
    <FlatList
      data={this.props.collection}
      refreshControl={
        <RefreshControl
          refreshing={this.props.refreshing}
          onRefresh={this.props.onRefresh}
        />
      }
      onEndReached={(e)=>{this.props.pagination(e)}}
      onEndReachedThreshold={0.8}
       numColumns={2}
      renderItem={({item})=>(
        <View key={item.id} style={styles.container} >
          {/* {this.state.loading==true && <Loader />} */}
          <TouchableHighlight onPress = {()=>this.props.navigation(item.id)}>
          <Image
            resizeMode = 'cover'
            onLoadStart={(e) => this.setState({loading: true})}
            style={styles.image}
            source={{uri: item.urls.small}}
           />
         </TouchableHighlight>
        </View>
      )}
    />
  );
}
}
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    overflow: "hidden"
  },
  image: {
    width: width*.47,
    height:height*.4,
    marginLeft:5,
    marginRight:5,
    marginTop:10,
    flexGrow:1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textBottom: {
    width: width*.47,
    marginLeft:5,
    marginRight:5,
    backgroundColor:'#B7B7B7',
    color:'#3D0240',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0, padding:5,}
});

export default CardView;
