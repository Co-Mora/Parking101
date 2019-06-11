
<template>
  <div>
    <div v-if="isLoading" class="middle-box animated fadeInDown">
      <div class="ibox">
        <div class>
          <div class="spiner-example">
            <div class="sk-spinner sk-spinner-circle">
              <div class="sk-circle sk-circle"></div>
              <div class="sk-circle2 sk-circle"></div>
              <div class="sk-circle3 sk-circle"></div>
              <div class="sk-circle4 sk-circle"></div>
              <div class="sk-circle5 sk-circle"></div>
              <div class="sk-circle6 sk-circle"></div>
              <div class="sk-circle7 sk-circle"></div>
              <div class="sk-circle8 sk-circle"></div>
              <div class="sk-circle9 sk-circle"></div>
              <div class="sk-circle10 sk-circle"></div>
              <div class="sk-circle11 sk-circle"></div>
              <div class="sk-circle12 sk-circle"></div>
            </div>
            <h3 class="text-center">Loading...</h3>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLoading" class="middle-box animated fadeInDown">
      <div class="ibox">
        <div class="ibox-title">
          <h5>Change Password</h5>
        </div>
        <div class="ibox-content">
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" disabled v-model="currentPasspord" class="form-control">
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input v-model="newPass" type="password" class="form-control">
          </div>
          <button
            @click="changePassword()"
            class="btn btn-success btn-sm demo2"
            data-style="zoom-in"
          >Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const CarParkService = require("../../services/CarParkService");
const qs = require("qs");
var fs = require("fs-web");
const swal = require("sweetalert2");

var data1;

export default {
  name: "VerifyUser",
  data() {
    return {
      isLoading: true,
      token: null,
      currentPasspord: null,
      email: null,
      newPass: null
    };
  },
  methods: {
    changePassword() {
      CarParkService.verifyUser(
        `auth2/web/reset`,
        qs.stringify({
          email: this.email,
          password: this.currentPasspord,
          newpassword: this.newPass
        })
      ).then(response => {
        setTimeout(() => {
          swal({
            title: "Successfully Changed",
            icon: "success"
          });
        }, 50);
        setTimeout(() => {
          window.location.href = "/login";
        }, 100);
      });
    },
    loadVerify() {
      this.isLoading = false;
      CarParkService.verifyUser(
        `auth2/web/verify/${this.token}`,
        qs.stringify({
          email: this.email
        })
      )
        .then(response => {
          this.currentPasspord = response.data["password"];
        })
        .catch(ex => {
          this.isLoading = true;
          setTimeout(() => {
            swal({
              title: ex.message,
              icon: "error"
            });
          }, 50);
        });
    }
  },
  created() {
    var data = JSON.parse(localStorage.getItem("userVerify"));
    this.token = data["jwt"];
    this.email = data["email"];
    this.loadVerify();
  }
};
</script>
