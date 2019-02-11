import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, NativeModules, Linking } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { AppInstalledChecker } from 'react-native-check-app-install';

const { CustomInstagramShare } = NativeModules;

class App extends Component {
  openGallery = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.shareImage(response.path);
      }
    });
  }

  shareImage = (imagePath) => {
    AppInstalledChecker.isAppInstalled('instagram').then((isInstalled) => {
        if (isInstalled) {
          if (Platform.OS === 'ios') {
            Linking.openURL(`instagram://library?AssetPath=${imagePath}`);
          } else {
            CustomInstagramShare.shareWithInstagram(imagePath, (result) => {
              alert(result);
            });
          }
        } else {
          alert('O instagram não está instalado no dispositivo');
        }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.openGallery}>
          <Text style={styles.welcome}>Escolher imagem</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    padding: 10,
  },
  welcome: {
    color: '#DDD',
    fontSize: 20,
  },
});

export default App;
