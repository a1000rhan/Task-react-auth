import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";
import api from "./api";
class AuthStore {
  user = null;
  constructor() {
    makeAutoObservable(this);
  }
  setUser = (token) => {
    localStorage.setItem("myToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  signUp = async (user) => {
    try {
      const response = await api.post("/signup", user);
      this.setUser(response.data.token);
    } catch (error) {
      console.log("auth error is ", error);
    }
  };
  signIn = async (user) => {
    try {
      const response = await api.post("/signin", user);

      this.setUser(response.data.token);
      console.log(this.user);
    } catch (error) {
      console.log("auth error is ", error);
    }
  };
  signout = () => {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    this.user = null;
  };
  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.signout();
      }
    }
  };
}
const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
