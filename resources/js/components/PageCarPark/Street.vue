<template>
  <div>
    <div id="wrapper">
      <nav-side :classStreet="classStreet"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Car Park / Street</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                      <!-- <pagination v-model="page" :per-page="30" :records="20" @paginate="paginateNum"></pagination> -->
                      <paginate
                        v-show="notFound"
                        :page-count="count"
                        :page-range="3"
                        :pageCount="1"
                        :margin-pages="2"
                        :click-handler="paginateNum"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'"
                        :page-class="'page-item'"
                      ></paginate>
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

                    <div class="col-sm-12 m-b-xs" style="margin-bottom:20px;">
                      <chosen-select
                        v-model="operatorID"
                        class="chosen-select form-control m-b"
                        v-if="operatorID && operators.length > 0"
                        data-vv-as="operatorID"
                        ref="input"
                        v-on:input="onChangeOperator(operatorID)"
                      >
                        <option disabled :value="null" key="null">{{title}}</option>
                        <option
                          v-for="(op, index) in operators"
                          :value="op.id"
                          :key="index"
                        >{{op.name}}</option>
                      </chosen-select>
                    </div>
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:20px;">
                      <chosen-select
                        v-model="carparkID"
                        data-vv-as="carparkID"
                        class="chosen-select form-control m-b"
                        v-on:input="onChangeCarPark(carparkID)"
                      >
                        <option
                          :disabled="carparkID && carpark.length > 0"
                          selected
                          value="null"
                          key="null"
                        >{{!messagePasscard ? 'Please Select Car Park Name' : 'Please Select Car Park Name'}}</option>
                        <option
                          v-for="(car, index) in carpark"
                          :value="car.id"
                          :key="index"
                        >{{car.carparkCode + ' - '}}{{car.name}}</option>
                      </chosen-select>
                    </div>
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:20px;">
                      <chosen-select
                        v-model="zoneID"
                        data-vv-as="zoneID"
                        class="chosen-select form-control m-b"
                        v-on:input="onChangeZone(zoneID)"
                      >
                        <option
                          :disabled="carparkID && carpark.length > 0"
                          selected
                          value="null"
                          key="null"
                        >{{!notFound1 ? 'Please Select Zone Name' : 'Please Select Zone Name'}}</option>
                        <optgroup value v-if="notFound1">
                          <option selected :value="0" key="null">All Zone</option>
                          <option v-for="(z, index) in zone" :value="z.id" :key="index">{{z.name}}</option>
                        </optgroup>
                      </chosen-select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table
                      v-show="!messageStreet && !message"
                      class="table table-striped table-bordered table-hover dataTables-example"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone,tablet">No.</th>
                          <th data-hide="phone,tablet">Street Name</th>
                          <th data-hide="phone,tablet">Tandem-Reserved</th>
                          <th data-hide="phone,tablet">Reserved</th>

                          <th data-hide="phone,tablet">Non-Reserved</th>
                          <th data-hide="phone,tablet">Motorcycle</th>
                          <th data-hide="phone,tablet">Visitor</th>
                          <th data-hide="phone,tablet">Total</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(s, index) in streets" :key="index" class="gradeX">
                          <td class="center">{{s.count}}</td>
                          <td class="center">{{s.name || 'NA'}}</td>
                          <td class="center">{{s.TandemCount || '0'}}</td>
                          <td class="center">{{s.ReservedCount || '0'}}</td>
                          <td class="center">{{s.NonReservedCount || '0'}}</td>
                          <td class="center">{{s.MotorcycleCount || '0'}}</td>
                          <td class="center">{{s.VisitorCount || '0'}}</td>
                          <td class="center">{{s.TOTALBAY || '0'}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-show="errorResult === true"
                      role="alert"
                    >{{message}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-show="messageStreet || messageZone"
                      role="alert"
                    >{{messageStreet}}</div>
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

import DateFormat from "../../services/DateFormat";
import LastUpdatedDate from "../../services/LastUpdatedDate";
import CarParkService from "../../services/CarParkService";
import Sequence from "../../services/Sequence";

export default {
  name: "Street",
  data() {
    return {
      carpark: null,
      count: null,
      zone: null,
      name: null,
      image: null,
      messageZone: null,
      file: null,
      streets: null,
      streetID: null,
      zoneID: null,
      notFound1: true,

      selectedStreet: null,
      carparkID: null,
      validated: false,
      zoneName: null,
      notFound: true,
      zoneSelect: "Please Select Zone Name",
      operatorID: null,
      operators: null,
      result: true,
      message: "",
      messageStreet: null,
      searchResult: "",
      errorResult: false,
      mySearch: null,
      pg: 1,
      classStreet: true
    };
  },
  methods: {
    onChangeOperator: function(val) {
      this.loadData();
    },
    onChangeCarPark: function(val) {
      this.filterZone();
    },
    onChangeZone: function(val) {
      this.filterZoneByStreet();
    },

    paginateNum(pageNum) {
      this.pg = pageNum;
      this.filterZoneByStreet(this.pg);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.filterZoneByStreet();
      }
      if (this.zoneID == 0) {
        this.mySearch = `street?search=${this.searchResult}&carparkID=${
          this.carparkID
        }`;
      } else {
        this.mySearch = `street?search=${this.searchResult}&carparkID=${
          this.carparkID
        }&zoneID=${this.zoneID}`;
      }
      SearchData.findSearchResult(this.mySearch).then(response => {
        this.streets = response.data.result;
        DateFormat.dateProcees(this.streets);
        Sequence.dataSequences(this.streets, 1, this.count);
        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.streets.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
    },
    filterZone() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark/${this.carparkID}/zone`
      ).then(response => {
        this.zone = response.data.result;
        this.messageStreet = "";
        this.messageZone = "";
        if (this.zone.length === 0) {
          this.notFound1 = false;
          this.messageStreet = "No data available.";
          this.messageZone = "No data available.";
        } else {
          this.notFound1 = true;
          this.zoneID = 0;
          this.filterZoneByStreet();
        }
      });
    },
    filterZoneByStreet(value = 1) {
      if (this.zoneID == 0) {
        this.loadAllZone();
        return 0;
      }
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark/${this.carparkID}/zone/${
          this.zoneID
        }/street?sort=createDate`
      ).then(response => {
        this.streets = response.data.result;
        this.count = Math.ceil(response.data.count / 100);
        if (this.streets.length < 100) {
          this.count = value;
        }
        Sequence.dataSequences(this.streets, value, this.count);
        this.messageStreet = "";
        if (this.streets.length === 0) {
          this.messageStreet = "No data available.";
        }
      });
    },

    loadData() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark?sort=createDate`
      ).then(response => {
        this.carpark = response.data.result;
        if (this.carpark.length === 0) {
          this.notFound = false;
          this.notFound1 = false;

          this.messageStreet = "No data available.";
          return 0;
        }

        this.notFound = true;
        this.notFound1 = true;

        this.zoneSelect = "All Zone";
        this.carparkID = response.data.result[0].id;
        this.filterZone();
      });
    },
    loadAllZone() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/street?carparkID=${
          this.carparkID
        }?sort=createDate`
      ).then(response => {
        this.streets = response.data.result;

        Sequence.dataSequences(this.streets, 1, this.count);
        this.messageStreet = "";
        if (this.streets.length === 0) {
          this.messageStreet = "No data available.";
        }
      });
    },
    filterOperator() {
      CarParkService.fetchAllData("operator?sort=createDate").then(response => {
        this.operators = response.data.result;
        if (this.operators.length > 0) {
          this.operatorID = response.data.result[0].id;
          this.loadData();
        } else {
          this.messageStreet = "No data available.";
        }
      }).catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    }
  },
  components: {
    NavSide,
    NavBar,
    MainFooter
  },

  mounted() {
    this.filterOperator();
  }
};
</script>
