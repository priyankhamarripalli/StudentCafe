import {
	LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_ERROR,
	REGISTRATION_SUCCESS, REGISTRATION_PENDING, REGISTRATION_ERROR, LOGOUT, ADD_PROJECT,
	FORGOT_PASSWORD, FORGOT_PASSWORD_ERROR, CHANGE_PASSWORD,ALL_USERS
} from './actionTypes';
import api from '../api'
import { AsyncStorage } from "react-native";
import { persistor } from "../store";

export function login(self, navigation, loginPage) {
	return dispatch => {
		var data = {}
		data.user_name = self.email,
		data.password = self.password
		api.post("users/login", data).then(async (response) => {			
			if (response.status === "success") {
				await dispatch({ type: LOGIN_SUCCESS, data: response.payload });
				console.log("***************response****************", JSON.stringify(response))
				 navigation.navigate("UserProfile", { homepage: "navigation" })
			} else {
				loginPage.dropdown.alertWithType('error', '', response.message);
			}
		});
	}
}

export function register(self, navigation, loginPage) {
	return dispatch => {
		dispatch({ type: REGISTRATION_PENDING });
		var data = {}
		data.first_name = self.fullName;
		data.password = self.password;
		data.user_name = self.email;
		data.yearofstudent = self.selected;
		data.college_name =self.College;
		console.log("********register******", JSON.stringify(data))
		api.post("users/register", data).then(async (response) => {
			console.log("************register***response****************", JSON.stringify(response))
            console.log("******abc********",navigation)
		if (response.status === "success") {
			loginPage.dropdown.alertWithType('success', '', "User Registered Successfully");

			navigation.navigate("LoginScreen",{homepage:"navigation"})

		}
		});
	}
}
export function updateProfile(self, selfObject, info, navigation, homepage) {
	return dispatch => {
		var data = {}
		data.first_name = info.firstName;
		data.last_name = info.lastName;
		data.user_name = info.email;
		data.email = info.email;
		data.phone_number = info.phoneNumber;
		data.address_line1 = info.address;
		data.city = info.city;
		data.country = info.country;
		data.state = info.state;
		data.zipcode = info.zipcode;

	}
}

export function logout(router) {
	return async () => {
		await persistor.purge();
		router.props.navigation.navigate("Login");
	}
}

export function forgotPassword(thisValues, selfObject, self, navigation) {
	return dispatch => {
		dispatch({ type: FORGOT_PASSWORD });
		var data = {}
		data.user_name = self.email,
			api.post("users/forgot-password", data).then(async (response) => {

			});
	}
}

export function changePassword(thisValues, selfObject, info, navigation) {
	return dispatch => {
		dispatch({ type: CHANGE_PASSWORD });
		var data = {}
		data.password = info.password;
		api.put("users/password/change-password", data).then(async (response) => {

		});
	}
}

export function isLoggedIn(token) {
	return dispatch => {
		let result = token !== null ? true : false;
		dispatch({ type: "IS_LOGGED_IN", data: result })
	}
}

export function allUsers() {
	return dispatch => {
		api.get("users").then(async (response) => {
		console.log("***************************888",response)	
		 dispatch({ type:"ALL_USERS", data: response})		
	  }); 
	}
}