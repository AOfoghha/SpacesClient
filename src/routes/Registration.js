import React, { Component } from 'react';
import { AsyncStorage, Text, Image, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Svg, { Path } from 'react-native-svg';

export default class Registration extends Component {

	constructor() {
		super();
		this.state = {
			login: null
		}
	}

	async onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
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
					<TouchableOpacity style={styles.vk} onPress={this.userRegistration.bind(this)}>
						<Svg width="44" height="18" viewBox="0 0 1792 1792">
							<Path d="M1981 520q23 64-150 294-24 32-65 85-40 51-55 72t-30.5 49.5-12 42 13 34.5 32.5 43 57 53q4 2 5 4 141 131 191 221 3 5 6.5 12.5t7 26.5-.5 34-25 27.5-59 12.5l-256 4q-24 5-56-5t-52-22l-20-12q-30-21-70-64t-68.5-77.5-61-58-56.5-15.5q-3 1-8 3.5t-17 14.5-21.5 29.5-17 52-6.5 77.5q0 15-3.5 27.5t-7.5 18.5l-4 5q-18 19-53 22h-115q-71 4-146-16.5t-131.5-53-103-66-70.5-57.5l-25-24q-10-10-27.5-30t-71.5-91-106-151-122.5-211-130.5-272q-6-16-6-27t3-16l4-6q15-19 57-19l274-2q12 2 23 6.5t16 8.5l5 3q16 11 24 32 20 50 46 103.5t41 81.5l16 29q29 60 56 104t48.5 68.5 41.5 38.5 34 14 27-5q2-1 5-5t12-22 13.5-47 9.5-81 0-125q-2-40-9-73t-14-46l-6-12q-25-34-85-43-13-2 5-24 16-19 38-30 53-26 239-24 82 1 135 13 20 5 33.5 13.5t20.5 24 10.5 32 3.5 45.5-1 55-2.5 70.5-1.5 82.5q0 11-1 42t-.5 48 3.5 40.5 11.5 39 22.5 24.5q8 2 17 4t26-11 38-34.5 52-67 68-107.5q60-104 107-225 4-10 10-17.5t11-10.5l4-3 5-2.5 13-3 20-.5 288-2q39-5 64 2.5t31 16.5z" fill="#fff" />
						</Svg>
					</TouchableOpacity>
					<TouchableOpacity style={styles.ok} onPress={this.userRegistration.bind(this)}>
						<Svg width="48" height="18" viewBox="0 0 1792 1792">
							<Path d="M896 907q-188 0-321-133t-133-320q0-188 133-321t321-133 321 133 133 321q0 187-133 320t-321 133zm0-677q-92 0-157.5 65.5t-65.5 158.5q0 92 65.5 157.5t157.5 65.5 157.5-65.5 65.5-157.5q0-93-65.5-158.5t-157.5-65.5zm523 732q13 27 15 49.5t-4.5 40.5-26.5 38.5-42.5 37-61.5 41.5q-115 73-315 94l73 72 267 267q30 31 30 74t-30 73l-12 13q-31 30-74 30t-74-30q-67-68-267-268l-267 268q-31 30-74 30t-73-30l-12-13q-31-30-31-73t31-74l267-267 72-72q-203-21-317-94-39-25-61.5-41.5t-42.5-37-26.5-38.5-4.5-40.5 15-49.5q10-20 28-35t42-22 56 2 65 35q5 4 15 11t43 24.5 69 30.5 92 24 113 11q91 0 174-25.5t120-50.5l38-25q33-26 65-35t56-2 42 22 28 35z" fill="#fff" />
						</Svg>
					</TouchableOpacity>
					<TouchableOpacity style={styles.mail} onPress={this.userRegistration.bind(this)}>
						<Svg width="47" height="18" viewBox="0 0 1792 1792">
							<Path d="M1100 775q0-108-53.5-169t-147.5-61q-63 0-124 30.5t-110 84.5-79.5 137-30.5 180q0 112 53.5 173t150.5 61q96 0 176-66.5t122.5-166 42.5-203.5zm564 121q0 111-37 197t-98.5 135-131.5 74.5-145 27.5q-6 0-15.5.5t-16.5.5q-95 0-142-53-28-33-33-83-52 66-131.5 110t-173.5 44q-161 0-249.5-95.5t-88.5-269.5q0-157 66-290t179-210.5 246-77.5q87 0 155 35.5t106 99.5l2-19 11-56q1-6 5.5-12t9.5-6h118q5 0 13 11 5 5 3 16l-120 614q-5 24-5 48 0 39 12.5 52t44.5 13q28-1 57-5.5t73-24 77-50 57-89.5 24-137q0-292-174-466t-466-174q-130 0-248.5 51t-204 136.5-136.5 204-51 248.5 51 248.5 136.5 204 204 136.5 248.5 51q228 0 405-144 11-9 24-8t21 12l41 49q8 12 7 24-2 13-12 22-102 83-227.5 128t-258.5 45q-156 0-298-61t-245-164-164-245-61-298 61-298 164-245 245-164 298-61q344 0 556 212t212 556z" fill="#fff" />
						</Svg>
					</TouchableOpacity>
					<TouchableOpacity style={styles.fb} onPress={this.userRegistration.bind(this)}>
						<Svg width="48" height="18" viewBox="0 0 1792 1792">
							<Path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z" fill="#fff" />
						</Svg>
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
		width: 48,
		backgroundColor: '#54769a',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	ok: {
		width: 48,
		backgroundColor: '#ffaa00',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	mail: {
		width: 48,
		backgroundColor: '#168de2',
		borderRadius: 5,
		marginVertical: 10,
		paddingVertical: 15
	},
	fb: {
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