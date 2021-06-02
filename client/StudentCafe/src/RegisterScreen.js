import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Keyboard
} from 'react-native';
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import { connect } from 'react-redux';
import { register, forgotPassword, changePassword, updateProfile } from "../actions/sessionAction"
import DropdownAlert from 'react-native-dropdownalert';
import SpinnerButton from 'react-native-spinner-button';


class RegisterScreen extends Component {

  constructor(props) {
    super(props);
    state = {
      fullName: '',
      Year: '',
      College: '',
      email   : '',
      password: '',
    },
    this.state = {
      selected: "I Year"
    }
  }
  state = { animating: true }
   
  closeActivityIndicator = () => setTimeout(() => this.setState({
  animating: false }), 6000)
  
  componentDidMount = () => this.closeActivityIndicator()

  pagenavigation(){
    Keyboard.dismiss()
    console.log("**************regi", this.state.fullName, this.state.selected, this.state.College, this.state.emaill, this.state.password)
    if(this.state.fullName === undefined || this.state.selected === undefined || this.state.College === undefined || this.state.email === undefined ||
    this.state.password === undefined)
    {
      this.dropdown.alertWithType('error', '', " All fields required");

    }
else
{
   this.setState({ defaultLoading: true })
 setTimeout(() => {
   this.setState({ defaultLoading: false })
   this.props.dispatch(register(this.state, this.props.navigation, this))
  }, 3000)
} }
  buttonAction(){

    this.props.dispatch(register(this.state, this.props.navigation, this))
    //this.props.navigation.navigate("UserProfile",{homepage:"navigation"})
  
    }
  render() {
    console.log(this.props.navigation.state.params.homepage)
    return (
      <View style={styles.container}>
       <Image style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1513438205128-16af16280739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80" }}/>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/student-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(name) => this.setState({fullName: name})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/user-3-xl.png'}}/>
          <Picker
              mode="dropdown"
              iosHeader="Year"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25 }} />}
              style={{ width: 60, color: 'white'}}
              selectedValue={this.state.selected}
              placeholderTextColor='rgba(225,225,225,0.7)'
              onValueChange={(Year) => this.setState({selected: Year})}
            >
              <Picker.Item label="I Year" value="I Year" />
              <Picker.Item label="II Year" value="II Year" />
              <Picker.Item label="III Year" value="III Year" />
            </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Image  style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/organization-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="College"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(College) => this.setState({College: College})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/email-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(email) => this.setState({email: email})}/>
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
  <Text style={styles.buttonText}>REGISTER</Text>
  </SpinnerButton>
  
        <DropdownAlert ref={ref => this.dropdown = ref} updateStatusBar={false} closeInterval={10000} />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
   
  };
}
export default connect(mapStateToProps)(RegisterScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#dcdcdc',
    },
   
      buttonStyle:
    {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width:300, 
      borderRadius: 50,
      backgroundColor: '#808080',
    },
    bgImage:{
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    inputContainer: {
        borderBottomColor: '#000000',
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
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:300,
      borderRadius:30,
      color: 'white'
    },
    signupButton: {
      backgroundColor: "#00008b",
    },
    buttonText: {
      color: 'white',
    }
  });