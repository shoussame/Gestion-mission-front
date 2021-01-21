import Vue from "vue";
import VueRouter from "vue-router";
// component
const personne = () => import("@/components/Users");
const professeur = () => import("@/components/Professeur");
const mission = () => import("@/components/Mission");
const navbar = () => import("@/components/NavBar");
const login = () => import("@/components/Login");
const home = () => import("@/components/Home");

Vue.use(VueRouter);

const routes = [
  {
    path: "/navbar",
    name: "navbar",
    component: navbar,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/personnes",
    name: "personnes",
    component: personne,
  },
  {
    path: "/professeurs",
    name: "professeurs",
    component: professeur,
  },
  {
    path: "/missions",
    name: "missions",
    component: mission,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
