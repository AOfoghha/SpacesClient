import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View, StyleSheet, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './routes/Login';
import Register from './routes/Register';
import Restore from './routes/Restore';
//import Home from './routes/Home';
import Mail from './routes/Mail';
import Journal from './routes/Journal';
import Lenta from './routes/Lenta';
import Profile from './routes/Profile';

class TabIcon extends Component {
  render() {
    return (
      <View style={styles.Tabs}>
        <Icon style={{color: '#fff'}} name={this.props.iconName} size={24}/>
        <Text style={{color: '#fff', fontSize: 12}}>{this.props.title}</Text>
      </View>
    );
  }
}

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
          <Stack key="root" hideNavBar={true}>
            <Scene key="Login"
              component={Login}
              title="Вход"
              initial={!this.state.sid} />
            <Scene key="Register"
              component={Register}
              title="Регистрация" />
            <Scene key="Restore"
              component={Restore}
              title="Забыли ник или пароль?" />
            <Scene key="tabbar"
              tabs={true}
              tabBarStyle={styles.TabBar}
              hideNavBar={true}
              showLabel={false}
              backToInitial={false}
              activeBackgroundColor={'#3c3c72'}
              inactiveBackgroundColor={'#28284c'}
              initial={this.state.sid}>
              <Scene key="Mail"
                title="Почта"
                iconName="email"
                icon={TabIcon}
                component={Mail}
              />
              <Scene key="Journal"
                title="Журнал"
                iconName="forum"
                icon={TabIcon}
                component={Journal}
              />
              <Scene key="Lenta"
                title="Лента"
                iconName="newspaper"
                icon={TabIcon}
                component={Lenta} />
              <Scene key="Profile"
                title="Профиль"
                iconName="account-circle"
                icon={TabIcon}
                component={Profile}
                initial />
            </Scene>
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
  },
  TabBar: {
    backgroundColor: '#ffffff'
  },
  Tabs: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});