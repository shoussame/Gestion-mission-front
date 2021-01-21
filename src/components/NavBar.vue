<template>
  <div>
    <div class="ui attached stackable menu">
      <div class="ui container">
        <a class="item"
          ><router-link to="/login">Login</router-link> <i class="home icon"></i
        ></a>
        <a class="item"> <i class="grid layout icon"></i> Browse </a>
        <div>
          <div class="ui simple dropdown item">
            Personnel
            <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item"
                ><router-link to="/personnes">Personnel</router-link
                ><i class="edit icon"></i>
              </a>
              <a class="item"
                ><router-link to="/professeurs">Professeurs</router-link
                ><i class="settings icon"></i>
              </a>
            </div>
          </div>
          <div class="ui simple dropdown item">
            Missions
            <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item"
                ><router-link to="/missions">Missions</router-link
                ><i class="edit icon"></i>
              </a>
              <a class="item"
                ><router-link to="/missions">Demander Missions</router-link
                ><i class="settings icon"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="right item">
          <div class="ui input">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "PointingMenuSecondaryExample",
  data() {
    return {
      active: "Home",
      items: ["Home", "Messages", "Friends"],
    };
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
  },
};
</script>
