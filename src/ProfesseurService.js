import axios from "axios";
const url = "http://localhost:8888/PERSONNE-SERVICE/professeurs/";
import professeur from "./components/models/User";

class ProfesseurService {
  //getPost :
  static getProfesseur() {
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
  static insertProfesseur(professeur) {
    return axios.post(url + "add", professeur);
  }
  addMissionToProf(mission) {
    return axios.post(url + "add/mission", {
      dateDemande,
      dateDepart,
      dateRetour,
      statutActuel,
      professeur,
      destination,
      validationComptable,
      validationDirecteur,
      validationDirectAdj,
      statut,
    });
  }
  //updatePost :
  updateProfesseur(post) {
    return axios.post(url + "update", post);
  }
  //deletePost :
  static deleteOneMission(id) {
    return axios.post(url + "delete", { id });
  }
}

export default ProfesseurService;
