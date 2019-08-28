<template>
  <div>
    <AddCity
      v-if="isBoxOpen"
      v-on:click="createModal"
      :isBoxOpen="isBoxOpen"
      :countryID1="countryID"
      :stateID1="stateID"
      :method="handleCreate"
      @clicked-countryID="clickedShowDetailModal"
      @clicked-stateID="clickedShowDetailModal1"
    />
    <div class="modal inmodal" id="myModalUpdate" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">{{'Edit ' + cityName}}</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Country</label>
              <select disabled v-model="countryID" class="form-control m-b">
                <option disabled selected value="null" key="null">Please Select Country Name</option>
                <option v-for="cout in country" :value="cout.id" :key="cout">{{cout.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>State</label>
              <select disabled v-model="stateID" class="form-control m-b">
                <option disabled selected value="null" key="null">Please Select State Name</option>
                <option v-for="sta in state" :value="sta.id" :key="sta">{{sta.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>State ID</label>
              <input
                type="text"
                disabled
                v-model="stateID"
                placeholder="Enter Country Name"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label>City</label>
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
              @click="updateCity(cityID)"
              :disabled="validated == true"
              class="btn btn-primary"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper">
      <nav-side :classCity="classCity"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Location / City</p>
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
                        >Create New City</button>
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
                    <div class="col-sm-12 m-b-xs">
                      <select v-model="countryID" class="form-control m-b" @change="filterByState">
                        <option disabled selected value="null" key="null">Please Select Country Name</option>
                        <option v-for="cout in country" :value="cout.id" :key="cout">{{cout.name}}</option>
                      </select>
                    </div>
                    <div class="col-sm-12 m-b-xs">
                      <select v-model="stateID" class="form-control m-b" @change="getCity">
                        <option disabled selected value="null" key="null">Please Select State Name</option>
                        <option v-for="st in state" :value="st.id" :key="st">{{st.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table
                      v-show="!messageCity && !message"
                      class="table table-striped table-bordered table-hover dataTables-example"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone,tablet">City ID</th>
                          <th data-hide="phone,tablet">City</th>
                          <th data-hide="phone,tablet">Created Date</th>
                          <th data-hide="phone,tablet">Last Updated Date</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="cit in city" :key="cit" class="gradeU">
                          <td class="center">{{cit.id}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              data-toggle="modal"
                              data-target="#myModalUpdate"
                              @click="viewCity(cit.id)"
                            >{{cit.name}}</a>
                          </td>
                          <td class="center">{{cit.createDate || 'NA'}}</td>
                          <td class="center">{{cit.updateDate || 'NA'}}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="5">
                            <ul class="pagination float-right"></ul>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div
                      class="alert alert-primary col-sm-12 m-b-xs"
                      v-show="errorResult === true"
                      role="alert"
                    >{{message}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageCity"
                      role="alert"
                    >{{messageCity}}</div>
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
import NavBar from "../NavBar";
import NavSide from "../NavSide";
import MainFooter from "../MainFooter";
import SearchData from "../../services/SearchData";
import AddCity from "./PageAdd/AddCity";

import DateFormat from "../../services/DateFormat";
import LastUpdatedDate from "../../services/LastUpdatedDate";
import CarParkService from "../../services/CarParkService";
import qs from "qs";

export default {
  name: "City",
  props: ["stateID1"],
  data() {
    return {
      name: null,
      dateCreated: null,
      dateupdated: null,
      state: null,
      stateID: null,
      countryID: null,
      country: null,
      cityID: null,
      city: null,
      isBoxOpen: false,
      isBoxUpdated: false,
      cityName: null,

      result: true,
      countryID1: null,
      message: "",
      messageCity: null,

      searchResult: "",
      selectedCity: null,
      errorResult: false,
      classCity: true
    };
  },
  methods: {
    clickedShowDetailModal(value) {
      this.isBoxUpdated = true;

      this.countryID = value;
      this.loadData(value);
      console.log("CountryID", value);
    },
    clickedShowDetailModal1(value) {
      this.stateID = value;
      setTimeout(() => {
        this.filterByState(value);
      }, 500);
    },
    handleCreate(countryID, stateID) {
      console.log(countryID);
      console.log(stateID);
    },
    createModal() {
      $("#myModalAdd").modal("show");
      this.isBoxOpen = true;
    },

    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.getCity();
      }
      SearchData.findSearchResult(
        `carpark?search=${this.searchResult}&stateID=${this.stateID}`
      ).then(response => {
        this.city = response.data;
        DateFormat.dateProcees(this.city);
        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.city.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
    },
    viewCity(value) {
      CarParkService.viewCarPark(
        `country/${this.countryID}/state/${this.stateID}/city`,
        value
      ).then(response => {
        this.selectedCity = response.data;
        DateFormat.dateProcees(this.selectedCity);
        this.selectedCity.forEach(el => {
          this.cityName = el.name;
          this.cityID = el.id;
          this.name = el.name;
          this.dateCreated = el.createDate;
          if (el.updateDate === 0) {
            this.dateupdated = "NA";
          } else {
            this.dateupdated = el.updateDate;
          }
        });
      });
    },
    viewCityUpdate(value) {
      $("#myModalUpdate").modal("show");
      CarParkService.viewCarPark(
        `country/${this.countryID}/state/${this.stateID}/city`,
        value
      ).then(response => {
        this.selectedCity = response.data;
        this.showSelectedCity();
      });
    },
    updateCity(value) {
      this.validated = false;
      this.isBoxUpdated = true;
      CarParkService.updateData(
        `country/${this.countryID}/state/${this.stateID}/city`,
        value,
        qs.stringify({
          name: this.name,
          stateID: this.stateID
        })
      );
      this.loadData(this.countryID);
      this.filterByState(this.stateID);
      //this.getCity();
    },
    showSelectedCity() {
      this.selectedCity.forEach(el => {
        this.name = el.name;
        this.cityID = el.id;
      });
    },
    filterByState(value = 0) {
      CarParkService.viewData(`country/${this.countryID}/state`).then(
        response => {
          this.state = response.data;
          this.messageCity = "";
          if (this.state.length === 0) {
            this.messageCity = "No data available.";
          }
          if (value > 0 && this.isBoxUpdated) {
            this.stateID = value;
          } else {
            this.stateID = response.data[1].id;
          }
          this.getCity();
        }
      );
    },
    getCity() {
      CarParkService.viewData(
        `country/${this.countryID}/state/${this.stateID}/city`
      ).then(response => {
        this.city = response.data;
        DateFormat.dateProcees(this.city);
        LastUpdatedDate.dataSorting(this.city);
        if (this.isBoxOpen) {
          this.isBoxOpen = false;
        }
        this.messageCity = "";
        if (this.city.length === 0) {
          this.messageCity = "No data available.";
        }
      });
    },
    loadData(value = 2, add = 0) {
      CarParkService.fetchAllData("country")
        .then(response => {
          this.country = response.data;
          this.messageCity = "";
          if (this.country.length === 0) {
            this.messageCity = "No data available.";
          } else {
            this.countryID = value;
            if (!this.isBoxUpdated) {
              this.filterByState();
            }
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
    AddCity
  },
  created() {
    this.loadData();
  }
};
</script>
