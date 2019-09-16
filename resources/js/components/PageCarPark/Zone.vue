
<template>
  <div>
    <div id="wrapper">
      <nav-side :classZone="classZone"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Car Park / Zone</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox-content">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                      <paginate
                        v-show="!messageZone"
                        v-model="page"
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
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:10px;">
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
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:30px;">
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
                  </div>
                  <div class="table-responsive">
                    <table v-show="!messageZone && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Zone Name</th>
                          <th>Reserved</th>
                          <th>Tandem-Reserved</th>
                          <th>Non-Reserved</th>
                          <th>Motorcycle</th>
                          <th>Visitor</th>
                          <th>Total</th>
                          <th>Oversell (NR)</th>
                          <th>Total + Oversell (NR)</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(z, index) in zone" :key="index" class="gradeX">
                          <td class="center">{{z.count}}</td>
                          <td class="center">{{z.name || 'NA'}}</td>
                          <td class="center">{{z.ReservedCount || "0"}}</td>
                          <td class="center">{{z.TandemCount || "0"}}</td>
                          <td class="center">{{z.NonReservedCount || "0"}}</td>
                          <td class="center">{{z.MotorcycleCount || "0"}}</td>
                          <td class="center">{{z.VisitorCount || "0"}}</td>
                          <td class="center">{{z.TOTALBAY || "0"}}</td>
                          <td class="center">{{""}}</td>
                          <td class="center">{{""}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageZone"
                      role="alert"
                    >{{messageZone}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-show="errorResult === true"
                      role="alert"
                    >{{message}}</div>
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
import CarParkService from "../../services/CarParkService";
import Sequence from "../../services/Sequence";

export default {
  name: "Zone",
  data() {
    return {
      carpark: [],
      zone: null,
      name: null,
      count: null,
      operatorID: null,
      operators: null,

      validated: false,

      selectedZone: null,
      carparkID: "null",
      zoneID: null,
      carparkName: null,
      pg: 1,
      result: true,
      message: "",
      messageZone: null,
      searchResult: "",
      errorResult: false,
      classZone: true
    };
  },
  methods: {
    onChangeOperator: function(val) {
      this.loadData();
    },
    onChangeCarPark: function(val) {
      this.addZone();
    },
    paginateNum(pageNum) {
      this.pg = pageNum;
      this.addZone(pageNum);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.addZone();
      }

      SearchData.findSearchResult(
        `zone?search=${this.searchResult}&carparkID=${this.carparkID}`
      ).then(response => {
        this.zone = response.data.result;
        DateFormat.dateProcees(this.zone);
        Sequence.dataSequences(this.zone, 1, this.count);
        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.zone.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
    },
    addZone(value = 1) {
      CarParkService.viewData(
        `operator/${this.operatorID}/carpark/${
          this.carparkID
        }/zone?sort=createDate`
      ).then(response => {
        this.zone = response.data.result;
        this.count = Math.ceil(response.data.count / 100);
        if (this.zone.length < 100) {
          this.count = value;
        }
        DateFormat.dateProcees(this.zone);
        //LastUpdatedDate.dataSorting(this.zone);
        Sequence.dataSequences(this.zone, value, this.count);
        this.messageZone = "";
        if (this.zone.length === 0) {
          this.messageZone = "No data available.";
        }
      });
      this.carpark.forEach(el => {
        if (el.id === this.carparkID) {
          this.carparkName = el.name;
        }
      });
    },

    loadData() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark?sort=createDate`
      ).then(response => {
        this.carpark = response.data.result;
        if (this.carpark.length === 0) {
          this.messageZone = "No data available.";
        }
        this.classZone = true;
        this.carparkID = response.data.result[0].id;
        this.addZone();
      });
    },
    filterOperator() {
      CarParkService.fetchAllData("operator?sort=createDate").then(response => {
        this.operators = response.data.result;
        if ((this.operators.length > 0)) {
          this.operatorID = response.data.result[0].id;
          this.loadData();
        } else {
          this.messageZone = "No data available.";
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
