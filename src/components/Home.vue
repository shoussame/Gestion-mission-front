<template>
  <div class="ui container">
    <br />
    <br />
    <br />
    <div class="control">
      <sui-button primary @click="redirectProfesseurs">Professeurs</sui-button>
    </div>
    <br />
    <br />
    <br />
    <div class="control">
      <sui-button secondary @click="redirectMissions">Missions</sui-button>
    </div>
    <br />
    <br />
    <br />
    <div class="control">
      <sui-button primary @click="redirectPersonnel">Personnel</sui-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    redirectPersonnel() {
      this.$router.push("/personnes");
    },
    redirectMissions() {
      this.$router.push("/missions");
    },
    redirectProfesseurs() {
      this.$router.push("/professeurs");
    },
  },
  mounted() {},
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
