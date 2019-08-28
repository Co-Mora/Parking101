<template>
  <div>
    <AddCountry v-on:click="createModal" :apiData="apiData" :propertyLoc1="propertyLoc1"/>
    <div class="modal inmodal" id="myModalUpdate" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">{{'Edit ' + countryName}}</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Country ID</label>
              <input
                type="text"
                v-model="countryID"
                placeholder="Enter Country Name"
                class="form-control"
                disabled
              >
            </div>
            <div class="form-group">
              <label>Country Name</label>
              <input
                type="text"
                v-model="name"
                placeholder="Enter Country Name"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label>Created Date</label>
              <input type="text" v-model="dateCreated" disabled class="form-control">
            </div>
            <div class="form-group">
              <label>Last Updated</label>
              <input type="text" v-model="dateupdated" disabled class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>

            <button type="button" class="btn btn-danger">Delete</button>
            <button
              type="button"
              @click="updateCountry(countryID)"
              :disabled="validated == true"
              class="btn btn-primary"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper">
      <nav-side :classCountry="classCountry"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Location / country</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="input-group" style="margin-bottom: 20px">
                        <button
                          @click="createModal"
                          class="btn btn-rounded btn-w-m btn-outline-primary"
                        >Create New Country</button>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="input-group" style="margin-bottom: 20px">
                        <input
                          v-model="searchResult"
                          @change="getSearchResult"
                          placeholder="Search"
                          type="text"
                          class="form-control form-control-sm"
                        >
                        <span class="input-group-append">
                          <button
                            type="button"
                            @click="getSearchResult()"
                            class="btn btn-sm btn-success"
                          >Search</button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table
                      v-show="!messageCountry&&!message"
                      class="table table-striped table-bordered table-hover dataTables-example"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone,tablet">Country ID</th>
                          <th data-hide="phone,tablet">Country</th>
                          <th data-hide="phone,tablet">Created Date</th>
                          <th data-hide="phone,tablet">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="s in country" :key="s" class="gradeU">
                          <td class="center">{{s.id}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              data-toggle="modal"
                              data-target="#myModalUpdate"
                              @click="viewCountryUpdate(s.id)"
                            >{{s.name}}</a>
                          </td>
                          <td class="center">{{s.createDate || 'Unknown'}}</td>
                          <td class="center">{{s.updateDate || 'NA'}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-primary col-sm-12 m-b-xs"
                      v-show="errorResult === true"
                      role="alert"
                    >{{message}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageCountry"
                      role="alert"
                    >{{messageCountry}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MainFooter/>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import AddCountry from "./PageAdd/AddCountry";
import NavBar from "../NavBar";
import NavSide from "../NavSide";
import MainFooter from "../MainFooter";
import SearchData from "../../services/SearchData";

import DateFormat from "../../services/DateFormat";
import LastUpdatedDate from "../../services/LastUpdatedDate";
import CarParkService from "../../services/CarParkService";

export default {
  name: "Country",
  data() {
    return {
      image: null,
      dateCreated: null,
      dateupdated: null,

      apiData: "country",
      propertyLoc1: "Country",
      country: null,
      countryID: null,
      stateID: null,
      state: null,
      result: true,

      message: "",
      messageCountry: null,
      searchResult: "",
      errorResult: false,
      classCountry: true,
      selectedCountry: null,
      validated: false,
      countryName: null,
      arraySort: null
    };
  },
  methods: {
    createModal() {
      $("#myModalAdd").modal("show");
    },

    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadData();
      }
      SearchData.findSearchResult(`country?search=${this.searchResult}`).then(
        response => {
          this.country = response.data;
          DateFormat.dateProcees(this.country);
          this.errorResult = false;
          this.message = "";
          this.result = true;
          if (this.country.length === 0) {
            this.errorResult = true;
            this.result = true;
            this.message = "No data available.";
          }
        }
      );
    },
    viewCountryUpdate(value) {
      CarParkService.viewCarPark("country", value).then(response => {
        this.selectedCountry = response.data;
        console.log(this.selectedCountry);
        this.showSelectedCountry();
      });
    },
    updateCountry(value) {
      this.validated = false;
      CarParkService.updateData(
        "country",
        value,
        qs.stringify({
          name: this.name
        })
      );
      setTimeout(() => {
        window.location.href = `/location/country`;
      }, 300);
    },
    showSelectedCountry() {
      this.selectedCountry.forEach(el => {
        DateFormat.dateProcees(this.selectedCountry);
        this.name = el.name;
        this.countryName = el.name;
        this.countryID = el.id;
        this.dateCreated = el.createDate;
        if (el.updateDate === 0) {
          this.dateupdated = "NA";
        } else {
          this.dateupdated = el.updateDate;
        }
      });
    },
    viewCountry(value) {
      CarParkService.viewCarPark("country", value).then(response => {
        this.selectedCountry = response.data;
        this.selectedCountry.forEach(el => {
          this.countryName = el.name;
        });
      });
    },
    loadData() {
      CarParkService.fetchAllData("country")
        .then(response => {
          this.country = response.data;
          DateFormat.dateProcees(this.country);
          LastUpdatedDate.dataSorting(this.country);
          this.messageCountry = "";
          if (this.country.length === 0) {
            this.messageCountry = "No data available.";
          }
        })
        .catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    }
  },
  components: {
    NavSide,
    MainFooter,
    NavBar,
    AddCountry
  },
  mounted() {
    this.loadData();
  }
};
</script>
