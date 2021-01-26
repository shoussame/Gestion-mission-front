import axios from "axios";

const API_URL = "http://localhost:1255/";

class AuthService {
  login(user) {
    var postdata = new URLSearchParams();
    postdata.append("username", user.username);
    postdata.append("password", user.password);
    return axios.post(API_URL + "login", postdata).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
