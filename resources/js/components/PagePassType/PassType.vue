<template>
    <div v-show="isLoggedIn">
         <div id="wrapper">
            <nav-side :classPassType="classPassType"/>
            <div id="page-wrapper" class="gray-bg">
            <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
            </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <span class="m-r-sm text-muted welcome-message">Welcome to Carpark Aide.</span>
                    </li>

                    <li>
                        <a @click="logout" href="/login">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>
                    </li>
                </ul>
            </nav>
            </div>

              <div class="ibox-title">
                <p>Home / PassTypes</p>
              </div>
         <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">

                        <div class="ibox-content">
                            <div class="row">
                              <div class="input-group" style="margin: 0 0 20px 16px">
                                <a href="/passtype/add" class="btn btn-w-m btn-rounded btn-outline-primary" >Create New PassType</a>
                              </div>
                              <div class="col-sm-9 m-b-xs">
                                <select v-model="passTypeID" class="form-control m-b" @change="getPasscard">
                                  <option disabled selected value="null" key="null">{{passTypeID ? 'Please Select Pass Type' : 'NOT Found'}}</option>
                                  <option v-for="pass in passType" :value="pass.id" :key="pass">{{pass.name}}</option>
                                </select>
                              </div>
                              <div class="col-sm-3">
                                <div class="input-group" style="margin-bottom: 20px">
                                  <input v-model="searchResult"  placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                        <button type="button"  class="btn btn-sm btn-success">Search</button></span>
                                </div>
                              </div>
                            </div>
                             <table v-show="!messagePass  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                <thead>
                                <tr>
                                    <th data-hide="phone,tablet">id(s)</th>
                                    <th data-hide="phone,tablet">Sku</th>
                                    <th data-hide="phone,tablet">conditions</th>
                                    <th data-hide="phone,tablet">isBlocked</th>
                                    <th data-hide="phone,tablet">carparkID</th>
                                    <th data-hide="phone,tablet">passtypeID</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="pass in passcard" :key="pass" class="gradeU">
                                        <td class="center">{{pass.id || 'Unknown'}}</td>
                                        <td class="center">{{pass.sku || 'Unknown'}}</td>
                                        <td class="center">{{pass.conditions || 'Unknown'}}</td>
                                        <td class="center">{{pass.isBlocked || 'Unknown'}}</td>
                                        <td class="center">{{pass.carparkID || 'Unknown'}}</td>
                                        <td class="center">{{pass.passtypeID || 'Unknown'}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messagePass" role="alert">{{messagePass}}</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="footer">
                <div class="float-right">
                    10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                    <strong>Copyright</strong> CarPark Company &copy; 2018
                </div>
            </div>

        </div>
    </div>
    </div>
</template>
<script>
import axios from "axios";
import NavSide from '../App/NavSide'
export default {
  name: "PassType",
  data() {
    return {
      passType: null,
      passTypeID: null,
      passcard: null,
      token: localStorage.getItem("token"),
      isLoggedIn: localStorage.getItem("isLogged"),
      carparkID: null,
      message: null,
      messagePass: null,
      classPassType: true
    };
  },
  methods: {
    getPasscard() {
      axios
        .get(
          `https://sys2.parkaidemobile.com/api/passtypes/${this.passTypeID}/passcards`,
          { headers: { "x-access-token": JSON.parse(this.token) } }
        )
        .then(response => {
          this.passcard = response.data;
          this.messagePass = '';
          if (this.passcard.length === 0) {
            this.messagePass = "No data available.";
          }
        });

    },
    logout() {
      localStorage.removeItem('isLogged');
      localStorage.removeItem('token');
    }

  },
  components: {
    NavSide
  },
  mounted() {
    axios
      .get(
        `https://sys2.parkaidemobile.com/api/passtypes`,
        { headers: { "x-access-token": JSON.parse(this.token) } }
      )
      .then(response => {
        this.passType = response.data;
        this.messagePass = "";
        if (this.passType.length === 0) {
          this.messagePass = "No data available.";
        } else {
          this.passTypeID = response.data[0].id
          this.getPasscard()
        }
      });
  }
};
</script>
