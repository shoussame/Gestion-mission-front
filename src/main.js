import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VeeValidate from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(SuiVue);
new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount("#app");
