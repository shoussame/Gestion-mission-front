import axios from "axios";
const url = "http://localhost:8888/PERSONNEL-SERVICE/personnes/";

class PostService {
  //getPost :
  static getpost() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data.map((post) => ({ ...post })));
      } catch (error) {
        reject(error);
      }
    });
  }
  //addPost :
  static insertPost(nom, prenom, email, mdp) {
    return axios.post(url + "add", {
      nom,
      prenom,
      email,
      mdp,
    });
  }
  //updatePost :
  updatePost(post) {
    return axios.post(url + "update", post);
  }
  //deletePost :
  static deleteOne(id) {
    return axios.post(url + "delete", { id });
  }
}

export default PostService;
