import React from 'react';
import ReactNative, {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,Dimensions,TouchableHighlight,Button,PermissionsAndroid
} from 'react-native';
import {fullPhoto} from '../reducers/details';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import WallPaperManager from 'react-native-wallpaper-manager';
import RNFetchBlob from 'react-native-fetch-blob';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    tabBarVisible: false,
    swipeEnabled: false,
  }

  constructor(props){
    super(props);
    this.state={
      itemId :'',
      loading:false,
      disableButton:false
    }
  }
  componentDidMount(){
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    this.fetchSinglePhoto(itemId);
  }


requestPermission=async(url,id)=>{
  const checkPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (checkPermission === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': 'Rewall',
                        'message': 'Required permission for saving wallpaper'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  this.setState({
                    disableButton:true
                  });
                  RNFetchBlob.fetch( 'GET', url ).then((response) => {
                    let base64Str = response.data;
                    imageLocation= `${RNFetchBlob.fs.dirs.DCIMDir}/Rewall/`+`${id}.jpeg`;
                    RNFetchBlob.fs.writeFile(imageLocation, base64Str, 'base64');
                    RNFetchBlob.fs.scanFile([ { path : imageLocation } ]).then(() => {
                      // scan file success
                      WallPaperManager.setWallpaper({uri: `${url}.jpg`}, (response) => {
                        alert("Wallpaper set to Home Screen")
                        const { state, goBack } = this.props.navigation;
                        const params = state.params || {};
                        goBack(params.go_back_key);
                      })
                    })
                    .catch((err) => { console.log("scan file error"); });
                    })

                } else {
                    alert("Please give required permission");
                }
            } catch (err) {
                alert(err)
            }
        }
    };

  fetchSinglePhoto=(itemId)=>{
    let width = Dimensions.get('window').width;
    screenWidth=width*3;
    let height = Dimensions.get('window').height;
    screenHeight=height*3
    this.props.fullPhoto(itemId, screenWidth, screenHeight).then(this.successFullPhoto).catch(this.failureFull);
  }

  render() {
    const {SinglePhoto,loaded, loading}=this.props;
    return (
      <View style={{ flex: 1}}>
        {this.state.loading===true && <Loader />}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.props.SinglePhoto && <View><Image
          ref="logoImage"
          style={styles.image}
          resizeMode = 'cover'
          onLoadStart={(e) => this.setState({loading: true})}
          source={{uri: SinglePhoto.urls.regular} }
        />
        {this.state.disableButton==false && <Button onPress = {(e)=>this.requestPermission(SinglePhoto.urls.custom,SinglePhoto.id)} title="Set as Wallpaper">Download</Button>}
        {this.state.disableButton==true && <Button onPress = {(e)=>this.requestPermission(SinglePhoto.urls.custom,SinglePhoto.id)} title="Set as Wallpaper">Download</Button>}
      </View>}
      </View>
    </View>
    );
  }
}
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
    resizeMode:'cover',
    width: width,
    height:height*0.6,
  },
});

const mapStateToProps = state => ({
  loading : state.details.loading,
  loaded : state.details.loaded,
  SinglePhoto:state.details.singlePhoto,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fullPhoto
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailsScreen)
