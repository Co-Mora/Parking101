<template>
  <div>
    <div id="wrapper">
      <NavSide :classProduct="classProduct" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Car Park / Product</p>
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
                <div class="ibox-title">
                  <h4>{{carParkProductName}}</h4>
                  <h4>Product Management</h4>
                </div>
                <div class="ibox-content">
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Car Park</label>
                      <div class="col-sm-12">
                        <input
                          disabled
                          v-model="carParkName"
                          placeholder
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Zone</label>
                      <div class="col-sm-12">
                        <input
                          v-model="zoneName"
                          placeholder
                          disabled
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Product Name *</label>
                      <div class="col-sm-12">
                        <input
                          v-model="carParkProductName"
                          placeholder
                          disabled
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="hr-line-dashed"></div>
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-12">
                            <label class="col-form-label">Description</label>
                            <div class="input-group">
                              <textarea disabled v-model="carParkProductName" class="form-control"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>Bay Setting</h4>
                  </div>
                  <div class="hr-line-dashed"></div>
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">Tenant Type *</label>

                            <div class="i-checks">
                              <label>
                                <input type="checkbox" :checked="isTenant == 1" />
                                <i style="margin-left:10px"></i> Tenant
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input type="checkbox" :checked="isTenant != 1"/>
                                <i style="margin-left:10px"></i> Non-Tenant
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Bay Type *</label>
                            <div class="i-checks">
                              <label>
                                <input type="checkbox" />
                                <i style="margin-left:10px"></i> Reserved
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input type="checkbox" />
                                <i style="margin-left:10px"></i> Tandom-Reserved
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input type="checkbox" />
                                <i style="margin-left:10px"></i> Motorcycle
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hr-line-dashed"></div>
                  <h4>Car Park Operation</h4>
                  <div class="hr-line-dashed"></div>

                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-form-label">ParkAide Car Park ID</label>
                          <div class="input-group">
                            <input type="text" disabled v-model="parkAideID" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hr-line-dashed"></div>
                  <!--  Car Park Product COUNT -->
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-form-label">Bay Slots (Tandem-Reversed)*</label>
                          <div class="input-group">
                            <input v-model="reactivation" type="number" class="form-control" />
                          </div>
                          <label
                            style="font-size: 10px"
                            class="col-form-label"
                          >* Set the number of parker and number of passcard per product subscription.</label>
                        </div>
                        <div class="col-md-6">
                          <label class="col-form-label">Allocate Bay Count</label>
                          <div class="input-group">
                            <input v-model="reinstatement" type="number" class="form-control" />
                          </div>
                          <label
                            style="font-size: 10px"
                            class="col-form-label"
                          >Fill in this field to set a limited bay count to this product. Leave it blank for auto allocation from Pool.</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--  Car Park Product Setting -->
                  <h4>Product Setting</h4>
                  <div class="hr-line-dashed"></div>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-form-label">Product Start Date *</label>
                          <div class="input-group">
                            <input type="text" v-model="startDate" class="form-control" />
                            <span class="input-group-append">
                              <button type="button" class="btn btn-default">
                                <i class="fa fa-calendar"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <label class="col-form-label">Product End Date *</label>
                          <div class="input-group">
                            <input type="text" v-model="endDate" class="form-control" />
                            <span class="input-group-append">
                              <button type="button" class="btn btn-default">
                                <i class="fa fa-calendar"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-form-label">Minimum Parking Duration*</label>
                          <div class="input-group">
                            <input v-model="reactivation" type="number" class="form-control" />
                          </div>
                          <label
                            style="font-size: 10px"
                            class="col-form-label"
                          >* Set the number of parker and number of passcard per product subscription.</label>
                        </div>
                        <div class="col-md-6">
                          <label class="col-form-label">Termination Notice Period</label>
                          <div class="input-group">
                            <input v-model="reinstatement" type="number" class="form-control" />
                          </div>
                          <label
                            style="font-size: 10px"
                            class="col-form-label"
                          >Fill in this field to set a limited bay count to this product. Leave it blank for auto allocation from Pool.</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">Tenant Type *</label>

                            <div class="i-checks">
                              <label>
                                <input type="checkbox" />
                                <i style="margin-left:10px"></i> Is Enabled Product
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input type="checkbox" />
                                <i style="margin-left:10px"></i> Is Public Visible Product
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input type="checkbox" />
                                <i style="margin-left:10px"></i> Is Priority Passcard Issuance
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input type="checkbox" />
                                <i style="margin-left:10px"></i> Is Entitlement Product
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4>Termination Application T&C</h4>
                  <div class="hr-line-dashed"></div>
                  <div class="wrapper wrapper-content">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="ibox">
                          <div class="ibox-content no-padding">
                            <div class="summernote"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-4 col-sm-offset-2">
                      <a href="/v1/carpark/product" class="btn btn-default btn-sm">Cancel</a>
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
import qs from "qs";

export default {
  name: "ViewCarParkProduct",
  data() {
    return {
      carparkProduct: null,
      carParkProductName: null,

      carparkName: null,
      zoneName: null,

      name: null,

      address1: null,
      address2: null,
      address3: null,
      postalCode: null,

      isTenant: null,

      phone1: null,
      phone2: null,

      startHour: null,
      endHour: null,
      bayCount: null,

      image: null,
      classProduct: true,
      errors: [],
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
      let value = this.$route.query.carparkID;
      CarParkService.fetchAllData(
        `carpark/${value}/zone/${this.$route.query.zoneID}/season/${this.$route.query.seasonID}`
      ).then(response => {
        this.carparkProduct = response.data;
        this.showSelectedCarParkProduct();
      });
    },
    showSelectedCarParkProduct() {
      this.carparkProduct.forEach(el => {
        this.carParkProductName = el.name;
        this.isTenant = el.isTenant;
        console.log(this.isTenant)
      });
      this.loadCarParkZone();
      this.loadCarPark();
    },
    loadCarParkZone() {
      CarParkService.fetchAllData(`zone/${this.$route.query.zoneID}`).then(
        response => {
          this.zoneName = response.data[0].name;
        }
      );
    },
    loadCarPark() {
      CarParkService.fetchAllData(
        `carpark/${this.$route.query.carparkID}`
      ).then(response => {
        this.carparkName = response.data[0].name;
      });
    }
  },
  mounted() {
    this.loadData();

    $(document).ready(function() {
      $(".i-checks").iCheck({
        checkboxClass: "icheckbox_square-green",
        radioClass: "iradio_square-green"
      });
    });
    $(document).ready(function() {
      $(".summernote").summernote();
    });
  }
};
</script>


