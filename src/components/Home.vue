<template>
  <div class="ui container">
    <div class="control">
      <button class="button is-primary" @click="redirectPersonnel">
        Personnel
      </button>
    </div>
    <div class="control">
      <button class="button is-primary" @click="redirectMissions">
        Missions
      </button>
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
