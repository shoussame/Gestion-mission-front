import axios from "axios";
const url = "http://localhost:8888/MISSION-SERVICE/missions/";

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
  //addPost :
  static insertMission(
    dateDemande,
    dateDepart,
    dateRetour,
    statutActuel,
    professeur,
    destination
  ) {
    return axios.post(url + "add", {
      dateDemande,
      dateDepart,
      dateRetour,
      statutActuel,
      professeur,
      destination,
    });
  }
  //updatePost :
  updateMission(post) {
    return axios.post(url + "update", post);
  }
  //deletePost :
  static deleteOneMission(id) {
    return axios.post(url + "delete", { id });
  }
}

export default MissionService;
