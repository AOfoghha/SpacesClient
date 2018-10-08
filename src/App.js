import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Router, Scene } from 'react-native-router-flux';
import Authentication from './routes/Authentication';
import Restore from './routes/Restore';
import Registration from './routes/Registration';
import HomePage from './routes/HomePage';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      hasToken: false,
      isLoaded: false
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.getItem('sid').then((token) => {
      if (token !== null) {
        this.setState({
          hasToken: true,
          isLoaded: true
        });
      } else {
        this.setState({
          hasToken: false,
          isLoaded: true
        });
      }
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style={styles.indicator} size="large" color="rgba(255,255,255,0.6)" />
        </View>
      )
    } else {
      return (
        <Router navigationBarStyle={{ backgroundColor: '#28284c' }} titleStyle={{ color: '#fff' }} tintColor='#fff'>
          <Scene key="root">
            <Scene
              component={Authentication}
              hideNavBar={false}
              initial={!this.state.hasToken}
              key="Authentication"
              title="Вход"
            />
            <Scene
              component={Restore}
              hideNavBar={false}
              key="Restore"
              title="Забыли ник или пароль?"
            />
            <Scene
              component={Registration}
              hideNavBar={false}
              key="Registration"
              title="Регистрация"
            />
            <Scene
              left={() => null}
              component={HomePage}
              hideNavBar={false}
              initial={this.state.hasToken}
              key="HomePage"
              title="Главная"
            />
          </Scene>
        </Router>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28284c'
  }
});