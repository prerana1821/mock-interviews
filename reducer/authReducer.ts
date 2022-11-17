import { AuthAction, UserState } from "../context/Auth/Auth.types";

export const authReducer = (state: UserState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
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
          username: action.payload.username,
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
      console.log("Something went wrong!", { state });
      return state;
      break;
  }
};
