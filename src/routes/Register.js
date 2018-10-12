import React, { Component } from 'react';
import { Text, Image, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Register extends Component {

	constructor() {
		super();
		this.state = {
			login: null
		}
	}

	async openRules() {
		try {
			await InAppBrowser.isAvailable()
			InAppBrowser.open('https://spcs.me/info/rules/', {
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

	userRegistration() {
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
					placeholder="Введите ваш E-mail или телефон"
					selectionColor="#fff"
					placeholderTextColor="#ffffff"
					value={this.state.login}
				/>
				<TouchableOpacity style={styles.button} onPress={this.userRegistration.bind(this)}>
					<Text style={styles.buttonText}>Продолжить</Text>
				</TouchableOpacity>
				<View style={styles.signupTextSocial}>
					<Text style={styles.signupText}>Или войдите через соц. сеть</Text>
				</View>
				<View style={styles.signupSocialButtom}>
					<TouchableOpacity style={styles.vk} onPress={this.userLogin}>
						<Icon name="vk" size={22} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.ok} onPress={this.userLogin}>
						<Icon name="odnoklassniki" size={22} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.mail} onPress={this.userLogin}>
						<Icon name="mail-ru" size={22} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.fb} onPress={this.userLogin}>
						<Icon name="facebook" size={22} color="#fff" />
					</TouchableOpacity>
				</View>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Регистрируясь, вы соглашаетесь с <Text onPress={this.openRules} style={styles.signupButton}>правилами сайта.</Text></Text>
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
	signupTextSocial: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingVertical: 16,
		flexDirection: 'row'
	},
	signupSocialButtom: {
		width: 300,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
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