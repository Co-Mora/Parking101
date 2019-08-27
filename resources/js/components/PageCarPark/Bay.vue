<template>
  <div>
    <div id="wrapper">
      <nav-side :classBay="classBay"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Car Park / Bay</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                        <paginate
                            v-if="!messageBay"
                            :page-count="count"
                            :page-range="3"
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
                        <option disabled :value="null" key="null">Please Select Operator Name</option>
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
                          :disabled="!messageBay"
                          value="null"
                          key="null"
                        >Please Select Car Park Name</option>
                        <optgroup v-if="!messageCarPark">
                          <option
                            v-for="(car, index) in carpark"
                            :value="car.id"
                            :key="index"
                          >{{car.carparkCode + ' - '}}{{car.name}}</option>
                        </optgroup>
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
                          :disabled="!messageBay || !messageCarPark"
                          selected
                          value="null"
                          key="null"
                        >Please Select Zone Name</option>
                        <option selected :value="0" v-if="!messageCarPark || !messageBay">All Zone</option>

                        <optgroup value v-if="!messageCarPark || !messageBay">
                          <option v-for="(z, index) in zone" :value="z.id" :key="index">{{z.name}}</option>
                        </optgroup>
                      </chosen-select>
                    </div>
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:20px;">
                      <chosen-select
                        v-model="streetID"
                        data-vv-as="streetID"
                        class="chosen-select form-control m-b"
                        v-on:input="onChangeStreet(streetID)"
                      >
                        <option
                          :disabled="!messageBay || !messageCarPark"
                          selected
                          value="null"
                          key="null"
                        >Please Select Street Name</option>
                        <option
                          :value="0"
                          selected
                          v-if="!messageCarPark || !messageStreet || !messageBay"
                        >All Street</option>

                        <optgroup value v-if="!messageCarPark || !messageStreet || !messageBay">
                          <option
                            v-for="(s, index) in streets"
                            :value="s.id"
                            :key="index"
                          >{{s.name}}</option>
                        </optgroup>
                      </chosen-select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table
                      v-show="!messageBay && !message"
                      class="table table-striped table-bordered table-hover dataTables-example"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone,tablet">No.</th>
                          <th data-hide="phone,tablet">Bay Name</th>
                          <th data-hide="phone,tablet">Bay Type</th>
                          <th data-hide="phone,tablet">Bay Latitude</th>
                          <th data-hide="phone,tablet">Bay Longitude</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(b, index) in bays" :key="index" class="gradeU">
                          <td class="center">{{b.count}}</td>
                          <td class="center">{{b.bayNum || 'NA'}}</td>
                          <td
                            class="center"
                          >{{b.bayTypeID == 2 ? 'Reserved' : b.bayTypeID == 3 ? 'Tandem-Reserved' : b.bayTypeID == 1 ? ' Non-Reserved' : b.bayTypeID == 4 ? 'Motorcycle' : b.bayTypeID == 5 ? 'Visitor': 'NA'}}</td>
                          <td class="center">{{b.lat || '0'}}</td>
                          <td class="center">{{b.lon || '0'}}</td>
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
                      v-show="messageBay || messageCarPark"
                      role="alert"
                    >{{messageBay || messageCarPark}}</div>
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
  name: "Bay",
  data() {
    return {
      carpark: null,
      zone: null,
      streets: null,
      count: null,
      streetID: null,

      pg: 1,
      operators: null,
      operatorID: null,
      object: null,
      object2: null,
      bays: null,
      bayID: null,
      zoneID: null,
      streetName: null,
      carparkID: null,
      selectedBay: null,

      notFound: false,
      result: true,
      message: "",
      messageBay: null,
      messageCarPark: null,
      messageZone: null,
      messageStreet: null,

      mySearch: null,
      searchResult: "",
      errorResult: false,
      classBay: true,
      notFound1: false,
      notFound2: false
    };
  },
  methods: {
    onChangeOperator: function(val) {
      this.loadData();
    },
    onChangeCarPark: function(val) {
      this.filterZone();
      console.log(val);
    },
    onChangeZone: function(val) {
      this.filterZoneByStreet();
      console.log("zONE:", val);
    },
    onChangeStreet: function(val) {
      this.filterZoneByBay();
    },
    paginateNum(pageNum) {
      this.pg = pageNum;
      this.filterZoneByBay(this.pg);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.filterZoneByBay(this.pg);
      }
      if (this.zoneID == 0 && this.streetID == 0) {
        this.mySearch = `bay?search=${this.searchResult}&carparkID=${
          this.carparkID
        }&page=${this.pg}&sort=createDate`;
      }
      if (this.zoneID !== 0 && this.streetID !== 0) {
        this.mySearch = `bay?search=${this.searchResult}&carparkID=${
          this.carparkID
        }&zoneID=${this.zoneID}&streetID=${this.streetID}&page=${
          this.pg
        }&sort=createDate`;
      }
      if (this.zoneID == 0 && this.streetID !== 0) {
        this.mySearch = `bay?search=${this.searchResult}&carparkID=${
          this.carparkID
        }&streetID=${this.streetID}&page=${this.pg}&sort=createDate`;
      }
      if (this.zoneID !== 0 && this.streetID == 0) {
        this.mySearch = `bay?search=${this.searchResult}&carparkID=${
          this.carparkID
        }&zoneID=${this.zoneID}&page=${this.pg}&sort=createDate`;
      }
      SearchData.findSearchResult(this.mySearch).then(response => {
        this.bays = response.data.result;
        DateFormat.dateProcees(this.bays);
        Sequence.dataSequences(this.bays, 1, this.count);
        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.bays.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
    },
    filterZone() {
      if (this.carparkID == 0) {
        return 0;
      }
      CarParkService.fetchAllData(`carpark/${this.carparkID}/zone`).then(
        response => {
          this.zone = response.data.result;
          this.streetID = 0;
          this.messageZone = "";
          this.zoneID = 0;
          if (this.zone.length === 0) {
            this.messageZone = "No data available.";
          }

          this.filterZoneByStreet();
        }
      );
    },
    filterZoneByStreet() {
      if (this.zoneID == 0) {
        this.object = `operator/${this.operatorID}/street?carparkID=${
          this.carparkID
        }`;
      } else {
        this.object = `operator/${this.operatorID}/street?carparkID=${
          this.carparkID
        }&zoneID=${this.zoneID}`;
      }
      CarParkService.fetchAllData(this.object).then(response => {
        this.streets = response.data.result;
        this.messageStreet = "";
        this.messageBay = "";
        if (this.streets.length === 0) {
          this.notFound2 = true;
          this.messageStreet = "No data available.";
        }

        this.filterZoneByBay(this.pg);
      });
    },
    filterZoneByBay(value = 1) {
      if (this.zoneID == 0 && this.streetID == 0) {
        this.loadAllBay(this.pg);
        return 0;
      }
      if (this.streetID == 0 && this.zoneID !== 0) {
        this.object2 = `operator/${this.operatorID}/bay?carparkID=${
          this.carparkID
        }&zoneID=${this.zoneID}&page=${value}&sort=createDate`;
      }
      if (this.streetID !== 0 && this.zoneID == 0) {
        this.object2 = `operator/${this.operatorID}/bay?carparkID=${
          this.carparkID
        }&streetID=${this.streetID}&page=${value}&sort=createDate`;
      }
      CarParkService.fetchAllData(this.object2).then(response => {
        this.bays = response.data.result;
        this.messageBay = "";
        this.count = Math.ceil(response.data.count / 100);
        console.log(this.count);
        if (this.bays.length < 100) {
          this.count = value

        }
        Sequence.dataSequences(this.bays, value, this.count);
        if (this.bays.length === 0) {
          this.messageBay = "No data available.";
        }
      });
    },
    loadAllBay(value = 1) {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/bay?carparkID=${
          this.carparkID
        }&page=${value}`
      ).then(response => {
        this.bays = response.data.result;
        this.count = Math.ceil(response.data.count / 100);
          console.log(this.count);

          if (this.bays.length < 100) {
          this.count = value;
        }
        Sequence.dataSequences(this.bays, value, this.count);
        this.messageBay = "";
        if (this.bays.length === 0) {
          this.messageBay = "No data available.";
        }
      });
    },

    loadData() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark?sort=createDate`
      ).then(response => {
        this.carpark = response.data.result;
        this.messageCarPark = "";
        this.messageBay = "";
        if (this.carpark.length === 0) {
          this.notFound = true;
          this.messageBay = "No data available.";
          this.messageCarPark = "No data available.";
          return 0;
        }
        this.notFound = false;
        this.carparkID = response.data.result[0].id;

        this.filterZone();
      });
    },

    filterOperator() {
      CarParkService.fetchAllData("operator?sort=createDate").then(response => {
        this.operators = response.data.result;
        if (this.operators.length > 0) {
          this.operatorID = response.data.result[0].id;
          this.loadData();
        } else {
          this.messageCarPark = "No data available.";
        }
      }).catch(ex => {
          this.$router.push({ name: "login" });
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
