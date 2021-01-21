import axios from "axios";
import authHeader from "./auth-header";
const url = "http://localhost:1255/missions/";

class MissionService {
  //getPost :
  static getMission() {
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
  getMissionsProfesseur() {
    return axios.get(
      API_URL + "profUsername" + { username: authHeader.username },
      { headers: authHeader() }
    );
  }
  getAllMissions() {
    return axios.get(API_URL + "all", { headers: authHeader() });
  }
  //addPost :
  static insertMission(
    dateDemande,
    dateDepart,
    dateRetour,
    statutActuel,
    professeur,
    destination
  ) {
    return axios.post(
      url + "add",
      {
        dateDemande,
        dateDepart,
        dateRetour,
        statutActuel,
        professeur,
        destination,
      },
      { headers: authHeader() }
    );
  }
  //updatePost :
  updateMission(post) {
    return axios.post(url + "update", post, { headers: authHeader() });
  }
  //deletePost :
  static deleteOneMission(id) {
    return axios.post(url + "delete", { id }, { headers: authHeader() });
  }
}

export default new MissionService();
