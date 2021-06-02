import {
	FETCH_GROUP_MEMBERS, FETCH_GROUP
} from './actionTypes';
import api from '../api'
import { AsyncStorage } from "react-native";
import { persistor } from "../store";
import { API } from "../constant"

export function get_members(group_code) {
	return dispatch => {
		api.get("groups/"+group_code).then(async (response) => {
			console.log("***************inside****************", JSON.stringify(response))
            if (response.status === "success") {
              await dispatch({ type: FETCH_GROUP_MEMBERS, data: response.payload });
				//console.log("***************response****************", JSON.stringify(response))

			} 
		});
	}
}

