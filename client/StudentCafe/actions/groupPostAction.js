import {
	ADD_GROUP, FETCH_GROUP,USER_IN_GROUP,GROUP_POST
} from './actionTypes';
import api from '../api'
import { AsyncStorage } from "react-native";
import { persistor } from "../store";

export function get_group_post() {
	return dispatch => {
		 api.get("grouppost").then(async (response) => {	
			console.log("**********getData********************",JSON.stringify(response))			
			if (response.status === "success") {
				console.log("******************************", JSON.stringify(response))
				await dispatch({ type: GROUP_POST, data: response.payload });
			} 
		});
	}
}


