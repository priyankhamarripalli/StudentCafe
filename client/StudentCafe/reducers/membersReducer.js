const initialState = {
    groupmembers: [],

  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case "FETCH_GROUP_MEMBERS":
        return {
            ...state,
            groupmembers: action.data,
        };

      default:
        return state;
    }
  }