const initialState = {
  isLoginSuccess: false,
  isLoginPending: false,
  isLoginError: false,
  isRigisterSuccess: false,
  isRigisterPending: false,
  isRigisterError: false,
  isLogged: false,
  userRole:"",
  user: {},
  users:[],
  chagepassword: {},
  hasDeshBoardData:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATION_INITIAL_STATE":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: false,
        isRigisterError: false,
        isLogged: false,
        user: {}
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoginSuccess: true,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: false,
        isRigisterError: false,
        isLogged: true,
        user: action.data
      };

    case "LOGIN_PENDING":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: true,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: false,
        isRigisterError: false,
        isLogged: false,
        user: {}
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: false,
        isLoginError: true,
        isRigisterSuccess: false,
        isRigisterPending: false,
        isRigisterError: false,
        isLogged: false,
        user: {}
      };

    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: true,
        isRigisterPending: false,
        isRigisterError: false,
        isLogged: false,
        user: {}
      };

    case "REGISTRATION_PENDING":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: true,
        isRigisterError: false,
        isLogged: false,
        user: {}
      };

    case "REGISTRATION_ERROR":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: false,
        isRigisterError: true,
        isLogged: false,
        user: {}
      };
      case "UPDATEPROFILE_SUCCESS":
      return {
        ...state,
        isLoginSuccess: true,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: false,
        isRigisterError: false,
        isLogged: true,
        user: action.data
      };

    case "UPDATEPROFILE_PENDING":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: true,
        isRigisterError: false,
        isLogged: true,
        user: {}
      };

    case "UPDATEPROFILE_ERROR":
      return {
        ...state,
        isLoginSuccess: false,
        isLoginPending: false,
        isLoginError: false,
        isRigisterSuccess: false,
        isRigisterPending: false,
        isRigisterError: true,
        isLogged: false,
        user: {}
      };     
       
    case "IS_LOGGED_IN":
      return {
        ...state,
        isLogged: action.data,
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        chagepassword: action.data,
      }
    case "CHANGE_PASSWORD_ERROR":
      return {
        ...state,
        chagepassword: action.data
      }
     case "HAS_DESHBOARD_DATA" :
     return{
       ...state,
       hasDeshBoardData:action.data
     }
     case "USER_ROLE" :
     return{
       ...state,
       userRole:action.data
     }
     case "ALL_USERS" :
     return{
       ...state,
       users:action.data
     }

    default:
      return state;
  }
}