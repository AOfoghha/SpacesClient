import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './routes/Login';
import Register from './routes/Register';
import Restore from './routes/Restore';
import Home from './routes/Home';

export default class Routes extends Component {

  constructor() {
    super();
    this.state = {
      sid: false,
      loading: false
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.getItem('sid').then((token) => {
      if (token !== null) {
        this.setState({
          sid: true,
          loading: true
        });
      } else {
        this.setState({
          sid: false,
          loading: true
        });
      }
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="rgba(255,255,255,0.6)" />
        </View>
      )
    } else {
      return (
        <Router navigationBarStyle={{ backgroundColor: '#28284c' }} titleStyle={{ color: '#fff' }} tintColor='#fff'>
          <Stack key="root" hideNavBar={false}>
            <Scene key="Login" component={Login} title="Вход" initial={!this.state.sid} />
            <Scene key="Register" component={Register} title="Регистрация" />
            <Scene key="Restore" component={Restore} title="Забыли ник или пароль?" />
            <Scene key="Home" component={Home} title="Главная" initial={this.state.sid} />
          </Stack>
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