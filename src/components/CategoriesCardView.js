import React,{Component} from 'react';
import {View,Image,Dimensions,Text,StyleSheet,TouchableHighlight,ImageBackground,ScrollView} from 'react-native';
import Loader from './Loader';
import testImg from '../../assets/test.png';
import Ionicons from 'react-native-vector-icons/Ionicons';


var days = ['Special Sunday','Busy Monday','Motivating Tuesday','Tired Wednesday','Tough Thursday','Exiting Friday','Party Saturday'];

class CategoriesCardView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    };
  }


render(){
  let today = new Date()
  let day = days[ today.getDay() ];
  let curHr = today.getHours()
  let rightNow
  if (curHr < 12 && curHr>4) {
    rightNow='Morning Sunshine'
  } else if (curHr < 19 && curHr>12) {
    rightNow='Chilling Afternoon'
  } else {
    rightNow='Relaxing Night'
  }
  return (
    <ScrollView style={styles.container} >
      {this.state.loading==true && <Loader />}
      <TouchableHighlight onPress = {()=>this.props.navigateTo('1125083', rightNow)}>
      <ImageBackground blurRadius={2} borderRadius={5} source={testImg} style={styles.card}  >
        <View style={styles.insideCardIcon}>
          <Ionicons name='ios-alarm' size={40} color='#ffffff' />
        </View>
          <View style={styles.insideCard}>
          <Text style={styles.textBottom} >{rightNow}</Text>
        </View>
      </ImageBackground>
    </TouchableHighlight>
      <ImageBackground blurRadius={2} borderRadius={5} source={testImg} style={styles.card}  >
        <View style={styles.insideCardIcon}>
          <Ionicons name='ios-happy' size={40} color='#ffffff' />
        </View>
          <View style={styles.insideCard}>
          <Text style={styles.textBottom} >{day}</Text>
        </View>
      </ImageBackground>
      {/* <ImageBackground blurRadius={2} borderRadius={5} source={testImg} style={styles.card}  >
        <View style={styles.insideCardIcon}>
          <Ionicons name='ios-cloudy-night' size={40} color='#ffffff' />
        </View>
          <View style={styles.insideCard}>
          <Text style={styles.textBottom} >Relaxing Evening</Text>
        </View>
      </ImageBackground> */}
    </ScrollView>
  );
}
}

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    overflow: "hidden",
  },
  card: {
    width: width-10,
    height:height*.2,
    marginTop:10,
    opacity:40,
    borderRadius:20,
    marginLeft:5,
  },
  insideCard:{
    justifyContent:'flex-end',
    flexGrow:1,
    backgroundColor:'#00000055',
  },
  insideCardIcon:{
    justifyContent:'flex-end',
    flexGrow:9,
    flexDirection: 'row',
    marginTop:10,
    marginRight:10,
    opacity:.4,
  },
  textBottom: {
    // width: width*.47,
    // backgroundColor:'#B7B7B7',
    textAlignVertical: 'center',
    fontSize:30,
    color:'#FAE3E3',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding:5,
    fontFamily: 'sans-serif-medium',
  }
});

export default CategoriesCardView;
