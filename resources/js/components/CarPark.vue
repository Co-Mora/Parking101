<template>
  <div>
    <div class="ibox-title">
      <p>Home / Car Park</p>
    </div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox">
            <div class="ibox-content">
              <div class="row">
                <div class="col-lg-6">
                  <div
                    style="margin-bottom: 10px;"
                  >{{'View ' + start + '-' + end + ' ' + ' of ' + ' ' + total}}</div>
                  <paginate
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
                    <option v-for="(op, index) in operators" :value="op.id" :key="index">{{op.name}}</option>
                  </chosen-select>
                </div>
              </div>
              <div class="table-responsive">
                <table v-show="!messageCar > 0 && !message" class="table table-bordered">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>State</th>
                      <th>City</th>
                      <th>CP ID</th>
                      <th>CP Code</th>
                        <th>Car Park</th>
                        <th>ParkAide Car Park ID</th>
                      <th>Total Bay</th>
                      <th>Is Enable</th>
                      <th>Date Created</th>
                    </tr>
                  </thead>
                  <tbody v-if="result == true && errorResult === false">
                    <tr v-for="(car, index) in carpark" :key="index" class="gradeX">
                      <td class="center">{{car.count}}</td>
                      <td class="center">{{car.cityID}}</td>
                      <td class="center">{{car.cityID}}</td>
                      <td class="center">{{car.id}}</td>
                      <td class="center">{{car.carparkCode}}</td>
                        <td class="center">{{car.name}}</td>
                        <td class="center">
                        <a
                          style="color:#3498db"
                          @click="carParkValue(car.id)"
                          :href="`/v1/carpark/view?carparkID=${car.id}`"
                        >{{car.code1}}</a>
                      </td>
                      <td class="center">{{car.bay}}</td>
                      <td class="center">
                        <span
                          :class="{ 'label label-primary': car.isEnable == 1, 'label-danger': car.isEnable == 0, 'label-danger': car.isEnable == null }"
                          class="float-left label"
                        >{{car.isEnable == 1 ? 'Enable' : 'Disable'}}</span>
                      </td>
                      <td class="center">{{car.createDate}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr></tr>
                  </tfoot>
                </table>
                <div
                  class="alert alert-warning col-sm-12 m-b-xs"
                  v-show="errorResult === true && !messageCar"
                  role="alert"
                >{{message}}</div>
                <div
                  class="alert alert-warning col-sm-12 m-b-xs"
                  v-if="messageCar"
                  role="alert"
                >{{messageCar}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SelectData = require("./PageBasic/SelectData.vue");
import qs from "qs";
import SearchData from "../services/SearchData";
import DateFormat from "../services/DateFormat";
import LastUpdatedDate from "../services/LastUpdatedDate";
import CarParkService from "../services/CarParkService";
import Sequence from "../services/Sequence";

export default {
  name: "CarPark",
  data() {
    return {
      carpark: null,
      count: null,
      carparkID: null,
      carparkName: null,
      operatorID: null,
      operators: null,
      validated: false,
      selectedCarpark: null,
      messageCar: null,
      name: null,
      file: null,
      image: null,
      page: 10,
      city: null,
      state: null,
      states: [],
      total: null,
      start: 1,
      end: 100,

      data: [],
      title: "Please Select Operator Name",
      result: true,
      message: "",
      searchResult: "",
      errorResult: false,
      pg: 1,
      perPage: 100
    };
  },
  methods: {

    onChangeOperator: function(val) {
      this.paginateNum(1);
    },
    paginateNum(pageNum) {
      this.pg = pageNum;
      this.loadData(pageNum);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadData(1);
        return 0;
      }
      SearchData.findSearchResult(`operator/${this.operatorID}/carpark?search=${this.searchResult}`).then(
        response => {
          this.carpark = response.data.result;
          DateFormat.dateProcees(this.carpark);
          Sequence.dataSequences(this.carpark, 1, this.count);

          this.errorResult = false;
          this.message = "";
          this.result = true;
          if (this.carpark.length === 0) {
            this.errorResult = true;
            this.result = true;
            this.message = "No data available.";
          }
        }
      );
    },
    loadOperator() {
      CarParkService.fetchAllData(`operator?sort=createDate`)
        .then(response => {
          this.operators = response.data.result;
          if (this.operators.length > 0) {
            this.operatorID = response.data.result[0].id;
            this.loadData();
          } else {
            this.message = "No data available.";
          }
        })
        .catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    },
    loadData(value = 1) {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark?page=${value}&sort=createDate`
      ).then(response => {
        this.carpark = response.data.result;
        this.total = response.data.count;
        this.count = Math.ceil(response.data.count / 100);
        if (this.carpark.length < 100) {
          this.count = value;
        }
        
        DateFormat.dateProcees(this.carpark);
        Sequence.dataSequences(this.carpark, value, this.count);

        if (value == 1) {
          this.start = 1;
          this.end = 100;
        } else {
          if (value === this.count && this.carpark.length < 100) {
            this.start = Sequence.handleViewSquence();
            this.end = this.total;
          } else {
            this.start = Sequence.handleViewSquence() - 100;
            this.end = Sequence.handleEndSquence() - 101;
          }
        }

        this.messageCar = "";
        if (this.carpark.length === 0) {
          this.messageCar = "No data available.";
        }
      });
    }
  },
  components: {
    SelectData
  },

  mounted() {
    this.loadOperator();
  }
};
</script>
