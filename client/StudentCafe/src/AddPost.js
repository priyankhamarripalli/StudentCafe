import React, { Component } from 'react';

import { StyleSheet, View, Modal, Text, Button, Platform, TextInput, Alert} from 'react-native';

export default class Mynewproject extends Component {
 
  constructor(props) {
 
    super(props);
 
    this.state = { 
        
        ModalVisibleStatus: false 
    };
    constructor(props) 
    {
      super(props);
      this.state = {
        text: 'Write Something Here...',
      };
    }
  }
 
  ShowModalFunction(visible) {
 
    this.setState({ModalVisibleStatus: visible});
    
  }
 
 render() {
   return (
 
      <View style={styles.MainContainer}>
       <View style={styles.buttonContainer}>
    <Button 
  title="Add Picture"
/>
<Button 
  title="Upload"
/>
</View>
      <View style={styles.textAreaContainer} >
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholder="Type something"
      placeholderTextColor="grey"
      numberOfLines={10}
      multiline={true}
    />
      </View>
         
        <Button onPress={() => { this.ShowModalFunction(true) }} title="ADD POST " onPress={() => {Alert.alert('Post Added Succesfully');}} />
 
      </View>

           
   );
 }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
  
flex:1,
justifyContent: 'center',
alignItems: 'center',
marginTop: (Platform.OS == 'ios') ? 20 : 0
 
},

ModalInsideView:{
 
  justifyContent: 'center',
  alignItems: 'center', 
  backgroundColor : "#00BCD4", 
  height: 300 ,
  width: '90%',
  borderRadius:10,
  borderWidth: 1,
  borderColor: '#fff'
 
},
buttonContainer: {
  backgroundColor: '#2E9298',
  borderRadius: 10,
  padding: 10,
  flexDirection: 'row',
  },
  
textAreaContainer: {
  borderColor: '#000000',
  borderWidth: 1,
  padding: 5,
  marginBottom: 10,
  marginTop: 10,
  
},
textArea: {
  height: 200,
  width: 300,
  marginTop: 5,
  marginBottom: 10,

  justifyContent: "flex-start"
},
 
TextStyle:{
 
  fontSize: 20, 
  marginBottom: 20, 
  color: "#fff",
  padding: 20,
  textAlign: 'center'
 
}
 
});