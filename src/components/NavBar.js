import React,{Component} from 'react';
import ReactNative, {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import testImg from '../../assets/test.png';

const menu=["Cities","Movies","Artistic","Minimal","Sports","Flowers","Games"];

class NavBar extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getrandomColor=()=>{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 8; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){
  const {headerText,menuStyle,imageBackground,viewInside}=styles;
  return(
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {menu.map((menuItem,i)=>{
        return (
          <View key={i} borderRadius={5} style={{height:45,width:100,marginLeft:5,backgroundColor:this.getrandomColor()}}>
            <View style={viewInside}><Text style={menuStyle} onPress={() => props.cartoon('details')}>{menuItem}</Text></View>
          </View>
        )
      })
    }
    </ScrollView>
  );
}
}

// const backColour= getrandomColor();

const styles = StyleSheet.create({
  menuStyle: {
    // borderRadius: 30,
    color:'#FAE3E3',
    fontWeight:'500',
    letterSpacing:80
  },
  // imageBackground:{
  //   height:50,
  //   width:100,
  //   marginLeft:5,
  //   // backgroundColor: backColour
  // },
  viewInside:{
    backgroundColor:'#00000055',
    height:45,
    width:100,
    borderRadius:5,
    justifyContent:'center',
    flexDirection:'column',
    alignItems: 'center',
  }
});

export default NavBar;
