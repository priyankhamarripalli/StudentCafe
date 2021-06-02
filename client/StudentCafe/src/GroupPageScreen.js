import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Button, Icon, Fab } from 'native-base';
import ActionButton from 'react-native-circular-action-menu';
import { join_group,get_groups, get_user_in_group } from "../actions/groupAction"
import { allUsers } from "../actions/sessionAction";
import { get_members} from "../actions/groupMembers";
import { API } from "../constant"
import { LOGIN_SUCCESS, FETCH_GROUP } from "../actions/actionTypes"
import pick from "./Picker";

class GroupPage extends Component {
  componentDidMount(){
    this.props.dispatch(get_groups())  
    this.props.dispatch(get_members(this.props.navigation.state.params.group_code))
    console.log("********************user***********",this.props.navigation.state.params.group_code)
  }

  constructor(props) {
    super(props)
    this.state = {
      active: 'true',
      group_id: null

    };
  }
  showCameraView = () => {
    this.setState({ isCameraVisible: true });
  }

  remove_character(str_to_remove, str) {
    let reg = new RegExp(str_to_remove)
    return str.replace(reg, '')
  }
  pickProfileImage() {
    pick((source, datavalue) => {
      //"uri":"file:///data/user/0/com.studentcafe/files/image-7848c888-d793-40fc-91b5-d1c71bfe105e.jpg","path":"file:///data/user/0/com.studentcafe/files/image-7848c888-d793-40fc-91b5-d1c71bfe105e.jpg","fileName":"image-7848c888-d793-40fc-91b5-d1c71bfe105e.jpg","type":"image/jpeg"}'
      if (source != null) {
        let data = new FormData();
        data.append("myFiles", {
          name: datavalue.fileName,
          type: datavalue.type,
          uri: datavalue.uri
        });
        data.append('group_id', this.props.groups.filter((item) => item.group_code == this.props.navigation.state.params.group_code)[0].id)
        data.append('fromScreen', "groupImageUpdate")
        fetch(`${API}${"users/upload"}`, {
          method: "POST",
          body: data
        })
          .then(response => response.json())
          .then(response => {
            console.log("*******groupimg*******", JSON.stringify(response))
            if (response.status === "success") 
            this.props.dispatch({ type: FETCH_GROUP, data: response.payload });

          })
      }
    })
  }


  render() {
    let group = this.props.groups.filter((item) => item.group_code == this.props.navigation.state.params.group_code)  
    console.log("******************chekcdk", group[0].group_image)
    
    return (
      <View style={styles.container}>
          <View style={styles.header}>
          <Image style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1516642898673-edd1ced08e87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" }}/>
          </View>
          <View style={styles.body}>
          <Image style={styles.bgImage1} source={{ uri: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" }}/>

          <Image style={styles.avatar}
              source={{ uri: group[0].group_image === '' || group[0].group_image === null ? 
              'https://media.istockphoto.com/vectors/female-diverse-faces-of-different-ethnicity-seamless-pattern-women-vector-id1085682140' : `${API}${"users/picture/"}${ group[0].group_image}` }} />



            <View style={styles.bodyContent}>

              <Text style={styles.name}>{group[0].group_name} </Text>
              <Text style={styles.info}>{group[0].group_code}</Text>

              <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.props.navigation.navigate("SearchMembers",{group_code: group[0].group_code})}>
                <Text>GROUP MEMBERS </Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("GotogroupScreen",{id: group[0].id,group_name:group[0].group_name,group_image:group[0].group_image})}>
                <Text >GO TO GROUP</Text>  
              </TouchableOpacity>    
        
           
        </View>


            <View style={{flex:1,  bottom: 50}}>
        {/*Rest of App come ABOVE the action button component!*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Edit Group Pic" 
          onPress={() => this.pickProfileImage()}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
     
          <ActionButton.Item buttonColor='#1abc9c' title="Go Back" onPress={() => this.props.navigation.navigate("UserProfile",{homepage:"navigation"})}>
            <Icon name="md-arrow-back" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          </ActionButton>
      </View>
      </View>
      </View>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    groups : state.groupReducer.groups
  };
}
export default connect(mapStateToProps)(GroupPage);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:150,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "lightpink",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:-70
  },
   bgImage:{
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    bgImage1:{
      flex: 1,
      position: 'absolute',
      opacity:0.7,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },

  body:{
    marginTop:0,
    height: 500


  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "darkred",
    fontWeight: "600",
    marginTop: 40
    
  },
  info:{
    fontSize:16,
    color: "hotpink",
    marginTop:10,
    marginBottom: 10,
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },

  buttonContainer:
  {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width:200, 
    marginBottom:10,
    backgroundColor: "#f08080",
    borderRadius: 5
 
  },
  buttonContainer1:
  {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width:200, 
    marginBottom:30,
    backgroundColor: "#f08080",
    borderRadius: 5

   
  },
  buttonText1:
  {
    color:'white'
  }
});
