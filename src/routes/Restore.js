import React, { Component } from 'react';
import { Text, Image, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default class Restore extends Component {

  constructor() {
    super();
    this.state = {
      login: null
    }
  }

  async openTickets() {
    try {
      await InAppBrowser.isAvailable()
      InAppBrowser.open('https://spcs.me/registration/tickets/login/', {
        showTitle: true,
        toolbarColor: '#28284c',
        secondaryToolbarColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      }).then((result) => {
        Alert.alert(JSON.stringify(result))
      })
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  userRestore() {
    alert(this.state.login);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <Image style={styles.logo}
            source={require('../images/logo.png')} />
        </View>
        <TextInput style={styles.inputBox}
          editable={true}
          onChangeText={(login) => this.setState({ login })}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Ваш телефон, E-mail или ник"
          selectionColor="#fff"
          placeholderTextColor="#ffffff"
          value={this.state.login}
        />
        <TouchableOpacity style={styles.button} onPress={this.userRestore.bind(this)}>
          <Text style={styles.buttonText}>Продолжить</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Если вы потеряли доступ к своему номеру или E-mail, обратитесь в <Text onPress={this.openTickets} style={styles.signupButton}>Службу тех. поддержки.</Text></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#28284c',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    width: 300,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },
  viewLogo: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 54,
    marginBottom: 10
  },
  inputBox: {
    width: 300,
    backgroundColor: '#3c3c72',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: '#61a961',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});