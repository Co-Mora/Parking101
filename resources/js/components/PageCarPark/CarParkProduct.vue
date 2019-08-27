
<template>
  <div>
    <div id="wrapper">
      <nav-side :classProduct="classProduct" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Car Park / Car Park Product</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox-content">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                      <paginate
                        v-show="!messageCarPark"
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
                        />
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
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:10px;">
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
                        >{{!messageCarPark ? 'Please Select Car Park Name' : 'Please Select Car Park Name'}}</option>
                        <option
                          v-for="(car, index) in carpark"
                          :value="car.id"
                          :key="index"
                        >{{car.carparkCode + ' - '}}{{car.name}}</option>
                      </chosen-select>
                    </div>
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:30px;">
                      <chosen-select
                        v-model="zoneID"
                        data-vv-as="zoneID"
                        class="chosen-select form-control m-b"
                        v-on:input="onChangeZone(zoneID)"
                      >
                        <option
                          :disabled="zoneID && zones.length > 0"
                          selected
                          value="null"
                          key="null"
                        >{{!messageCarPark ? 'Please Select Zone Name' : 'Please Select Zone Name'}}</option>
                        <option
                          v-for="(zone, index) in zones"
                          :value="zone.id"
                          :key="index"
                        >{{zone.name}}</option>
                      </chosen-select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table v-show="!messageCarPark && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Car Park</th>
                          <th>Zone</th>
                          <th>Product Name</th>
                          <th>Tenant Type</th>
                          <th>Bay Type</th>
                          <th>Alloc. Bay</th>
                          <th>Used Bay</th>
                          <th>Avai. Bay</th>
                          <th>Is Enable</th>
                          <th>Is Public</th>
                          <th>Fees</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(carpark, index) in carparkProduct" :key="index" class="gradeX">
                          <td class="center">{{carpark.count}}</td>
                          <td class="center">{{carparkName}}</td>
                          <td class="center">{{zoneName}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              :href="`/v1/carpark/product/view?carparkID=${carparkID}&zoneID=${zoneID}&seasonID=${carpark.id}`"
                            >{{carpark.name}}</a>
                          </td>
                          <td class="center">{{carpark.isTenant == 1 ? 'T' : 'NT'}}</td>
                          <td
                            class="center"
                          >{{carpark.bayType == 1 ? 'NR' : carpark.bayType == 2 ? 'R' : carpark.bayType == 3 ? 'TR' : 'M' }}</td>
                          <td class="center">{{carpark.TOTALBAY || "0"}}</td>
                          <td class="center">{{"0"}}</td>
                          <td class="center">{{"0"}}</td>
                          <td class="center">
                            <span
                              :class="{ 'label label-primary': carpark.isEnable == 1, 'label-danger': carpark.isEnable == 0, 'label-danger': carpark.isEnable == null }"
                              class="float-left label"
                            >{{carpark.isEnable == 1 ? 'Enable' : 'Disable'}}</span>
                          </td>
                          <td class="center">
                            <span
                              :class="{ 'label label-primary': carpark.isPublic == 1, 'label-danger': carpark.isPublic == 0, 'label-danger': carpark.isPublic == null }"
                              class="float-left label"
                            >{{carpark.isPublic == 1 ? 'Yes' : 'No'}}</span>
                          </td>
                           <td class="center">
                            <a
                              style="color:#3498db"
                              :href="`/v1/carpark/product/fees?carparkID=${carparkID}&zoneID=${zoneID}&seasonID=${carpark.id}`"
                            >{{"Fees"}}</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageCarPark"
                      role="alert"
                    >{{messageCarPark}}</div>
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
        <MainFooter />
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
  name: "CarParkProduct",
  data() {
    return {
      carpark: [],
      carparkProduct: null,
      carparkProductID: null,
      zones: null,
      name: null,
      count: null,
      operatorID: null,
      operators: null,

      validated: false,

      carparkID: "null",
      zoneID: null,
      carparkName: null,
      zoneName: null,
      pg: 1,
      result: true,
      message: "",
      items: [],
      messageCarPark: "No data available.",
      searchResult: "",
      errorResult: false,
      classProduct: true
    };
  },
  methods: {
    onChangeOperator: function(val) {
      this.loadCarPark();
    },
    onChangeCarPark: function(val) {
      this.loadCarParkZone();
    },
    onChangeZone: function(val) {
      this.loadCarParkProduct();
    },
    paginateNum(pageNum) {
      this.pg = pageNum;
      this.loadCarParkProduct(pageNum);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadCarParkProduct();
      }

      SearchData.findSearchResult(
        `season?search=${this.searchResult}&carparkID=${this.carparkID}&zoneID=${this.zoneID}&sort=createDate`
      ).then(response => {
        this.carparkProduct = response.data;
        DateFormat.dateProcees(this.carparkProduct);
        Sequence.dataSequences(this.carparkProduct, 1, this.count);
        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.carparkProduct.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
    },
    loadCarParkProduct(val = 1) {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark/${this.carparkID}/zone/${this.zoneID}/season?page=${val}&sort=createDate`
      ).then(response => {
        this.carparkProduct = response.data;
        this.count = Math.ceil(response.data.count / 100);
        if (this.carparkProduct.length < 100) {
          this.count = val;
        }
        DateFormat.dateProcees(this.carparkProduct);
        Sequence.dataSequences(this.carparkProduct, val, this.count);
        if (this.carparkProduct.length > 0) {
          this.loadCarParkName();
          this.loadCarParkZoneName();
          this.messageCarPark = null;
          this.classProduct = true;
          this.carparkProduct.forEach(el => {
            this.loadAllocBay(el.id);
          })
        } else {
          this.messageCarPark = "No data available.";
        }
      });
    },
    loadCarPark() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark?sort=createDate`
      ).then(response => {
        this.carpark = response.data.result;
        if (this.carpark.length > 0) {
          this.classZone = true;
          this.carparkID = response.data.result[0].id;
        } else {
          // this.messageCarPark = "No data available.";
        }
      });
    },
    loadCarParkZone() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark/${this.carparkID}/zone`
      ).then(response => {
        this.zones = response.data.result;
        if (this.zones) {
          this.zoneID = response.data.result[0].id;
          this.loadCarParkProduct();
        } else {
          // this.messageCarPark = "No data available.";
        }
      });
    },
    loadCarParkName() {
      CarParkService.fetchAllData(
        `carpark?carparkID=${this.carparkID}`
      ).then(response => {
        this.carparkName = response.data.result[0].name
      });
    },
    loadCarParkZoneName() {
      CarParkService.fetchAllData(
        `zone/${this.zoneID}`
      ).then(response => {
        this.zoneName = response.data[0].name
      });
    },
    filterOperator() {
      CarParkService.fetchAllData("operator?sort=createDate").then(response => {
        this.operators = response.data.result;
        if (this.operators.length > 0) {
          this.operatorID = response.data.result[0].id;
          this.loadCarPark();
        } else {
          // this.messageCarPark = "No data availab le.";
        }
      });
    },
    loadAllocBay(val) {
      CarParkService.fetchAllData(`bay?carparkID=${this.carparkID}&seasonID=${val}`).then(response => {
        this.carparkProduct.forEach(el => {
          if(el.id == val)
            el.TOTALBAY = response.data.count;
        })
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
