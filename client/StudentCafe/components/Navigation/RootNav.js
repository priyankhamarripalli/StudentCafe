import React from "react";
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator, NavigationActions, StackActions, createDrawerNavigator, DrawerActions } from 'react-navigation';
import { TouchableOpacity, View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import LoginScreen from "../../src/LoginScreen"
import RegisterScreen from "../../src/RegisterScreen"
import CreateGroupScreen from "../../src/CreateGroupScreen"
import GroupPageScreen from "../../src/GroupPageScreen"
import GotogroupScreen from "../../src/GotogroupScreen"
import UserProfile from "../../src/UserProfile"
import JoinGroup from "../../src/JoinGroup"
import EditProfile from "../../src/EditProfile";
import SearchMembers from "../../src/SearchMembers";
import SplashScreen from "../../src/SplashScreen";
import AddPost from "../../src/AddPost";
import EditGroupProfile from "../../src/EditGroupProfile";
import { connect } from 'react-redux';

const AuthStack = createStackNavigator({

     SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null,
            headerLeft: null
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            title: "LOGIN",
            headerStyle: {
                backgroundColor: 'dimgrey',
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleAllowFontScaling: false,
            headerTitleStyle: {
                color: "#ffffff",
                fontWeight: 'bold',
                fontSize: 17
            },
            headerLeft: null,
            headerBackTitleStyle: {
                color: 'white',
            },
            //headerTintColor: 'white',

            //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
        })
    },
   
    Register: {
        screen: RegisterScreen,
        navigationOptions: ({ navigation }) => ({
            title: "REGISTER",
            headerStyle: {
                backgroundColor: 'darkslategray',
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleAllowFontScaling: false,
            headerTitleStyle: {
                color: "#ffffff",
                fontWeight: 'bold',
                fontSize: 17
            },
            headerBackTitleStyle: {
                color: 'white',
            },
            //headerTintColor: 'white',

            //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
        })
    }
   },
    {
        initialRouteName: 'SplashScreen',
    });


    const homeStack = createStackNavigator({
        
       CreateGroupScreen: {
           screen: CreateGroupScreen,
           navigationOptions: ({ navigation }) => ({
               title: "CREATE A GROUP",
               headerStyle: {
                   backgroundColor: "slategrey",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       JoinGroup: {
           screen: JoinGroup,
           navigationOptions: ({ navigation }) => ({
               title: "JOIN A GROUP",
               headerStyle: {
                   backgroundColor: "slategray",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       UserProfile: {
           screen: UserProfile,
           navigationOptions: ({ navigation }) => ({
               title: "USER PROFILE",
               headerStyle: {
                   backgroundColor: "#db7093",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerLeft: null,
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
                   
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       EditProfile: {
           screen: EditProfile,
           navigationOptions: ({ navigation }) => ({
               title: "EDIT USER PROFILE",
               headerStyle: {
                   backgroundColor: "#00008b",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       EditGroupProfile: {
           screen: EditGroupProfile,
           navigationOptions: ({ navigation }) => ({
               title: "Edit Group Profile",
               headerStyle: {
                   backgroundColor: "#00bfff",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       GroupPageScreen: {
           screen: GroupPageScreen,
           navigationOptions: ({ navigation }) => ({
               title: "GROUP PROFILE",
               headerStyle: {
                   backgroundColor: "plum",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       SearchMembers: {
           screen: SearchMembers,
           navigationOptions: ({ navigation }) => ({
               title: "VIEW GROUP MEMBERS",
               headerStyle: {
                   backgroundColor: "slategrey",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       GotogroupScreen: {
        screen: GotogroupScreen,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "darkcyan",
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleAllowFontScaling: false,
            headerTitleStyle: {
                color: "#ffffff",
                fontWeight: 'bold',
                fontSize: 17
            },
            headerBackTitleStyle: {
                color: 'white',
            },
            //headerTintColor: 'white',

            //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
        })
    },
       AddPost: {
           screen: AddPost,
           navigationOptions: ({ navigation }) => ({
               title: "Write What You Think ..",
               headerStyle: {
                   backgroundColor: "#00bfff",
                   elevation: 0,
                   shadowOpacity: 0
               },
               headerTitleAllowFontScaling: false,
               headerTitleStyle: {
                   color: "#ffffff",
                   fontWeight: 'bold',
                   fontSize: 17
               },
               headerBackTitleStyle: {
                   color: 'white',
               },
               //headerTintColor: 'white',
   
               //headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
           })
       },
       
       
     },
       {
           initialRouteName: 'UserProfile',
       });
   


const AppContainer = createAppContainer(createSwitchNavigator(
    {
        Auth: AuthStack,
        App: homeStack
    },
    {
        initialRouteName: 'Auth',
    }
))



const MainContainer = createAppContainer(createSwitchNavigator(
    {
        Auth: AuthStack,
        App: homeStack
    },
    {
        initialRouteName: 'App',
    }
))


class Rootnavbar extends React.Component { 
    render() {       
        return (
            this.props.isLogged ? <MainContainer/>: <AppContainer/>
          )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.sessionReducer.isLogged,
       
    };
}

export default connect(mapStateToProps)(Rootnavbar);
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#FF4500",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
});


