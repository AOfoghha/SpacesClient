import React, { Component } from 'react';
import { AsyncStorage, Text, Image, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import Orientation from 'react-native-orientation-locker';
//import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Serialize, Loader } from '../api';

export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			loading: false,
			login: "molimawka228",
			password: "hujpizda133",
			captchaUrl: null,
			captchaValue: null,
			captcha: false
		}
	}

	toggleModal = () => {
		this.setState({ captcha: !this.state.captcha });
	};

	render() {
		Orientation.lockToPortrait();
		const { container, viewLogo, logo, inputBox, button, buttonText, signupTextSocial, signupText, signupSocialButtom, signupButton, signupTextCont, vk, ok, mail, fb } = styles;
		return (
			<>
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
							<Icon name="vk" size={22} color="#fff" />
						</TouchableOpacity>
						<TouchableOpacity style={ok} onPress={this.userLogin}>
							<Icon name="odnoklassniki" size={22} color="#fff" />
						</TouchableOpacity>
						<TouchableOpacity style={mail} onPress={this.userLogin}>
							<Icon name="mail-ru" size={22} color="#fff" />
						</TouchableOpacity>
						<TouchableOpacity style={fb} onPress={this.userLogin}>
							<Icon name="facebook" size={22} color="#fff" />
						</TouchableOpacity>
					</View>
					<View style={signupTextSocial}>
						<TouchableOpacity onPress={this.signup} onPress={() => Actions.Restore()}>
							<Text style={signupButton}>Забыли ник или пароль?</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => Actions.Debug()}><Text style={signupButton}>Отладка</Text></TouchableOpacity>
					<View style={signupTextCont}>
						<Text style={signupText}>Нет учетной записи?</Text>
						<TouchableOpacity onPress={() => Actions.Register()}><Text style={signupButton}> Регистрация</Text></TouchableOpacity>
					</View>
				</View>
				<Modal isVisible={this.state.captcha} onBackButtonPress={this.toggleModal} style={{ alignItems: 'center', backgroundColor: "#28284c", margin: 0 }}>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 300 }}>
						<Image
							style={{ width: 100, height: 50, borderRadius: 1, marginBottom: 10 }}
							source={{ uri: this.state.captchaUrl }} />
						<TextInput style={inputBox}
							editable={true}
							onChangeText={(captchaValue) => this.setState({ captchaValue })}
							ref='captcha'
							keyboardType='numeric'
							maxLength={4}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Введите код с картинки"
							selectionColor="#fff"
							placeholderTextColor="#ffffff"
							value={this.state.captchaValue}
						/>
						<TouchableOpacity style={button} onPress={this.sendCaptcha}>
							<Text style={buttonText}>Я не робот</Text>
						</TouchableOpacity>
					</View>
					<View style={signupTextCont}>
						<Text style={signupText}>Не видно капчу?</Text>
						<TouchableOpacity onPress={this.updateCaptcha}><Text style={signupButton}> Нажмите, чтобы обновить</Text></TouchableOpacity>
					</View>
				</Modal>
			</>
		);
	}

	sendCaptcha = () => {
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
				'code': this.state.captchaValue,
				'method': 'login'
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.code == "00000") {
					AsyncStorage.setItem('sid', data.attributes.sid);
					AsyncStorage.setItem('csrf', data.attributes.CK);
					AsyncStorage.setItem('ws', data.attributes.channel_id);
					Actions.Profile();
					this.setState({ captcha: !this.state.captcha });
				} else if (data.code == "01003") {
					Alert.alert('Spaces', 'Неверный логин или пароль.');
				} else if (data.code == "00003") {
					Alert.alert('Spaces', 'Пользователь не найден.');
				} else if (data.code == "00004") {
					this.updateCaptcha();
					Alert.alert('Spaces', 'Неверный код!');
				} else if (data.code == "00001") {
					this.setState({ captchaUrl: data.captcha_url, captchaValue: null });
				} else {
					alert(JSON.stringify(data));
				}
				this.setState({
					loading: false
				});
			})
			.catch((error) => {
				Alert.alert('Spaces', error);
			}).done();
	}

	updateCaptcha = () => {
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
				'method': 'login'
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.code == "00000") {
					AsyncStorage.setItem('sid', data.attributes.sid);
					AsyncStorage.setItem('csrf', data.attributes.CK);
					AsyncStorage.setItem('ws', data.attributes.channel_id);
					Actions.Profile();
				} else if (data.code == "01003") {
					Alert.alert('Spaces', 'Неверный логин или пароль.');
				} else if (data.code == "00003") {
					Alert.alert('Spaces', 'Пользователь не найден.');
				} else if (data.code == "00001") {
					this.setState({ captchaUrl: data.captcha_url, captchaValue: null });
					console.log(data);
				} else {
					alert(JSON.stringify(data));
				}
				this.setState({
					loading: false
				});
			})
			.catch((error) => {
				Alert.alert('Spaces', error);
			}).done();
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
					'method': 'login'
				})
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.code == "00000") {
						AsyncStorage.setItem('sid', data.attributes.sid);
						AsyncStorage.setItem('csrf', data.attributes.CK);
						AsyncStorage.setItem('ws', data.attributes.channel_id);
						Actions.Profile();
					} else if (data.code == "01003") {
						Alert.alert('Spaces', 'Неверный логин или пароль.');
					} else if (data.code == "00003") {
						Alert.alert('Spaces', 'Пользователь не найден.');
					} else if (data.code == "00001") {
						this.setState({ captchaUrl: data.captcha_url, captcha: !this.state.captcha, captchaValue: null });
					} else {
						alert(JSON.stringify(data));
					}
					this.setState({
						loading: false
					});
				})
				.catch((error) => {
					Alert.alert('Spaces', error);
				}).done();
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
		width: 52,
		backgroundColor: '#54769a',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	ok: {
		alignItems: 'center',
		width: 52,
		backgroundColor: '#ffaa00',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	mail: {
		alignItems: 'center',
		width: 52,
		backgroundColor: '#168de2',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	fb: {
		alignItems: 'center',
		width: 52,
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