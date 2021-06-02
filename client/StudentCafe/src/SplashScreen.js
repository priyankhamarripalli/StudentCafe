import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';

export default class App extends Component {

  constructor(props) {
  super(props);   
    setTimeout(() => {
      this.props.navigation.navigate("LoginScreen",{homepage:"navigation"})
    }, 3000)
  }



  render() {
    return (
      <View style={styles.container}> 
        <ImageBackground style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80" }}>
        <Image style={styles.inputIcon} source={require("../images/Logo.png")} />
        </ImageBackground>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },

  inputIcon:{
    width:200,
    height:200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    marginBottom: 200
  },
  bgImage:{
    flex: 1,
    position: 'absolute',   
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5,
    width:250,
    borderRadius:30,
   
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color:'#000000',
    
    fontFamily: 'sans-serif-light',
    },
});
