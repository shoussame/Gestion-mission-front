<template>
  <div id="app">
    <navbar></navbar>
  </div>
</template>

<script>
import semantic from "semantic-ui-vue";
import navbar from "./components/NavBar2.vue";
export default {
  semantic,
  name: "App",
  components: {
    navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
