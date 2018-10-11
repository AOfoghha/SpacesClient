import React, { Component } from 'react';
import { AsyncStorage, Text, Image, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Serialize, Loader } from '../api';

export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			loading: false,
			login: null,
			password: null
		}
	}

	render() {
		const { container, viewLogo, logo, inputBox, button, buttonText, signupTextSocial, signupText, signupSocialButtom, signupButton, signupTextCont, vk, ok, mail, fb } = styles;
		return (
			<View style={container}>
				<Loader
					loading={this.state.loading} />
				<View style={viewLogo}>
					<Image style={logo}
						source={require('../images/logo.png')} />
				</View>
				<TextInput style={inputBox}
					editable={true}
					onChangeText={(login) => this.setState({ login })}
					ref='login'
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder="Телефон, E-mail, ник"
					selectionColor="#fff"
					placeholderTextColor="#ffffff"
					value={this.state.login}
					onSubmitEditing={() => this.password.focus()}
				/>
				<TextInput style={inputBox}
					editable={true}
					onChangeText={(password) => this.setState({ password })}
					ref='password'
					secureTextEntry={true}
					underlineColorAndroid='rgba(0,0,0,0)'
					placeholder="Введите пароль"
					secureTextEntry={true}
					placeholderTextColor="#ffffff"
					value={this.state.password}
					ref={(input) => this.password = input}
				/>
				<TouchableOpacity style={button} onPress={this.userLogin}>
					<Text style={buttonText}>Войти</Text>
				</TouchableOpacity>
				<View style={signupTextSocial}>
					<Text style={signupText}>Или войдите через соц. сеть</Text>
				</View>
				<View style={signupSocialButtom}>
					<TouchableOpacity style={vk} onPress={this.userLogin}>
						<Icon name="vk" size={18} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={ok} onPress={this.userLogin}>
						<Icon name="odnoklassniki" size={18} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={mail} onPress={this.userLogin}>
						<Icon name="at" size={18} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={fb} onPress={this.userLogin}>
						<Icon name="facebook" size={18} color="#fff" />
					</TouchableOpacity>
				</View>
				<View style={signupTextSocial}>
					<TouchableOpacity onPress={this.signup} onPress={() => Actions.Restore()}>
						<Text style={signupButton}>Забыли ник или пароль?</Text>
					</TouchableOpacity>
				</View>
				<View style={signupTextCont}>
					<Text style={signupText}>Нет учетной записи?</Text>
					<TouchableOpacity onPress={() => Actions.Signup()}><Text style={signupButton}> Регистрация</Text></TouchableOpacity>
				</View>
			</View>
		);
	}
	userLogin = () => {
		if (this.state.login && this.state.password) {
			this.setState({
				loading: true
			});
			fetch('https://spcs.me/neoapi/session', {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
					'X-Proxy': 'spaces',
					'Cookie': 'json=1'
				},
				body: Serialize({
					'login': this.state.login,
					'password': this.state.password,
					'method': 'login',
					'rid': 'APA91bFwsPw4clF4y0RHWtg6Y4fC6UnxcrmZYLiko_ifv-8g7Qi-5koV4GRaVax5zMWTMke9eUF-MzHhzdM9iYQEFDff5lnHuMlwIl-zNAu4MfYS4PlL0j8C28XZgNJmQbRSd1BE4eSW'
				})
			})
				.then((response) => response.json())
				.then((data) => {
					this.setState({
						loading: false
					});
					if (data.code == "00000") {
						AsyncStorage.setItem('sid', data.attributes.sid);
						Actions.Home();
					} else if (data.code == "01003") {
						Alert.alert('Spaces', 'Неверный логин или пароль.');
					} else if (data.code == "00003") {
						Alert.alert('Spaces', 'Пользователь не найден.');
					} else if (data.code == "00001") {
						Alert.alert('Spaces', 'Сработала капча.');
					} else {
						alert(JSON.stringify(data));
					}
				})
				.catch((error) => {
					Alert.alert('Spaces', error);
				})
				.done();
		} else {
			Alert.alert('Spaces', 'Вы не ввели логин или пароль!');
		}
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
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical: 16,
		flexDirection: 'row'
	},
	signupTextSocial: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingVertical: 10,
		flexDirection: 'row'
	},
	signupSocialButtom: {
		width: 300,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	signupText: {
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
	vk: {
		alignItems: 'center',
		width: 48,
		backgroundColor: '#54769a',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	ok: {
		alignItems: 'center',
		width: 48,
		backgroundColor: '#ffaa00',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	mail: {
		alignItems: 'center',
		width: 48,
		backgroundColor: '#168de2',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	fb: {
		alignItems: 'center',
		width: 48,
		backgroundColor: '#43609c',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
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