<template>
  <div class="ui container">
    <!-- form add new post
        <h1 class="ui header">Personnel</h1> -->
    <div>
      <br />
      <button class="ui positive basic button" v-on:click="addB = !addB">
        Add user
      </button>
      <div v-if="addB">
        <form class="ui form">
          <h4 class="ui dividing header">Informations</h4>
          <div class="field">
            <label>Name</label>
            <div class="two fields">
              <sui-form-field>
                <input placeholder="Nom" v-model="nom" />
              </sui-form-field>
              <sui-form-field>
                <input placeholder="Prenom" v-model="prenom" />
              </sui-form-field>
            </div>
          </div>
          <div class="field">
            <sui-form-field>
              <label>Email :</label>
              <input placeholder="Email" v-model="email" />
            </sui-form-field>
          </div>
          <div class="field">
            <sui-form-field>
              <label>Mot de passe :</label>
              <input placeholder="Mot de passe" v-model="mdp" />
            </sui-form-field>
          </div>
          <button class="ui primary button" @click="createPost">Submit</button>
        </form>
      </div>
    </div>
    <!-- title -->
    <h2 class="ui horizontal divider header">
      <i class="file icon" />
      L'équipe :
    </h2>

    <!-- list of posts -->
    <div class="ui three column relaxed grid">
      <div class="column" v-for="post in posts" :key="post._id">
        <!-- card -->
        <div class="ui fluid card">
          <div class="content">
            <p class="header">{{ post.nom }}</p>
            <div class="meta">
              <span class="date">{{ post.prenom }}</span>
            </div>
            <div class="description">
              {{ post.email }}
            </div>
            <div class="description">
              {{ post.fonction }}
            </div>
          </div>
          <div class="extra content">
            <button
              class="ui right floated red button"
              @click="deletePost(post._id)"
            >
              Delete
            </button>
            <button class="ui left floated blue button" @click="toggle(post)">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

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
        <sui-button type="submit" @click="updatePost">Update</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../services/auth-header";
const url = "http://localhost:9090/personnes";
export default {
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      mdp: "",
      fonction: "",
      open: false,
      addB: false,
      posts: [],
      current_post: {},
      err: "",
      id: "",
    };
  },
  methods: {
    toggle(post) {
      this.current_post = JSON.parse(JSON.stringify(post));
      this.open = !this.open;
    },
    createPost() {
      axios
        .post(
          url + "/add",
          {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            mdp: this.mdp,
          },
          { headers: authHeader() }
        )
        .then(() => {
          this.getPosts();
        });
    },
    deletePost(id) {
      axios
        .post(url + "/delete", { id }, { headers: authHeader() })
        .then(() => {
          this.getPosts();
        });
    },
    getPosts() {
      axios.get(url, { headers: authHeader() }).then((res) => {
        const data = res.data;
        this.posts = data.map((post) => ({ ...post }));
      });
    },
    updatePost() {
      // eslint-disable-next-line no-console
      console.log(url + "/update", this.current_post, {
        headers: authHeader(),
      });
      axios
        .post(url + "/update", this.current_post, { headers: authHeader() })
        .then(() => {
          this.toggle({});
          this.getPosts();
        });
    },
  },
  mounted() {
    this.getPosts();
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
