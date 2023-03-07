const initialState = {
  data: {
    name: "",
    email: "",
  },
  isLoading: false,
};

export const usersReducer = (state = initialState, action) => {
  if (action.type === "USER_LOGIN_PENDING") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "USER_LOGIN_SUCCESS") {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  } else if (action.type === "RECRUITER_LOGIN_PENDING") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "RECRUITER_LOGIN_SUCCESS") {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  } else {
    return state;
  }
};
