import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
  TextInput
} from 'react-native';
import { API } from "../constant"

import {connect} from 'react-redux';
import { Container, Header, Content, Badge, Icon, Button } from 'native-base';

import { get_members} from "../actions/groupMembers";

class SearchMembers extends Component {

  async componentDidMount(){
    console.log("******************this.props.navigation.state.params.group_code***********",this.props.navigation.state.params.group_code)
    await this.props.dispatch(get_members(this.props.navigation.state.params.group_code))
    console.log("*********abc*********",this.props.groupmembers)
  
  }


  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:null,

    };
  }

  clickEventListener = (item) => {
    console.log("********log**********", item.user.first_name)
    this.setState({userSelected: item})
      this.setModalVisible(true);
    
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  remove_character(str_to_remove, str) {
    let reg = new RegExp(str_to_remove)
    return str.replace(reg, '')
  }
  render() {
    this.props.groupmembers.map(item => console.log("*************hello*********", item.user.user_image))
    
    return (

      <View style={styles.container}>
      <Image style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1546277838-f1e7a049a490?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80" }}/>
          {/* <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/search/androidL/100/000000'}}/>
            <TextInput style={styles.inputs}
                ref={'txtPassword'}
                placeholder="Search"
                placeholderTextColor='rgba(225,225,225,0.7)'
                onChangeText={(name_address) => this.setState({name_address})}/>
          </View>
        </View> */}
        <ScrollView>

        { this.props.groupmembers.map(item => 
            <View style={styles.card} key={item.id}>
              <Image key={item.id} style={styles.image}
              source={{ uri: item.user.user_image === '' || item.user.user_image === null? 'https://cdn4.iconfinder.com/data/icons/women-avatars-set-1-dot-version/380/9-128.png' : `${API}${"users/picture/"}${ item.user.user_image}` }} />
              
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.user.first_name}</Text>
               {/* <Text style={styles.name}>{this.state.userSelected !== null ? this.state.userSelected.user.first_name : null}</Text> */}
                    <Text style={styles.position}>{item.user.yearofstudent !== null ? item.user.yearofstudent : null} </Text>
                    <Text style={styles.about}>{item.user.college_name !== null ? item.user.college_name : null}</Text>
                <Button bordered style={styles.butt} >
                <Text>{item.user_role === "M" ? "MEMBER": "ADMIN"} </Text></Button>
                               </View>
              </View>
        )}
       </ScrollView>
       
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups : state.groupReducer.groups,
    user : state.sessionReducer.user,
    groupmembers: state.membersReducer.groupmembers
  };
}
export default connect(mapStateToProps)(SearchMembers);

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:0,
  },
  bgImage:{
    flex: 1,
    opacity: 0.9,
    position: 'absolute', 
    width: '100%',
    height: '130%',
    justifyContent: 'center',
    alignItems:'stretch',
    alignSelf:'center',
    marginBottom: -200
  },
  header:{
    backgroundColor: "#00CED1",
    height:200,

  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  butt:
  {
   width:100,
   height:30,
   borderRadius: 30,
   justifyContent:'center',
   borderColor: 'slategray'

  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
  },
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,

    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: 20,
    
    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"silver",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    color:"#000000",
    fontWeight:'bold'
  },

  position:{
    fontSize:14,
    flex:1,
    color:'black',
    marginLeft: 3,
    },
  about:{
    marginLeft: 3,

    marginHorizontal:5,
    marginBottom: 10,
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,

  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      borderRadius:30,
      backgroundColor: 'rgba(225,225,225,0.2)',
      borderBottomWidth: 1,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#000000',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },

 /************ modals ************/
  popup: {
    backgroundColor: '#dcdcdc',
    marginTop: 90,
    marginHorizontal: 10,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 20
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:160,
  },
  popupHeader: {
    marginBottom: 30
  },
  popupButtons: {
    marginTop: 5,
    flexDirection: 'row',
    borderTopWidth: 0,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 10
  },
  btnClose:{
    height:30,
    width: 100,
    marginHorizontal: 5,
    backgroundColor:'#20b2aa',
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 10
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
}); 