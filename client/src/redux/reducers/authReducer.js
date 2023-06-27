const initialState = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  username: localStorage.getItem("username"),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return { ...state, token: action.payload, error: null };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return { ...state, token: null, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
