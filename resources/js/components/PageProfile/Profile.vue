<template>
  <div>
    <NavSide/>
    <div id="page-wrapper" class="gray-bg">
      <NavBar/>

      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row wrapper border-bottom white-bg page-heading">
          <div class="col-lg-10">
            <h2></h2>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a>Account</a>
              </li>
            </ol>
          </div>
          <div class="col-lg-2"></div>
        </div>
        <div class="wrapper wrapper-content">
          <div class="row animated fadeInRight">
            <div class="col-md-5">
              <div class="ibox">
                <div class="ibox-title">
                  <h5>Account</h5>
                </div>
                <div>
                  <div class="ibox-content no-padding border-left-right">
                    <img alt="image" class="img-fluid" src="/images/profile_big.jpg">
                  </div>
                  <div class="ibox-content profile-content">
                    <h4 style="font-weight:400">{{emailUser}}</h4>
                  </div>
                </div>
              </div>

              <div class="ibox">
                <div class="ibox-title">
                  <h5>Security</h5>
                </div>
                <div class="ibox-content">
                  <div class="form-group row">
                    <label class="col-lg-4 col-form-label">Current Password</label>

                    <div class="col-lg-8">
                      <input
                        v-model="currentPass"
                        value
                        id="password1"
                        type="password"
                        placeholder
                        class="form-control"
                      >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-4 col-form-label">New Password</label>
                    <div class="col-lg-8">
                      <input
                        v-model="newPassword"
                        id="password2"
                        type="password"
                        placeholder
                        class="form-control"
                      >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-4 col-form-label">Confirm Password</label>
                    <div class="col-lg-8">
                      <input
                        v-model="confirmPassword"
                        id="password3"
                        type="password"
                        placeholder
                        class="form-control"
                      >
                    </div>
                  </div>
                  <button
                    type="submit"
                    @click="changePassword()"
                    class="btn btn-primary block full-width m-b"
                  >
                    <i class="fa fa-key" style="padding:5px;"></i>Submit
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="ibox">
                <div class="ibox-title">
                  <h5>Activites</h5>
                  <div class="ibox-tools">
                    <a class="collapse-link">
                      <i class="fa fa-chevron-up"></i>
                    </a>
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                      <i class="fa fa-wrench"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                      <li>
                        <a href="#" class="dropdown-item">Config option 1</a>
                      </li>
                      <li>
                        <a href="#" class="dropdown-item">Config option 2</a>
                      </li>
                    </ul>
                    <a class="close-link">
                      <i class="fa fa-times"></i>
                    </a>
                  </div>
                </div>
                <div class="ibox-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter/>
    </div>
  </div>
</template>

<script>
import NavSide from "../NavSide";
import NavBar from "../NavBar";
import MainFooter from "../MainFooter";
import { setTimeout } from "timers";
const swal = require("sweetalert2");
const CarParkService = require("../../services/CarParkService");
const qs = require("qs");
export default {
  name: "Profile",
  data() {
    return {
      emailUser: "",
      currentPass: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  methods: {
    changePassword() {
      console.log(this.newPassword);
      console.log(this.confirmPassword)
      if(this.confirmPassword != this.newPassword) {
        setTimeout(() => {
          swal({
            title: "Password Doesn't Match",
            icon: "success"
          });
        }, 50);
        return 0;
      }
      CarParkService.verifyUser(
        `auth2/web/reset`,
        qs.stringify({
          email: this.emailUser,
          password: this.currentPass,
          newpassword: this.newPassword
        })
      ).then(response => {
        setTimeout(() => {
          swal({
            title: "Successfully Changed",
            icon: "success"
          });
        }, 50);
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 150);
      });
    }
  },
  components: {
    NavSide,
    NavBar,
    MainFooter
  },
  mounted() {
    var data = JSON.parse(localStorage.getItem("data"));
    this.emailUser = data["email"];
  }
};
</script>
