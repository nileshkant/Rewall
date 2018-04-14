import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';
import CategoryScreen from './src/screens/CategoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FeaturedScreen from './src/screens/FeaturedScreen';
import CategoryImageScreen from './src/screens/CategoryImageScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default class App extends React.Component {

  componentDidMount(){
    console.disableYellowBox = ['Warning: Each', 'Warning: Failed'];
  }
  render() {
    const HomeStack = StackNavigator({
      Home: { screen: HomeScreen},
      Details: { screen: DetailsScreen, mode: 'modal', headerMode:'none'}
  },{
    navigationOptions:{
      headerStyle: {
        backgroundColor: '#3D0240',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '500',
      },
    }
  }
);
    const CategoryStack=StackNavigator({
      Category:{screen: CategoryScreen},
      CategoryImage:{screen:CategoryImageScreen,mode: 'modal'},
      Details: { screen: DetailsScreen, mode: 'modal', headerMode:'none'}
    },{
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#3D0240',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }
    }
  );
    const SettingsStack = StackNavigator({
      Settings: { screen: FeaturedScreen},
    },
    {
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#3D0240',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }
    }
    );

    const TabScreen=TabNavigator({
        Category:{screen: CategoryStack},
        Home: { screen: HomeStack },
        Featured: { screen: SettingsStack },
      },{
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = `ios-leaf${focused ? '' : '-outline'}`;
            } else if (routeName === 'Featured') {
              iconName = `ios-bookmark${focused ? '' : '-outline'}`;
            }else if (routeName === 'Category') {
              iconName = `ios-home${focused ? '' : '-outline'}`;
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
        }),
        lazyLoad:true,
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showLabel:false
        },
        animationEnabled: true,
        swipeEnabled: true,
      });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <TabScreen />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
