import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View, StyleSheet, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './routes/Login';
import Register from './routes/Register';
import Restore from './routes/Restore';
import Mail from './routes/Mail';
import Journal from './routes/Journal';
import Lenta from './routes/Lenta';
import Profile from './routes/Profile';
import Debug from './routes/Debug'
import { Serialize } from './api';
import ws from './api/ws';

class TabIcon extends Component {
  render() {
    return (
      <View style={styles.Tabs}>
        <Icon style={{ color: '#fff' }} name={this.props.iconName} size={22} />
        {
          this.props.notificationCount > 0 ?
            <View style={styles.Badge}>
              <Text style={styles.Counter}>{this.props.notificationCount}</Text>
            </View> : null
        }
        <Text style={styles.textTab}>{this.props.title}</Text>
      </View>
    );
  }
}

export default class Routes extends Component {

  constructor() {
    super();
    this.state = {
      sid: null,
      loading: false,
      mail: null,
      lenta: null,
      journal: null
    }
  }

  checkCounters = () => {
    AsyncStorage.getItem('sid').then((token) => {
      fetch('https://spcs.me/neoapi/common', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Proxy': 'spaces',
          'Cookie': 'json=1; sid=' + token
        },
        body: Serialize({
          'method': 'getTopCounts'
        })
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          mail: data["3"],
          lenta: data["2"],
          journal: data["1"]
        });
      });
    })
  }

  webSocket = () => {
    AsyncStorage.getItem('ws').then((channel_id) => {
      var json = {
        url: "wss://lp03.spcs.me/ws/" + channel_id,
        onOpen: function () {
          console.log("[LP] start connecting, time: ", (new Date).toUTCString());
        },
        onMessage: function (e) {
          console.log('[LP] onMessage, time: ', (new Date).toUTCString());
          console.log(e);
        }
      }
      ws.init(json)
      ws.on(this, 24, function (data) {
        console.log('[LP] on 24, time: ', (new Date).toUTCString());
        console.log(data)
      })
      ws.on(this, 21, function (data) {
        console.log('[LP] on 21, time: ', (new Date).toUTCString());
        console.log(data)
        this.checkCounters()
      })
    });
  }

  componentDidMount() {
    //this.checkCounters();
    this.checkCounters();
    this.webSocket();
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
            <Scene key="Debug"
              component={Debug}
              title="Spaces Debugger" />
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
                notificationCount={this.state.mail}
              />
              <Scene key="Journal"
                title="Журнал"
                iconName="forum"
                icon={TabIcon}
                component={Journal}
                notificationCount={this.state.jornal}
              />
              <Scene key="Lenta"
                title="Лента"
                iconName="newspaper"
                icon={TabIcon}
                component={Lenta}
                notificationCount={this.state.lenta}
              />
              <Scene key="Profile"
                title="Профиль"
                iconName="account-circle"
                icon={TabIcon}
                component={Profile}
                initial
              />
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
  },
  textTab: {
    color: '#fff',
    fontSize: 12
  },
  Badge: {
    position: 'absolute',
    right: -1,
    top: 2,
    backgroundColor: 'red',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Counter: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold'
  }
});