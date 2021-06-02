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
import { API } from "../constant"
import api from '../api'
import { LOGIN_SUCCESS } from "../actions/actionTypes"
import { register, forgotPassword, changePassword, updateProfile } from "../actions/sessionAction"
import DropdownAlert from 'react-native-dropdownalert';
import SpinnerButton from 'react-native-spinner-button';


class RegisterScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.navigation.state.params.user.first_name,
      last_name:this.props.navigation.state.params.user.last_name,
      yearofstudent: this.props.navigation.state.params.user.yearofstudent,
      college_name: this.props.navigation.state.params.user.college_name
      
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
   this.props.dispatch(register(this.state, this.props.navigation, this))
  }, 3000)
} 
  buttonAction(){
   
    Keyboard.dismiss()
    var data = {}
		data.first_name = this.state.first_name;
		data.last_name = this.state.last_name;
		data.user_id = this.props.navigation.state.params.user.id;
		data.yearofstudent = this.state.yearofstudent;
		data.college_name =this.state.college_name;
		console.log("********register******", JSON.stringify(data))
		api.post("users/editProfile", data).then(async (response) => {
			console.log("************register***response****************", JSON.stringify(response))
		if (response.status === "success") {
      this.props.dispatch({ type: LOGIN_SUCCESS, data: response.payload });
      this.props.navigation.goBack(null);
		}
		});
	}
  
    //this.props.navigation.navigate("UserProfile",{homepage:"navigation"})
  
  render() {
    console.log("*********************check*******************",this.props.navigation.state.params.user)
    return (
      <View style={styles.container}>
       <Image style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1530305408560-82d13781b33a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80" }}/>
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/student-xl.png'}}/> */}
          <TextInput style={styles.inputs}
              placeholder="First Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              value = {this.state.first_name}
              onChangeText={(firstName) => this.setState({first_name: firstName})}/>
        </View>
        <View style={styles.inputContainer}>
          {/* <Image  style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/organization-xl.png'}}/> */}
          <TextInput style={styles.inputs}
              placeholder="Last Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              value = {this.state.last_name}

              onChangeText={(lastName) => this.setState({last_name: lastName})}/>
        </View>

        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/user-3-xl.png'}}/> */}
          <Picker
              mode="dropdown"
              iosHeader="Select Year"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "white", fontSize: 25 }} />}
              style={{ width: 60, color: 'white'}}
              selectedValue={this.state.yearofstudent}

              placeholderTextColor='rgba(225,225,225,0.7)'
              onValueChange={(Year) => this.setState({yearofstudent: Year})}
            >
              <Picker.Item label="I Year" value="I Year" />
              <Picker.Item label="II Year" value="II Year" />
              <Picker.Item label="III Year" value="III Year" />
            </Picker>
        </View>
        <View style={styles.inputContainer}>
          {/* <Image  style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/organization-xl.png'}}/> */}
          <TextInput style={styles.inputs}
              placeholder="Enter College Name"
              keyboardType="email-address"
              value = {this.state.college_name}

              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(College) => this.setState({college_name: College})}/>
        </View>

      




        <TouchableHighlight style={styles.buttonContainer} >

  <Text onPress={() => this.buttonAction()}
   style={styles.buttonText}>UPDATE</Text>
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
      backgroundColor:'darkblue',
      
    },
    signupButton: {
      backgroundColor: "#00008b",
    },
    buttonText: {
      color: 'white',
    }
  });