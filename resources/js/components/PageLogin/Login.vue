<template>
  <div class="gray-bg" style="height: 1200px">
    <div class="middle-box text-center loginscreen animated fadeInDown">
      <div>
        <div>
          <img alt="image" class="-square-full" :width="100" :src="Image" />

          <h1 class="logo-name"></h1>
        </div>
        <h2 style="color:#57606f; font-size:45px; font-weight: 400">PARKING 101</h2>
        <p style="font-weight:600">Welcome to Parking 101</p>
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Email Address"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button class="btn btn-primary block full-width m-b" @click="loadData">Login</button>
        <p>{{message}}</p>
        <small>Forgot password?</small>
        <p class="m-t">
          <small>Copyright PARKAIDE &copy; 2018</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CarParkService from "../../services/CarParkService";
import qs from "qs";
import Image from "../../../../public/images/icon.png";
import swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      Image,
      token: null,
      email: null,
      password: null,
      message: null
    };
  },
  methods: {
    loadData() {
      CarParkService.verifyUser(
        "auth2/web/login",
        qs.stringify({
          email: this.email,
          password: this.password
        })
      )
        .then(response => {
          var userData = {
            email: this.email,
            data: response.data
          };
          var parsed = JSON.stringify(userData);
          localStorage.setItem("data", parsed);
          window.location.href = "/v1/dashboard";
          //this.$router.push({ name: 'home' });
        })
        .catch(ex => {
          this.message = "Error: Can't Login";
        });
    }
  }
};
</script>