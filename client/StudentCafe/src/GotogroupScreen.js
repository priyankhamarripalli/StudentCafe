
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Keyboard,
  ImageBackground,
  Platform
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button,  Icon, Left, Body, Right} from 'native-base';
import { get_group_post } from "../actions/groupPostAction"
import { Avatar } from "react-native-elements";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';
import OpenFile from 'react-native-doc-viewer';
import DropdownAlert from 'react-native-dropdownalert';
import api from '../api'
import { API } from "../constant"
import Moment from 'moment';

class GoToGroup extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerRight: <TouchableOpacity onPress={() => params.syncButtonAction()} style={{ padding: 5 }}>
        <Icon
          name="md-refresh"
          style={{color:'white', right: 5}}
        />
      </TouchableOpacity>
    };
  };

 constructor(props) {
    super(props);
    this.state = {
      data: [],
      textMessage: null
    };
  }


  async componentWillMount() {
    this.props.navigation.setParams({ title: this.props.navigation.state.params.group_name.toUpperCase() });
    this.props.navigation.setParams({ syncButtonAction: this.syncButtonAction });
    await this.props.dispatch(get_group_post())
    let group_post = await this.props.group_post.filter((item) => item.group_id == this.props.navigation.state.params.id)
    this.setState({ data: this.groupPostArray(group_post) })
   
  }

  syncButtonAction = () => {
    api.get("grouppost").then(async (response) => {	
			if (response.status === "success") {
       let group_post = await response.payload.filter((item) => item.group_id == this.props.navigation.state.params.id)
        this.setState({ data: this.groupPostArray(group_post) })
        this.scrollButtomAction()
        this.dropdown.alertWithType('success', '', " Successfully synced" );
      } 
      
		});
  }

  scrollButtomAction = () => {   
        this.ListView_Ref.scrollToEnd({ animated: true });
  }

  async componentDidMount() {
    await this.props.dispatch(get_group_post())
    let group_post = await this.props.group_post.filter((item) => item.group_id == this.props.navigation.state.params.id)
    this.setState({ data: this.groupPostArray(group_post) })
  }


  remove_character(str_to_remove, str) {
    let reg = new RegExp(str_to_remove)
    return str.replace(reg, '')
  }

  renderDate = (date) => {
    return (
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  groupPostArray(groupPost) {
    var returnGroupPostArray = []
    groupPost.map(post => {
      returnGroupPostArray.push({ id: post.id, title: post.post_text, time: post.createdAt,
         image: post.attachment_id, user_id: post.user_id, content_type: post.content_type,
          user_name: post.user_name, user_image:post.user_image

          //  this.remove_character('"', this.remove_character('"', post.user_image))  
          
          })
    })
    return returnGroupPostArray
  }
 

  textUpload = () => {
    if (this.state.textMessage !== null && this.state.textMessage !== "" && this.state.textMessage !== undefined) {
      var data = {}
      data.user_id = this.props.user.id,
        data.group_id = this.props.navigation.state.params.id,
        data.user_name = this.props.user.first_name + " " + this.props.user.last_name,
        data.textMessage = this.state.textMessage
      api.post("grouppost", data).then(async (response) => {
        if (response.status === "success") {
          let group_post = response.payload.filter((item) => item.group_id == this.props.navigation.state.params.id)
          this.setState({ data: this.groupPostArray(group_post) })
          this.props.dispatch(get_group_post())
          this.setState({ textMessage: null })
          Keyboard.dismiss()
        } else {
          this.dropdown.alertWithType('error', '', response.message);
        }
      });
    } else {
      this.dropdown.alertWithType('error', '', "Please enter te");
    }

  }


  pdfView = (content_type, image) => {

  console.log("****************imasge********",image)

    if (Platform.OS === "android") {
      OpenFile.openDoc([{
        url: image, // Local "file://" + filepath
        fileName: "sample",
        cache: false,
        fileType: content_type === "application/pdf" ? "pdf" : content_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "docx" : content_type === "application/msword" ? "doc" : content_type === "image/png" ? "png" : "jpg"
      }], (error, url) => {
        if (error) {
          //alert(error);
        } else {
          // alert(url)
        }
      })
    } else {
      OpenFile.openDocBinaryinUrl([{
        url: image, // Local "file://" + filepathc
        fileName: "sample",
        fileType: content_type === "application/pdf" ? "pdf" : content_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "docx" : content_type === "application/msword" ? "doc" : content_type === "image/png" ? "png" : "jpg"
      }], (error, url) => {
        if (error) {
          console.error(error);
        } else {
          console.log(url)
        }
      })

    }
  }


  documentUpload = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
        //All type of Files DocumentPickerUtil.allFiles()
        //Only PDF DocumentPickerUtil.pdf()
        //Audio DocumentPickerUtil.audio()
        //Plain Text DocumentPickerUtil.plainText()
      },
      (error, res) => {
        let data = new FormData();
        data.append("myFiles", {
          name: res.fileName,
          type: res.type,
          uri: res.uri
        });
        data.append('user_id', this.props.user.id)
        data.append('group_id', this.props.navigation.state.params.id);
        data.append('user_name', this.props.user.first_name + " " + this.props.user.last_name);
        //this.props.dispatch(file_upload(data))
        fetch(`${API}${"users/upload"}`, {
          method: "POST",
          body: data
        })
          .then(response => response.json())
          .then(response => {
            let group_post = response.payload.filter((item) => item.group_id == this.props.navigation.state.params.id)
            this.setState({ data: this.groupPostArray(group_post) })
            this.props.dispatch(get_group_post())
           
          })
          .catch(error => {
            console.log("******************************8888upload error", error);
            alert("Upload failed!");
          });
      }
    );
  }

renderImage =(params1,params2)=> {
   var imageValue =null; 
   if(params2.content_type === "image/png" || params2.content_type ==="image/jpeg"){
     imageValue = (<Image source={{ uri:params1 }} style={{ alignSelf: 'stretch', flex: 1 }} resizeMode='cover' />)
   }
  return (imageValue)
 }


renderdocorpdf =  (params1, params2) => {
return(


  <View style={{
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  }}>

      <View style={{    
    borderRadius: 5,
    backgroundColor: '#97c163',
    padding: 10,
    width: 170,
    marginRight:10,
    marginLeft:10,
    marginBottom: -30,

    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
   }}>
        <Text style={{color:'darkgreen', fontWeight:'bold', fontSize: 17, marginRight: 2}}> {params2.user_name}</Text>
        <TouchableOpacity onPress={() => this.pdfView(params2.content_type,params1)} style={{ padding: 5 }}>
             <View style={{ height: 40}}>   
             {params2.content_type === "application/pdf" ? 
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/50/000000/pdf.png'}}/> 
         :
<Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/50/000000/ms-word.png'}}/> }
</View>
</TouchableOpacity>
<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
<Text>{params2.content_type === "application/pdf" ? "PDF": "DOC" }</Text>
<Text note style={{fontSize: 10, marginLeft:30}}>{ Moment(params2.time).format("MMM Do YY, h:mm a")}</Text> 

      </View>
      


      {/* <Image style={styles.userPic}
      source={{ uri: params2.user_image === '' ? 'https://cdn4.iconfinder.com/data/icons/women-avatars-set-1-dot-version/380/9-128.png' : `${API}${"users/picture/"}${params2.user_image }`}}/>           */}
       </View>
    

);

           


}

  cardImage = (params1,params2) => {
    return (
      <View style={styles.rightMsg} >

    <Container style={{height:180}}>
           <View style={styles.rightBlock1} >

                  <Text style={{color:'darkgreen', fontWeight:'bold', fontSize: 17}}>{params2.user_name}</Text>
               
            <TouchableOpacity onPress={() => this.pdfView(params2.content_type,params1)} style={{ padding: 5 }}>
             <View style={{ height: 140}}>   
            {this.renderImage(params1,params2)}             
             </View> 
            </TouchableOpacity>
            <Text note style={{fontSize: 10, marginLeft: 185}}>{ Moment(params2.time).format("MMM Do YY, h:mm a")}</Text>

           </View>

      </Container>
      {/* <Image style={styles.userPic}
      source={{ uri: params2.user_image === '' ? 'https://cdn4.iconfinder.com/data/icons/women-avatars-set-1-dot-version/380/9-128.png' : `${API}${"users/picture/"}${params2.user_image }`}}/>           */}
      </View>
    );
  }

renderTextMessage = ( item ) => {
    let inMessage = item.type === 'out';
    let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
    return (     
      <View style={styles.rightMsg} >
      <View style={styles.rightBlock} >
        <Text style={{color:'darkgreen', fontWeight:'bold', fontSize: 17, marginRight: 2}}> {item.user_name}</Text>
        <Text style={styles.rightTxt}>{item.title}</Text>
        <Text note style={{fontSize: 10, marginLeft: 100}}>{ Moment(item.time).format("MMM Do YY, h:mm a")}</Text>

      </View>
{/* 
      <Image style={styles.userPic}
      source={{ uri: item.user_image === '' ? 'https://cdn4.iconfinder.com/data/icons/women-avatars-set-1-dot-version/380/9-128.png' : `${API}${"users/picture/"}${item.user_image }`}}/>           */}
       </View>
    

     
   );
};

render() {
 
    return (
      
      // <View style={styles.container}>
    
      <ImageBackground style={styles.container} source={require("../images/chatbg.jpg")} > 
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          ref={(ref) => {
            this.ListView_Ref = ref;
          }}
          renderItem={(message) => {
            const item = message.item;
            let inMessage = item.type === 'in';
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            const image = item.image !== "text" ?  item.image : null
         return (
              <View key={item.message} style={[styles.item, itemStyle]}>
                {!inMessage && this.renderDate(item.date)}

                {item.image === "text" ? this.renderTextMessage(item):
               item.content_type === "image/png" || item.content_type === "image/jpeg" ?
                this.cardImage(`${API}${"users/picture/"}${image}`,item) :   
               this.renderdocorpdf(`${API}${"users/picture/"}${image}`,item) }

                {inMessage && this.renderDate(item.date)}
              </View>
            )
          }} />
          
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              value={this.state.textMessage}
              placeholder="Write a message..."
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ textMessage: text })} />
          </View>

          <TouchableOpacity onPress={() => this.documentUpload()} style={styles.btnSend}>
          <Icon name='md-attach' style={{color:'white'}} />         
          </TouchableOpacity>
          <View style={{ width: 5 }}></View>
          {this.state.textMessage !== null && this.state.textMessage !== "" && this.state.textMessage !== undefined ? (
            <TouchableOpacity onPress={() => this.textUpload()} style={styles.btnSend}>
            <Image source={{ uri: "https://png.icons8.com/small/75/ffffff/filled-sent.png" }} style={styles.iconSend} />
            </TouchableOpacity>) : null}
        </View>
        <DropdownAlert ref={ref => this.dropdown = ref} updateStatusBar={false} closeInterval={3000} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.sessionReducer.user,
    group_post: state.groupPostReducer.group_post,
  };
}
export default connect(mapStateToProps)(GoToGroup);


const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
 
  rightBlock1: {
    borderRadius: 5,
    backgroundColor: '#97c163',
    padding: 10,
    
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 230,
    borderRadius: 5,
    backgroundColor: '#97c163',
    padding: 10,
    marginBottom: -30,

    marginRight:10,
    marginLeft:10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    alignSelf:'center',
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    // backgroundColor: 'green',
    paddingHorizontal: 10,
    padding: 10,
  },
  btnSend: {
    //backgroundColor:"#00BFFF",
    width: 40,
    height: 40,
    //borderRadius:360,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon:{
    width:35,
    height:35,
    justifyContent: 'center',
  }, 
  itemIn: {
    alignSelf: 'flex-start',
    alignItems:'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end',
    alignItems:'flex-end'

  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  imageStyle: {

  },

});  
 
