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

// facts api - add new fact
export const addNewFact = async (factObj) => {
  try {
    const userId = getUserId();
    if (!userId) {
      return {
        status: "error",
        message: "User not found. Please log out and log in again.",
      };
    }

    const { data } = await axios.post(factsAPI, factObj, {
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

// facts api - to get all facts (before loged in)
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

// facts api - to get facts of specific user (after loged in)
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

// facts api - to update votes of specific fact (before logged in)
export const updateVotesByFactsId = async (factObj) => {
  try {
    const { data } = await axios.patch(factsAPI, factObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// facts api - to update facts (after logged in)
export const updateFactById = async (factObj) => {
  try {
    const userId = getUserId();
    const { data } = await axios.patch(factsAPI + "/user-dashboard", factObj, {
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

export const deleteSelectedFact = async (idObj) => {
  try {
    const userId = getUserId();
    const { data } = await axios.delete(factsAPI, {
      data: idObj,
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
