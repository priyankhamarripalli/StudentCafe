import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ImageBackground,
  Alert,
  Keyboard
} from 'react-native';
import SpinnerButton from 'react-native-spinner-button';

import { connect } from 'react-redux';
import { login, register, forgotPassword, changePassword, updateProfile } from "../actions/sessionAction"
import DropdownAlert from 'react-native-dropdownalert';

 class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }
  
  state = { animating: true }
   
  closeActivityIndicator = () => setTimeout(() => this.setState({
  animating: false }), 6000)
  
  componentDidMount = () => this.closeActivityIndicator()

  pagenavigation(){
    Keyboard.dismiss()
   this.setState({ defaultLoading: true })
 setTimeout(() => {
   this.setState({ defaultLoading: false })
   this.props.dispatch(login(this.state, this.props.navigation, this))
 }, 3000)
} 
  buttonAction(){
  
   this.props.dispatch(login(this.state, this.props.navigation, this))
   //this.props.navigation.navigate("UserProfile",{homepage:"navigation"})
   }

  render() {
    return (      
      <View style={styles.container}>
          <ImageBackground style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1520176501380-9a174bf7c783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" }}>
          <Image style={styles.inputIcon1} source={require("../images/loginlogo.png")} />
           </ImageBackground>

        <View style={styles.inputContainer}>        
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/email-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email: email})}
              placeholderTextColor='rgba(225,225,225,0.7)'
            />
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/key-2-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(password) => this.setState({password: password})}/>
        </View>

        
  <SpinnerButton
    buttonStyle={styles.buttonStyle}
    isLoading={this.state.defaultLoading}
    onPress={() => this.pagenavigation()}
    indicatorCount={3}
  >
  <Text style={styles.buttonText} >LOGIN</Text>
  </SpinnerButton>

        <TouchableHighlight style={styles.buttonContainer} >
            <Text style={styles.buttonText1} onPress={() => this.props.navigation.navigate("Register",{homepage:"navigation"})}>Register here!</Text>
        </TouchableHighlight>
        <DropdownAlert ref={ref => this.dropdown = ref} updateStatusBar={false} closeInterval={10000} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
   
  };
}
export default connect(mapStateToProps)(LoginView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
    buttonStyle:
    {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width:300, 
      borderRadius: 50,
      backgroundColor: "#191970",
      color:'white'
    },
    inputIcon1:{
      width:135,
      height:135,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf:'center',
      marginBottom: 420,
    },
    bgImage:{
      flex: 1,
      opacity: 0.9,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
  inputContainer: {
      borderBottomColor: 'black',
      backgroundColor: 'rgba(225,225,225,0.2)',
      borderRadius:30,
      borderBottomWidth: 1,
      width:300,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color:'white'
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center',

  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
  },

 buttonText: {
    color: 'white',
    fontSize: 15,
  },
  buttonText1: {
    color: 'white',
    fontSize: 15,
  }
});
 