const initialState = {
    isLoggedIn: false,
    token: null,
    error: null,
    user : null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload.token,
          error: null,
          user: action.payload
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          error: action.payload
        };
        
        case 'LOGOUT':
          return {
            ...state,
            isLoggedIn: false,
            token: null,
            user: null
          };
          
      default:
        return state;
    }
  };
  
  export default authReducer;