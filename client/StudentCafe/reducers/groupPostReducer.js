const initialState = {
    group_post: [],
};
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case "GROUP_POST":
        return {
            ...state,
            group_post: action.data,
        }; 
      
      default:
        return state;
    }
  }