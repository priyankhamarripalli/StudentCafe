const initialState = {
    groups: [],
    user_in_group:[]
 };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case "ADD_GROUP":
        return {
            ...state,
            groups: action.data,
        };  
      case "FETCH_GROUP":
        return {
            ...state,
            groups: action.data,
        };
        case "USER_IN_GROUP":
        return {
            ...state,
            user_in_group: action.data,
        };

      default:
        return state;
    }
  }