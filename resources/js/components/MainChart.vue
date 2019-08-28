<template>
  <div>
    <NavSide/>
    <div id="page-wrapper" class="gray-bg">
      <NavBar/>

      <div class="wrapper wrapper-content animated fadeInRight">
        <Dashboardv2/>
      </div>
      <MainFooter/>
    </div>
  </div>
</template>

<script>
import NavSide from "./NavSide.vue";

import NavBar from "./NavBar.vue";
import Dashboardv2 from "./App/Dashboardv2";
import MainFooter from "./MainFooter";

// import Dashboard from './Dashboard.vue'

export default {
  name: "MainChart",
  data() {
    return {};
  },
  methods: {},
  components: {
    NavSide,
    NavBar,
    Dashboardv2,
    MainFooter
  },

  mounted() {
    // console.log(this.$route.query);
    if (!localStorage.getItem("data")) {
      window.location.href = "/v1/login";
    }
    console.log(this.$route.query.hasOwnProperty('email'))
    if (this.$route.query.hasOwnProperty('email')) {
      localStorage.setItem("userVerify", JSON.stringify(this.$route.query));
      this.$router.push({ name: "verify" });
    }
  }
};
</script>
