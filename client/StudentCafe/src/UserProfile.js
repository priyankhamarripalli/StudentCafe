import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import pick from "./Picker";
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { join_group, get_groups, get_user_in_group } from "../actions/groupAction"
import api from '../api'
import { API } from "../constant"
import { LOGIN_SUCCESS } from "../actions/actionTypes"

class UserProfile extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerRight: 

         <Button bordered danger onPress={() => params.handleLogout()}
         style={{borderWidth:2, borderColor:'white', top:5, right: 5, height:33, width:110,
        justifyContent:'center', alignItems:'center', alignSelf:'center'}}>

                 <Icon name='md-exit' style={{color:'white', right:10}} />
            <Text style={{color:'white', textAlign:'center', right: 10}}>LOGOUT</Text>
            </Button>
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      active: 'true',
      isCameraVisible: false,
      userImage: this.props.user.user_image
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
    console.log("**************pciker*****")
    pick((source, datavalue) => {
      //"uri":"file:///data/user/0/com.studentcafe/files/image-7848c888-d793-40fc-91b5-d1c71bfe105e.jpg","path":"file:///data/user/0/com.studentcafe/files/image-7848c888-d793-40fc-91b5-d1c71bfe105e.jpg","fileName":"image-7848c888-d793-40fc-91b5-d1c71bfe105e.jpg","type":"image/jpeg"}'
      if (source != null) {
        let data = new FormData();
        data.append("myFiles", {
          name: datavalue.fileName,
          type: datavalue.type,
          uri: datavalue.uri
        });
        data.append('user_id', this.props.user.id)
        data.append('fromScreen', "profileUpdate")
        fetch(`${API}${"users/upload"}`, {
          method: "POST",
          body: data
        })
          .then(response => response.json())
          .then(response => {
            this.props.dispatch({ type: LOGIN_SUCCESS, data: response.payload });
            this.setState({ userImage: this.props.user.user_image })

          })
      }
    })
  }


  componentWillMount() {
  
    this.props.navigation.setParams({ handleLogout: this.logout });
    console.log("********************hi***********", this.props.user.user_image)
    this.setState({ userImage: this.props.user.user_image })
    console.log("***************h2****************", this.state.userImage)
  }


  logout = () => {
    this.props.navigation.navigate("LoginScreen", { homepage: "navigation" })
  }

  componentDidMount() {
    this.props.dispatch(get_groups())
    this.props.dispatch(get_user_in_group(this.props.user.id))
    this.setState({ userImage: this.props.user.user_image })
    console.log("***************userinGroup****************", this.props.user_in_group)
  }

  render() {
    console.log("*******userimg*****************",this.state.userImage)

    // let userAvatarImage = this.remove_character('"', this.remove_character('"', this.state.userImage))

    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.bgImage} source={{ uri: "https://images.unsplash.com/photo-1528459709161-157d86910939?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=508&q=80" }} />
          <View style={{ flex: 1, marginTop: -10, right: 10 }}>
        
          <Fab
            active={this.state.active}
            direction="down" position="topLeft"        
            containerStyle={{ }}
            style={{ backgroundColor: 'deeppink' }}
            
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="md-add" />
            <Button style={{ backgroundColor: '#34A34F' }}
             onPress={() => this.props.navigation.navigate("EditProfile", { user: this.props.user })}>
              <Icon name="md-create" />
            </Button>
            
            <Button style={{ backgroundColor: '#DD5144' }}
             onPress={() => this.pickProfileImage()}>
              <Icon name="md-camera" />
            </Button>
          </Fab>

            {/* <Fab
              active={this.state.active}
              direction="down" position="topRight"
              containerStyle={{}}
              style={{ backgroundColor: '#ff6347' }}
              onPress={() => this.pickProfileImage()}>
              <Icon name="md-camera" title="EDIT" />
            </Fab>
            <Fab
              active={this.state.active}
              direction="down" position="topRight" 
              containerStyle={{}}
              style={{ backgroundColor: '#ff6347', marginTop: 90}}
              onPress={() => this.props.navigation.navigate("EditProfile", { user: this.props.user })}>
              <Icon name="md-create" title="EDIT" />
            </Fab> */}
          </View>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: this.state.userImage === '' || this.state.userImage === null ? 
              'https://cdn4.iconfinder.com/data/icons/women-avatars-set-1-dot-version/380/9-128.png' : `${API}${"users/picture/"}${this.state.userImage}` }} />

{/* 
<Image style={styles.avatar}
 source={{uri:'https://cdn4.iconfinder.com/data/icons/women-avatars-set-1-dot-version/380/9-128.png' }}/>  */}

 
          <Text style={styles.name}>{this.props.user.first_name} {this.props.user.last_name}</Text>
            <Text style={styles.userInfo}>{this.props.user.yearofstudent}</Text>
            <Text style={styles.userInfo}>{this.props.user.college_name} </Text>
            <Text style={styles.userInfo}>{this.props.user.email} </Text>
            <View style={styles.body}>
              <Text style={styles.info1}>GROUPS JOINED : </Text>
              {this.props.user_in_group.map(item =>

                <Button raised key={item.id} onPress={() => this.props.navigation.navigate("GroupPageScreen", { group_code: item.group.group_code })} style={{
                  borderColor: 'plum', borderWidth: 1,
                  borderRadius: 50, height: 30, width: 100, marginBottom: 10, alignItems: 'center', backgroundColor: "plum", alignSelf: 'center', justifyContent: 'center'
                }}>
                  <Text style={{ fontSize: 16, color: '#000000', textAlign: 'center', backgroundColor: 'transparent', marginBottom: 10 }}
                  >{item.group.group_name}</Text>
                </Button>
              )}
              <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("CreateGroupScreen", { homepage: "navigation" })}>
                <Text style={styles.buttonText1} >CREATE GROUP</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttonContainer1} onPress={() => this.props.navigation.navigate("JoinGroup", { homepage: "navigation" })}>
                <Text style={styles.buttonText1} >JOIN GROUP</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.sessionReducer.user,
    user_in_group: state.groupReducer.user_in_group
  };
}
export default connect(mapStateToProps)(UserProfile);

const styles = StyleSheet.create({

  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
    marginBottom: 5
  },
  userInfo: {
    fontSize: 16,
    color: "#000000",
    fontWeight: '200',
    marginBottom: 10
  },
  body: {
    backgroundColor: "rgba(225,225,225,0.4)",
    height: 280,
    alignItems: 'center',
    width: 380,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 20,

  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#000000",
  },
  info1: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    color: 'darkred',
    fontWeight: '400'
  },
  buttonContainer:
  {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200,
    marginBottom: 10,
    backgroundColor: "hotpink",
    borderRadius: 5

  },
  buttonContainer1:
  {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200,
    marginBottom: 20,
    backgroundColor: "hotpink",
    borderRadius: 5


  },
  buttonText1:
  {

    color: 'white'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});