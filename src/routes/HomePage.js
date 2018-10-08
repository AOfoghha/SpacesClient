import React, { Component } from 'react';
import { AsyncStorage, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

var serializeJSON = function (data) {
	return Object.keys(data).map(function (keyName) {
		return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
	}).join('&');
}

export default class HomePage extends Component {

	userCheck() {
		AsyncStorage.getItem('sid').then((token) => {
			axios('http://spcs.me/neoapi/session', {
				method: 'POST',
				headers: {
					'X-Proxy': 'spaces',
					'Cookie': 'json=1'
				},
				body: serializeJSON({
					method: 'check',
					rid: 'APA91bFwsPw4clF4y0RHWtg6Y4fC6UnxcrmZYLiko_ifv-8g7Qi-5koV4GRaVax5zMWTMke9eUF-MzHhzdM9iYQEFDff5lnHuMlwIl-zNAu4MfYS4PlL0j8C28XZgNJmQbRSd1BE4eSW'
				})
			})
				.then((response) => {
					alert(JSON.stringify(response.data));
				})
				.done();
		})
	}

	userLogout() {
		axios('http://spcs.me/neoapi/session', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-Proxy': 'spaces',
				'Cookie': 'json=1'
			},
			body: serializeJSON({
				method: 'logout',
				rid: 'APA91bFwsPw4clF4y0RHWtg6Y4fC6UnxcrmZYLiko_ifv-8g7Qi-5koV4GRaVax5zMWTMke9eUF-MzHhzdM9iYQEFDff5lnHuMlwIl-zNAu4MfYS4PlL0j8C28XZgNJmQbRSd1BE4eSW'
			})
		})
			.then((response) => {
				AsyncStorage.removeItem('sid');
				alert(JSON.stringify(response.data)),
					Actions.Authentication();
			})
			.done();
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.checkSession} onPress={this.userCheck}>
					<Text style={styles.buttonText}>Проверить сессию</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.logOut} onPress={this.userLogout}>
					<Text style={styles.buttonText}>Выйти</Text>
				</TouchableOpacity>
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
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
		textAlign: 'center'
	},
	checkSession: {
		width: 300,
		backgroundColor: '#108210',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 13
	},
	logOut: {
		width: 300,
		backgroundColor: '#B62832',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 13
	}
});