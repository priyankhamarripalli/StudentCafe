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
import {Button, Icon} from 'native-base';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { join_group,get_groups } from "../actions/groupAction"


class JoinGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      group_code : null,

    }
  }


componentDidMount(){
  this.props.dispatch(get_groups())
  console.log("**************in**********",this.props.groups)
}

buttonAction (){
  console.log("************************",this.state.group_code)
if(this.state.group_code !==null){
  let group = this.props.groups.filter((item) => item.group_code == this.state.group_code)
  if(group.length > 0){
    this.props.dispatch(join_group(this.state, this.props.navigation, this.props.user.id))
   }else{
    this.dropdown.alertWithType('error', '', "Group code does not exist");
  }
 }else{
   this.dropdown.alertWithType('error', '', " Please enter Group code");
 }
}

  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1488066671372-01f81eaa85f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80" }}/>       
      <Text style={styles.userInfo}> ENTER GROUP REFERENCE CODE </Text>
 
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://www.iconsdb.com/icons/preview/white/code-xl.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Group Code"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={(groupCode) => this.setState({group_code:groupCode})}/>
        </View>

        <Button onPress={() => this.buttonAction()} style={{bottom:5, borderRadius: 5, alignSelf:'center', justifyContent:'center', width: 300, height: 45, backgroundColor:'slategrey'}}>
      <Icon name='md-hand' style={{color:'white', right:10}} />
            <Text style={{color:'white',alignItems:'center', justifyContent:'center',alignSelf:'center'}}>
            JOIN</Text>
             </Button>
        <DropdownAlert ref={ref => this.dropdown = ref} updateStatusBar={false} closeInterval={10000} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups : state.groupReducer.groups,
    user : state.sessionReducer.user
  };
}


export default connect(mapStateToProps)(JoinGroup);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'Roboto',
    },
    userInfo:{
      fontSize:18,
      color:"silver",
      fontWeight:"bold",
      marginBottom: 20
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
  bgImage:{
    flex: 1,
    opacity: 0.9,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
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
    backgroundColor: "gray",
  },
  signUpText: {
    color: 'white',
  }
});
