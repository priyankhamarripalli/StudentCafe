import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import {
  Platform
} from 'react-native';
var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  quality: 0.8
};

let pick = (cb) => {
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
//alert('User cancelled image picker');
      cb(null, null);
    }
    else if (response.error) {
     //alert('ImagePicker Error: ', response.error);
     cb(null, null);
    }
    else if (response.customButton) {
      //('User tapped custom button: ', response.customButton);
      cb(null, null);
    }
    else {
      let source = { uri: response.uri };
      let { data, ...rest } = response;
      let compressionFormatValue = 'JPEG'
      // alert(JSON.stringify(rest))
      if (response.uri.match(/.(jpg|jpeg)$/i)){
        compressionFormatValue = 'JPEG'
      } else if (response.uri.match(/.(png)$/i)){
        compressionFormatValue = 'PNG'
      }
      
      ImageResizer.createResizedImage(response.uri, 1000, 1000, compressionFormatValue, 75)
        .then(async({ uri, path, size }) => {
          let fetchDataFileName = (uri).split("/");
          let dataFileName = response.fileName !== undefined ? response.fileName : (fetchDataFileName.length > 0 ? fetchDataFileName[(fetchDataFileName.length - 1)] : "image.jpg")
          let imagePath = Platform.OS === 'android' ? `file://${RNFS.DocumentDirectoryPath}` : `${RNFS.DocumentDirectoryPath}`;
          let newPath =  `${imagePath}/${dataFileName}` ;
          await RNFS.moveFile(uri,newPath)
          let uriObj = {};
          uriObj.uri = newPath;
          let responseObj = {};
          responseObj.uri = newPath;
          responseObj.path = newPath;
          responseObj.fileName = dataFileName;
          responseObj.type = response.type;

          cb(uriObj, responseObj);
        })
        .catch(err => {
          cb(source, response);
        });
        
      // cb(source, response);
    }
  });
}

module.exports = pick;
