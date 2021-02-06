<template>
  <div class="ui container">
    <!-- form add new post
        <h1 class="ui header">Personnel</h1> -->
    <div>
      <br />
      <button class="ui positive basic button" v-on:click="addB = !addB">
        Add professeur
      </button>
      <div v-if="addB">
        <form class="ui form">
          <h4 class="ui dividing header">Informations</h4>
          <div class="field">
            <label>Name</label>
            <div class="two fields">
              <sui-form-field>
                <input placeholder="Nom" v-model="professeur.nom" />
              </sui-form-field>
              <sui-form-field>
                <input placeholder="Prenom" v-model="professeur.prenom" />
              </sui-form-field>
            </div>
          </div>
          <div class="field">
            <sui-form-field>
              <label>Date de naissance</label>
              <input
                type="date"
                placeholder="Date de naissance"
                v-model="professeur.dateDeNaissance"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Email :</label>
              <input placeholder="Email" v-model="professeur.email" />
            </sui-form-field>
          </div>
          <div class="field">
            <sui-form-field>
              <label>Mot de passe :</label>
              <input
                type="password"
                placeholder="Mot de passe"
                v-model="professeur.mdp"
              />
            </sui-form-field>
          </div>
          <button class="ui primary button" @click="createProfesseur">
            Submit
          </button>
        </form>
      </div>
    </div>
    <!-- title -->
    <h2 class="ui horizontal divider header">
      <i class="file icon" />
      Les professeurs :
    </h2>

    <!-- list of posts -->
    <div class="ui three column relaxed grid">
      <div class="column" v-for="post in posts" :key="post._id">
        <!-- card -->
        <div class="ui fluid card">
          <div class="content">
            <p class="header"></p>
            <div class="meta">
              <span class="date">{{ post.prenom }}</span>
            </div>
            <div class="meta">
              <span class="date">{{ post.nom }}</span>
            </div>
            <div class="description">
              {{ post.email }}
            </div>
            <div class="description">
              {{ post.fonction }}
            </div>
          </div>
          <div class="description">
            <button class="ui floated button" @click="toggle(post.missions)">
              Missions
            </button>
          </div>
          <div class="extra content">
            <button
              class="ui right floated red button"
              @click="deleteProfesseur(post._id)"
            >
              Delete
            </button>
            <button class="ui left floated blue button" @click="toggleP(post)">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

    <sui-modal v-model="openB">
      <div class="ui three column relaxed grid">
        <div class="column" v-for="mission in missions" :key="mission._id">
          <!-- card -->
          <div class="ui fluid card">
            <div class="content">
              <p class="header">{{ mission.statutActuel }}</p>
              <div class="meta">
                <span class="date"></span>
              </div>
              <div class="description">
                {{ mission.dateDemande }}
              </div>
              <div class="description">
                {{ mission.statut }}
              </div>
            </div>
            <div class="description">
              <button class="ui floated button" @click="toggleMission(mission)">
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </sui-modal>

    <sui-modal v-model="open">
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label>Nom :</label>
            <input placeholder="nom" v-model="current_post.nom" />
          </sui-form-field>
          <sui-form-field>
            <label>Prenom :</label>
            <input placeholder="prenom" v-model="current_post.prenom" />
          </sui-form-field>
          <sui-form-field>
            <label>Date de naissance</label>
            <input
              type="date"
              placeholder="Date de naissance"
              v-model="professeur.dateDeNaissance"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Email :</label>
            <input placeholder="email" v-model="current_post.email" />
          </sui-form-field>
          <sui-form-field>
            <label>Mot de passe :</label>
            <input
              type="password"
              placeholder="Mot de passe"
              v-model="current_post.mdp"
            />
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button type="submit" @click="updateProfesseur">Update</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import axios from "axios";
import User from "./models/User";
import Mission from "./models/MissionModel";
import authHeader from "../services/auth-header";
const url = "http://localhost:9090/professeurs/";
export default {
  data() {
    return {
      professeur: User,
      missions: [
        {
          mission: Mission,
        },
      ],
      mission: Mission,
      open: false,
      openB: false,
      openC: false,
      addB: false,
      posts: [],
      current_post: {},
      current_mission: {},
      err: "",
      id: 0,
    };
  },
  methods: {
    toggle(post) {
      this.current_post = JSON.parse(JSON.stringify(post));
      this.openB = !this.openB;
    },
    toggleP(post) {
      this.current_post = JSON.parse(JSON.stringify(post));
      this.open = !this.open;
    },
    toggleMission(mission) {
      this.current_mission = JSON.parse(JSON.stringify(mission));
      this.openC = !this.openC;
    },
    createProfesseur() {
      axios
        .post(
          url + "add",
          {
            nom: this.professeur.nom,
            prenom: this.professeur.prenom,
            email: this.professeur.email,
            mdp: this.professeur.mdp,
          },
          { headers: authHeader() }
        )
        .then(() => {
          this.getProfesseur();
        });
    },
    deleteProfesseur(id) {
      id = parseInt(id);
      axios
        .post(url + "delete/", { id }, { headers: authHeader() })
        .then(() => {
          this.getProfesseur();
        });
    },
    getProfesseur() {
      axios.get(url, { headers: authHeader() }).then((res) => {
        const data = res.data;
        this.posts = data.map((post) => ({ ...post }));
      });
    },
    updateProfesseur(current_post) {
      console.log(url + "update", current_post, { headers: authHeader() });
      axios
        .post(url + "update", current_post, { headers: authHeader() })
        .then(() => {
          this.toggle({});
          this.getProfesseur();
        });
    },
  },
  mounted() {
    this.getProfesseur();
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
