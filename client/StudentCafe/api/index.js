import { AsyncStorage } from "react-native";
import { API } from "../constant"

function parseResponse(response) {
    return response.json().then((json) => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        console.log("API******szdasdfsadfas*******************************",JSON.stringify(json))

        return json;
    })
}

export default {
    async post(url, data) {
        console.log("API*************************************",JSON.stringify(data))
        console.log("API*************************************",API+url)
        const body = JSON.stringify(data);
       return fetch(`${API}${url}`, {
            method: 'POST',
            headers: new Headers({ "Content-Type": "application/json" }),
            body,
        })
            .then(parseResponse)
            .catch(function (error) {
                var obj = {}
                obj.data = null,
                    obj.error = "Error"
                return (error)
            });
    },
    async put(url, data) {
        const body = JSON.stringify(data);
        const bearer = 'Bearer ' + await AsyncStorage.getItem('token');
       
        return fetch(`${API}${url}`, {
            method: 'PUT',
            headers: new Headers({ "Content-Type": "application/json" }),
            body,
        })
            .then(parseResponse)
            .catch(function (error) {
                var obj = {}
                obj.data = null,
                    obj.error = "Error"
                return (obj)
            });
    },

    async get(url, data) {
        const bearer = 'Bearer ' + await AsyncStorage.getItem('token');
        console.log(bearer)
        return fetch(`${API}${url}`, {
            method: 'GET',
            headers: new Headers({ "Content-Type": "application/json"}),
        })
            .then(parseResponse);
    },

    async delete(url) {
        const bearer = 'Bearer ' + await AsyncStorage.getItem('token');
        return fetch(`${API}${url}`, {
            method: 'DELETE',
            headers: new Headers({ "Content-Type": "application/json" }),
        })
            .then(parseResponse);
    },

}