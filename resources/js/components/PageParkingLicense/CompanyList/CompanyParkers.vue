<template>
  <div>
    <div id="wrapper">
      <nav-side :classCompanyParkers="classCompanyParkers" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Parking License / Customer List / Company Parkers</p>
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
                        data-vv-as="operatorID"
                        v-if="operatorID && operators.length > 0"
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
                        v-model="customerID"
                        class="chosen-select form-control m-b"
                        data-vv-as="customerID"
                        ref="input"
                        v-on:input="onChangeCustomer(customerID)"
                      >
                        <option disabled :value="null" key="null">{{"Please Select Customer Name"}}</option>
                        <option
                          v-for="(customer, index) in customers"
                          :value="customer.id"
                          :key="index"
                        >{{customer.name + ' - '}}{{customer.nationalID}}</option>
                      </chosen-select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table v-if="!messageCar &&  !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Parker Full Name</th>
                          <th>Mobile No.</th>
                          <th>Car Plate</th>
                          <th>Email</th>
                          <th>Parking License</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr
                          v-for="(company, index) in companies"
                          v-on="loadParkingLicense(company.id)"
                          :key="index"
                          class="gradeX"
                        >
                          <td class="center">{{company.count}}</td>
                          <td class="center">{{company.name}}</td>
                          <td class="center">{{company.mobile}}</td>
                          <td class="center">{{company.car1 || 'NA'}}</td>
                          <td class="center">{{company.email}}</td>
                          <td class="center">{{company.car2 || 'NA'}}</td>
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
  name: "CompanyParkers",
  data() {
    return {
      companies: null,
      count: null,
      operatorID: null,
      operators: null,

      customerID: null,
      customers: null,

      validated: false,
      messageCar: "",
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
      classCompanyParkers: true,
      pg: 1,
      perPage: 100,
      licenseID: null,

      objectSearch: null,
      objectLoadData: null
    };
  },
  methods: {
    onChangeOperator: function(val) {
      this.loadCustomer();
    },
    onChangeCustomer: function(val) {
      this.loadData(1);
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

      this.objectSearch = `operator/${this.operatorID}/customer/${this.customerID}/parker?search=${this.searchResult}`;
      SearchData.findSearchResult(
        `operator/${this.operatorID}/customer?isCompany=1&search=${this.searchResult}`
      ).then(response => {
        this.companies = response.data.result;
        DateFormat.dateProcees(this.companies);
        Sequence.dataSequences(this.companies, 1, this.count);

        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.companies.length === 0) {
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
          this.messageCar = "";
          if (this.operators.length > 0) {
            this.operatorID = response.data.result[1].id;
            this.loadCustomer();
          } else {
            this.messageCar = "No data available.";
          }
        })
        .catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    },
    loadCustomer() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/customer?isCompany=1`
      )
        .then(response => {
          this.customers = response.data.result;
          this.messageCar = "";

          if (this.customers.length > 0) {
            this.customerID = response.data.result[0].id;
            this.loadData(1);
          } else {
            this.messageCar = "No data available.";
          }
        })
        .catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    },
    loadData(value = 1) {
      this.objectLoadData = `operator/${this.operatorID}/customer/${this.customerID}/parker`;
      CarParkService.fetchAllData(`${this.objectLoadData}`).then(response => {
        this.companies = response.data.result;

        this.messageCar = "";
        if (this.companies.length === 0) {
          this.messageCar = "No data available.";
        } else {
          this.total = response.data.count;
          this.count = Math.ceil(response.data.count / 100);
          if (this.companies.length < 100) {
            this.count = value;
          }
          DateFormat.dateProcees(this.companies);
          Sequence.dataSequences(this.companies, value, this.count);

          if (value == 1) {
            this.start = 1;
            this.end = 100;
          } else {
            if (value === this.count && this.companies.length < 100) {
              this.start = Sequence.handleViewSquence();
              this.end = this.total;
            } else {
              this.start = Sequence.handleViewSquence() - 100;
              this.end = Sequence.handleEndSquence() - 101;
            }
          }
        }
      });
    },

    loadParkingLicense(val) {
      CarParkService.fetchAllData(
        `lease?customerID=${this.customerID}&parkerID=${val}`
      ).then(response => {
        if (response.data.result.length > 0 && response.data.count > 0)
          this.licenseID = response.data.result[0].licenseID;
      });

      CarParkService.fetchAllData(`license/${this.licenseID}`).then(
        response => {
          if (response.data.length > 0) {
            this.companies.forEach(el => {
              el.car2 =
                "PL-" +
                response.data[0].carparkID +
                "-" +
                response.data[0].licenseOperatorNum;
            });
          }
        }
      );
    }
  },
  mounted() {
    this.loadOperator();
  },
  components: {
    NavSide,
    MainFooter,
    NavBar
  }
};
</script>
