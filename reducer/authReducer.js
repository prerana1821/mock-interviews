export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOAD_USER_DETAILS":
      return {
        ...state,
        user: action.payload.userDetails,
        token: action.payload.token,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          portfolio: action.payload.portfolio,
          fullName: action.payload.fullName,
          interviewDone: action.payload.interviewDone,
        },
      };
    case "ADD_TOKEN":
      return { ...state, token: action.payload.token };
    case "SET_STATUS":
      return { ...state, status: action.payload.status };
    case "LOGOUT":
      return {
        token: "",
        user: null,
        status: null,
      };
    default:
      console.log(state);
      console.log("Something went wrong!");
      break;
  }
};
