import axios from "axios";

export const registerUser = async (data: any) => {
  await axios
    .post(
      `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_ENDPOINT_SIGNUP}`,
      { email: data.email, username: data.name, password: data.password }
    )
    .catch((error) => {
      console.error(error);
    });
};

export const loginUser = async (data: any) => {
  await axios
    .post(
      `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_ENDPOINT_LOGIN}`,
      { login: data.name, password: data.password }
    )
    .catch((error) => {
      console.error(error);
    });
};

export const statusCheck = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/`)
          return res;
    }
    catch (error) {
        console.error(error)
    }
};
