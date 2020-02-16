import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import { Loader } from '../api';

export default class Journal extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      sid: null
    }
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('sid');
      if (value !== null) {
        this.setState({ sid: value })
        this.fetchJournal();
      }
    } catch (error) {
      alert(error);
    }
  }

  fetchJournal() {
    AsyncStorage.getItem('sid').then((token) => {
      this.setState({
        loading: true
      });
      fetch('http://spcs.me/journal/', {
        method: 'POST',
        headers: {
          'X-Proxy': 'spaces',
          'Cookie': 'json=1; sid=' + token
        }
      })
      .then((response) => response.json())
      .then((data) => {
        alert(JSON.stringify(data));
        this.setState({
          loading: false
        });
      });
    })
  }

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Loader
          loading={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});