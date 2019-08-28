  <template>
  <div>
    <AddState
      v-on:click="createModal"
      :apiData="apiData"
      :countryID="countryID"
      :propertyLoc1="propertyLoc1"
      :propertyLoc2="propertyLoc2"
      :loadData="loadData"
    />
    <div class="modal inmodal" id="myModalUpdate" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">{{'Edit ' + stateName}}</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Country</label>
              <select disabled v-model="countryID" class="form-control m-b" @change="getState">
                <option disabled selected value="null" key="null">Please Select Country Name</option>
                <option v-for="cout in country" :value="cout.id" :key="cout">{{cout.name}}</option>
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
              <label>State</label>
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
              @click="updateState(stateID)"
              :disabled="validated == true"
              class="btn btn-primary"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper">
      <nav-side :classState="classState"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Location / State</p>
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
                        >Create New State</button>
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
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:20px;">
                      <chosen-select
                        v-model="countryID"
                        class="chosen-select form-control m-b"
                        v-if="countryID && country.length > 0"
                        data-vv-as="operatorID"
                        ref="input"
                        v-on:input="onChangeCountry(countryID)"
                      >
                        <option disabled value="null" key="null">Please Select Country Name</option>
                        <option v-for="cout in country" :value="cout.id" :key="cout">{{cout.name}}</option>
                      </chosen-select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table
                      v-show="!messageState  && !message"
                      class="table table-striped table-bordered table-hover dataTables-example"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone,tablet">State ID</th>
                          <th data-hide="phone,tablet">State</th>
                          <th data-hide="phone,tablet">Created Date</th>
                          <th data-hide="phone,tablet">Last Updated Date</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="sta in state" :key="sta" class="gradeU">
                          <td class="center">{{sta.id}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              data-toggle="modal"
                              data-target="#myModalUpdate"
                              @click="viewState(sta.id)"
                            >{{sta.name}}</a>
                          </td>
                          <td class="center">{{sta.createDate || 'Unknown'}}</td>
                          <td class="center">{{sta.updateDate || 'NA'}}</td>
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
                      v-if="messageState"
                      role="alert"
                    >{{messageState}}</div>
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
import qs from "qs";

import CreateModalBox from "../PageBasic/CreateModalBox";
import AddState from "./PageAdd/AddState";

export default {
  name: "State",
  data() {
    return {
      country: null,
      name: null,
      dateCreated: null,
      dateupdated: null,
      apiData: null,
      propertyLoc1: "Country",
      propertyLoc2: "State",
      countryID: null,
      stateID: null,
      state: null,
      stateName: null,
      selectedState: null,
      result: true,
      message: "",
      messageState: null,
      searchResult: "",
      errorResult: false,
      classState: true
    };
  },
  methods: {
    onChangeCountry: function(val) {
      this.getState();
    },
    createModal() {
      this.apiData = `state?countryID=${this.countryID}`;
      $("#myModalAdd").modal("show");
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.getState();
      }
      SearchData.findSearchResult(`state?search=${this.searchResult}`).then(
        response => {
          this.state = response.data;
          DateFormat.dateProcees(this.state);
          this.errorResult = false;
          this.message = "";
          this.result = true;
          if (this.state.length === 0) {
            this.errorResult = true;
            this.result = true;
            this.message = "No data available.";
          }
        }
      );
    },

    viewState(value) {
      CarParkService.viewCarPark(`country/${this.countryID}/state`, value).then(
        response => {
          this.selectedState = response.data;
          DateFormat.dateProcees(this.selectedState);
          this.selectedState.forEach(el => {
            this.stateID = el.id;
            this.stateName = el.name;
            this.name = el.name;
            this.dateCreated = el.createDate;
            if (el.updateDate === 0) {
              this.dateupdated = "NA";
            } else {
              this.dateupdated = el.updateDate;
            }
          });
        }
      );
    },
    updateState(value) {
      this.validated = false;

      CarParkService.updateData(
        `country/${this.countryID}/state`,
        value,
        qs.stringify({
          name: this.name
        })
      );
      this.loadData(this.countryID);
      this.getState(this.countryID);
    },
    showSelectedState() {
      this.selectedState.forEach(el => {
        this.name = el.name;
        this.stateID = el.id;
      });
    },
    getState() {
      CarParkService.viewData(`country/${this.countryID}/state`).then(
        response => {
          this.state = response.data;
          DateFormat.dateProcees(this.state);
          LastUpdatedDate.dataSorting(this.state);
          this.messageState = "";
          if (this.state.length === 0) {
            this.messageState = "No data available.";
          }
        }
      );
    },
    loadData(value = 2) {
      CarParkService.fetchAllData("country")
        .then(response => {
          this.country = response.data;
          this.messageState = "";
          if (this.country.length === 0) {
            this.messageState = "No data available.";
          } else {
            this.countryID = value;
            this.getState();
          }
        })
        .catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    }
  },
  components: {
    NavSide,
    NavBar,
    MainFooter,
    AddState
  },
  mounted() {
    this.loadData();
  }
};
</script>
