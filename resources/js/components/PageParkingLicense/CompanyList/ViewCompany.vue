<template>
  <div>
    <div id="wrapper">
      <NavSide :classCompany="classCompany" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Parking License / Customer List / Company</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-md-12">
              <div class="col-md-6" v-for="error in errors" :key="error">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  {{error}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="animated fadeInRight">
          <div class="row">
            <div class="col-md-12">
              <div class="col-md-6" v-for="error in errors" :key="error">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  {{error}}
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="ibox-title">
                    <h4>{{companyName}}</h4>
                    <h4>Company Profile</h4>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-12">
                            <label class="col-form-label">Company Name *</label>
                            <div class="input-group">
                              <input
                                disabled
                                v-model="companyName"
                                type="text"
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <label class="col-form-label">Company Reg No. *</label>
                            <div class="input-group">
                              <input disabled v-model="regNo" type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <label class="col-form-label">Address 1 *</label>
                            <div class="input-group">
                              <input disabled v-model="address1" type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <label class="col-form-label">Address 2 *</label>
                            <div class="input-group">
                              <input disabled v-model="address2" type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <label class="col-form-label">Address 3 *</label>
                            <div class="input-group">
                              <input disabled v-model="address3" type="text" class="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Postal Code for Car Park Billing Setting -->
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">Postal Code *</label>
                            <div class="input-group">
                              <input type="text" v-model="postalCode" disabled class="form-control" />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">City *</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="cityName" class="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">State *</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="stateName" class="form-control" />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Country *</label>
                            <div class="input-group">
                              <input
                                type="text"
                                disabled
                                v-model="countryName"
                                class="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4>Company Contact</h4>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">Company Telefone NO.</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="telephone" class="form-control" />
                              <span class="input-group-append">
                                <button type="button" class="btn btn-default">
                                  <i class="fa fa-phone"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Company Phone NO.</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="phone" class="form-control" />
                              <span class="input-group-append">
                                <button type="button" class="btn btn-default">
                                  <i class="fa fa-phone"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Company PIC Email</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="email" class="form-control" />
                              <span class="input-group-append">
                                <button type="button" class="btn btn-default">
                                  <i class="fa fa-email"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Company Fax No.</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="fax" class="form-control" />
                              <span class="input-group-append"></span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Company PIC Name</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="picName" class="form-control" />
                              <span class="input-group-append"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-4 col-sm-offset-2">
                      <a
                        href="/v1/license/customer-list/company"
                        class="btn btn-default btn-sm"
                      >Cancel</a>
                    </div>
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
import NavSide from "../../NavSide";
import NavBar from "../../NavBar";
import MainFooter from "../../MainFooter";
import DateFormat from "../../../services/DateFormat";

import CarParkService from "../../../services/CarParkService";

export default {
  name: "ViewCompany",
  data() {
    return {
      name: null,

      addressCustomer: null,
      company: null,
      companyName: null,
      regNo: null,

      staticAddress: null,

      address1: null,
      address2: null,
      address3: null,
      postalCode: null,

      phone: null,
      fax: null,
      picName: null,
      companyPicPhone: null,
      companyEmail: null,

      countryID: null,
      cityID: null,
      stateID: null,
      countryName: null,
      cityName: null,
      stateName: null,

      staticContact: null,

      classCompany: true,
      errors: [],
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  components: {
    NavSide,
    MainFooter,
    NavBar
  },
  methods: {
    loadData() {
      let value = this.$route.query.customerID;
      CarParkService.fetchAllData(`customer/${value}`).then(response => {
        this.company = response.data;
        this.showSelectedCarPark();
      });
    },

    showSelectedCarPark() {
      this.company.forEach(el => {
        this.companyName = el.name;
        this.regNo = el.nationalID;
        this.staticAddress = el.address1;
        this.staticContact = el.contact1;
      });
      this.loadAddress();
      this.loadContact();
    },
    loadCity(value) {
      CarParkService.fetchAllData(`city/${value}`).then(response => {
        this.cityName = response.data[0].name;
        this.stateID = response.data[0].stateID;
        this.loadState(this.stateID);
      });
    },
    loadState(value) {
      CarParkService.fetchAllData(`state/${value}`).then(response => {
        this.stateName = response.data[0].name;
        this.countryID = response.data[0].countryID;
        this.loadCountry(this.countryID);
      });
    },
    loadCountry(value) {
      CarParkService.fetchAllData(`country/${value}`).then(response => {
        this.countryName = response.data[0].name;
      });
    },

    loadAddress() {
      CarParkService.fetchAllData(`address/${this.staticAddress}`).then(
        response => {
          let res = JSON.parse(response.data[0].address);
          let parsedRes = JSON.parse(res);
          this.address1 = parsedRes["companyAddress1"];
          this.address2 = parsedRes["companyAddress2"];
          this.address3 = parsedRes["companyAddress3"];
          this.postalCode = parsedRes["companyAddressPostalCode"];
          this.cityID = parseInt(parsedRes["companyAddressCityID"]);
          this.loadCity(this.cityID);
        }
      );
    },
    loadContact() {
      CarParkService.fetchAllData(`contact/${this.staticContact}`).then(
        response => {
          let res = JSON.parse(response.data[0].contact);
          let parsedRes = JSON.parse(res);
          this.phone = parsedRes["companyPICphone"];
          this.telephone = parsedRes["companyTelephone"];
          this.fax = parsedRes["companyFax"];
          this.picName = parsedRes["companyPICname"];
          this.companyEmail = parsedRes["companyPICemail"];
        }
      );
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>


