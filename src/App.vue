<template>
  <div>
    <div v-if="routeName != 'Login' && routeName != 'Register'">
      <div class="sidebar open">
        <side-bar></side-bar>
      </div>
      <div class="home-section">
        <router-view />
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.home-section {
  position: relative;
  background: #fff;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}
</style>
<script>
import SideBar from "../src/components/sidebar/Sidebar.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    SideBar,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      user: "user",
    }),
  },
  data() {
    return {
      routeName: "",
    };
  },
  mounted() {
    this.routeName = this.$route.name;
  },
  updated() {
    this.routeName = this.$route.name;
  },
};
</script>
