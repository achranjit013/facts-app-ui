import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const userAPI = rootAPI + "/user";
const factsAPI = rootAPI + "/fact";

const getUserId = () => {
  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);
  return userObj?._id || null;
};

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

// facts api - to get facts
export const getAllFacts = async () => {
  try {
    const { data } = await axios.get(factsAPI);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getAllFactsByUserId = async () => {
  try {
    const userId = getUserId();
    const { data } = await axios.get(factsAPI + "/user-dashboard", {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
