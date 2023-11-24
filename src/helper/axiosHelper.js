import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const userAPI = rootAPI + "/user";

// user api for signup
export const signupUser = async (userObj) => {
  try {
    const { data } = await axios.post(userAPI, userObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// user api for login
export const loginUser = async (userObj) => {
  try {
    const { data } = await axios.post(userAPI + "/login", userObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
