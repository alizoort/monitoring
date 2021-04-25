import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ListDetail from './ListDetail';
import MyForm from './Form';
import MyForm2 from './Form2';
import Load from './Load'; 
import {ToggleButton} from 'react-native-paper';
const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
          headerLeft: <Icon name="menu" size={24} 
          color= 'white'
          onPress={ () => navigation.toggleDrawer() } />          
        })  
    },
    ListDetail: { screen: ListDetail }
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#612DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "yellow"              
        }
    }
}
);
const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> ,
      headerStyle: {
          backgroundColor: "#612DA8"
      },
      headerTitleStyle: {
        color: "yellow"           
      },
      headerTintColor: "#fff"  
    })
  });
  
  
  const AboutNavigator = createStackNavigator({
    About: { screen: About }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> ,
      headerStyle: {
          backgroundColor: "#612DA8"
      },
      headerTitleStyle: {
        color: "yellow"             
      },
      headerTintColor: "#fff"  
    })
  });
  const MyFormNavigator = createStackNavigator({
    About: { screen: MyForm }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> ,
      headerStyle: {
          backgroundColor: "#612DA8"
      },
      headerTitleStyle: {
        color: "yellow"              
      },
      headerTintColor: "#fff"  
    })
  });
  const MyFormNavigator2 = createStackNavigator({
    About: { screen: MyForm2 }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> ,
      headerStyle: {
          backgroundColor: "#612DA8"
      },
      headerTitleStyle: {
        color: "yellow"              
      },
      headerTintColor: "#fff"  
    })
  });
  const UploadNavigator = createStackNavigator({
    About: { screen: Load }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> ,
      headerStyle: {
          backgroundColor: "#612DA8"
      },
      headerTitleStyle: {
        color: "yellow"      
      },
      headerTintColor: "#fff"  
    })
  });
  const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/heart22.jpg')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Smart Monitoring</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
  
const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" size={24} 
      color= 'white'
      onPress={ () => navigation.toggleDrawer() } /> ,
      headerStyle: {
          backgroundColor: "#612DA8"
      },
      headerTitleStyle: {
          color: "yellow"            
      },
      headerTintColor: "#fff"  
    }), MyForm :{ screen :MyForm }
});

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      },
      MyForm: 
      { screen: MyFormNavigator,
        navigationOptions: {
          title: 'login',
          drawerLabel: 'login',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      },
      MyForm2: 
      { screen: MyFormNavigator2,
        navigationOptions: {
          title: 'signup',
          drawerLabel: 'signup',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      },
       Load: 
      { screen: UploadNavigator,
        navigationOptions: {
          title: 'load',
          drawerLabel: 'load',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      },
      
      Contact: 
      {
        screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          ),
        }
     },
     About: 
      {
        screen: AboutNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
     }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
 
    return (
        <View style={{flex:1}}>
        <MainNavigator />
    </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#612DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'yellow',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  
export default Main;