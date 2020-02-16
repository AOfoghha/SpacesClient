import React, { Component } from 'react';
import { AsyncStorage, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Serialize } from '../api';

export default class Profile extends Component {

	constructor() {
		super();
		this.state = {
			sid: null
		}
	}

	async componentDidMount() {
		try {
			const value = await AsyncStorage.getItem('sid');
			if (value !== null) {
				this.setState({ sid: value })
			}
		} catch (error) {
			alert(error);
		}
	}

	userCheck() {
		AsyncStorage.getItem('sid').then((token) => {
			fetch('https://spcs.me/neoapi/session', {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
					'X-Proxy': 'spaces',
					'Cookie': 'json=1; sid=' + token
				},
				body: Serialize({
					'method': 'check',
					'rid': 'APA91bFwsPw4clF4y0RHWtg6Y4fC6UnxcrmZYLiko_ifv-8g7Qi-5koV4GRaVax5zMWTMke9eUF-MzHhzdM9iYQEFDff5lnHuMlwIl-zNAu4MfYS4PlL0j8C28XZgNJmQbRSd1BE4eSW'
				})
			})
			.then((response) => response.json())
			.then((data) => {
				alert(JSON.stringify(data));
			});
		})
	}

	userLogout() {
		AsyncStorage.getItem('sid').then((token) => {
			fetch('https://spcs.me/neoapi/session', {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
					'X-Proxy': 'spaces',
					'Cookie': 'json=1; sid=' + token
				},
				body: Serialize({
					'method': 'logout',
					'rid': 'APA91bFwsPw4clF4y0RHWtg6Y4fC6UnxcrmZYLiko_ifv-8g7Qi-5koV4GRaVax5zMWTMke9eUF-MzHhzdM9iYQEFDff5lnHuMlwIl-zNAu4MfYS4PlL0j8C28XZgNJmQbRSd1BE4eSW'
				})
			})
			.then((response) => response.json())
			.then((data) => {
				AsyncStorage.removeItem('sid');
				alert(JSON.stringify(data));
				Actions.Login();
			});
		})
	}

	render() {
		const { container, checkSession, logOut, buttonText } = styles;
		return (
			<View style={container}>
				<TouchableOpacity style={checkSession} onPress={this.userCheck}>
					<Text style={buttonText}>Проверить сессию</Text>
				</TouchableOpacity>
				<TouchableOpacity style={logOut} onPress={this.userLogout}>
					<Text style={buttonText}>Выйти</Text>
				</TouchableOpacity>
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