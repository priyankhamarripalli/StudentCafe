import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { add_group } from "../actions/groupAction"
import DropdownAlert from 'react-native-dropdownalert';
import { Button, Icon} from 'native-base';





 class CreateGroupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      group_name: null,
      group_code : null,
    }
  }
  buttonAction(){
   
    console.log("*****fffffffff******",this.state.group_code)


    if (this.state.group_name !== null &&  this.state.group_code !== null)

    {
      let group = this.props.groups.filter((item) => item.group_code == this.state.group_code)
      if(group.length > 0){
        this.dropdown.alertWithType('error', '', "Group already exists");
       }else{
        this.props.dispatch(add_group(this.state, this.props.navigation, this.props.user.id))
      }
    }
    else{
      this.dropdown.alertWithType('error', '', "Please enter Group name and Group Code");
    }
    //this.props.navigation.navigate("GroupPageScreen",{homepage:"navigation"})
    }

  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" }}/>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/add-user-3-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Group Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(value) => this.setState({group_name: value})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/code-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Group Code"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(value) => this.setState({group_code: value})}/>
        </View>
        
      <Button onPress={() => this.buttonAction()} style={{bottom:5, borderRadius: 5, alignSelf:'center', justifyContent:'center', width: 300, height: 45, backgroundColor:'slategrey'}}>
      <Icon name='md-add' style={{color: 'white'}} />
            <Text style={{color:'white',alignItems:'center', justifyContent:'center',alignSelf:'center'}}>
            CREATE </Text>
             </Button>

      <DropdownAlert ref={ref => this.dropdown = ref} updateStatusBar={false} closeInterval={5000} />

      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
   user: state.sessionReducer.user,
   groups : state.groupReducer.groups
  };
}
export default connect(mapStateToProps)(CreateGroupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
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
  },
  signupButton: {
    backgroundColor: "#c0c0c0",
  },
  signUpText: {
    color: 'black',
  }
});
