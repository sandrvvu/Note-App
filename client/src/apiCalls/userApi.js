import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const registration = async (login, password) => {
  const response = await axios.put(
    "http://localhost:5000/api/user/registration",
    {
      login: login,
      password: password,
    },
    { headers: { "Content-Type": "application/json" } }
  );

  const token = response.data.token;
  localStorage.setItem("token", token);
  return jwt_decode(token);
};

export const log = async (login, password) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/login",
    {
      login: login,
      password: password,
    },
    { headers: { "Content-Type": "application/json" } }
  );

  const token = response.data.token;
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", jwt_decode(token).id);
  localStorage.setItem("user_name", jwt_decode(token).login);

  return jwt_decode(token);
};

export const check = async () => {
  const responce = await $authHost.get("api/user/auth");
  localStorage.setItem("token", responce.token);
  return jwt_decode(responce.token);
};
