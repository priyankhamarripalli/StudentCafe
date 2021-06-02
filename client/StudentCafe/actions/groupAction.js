import {
	ADD_GROUP, FETCH_GROUP,USER_IN_GROUP
} from './actionTypes';
import api from '../api'
import { AsyncStorage } from "react-native";
import { persistor } from "../store";

export function add_group(self, navigation, user_id) {
	return dispatch => {
		var data = {}
		data.group_name = self.group_name,
		data.group_code = self.group_code,
		data.user_id = user_id,
		api.post("groups", data).then(async (response) => {
			if (response.status === "success") {
				await dispatch({ type: ADD_GROUP, data: response.payload });
				console.log("***************response****************", JSON.stringify(response))
				 navigation.navigate("GroupPageScreen", { group_code: self.group_code })
			} else {
				loginPage.dropdown.alertWithType('error', '', response.message);
			}
		});
	}
}
export function join_group(self, navigation, user_id) {
	return dispatch => {
		var data = {}
		data.group_code = self.group_code,
		data.user_id = user_id,
		console.log("***************response1****************")
		api.post("groups/joingroup", data).then(async (response) => {
			console.log("***************response2****************", JSON.stringify(response))
			if (response.status === "success") {
				await dispatch({ type: ADD_GROUP, data: response.payload });
				console.log("***************response****************", JSON.stringify(response))
				 navigation.navigate("GroupPageScreen", { group_code: self.group_code })
			} else {
			console.log("******sjdhkjas*******")
			}
		});
	}
}

export function get_groups() {
	return dispatch => {
		 api.get("groups").then(async (response) => {	
			console.log("***************get_groups****************sdfsdfs",JSON.stringify(response))			
			if (response.status === "success") {
				console.log("***************response2****************", JSON.stringify(response))
				await dispatch({ type: FETCH_GROUP, data: response.payload });
			} 
		});
	}
}


export function get_user_in_group(user_id) {
	return dispatch => {
		 api.get("groups/usergroup/"+user_id).then(async (response) => {	
			console.log("***************get_groups****************sdfsdfs",JSON.stringify(response))			
			if (response.status === "success") {
				console.log("***************response2****************", JSON.stringify(response))
				await dispatch({ type: USER_IN_GROUP, data: response.payload });
			} 
		});
	}
}



