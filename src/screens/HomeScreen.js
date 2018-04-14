import React from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,BackHandler,RefreshControl,ActivityIndicator } from 'react-native';
import {Header} from 'react-native-elements';
import CardView from '../components/CardView';
import NavBar from '../components/NavBar';
import {fetchHomeCollection,fetchCollectionDetails} from '../reducers/homeScreen';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Most Popular'
  }

  constructor(props){
    super(props);
    this.state={
      refreshing:false,
      pageNumber:1,
      collectionId:'852718'
    }
  }

  componentDidMount(){
    this.fetchHome();
    this.props.fetchCollectionDetails(this.state.collectionId);
}

  fetchHome=()=>{
    this.props.fetchHomeCollection(this.state.collectionId,this.state.pageNumber).then(this.successfetch).catch(this.failurefetch);
    }
  pagination=()=>{
    if(this.props.collectionDetails && this.props.collectionDetails.total_photos/10>this.state.pageNumber){
      this.setState({
        pageNumber:this.state.pageNumber+1
      },()=>{
        this.fetchHome();
      })
    }
  }
  onRefresh=()=>{
      this.setState({refreshing: true,pageNumber:1},()=>{
        this.fetchHome()
      });

      this.setState({refreshing: false});
    }

  render() {
    const {collection,loaded,loading}=this.props;
    console.log("propsss",this.props);
    return (
      <View style={{flex:1}}>
          <View style={{flex:1.25,backgroundColor:'#3D024015',paddingTop:10}}>
            <NavBar cartoon={()=>this.props.navigation.navigate('Details')}/>
          </View>
        <View style={{flex:10}}>
        <View style={{ flex:1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {collection && <CardView  navigation={(data)=>this.props.navigation.navigate('Details', {
              itemId: data
            })
          } collection={collection} pagination={(e)=>this.pagination()} loading={loading} refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
        </View>
        {loading && <View style={styles.loading}>
      <ActivityIndicator size='large' color='tomato' />
      </View>}
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
loading: {
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => ({
  loading : state.homeScreen.loading,
  loaded : state.homeScreen.loaded,
  collection:state.homeScreen.collectionData,
  collectionDetails:state.homeScreen.collectionDetails
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchHomeCollection,
  fetchCollectionDetails
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(HomeScreen)
