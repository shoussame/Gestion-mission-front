<template>
  <div class="ui container">
    <br>
    <!-- form add new post -->
    <h1 class="ui header">Missions</h1>
    <button class="ui positive basic button" v-on:click="addB = !addB">
      Add mission
    </button>
    <div v-if="addB">
      <form class="ui form">
        <sui-form-field>
          <label>Date de départ :</label>
          <input type="date" placeholder="Date depart" v-model="mission.dateDepart" />
        </sui-form-field>
        <sui-form-field>
          <label>Date de retour :</label>
          <input type="date" placeholder="Date de retour" v-model="mission.dateRetour" />
        </sui-form-field>
            <sui-form-field>
          <label>Motif :</label>
          <input placeholder="Motif" v-model="mission.motif" />
        </sui-form-field>
        <sui-form-field>
        <label>Professeur :</label>
          <select name="skills" multiple="" class="ui fluid dropdown">
            <option v-for="prof in nomProf" :key="prof.id">
                <option value="">{{
              prof
            }}</option>
                </option>
          </select>
          </sui-form-field>
          <sui-form-field>
          <div class="large-12 medium-12 small-12 cell">
            <label
              >File
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </label>
          </div>
        </sui-form-field>
        <button class="ui primary button" @click="createMission">Submit</button>
      </form>
    </div>
    <!-- title -->
    <h2 class="ui horizontal divider header">
      <i class="file icon" />
      Liste des missions :
    </h2>

    <!-- list of posts -->
    <div class="ui three column relaxed grid">
      <div class="column" v-for="post in posts" :key="post._id">
        <!-- card -->
        <div class="ui fluid card">
          <div class="content">
            <p class="header">{{ post.professeur.nom }}</p>
            <div class="meta">
              <span class="date">{{ post.dateDemande }}</span>
            </div>
            <div class="description">
              {{ post.dateRetour }}
            </div>
            <div class="description">
              <!-- {{ post.professeur.nom }} -->
            </div>
            <div class="ui indicating progress">
              <div class="bar"></div>
              <div class="label">Progrès de la demande</div>
            </div>
          </div>
          <div class="extra content">
            <button class="ui right floated blue button" @click="toggle(post)">
              Update
            </button>
            <button
              class="ui right floated green button"
              @click="validateMission(post)"
            >
              Validate
            </button>
            <button
              class="ui right floated red button"
              @click="declineMission(post)"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>

    <sui-modal v-model="open">
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label> {{ mission.statutActuel }} </label>
          </sui-form-field>
          <sui-form-field>
            <label>Date de demande :</label>
            <input
            type="date"
              placeholder="Date de demande"
              v-model="current_post.dateDemande"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Date de départ :</label>
            <input
            type="date"
              placeholder="Date de depart"
              v-model="current_post.dateDepart"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Date de retour</label>
            <input
            type="date"
              placeholder="Date de retour"
              v-model="current_post.dateRetour"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Budget </label>
            <input placeholder="Budget" v-model="current_post.budget" />
          </sui-form-field>
          <div class="large-12 medium-12 small-12 cell">
            <label
              >Invitation
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </label>
          </div>
          <sui-form-field>
            <label>Motif</label>
            <input placeholder="Motif" v-model="current_post.motif" />
          </sui-form-field>
          <sui-form-field>
            <label>Nom du professeur</label>
            <!-- <input
              placeholder="Mot de passe"
              v-model="current_post.professeur.nom"
            /> -->
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button type="submit" @click="updateMission">Update</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import axios from "axios";
import Mission from "./models/MissionModel";
import Professeur from "./models/User";
const url = "http://localhost:9090/missions";
export default {
  data() {
    return {
      mission: Mission,
      professeur: Professeur,
      profs: [],
      docs: [{}],
      nomProf: [],
      open: false,
      addB: false,
      posts: [],
      prof: {},
      current_post: {},
      err: "",
      id: "",
    };
  },
  methods: {
    handleFileUpload() {
      let formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      this.mission = formData;
    },
    toggle(post) {
      this.current_post = JSON.parse(JSON.stringify(post));
      this.open = !this.open;
    },
    createMission() {
      axios
        .post(url + "/add", {
          dateDemande: this.mission.dateDemande,
          dateDepart: this.mission.dateDepart,
          dateRetour: this.mission.dateRetour,
          statutActuel: this.mission.statutActuel,
          professeur: this.mission.professeur,
          destination: this.mission.destination,
          budget: this.mission.budget,
          files: this.mission.files,
        })
        .then(() => {
          this.getMission();
        });
    },
    deleteMission(id) {
      axios.post(url + "/delete", { id }).then(() => {
        this.getMission();
      });
    },
    getMission() {
      axios.get(url).then((res) => {
        this.posts = res.data;
      });
    },
    getProfs() {
      axios.get("http://localhost:9090/professeurs").then((res) => {
        const data = res.data;
        const d = JSON.stringify(data);
        this.profs = d;
        this.nomProf = data.map((a) => a.nom);
      });
    },
    validateMission(mission) {
      if (this.professeur.fonction === "DIRECTEUR") {
        mission.validationDirecteur = true;
      } else {
        if (this.professeur.fonction === "DIRECTEUR_ADJ") {
          mission.validationDirectAdj = true;
        } else {
          if (this.professeur.fonction === "COMPTABLE") {
            mission.validationComptable = true;
          }
        }
      }
     axios.post(url + "/update", mission);
    },
    declineMission(post) {
      post.statutActuel = true;
      this.updateMission();
    },
    updateMission() {
      // eslint-disable-next-line no-console
      axios.post(url + "/update", this.current_post).then(() => {
        this.toggle({});
        this.getMission();
      });
    },
  },
  mounted() {
    this.getMission();
    this.getProfs();
  },
};
</script>

<style>
form {
  margin: 50px 25px 25px;
}
.ui.horizontal.divider.header {
  margin: 50px 50px 30px;
}
</style>
