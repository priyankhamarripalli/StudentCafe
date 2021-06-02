/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar ,ActivityIndicator, SafeAreaView ,AsyncStorage} from 'react-native';
import Rootnavbar from "../components/Navigation/RootNav"
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
import { store, persistor } from "../store";
// import { PRIMARY_COLOR } from "../constants"
// import {isLoggedIn} from '../actions/sessionAction'
// import { YellowBox } from 'react-native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


loadNav= async() => {
  let token = await AsyncStorage.getItem('token');
 // store.dispatch(isLoggedIn(token))
}



export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#324291" />
      <Rootnavbar />
     </View>
     </PersistGate>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
