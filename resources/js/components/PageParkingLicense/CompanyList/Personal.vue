<template>
  <div>
    <div id="wrapper">
      <nav-side :classPersonal="classPersonal" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Parking License / Customer List / Personal</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
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
                      <div
                        style="margin-bottom: 10px;"
                      >{{'View ' + start + '-' + total + ' ' + ' of ' + ' ' + total}}</div>
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
                        <option :value="0" key="0">{{'All Operators'}}</option>
                        <option
                          v-for="(op, index) in operators"
                          :value="op.id"
                          :key="index"
                        >{{op.name}}</option>
                      </chosen-select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table v-show="!messageCar > 0 && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Personal Full Name</th>
                          <th>NIRC</th>
                          <th>Operator</th>
                          <th>Created Date</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(personal, index) in personals" :key="index" class="gradeX">
                          <td class="center">{{personal.count}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              :href="`/v1/license/customer-list/personal/view?customerID=${personal.id}`"
                            >{{personal.name}}</a>
                          </td>
                          <td class="center">{{personal.nationalID}}</td>
                          <td class="center">{{personal.operatorName || 'NA'}}</td>
                          <td class="center">{{personal.createDate}}</td>
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
        <MainFooter />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../NavBar";
import NavSide from "../../NavSide";
import MainFooter from "../../MainFooter";
import SearchData from "../../../services/SearchData";
import DateFormat from "../../../services/DateFormat";
import CarParkService from "../../../services/CarParkService";
import Sequence from "../../../services/Sequence";

export default {
  name: "Company",
  data() {
    return {
      personals: null,
      count: null,
      operatorID: null,
      operators: null,
      classPersonal: true,
      validated: false,
      messageCar: null,
      name: null,

      page: 10,
      total: null,
      start: 1,
      end: 100,

      title: "Please Select Operator Name",
      result: true,
      message: "",
      searchResult: "",
      errorResult: false,
      pg: 1,
      perPage: 100,

      objectSearch: null,
      objectLoadData: null
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
      if (this.operatorID === 0) {
        this.objectSearch = `customer?isCompany=0&search=${this.searchResult}`;
      } else {
        this.objectSearch = `operator/${this.operatorID}/customer?isCompany=0&search=${this.searchResult}`;
      }
      SearchData.findSearchResult(`${this.objectSearch}`).then(response => {
        this.personals = response.data.result;
        DateFormat.dateProcees(this.personals);
        Sequence.dataSequences(this.personals, 1, this.count);

        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.personals.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
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
      if (this.operatorID == 0) {
        this.loadAllOperator(value);
      }
      if (this.operatorID != 0) {
        console.log("allCustomer", this.operatorID)
        this.loadAllCustomer(value)
      }
    },
    loadAllCustomer(value) {
       this.objectLoadData = `operator/${this.operatorID}/customer?isCompany=1`;
        CarParkService.fetchAllData(
          `${this.objectLoadData}&page=${value}&sort=createDate`
        ).then(response => {
          this.personals = response.data.result;
          this.total = response.data.count;
          this.count = Math.ceil(response.data.count / 100);
          if (this.personals.length < 100) {
            this.count = value;
          }
          DateFormat.dateProcees(this.personals);
          Sequence.dataSequences(this.personals, value, this.count);

          if (value == 1) {
            this.start = 1;
            this.end = 100;
          } else {
            if (value === this.count && this.personals.length < 100) {
              this.start = Sequence.handleViewSquence();
              this.end = this.total;
            } else {
              this.start = Sequence.handleViewSquence() - 100;
              this.end = Sequence.handleEndSquence() - 101;
            }
          }

          this.messageCar = "";
          if (this.personals.length === 0) {
            this.messageCar = "No data available.";
          }
        });
    },
    loadAllOperator(value) {
      CarParkService.fetchAllData(`customer?isCompany=1&page=${value}&sort=createDate`).then(response => {
        this.personals = response.data.result;
        this.total = response.data.count;
        this.count = Math.ceil(response.data.count / 100);
        if (this.personals.length < 100) {
          this.count = value;
        }
        DateFormat.dateProcees(this.personals);
        Sequence.dataSequences(this.personals, value, this.count);

        if (value == 1) {
          this.start = 1;
          this.end = 100;
        } else {
          if (value === this.count && this.personals.length < 100) {
            this.start = 101;
            this.end = this.total;
          } else {
            this.start = Sequence.handleViewSquence() - 100;
            this.end = Sequence.handleEndSquence() - 101;
          }
        }

        this.messageCar = "";
        if (this.personals.length === 0) {
          this.messageCar = "No data available.";
        }
      });
    }
  },
  mounted() {
    this.loadOperator();
  },
  components: {
    MainFooter,
    NavBar,
    NavSide
  }
};
</script>
