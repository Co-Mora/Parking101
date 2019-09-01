<template>
  <div>
    <div id="wrapper">
      <NavSide :classCarPark="classCarPark" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Car Park</p>
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
                  <h4>{{carParkName}}</h4>
                  <h4>Car Park Management</h4>
                </div>
                <div class="ibox-content">
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Car Park Code*</label>
                      <div class="col-sm-12">
                        <input disabled v-model="code" placeholder type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Car Park Name*</label>
                      <div class="col-sm-12">
                        <input v-model="name" placeholder disabled type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="form-group row">
                      <label
                        class="col-sm-10 col-form-label"
                      >Car Park Image (Horizantal: 400 Vertical: 400)</label>
                      <div class="col-sm-10">
                        <img width="400" height="400" :src="image" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">Operating Start Hout</label>
                            <div class="input-group">
                              <input type="text" v-model="startHour" disabled class="form-control" />
                              <span class="input-group-append">
                                <button type="button" class="btn btn-default">
                                  <i class="fa fa-clock-o"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Operating End Hour</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="endHour" class="form-control" />
                              <span class="input-group-append">
                                <button type="button" class="btn btn-default">
                                  <i class="fa fa-clock-o"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Total Bay Count*</label>
                      <div class="col-sm-12">
                        <input
                          v-model="bayCount"
                          placeholder
                          disabled
                          type="text"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <h4>Car Park Contact</h4>
                  </div>
                  <div class="hr-line-dashed"></div>
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">Phone No. 1 *</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="phone1" class="form-control" />
                              <span class="input-group-append">
                                <button type="button" class="btn btn-default">
                                  <i class="fa fa-phone"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Phone No. 2 *</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="phone2" class="form-control" />
                              <span class="input-group-append">
                                <button type="button" class="btn btn-default">
                                  <i class="fa fa-phone"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>Car Park Address</h4>
                  </div>
                  <div class="hr-line-dashed"></div>

                  <div class="col-lg-12">
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Address 1 *</label>
                      <div class="col-sm-12">
                        <input disabled v-model="address1" type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Address 2 *</label>
                      <div class="col-sm-12">
                        <input v-model="address2" disabled type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Address 3 *</label>
                      <div class="col-sm-12">
                        <input v-model="address3" disabled type="text" class="form-control" />
                      </div>
                    </div>
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
                              <select disabled v-model="cityName" class="form-control m-b">
                                <option>{{cityName}}</option>
                              </select>
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
                              <select disabled v-model="stateName" class="form-control m-b">
                                <option>{{stateName}}</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Country *</label>
                            <div class="input-group">
                              <select disabled v-model="countryName" class="form-control m-b">
                                <option>{{countryName}}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>Car Park Geolocation</h4>
                  </div>
                  <div class="hr-line-dashed"></div>

                  <div class="form-group row">
                    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
                      <gmap-marker></gmap-marker>
                    </gmap-map>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-form-label">Latitude</label>
                          <div class="input-group">
                            <input type="text" v-model="lat" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <label class="col-form-label">Longitude</label>
                          <div class="input-group">
                            <input type="text" v-model="log" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4>Car Park Operation</h4>

                  <div class="hr-line-dashed"></div>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-form-label">Car Park Operation Start Date *</label>
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
                          <label class="col-form-label">Car Park Operation End Date *</label>
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
                  <h4>Car Park Setting</h4>
                  <div class="hr-line-dashed"></div>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-12">
                          <label class="col-form-label">Car Park Contract Type</label>
                          <div class="input-group">
                            <input type="text" disabled v-model="contractType" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4>Parking License Application Commencement Date*</h4>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="i-checks">
                            <label>
                              <input
                                type="checkbox"
                                id="allowHalf"
                              />
                              <i style="margin-left:10px"></i> Allow Half Month (1st & 16th)
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                  id="allowFull"
                                type="checkbox"

                              />
                              <i style="margin-left:10px"></i> Allow Full Month Only (1st)
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                  id="allowAny"
                                type="checkbox"

                              />
                              <i style="margin-left:10px"></i> Allow Any Day of Month
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hr-line-dashed"></div>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="i-checks">
                            <label>
                              <input
                                  v-model="parkaideEnable"

                                type="checkbox"
                                value="option1"
                                name="a"
                              />
                              <i style="margin-left:10px"></i> Enable Car Park
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                  v-model="exemptLatePay"

                                type="checkbox"
                                value="option1"
                                name="a"
                              />
                              <i style="margin-left:10px"></i> Exemption from Late Payment
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                type="checkbox"
                                v-model="exemptSST"

                                value="option1"
                                name="a"
                              />
                              <i style="margin-left:10px"></i> Exempted from SST
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                v-model="parkaideOnly"
                                type="checkbox"
                              />
                              <i style="margin-left:10px"></i> ParkAide Enable (Force)
                            </label>
                          </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="col-md-6">
                          <div class="i-checks">
                            <label>
                              <input
                                  v-model="suspendApplication"

                                type="checkbox"

                              />
                              <i style="margin-left:10px"></i> Suspend from Parking Application
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                  :checked="exemptStopbBill == 1"
                                type="checkbox"
                                :value="exemptStopbBill"
                                name="a"
                              />
                              <i style="margin-left:10px"></i> Exemption from Stop Billing
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                  :value="noSST"
                                  v-model="noSST"
                                  :checked="noSST == 1"
                                type="checkbox"

                              />
                              <i style="margin-left:10px"></i> Car Park No SST
                            </label>
                          </div>
                          <div class="i-checks">
                            <label>
                              <input
                                  v-model="parkaideEnable"
                                type="checkbox"

                              />
                              <i style="margin-left:10px"></i> ParkAide Enable (Optional)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <h4>Car Park Fees</h4>
                  <div class="hr-line-dashed"></div>
                  <!--  Car Park Fees -->
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-form-label">Reactivation Fee (RM)*</label>
                          <div class="input-group">
                            <input v-model="reactivation" type="number" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <label class="col-form-label">Reinstatement Fee (RM)*</label>
                          <div class="input-group">
                            <input v-model="reinstatement" type="number" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <label class="col-form-label">Late Payment Penalty (RM)*</label>
                          <div class="input-group">
                            <input v-model="latePenalty" type="number" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4>Car Park Billing Setting</h4>

                  <div class="hr-line-dashed"></div>
                  <!--  Car Park Billing -->
                  <div class="col-lg-12">
                    <div class="form-group row">
                      <label
                        class="col-sm-10 col-form-label"
                      >This info will appear on Parking License, Invoices, CN, DN and OR.</label>
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
                            <label class="col-form-label">SST Reg No.</label>
                            <div class="input-group">
                              <input disabled v-model="sstNumber" type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <label class="col-form-label">Address 1 *</label>
                            <div class="input-group">
                              <input
                                disabled
                                v-model="address1Billing"
                                type="text"
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <label class="col-form-label">Address 2 *</label>
                            <div class="input-group">
                              <input
                                disabled
                                v-model="address2Billing"
                                type="text"
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <label class="col-form-label">Address 3 *</label>
                            <div class="input-group">
                              <input
                                disabled
                                v-model="address3Billing"
                                type="text"
                                class="form-control"
                              />
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
                              <input
                                type="text"
                                v-model="postalCodeBilling"
                                disabled
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">City *</label>
                            <div class="input-group">
                              <select disabled v-model="cityBilling" class="form-control m-b">
                                <option>{{cityBilling}}</option>
                              </select>
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
                              <select disabled v-model="stateBilling" class="form-control m-b">
                                <option>{{stateBilling}}</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Country *</label>
                            <div class="input-group">
                              <select disabled v-model="countryBilling" class="form-control m-b">
                                <option>{{countryBilling}}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-md-6">
                            <label class="col-form-label">Telefone</label>
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
                            <label class="col-form-label">Email</label>
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
                            <label class="col-form-label">Fax</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="fax" class="form-control" />
                              <span class="input-group-append"></span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label class="col-form-label">Website</label>
                            <div class="input-group">
                              <input type="text" disabled v-model="website" class="form-control" />
                              <span class="input-group-append"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label class="col-form-label">Header Logo (1000px x 70px)</label>
                    <div class="fallback dropzone">
                      <img width="1000" height="70" :src="logoHeader" />
                    </div>
                    <label class="col-form-label">Footer Logo (1000px x 150px)</label>
                    <div class="fallback dropzone">
                      <img width="1000" height="150" :src="logoFooter" />
                    </div>
                    <div class="wrapper wrapper-content">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="ibox">
                            <div class="ibox-content no-padding">
                              <div class="summernote">
                                ** DUE AND PAYABLE BY THE 1ST OF EACH CALENDAR MONTH, OTHERWISE
                                <br />SEASON ACCESS WILL BE BLOCKED AND LATE PAYMENT CHARGES SHALL BE IMPOSED \nTO UNBLOCK CARD.
                                <br />** For any Termination of parking, ONE MONTH'S NOTICE is required by apply of Termination Application via our secured website.
                                <br />**Deposit (if any) will only be refunded if the access card is returned \nwithin 14 days after the termination date and after offsetting any \noutstanding balance in your account.
                                <br />** Online payment on our \nsecured website is strongly encouraged to update our system record \ninstantaneously and prevent card deactivation by the 7th of every month.\n Our secured website supports payment using credit cards, debit cards, \nMEPS and FPX for both personal and corporate banking. Alternatively, \nonly corporate cheques for corporate season accounts are accepted for \npayment at our car park offices and please insist for our e-receipt upon\n payment made via corporate cheques. The corporate cheques should be \ncrossed and made payable to B23 Test Operator SDN BHD
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>Payment Method</h4>
                    <div class="form-group row">
                      <div class="col-sm-6">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="i-checks">
                              <label>
                                <input
                                    v-model="giro"

                                  type="checkbox"
                                  value="option1"
                                  name="a"
                                />
                                <i style="margin-left:10px"></i> Giro
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input
                                    v-model="cash"

                                  type="checkbox"
                                  value="option1"
                                  name="a"
                                />
                                <i style="margin-left:10px"></i> Cash (Site)
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input
                                    v-model="cheque"

                                  type="checkbox"
                                />
                                <i style="margin-left:10px"></i> Cheque (Site)
                              </label>
                            </div>
                            <div class="i-checks">
                              <label>
                                <input
                                    :aria-checked="onlinePayment"
                                  type="checkbox"
                                  value="option1"
                                  name="a"
                                />
                                <i style="margin-left:10px"></i> Online Banking
                              </label>
                            </div>
                          </div>
                          <div class="hr-line-dashed"></div>
                        </div>
                      </div>
                    </div>
                    <h4>General Document Setting</h4>
                    <div class="hr-line-dashed"></div>
                    <div class="form-group row">
                      <label class="col-form-label">Header Logo (1000px x 70px)</label>
                      <div class="fallback dropzone">
                        <img width="1000" height="70" :src="logoHeader1" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-4 col-sm-offset-2">
                      <a href="/v1/carpark" class="btn btn-default btn-sm">Cancel</a>
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
  name: "ViewCarPark",
  data() {
    return {
      carpark: null,
      carParkName: null,
      name: null,
      code: null,

      cityID: null,
      cityName: null,

      log: null,
      lat: null,

      stateID: null,
      stateName: null,

      countryID: null,
      countryName: null,

      contractType: null,

      address1: null,
      address2: null,
      address3: null,
      postalCode: null,

      phone1: null,
      phone2: null,

      startHour: null,
      endHour: null,
      bayCount: null,

      //loadBilingSetting
      sstNumber: null,
      telephone: null,
      fax: null,
      email: null,
      website: null,
      cityBilling: null,
      countryBilling: null,
      stateBilling: null,
      addressBilling: null,
      address1Billing: null,
      address2Billing: null,
      address3Billing: null,
      postalCodeBilling: null,
      companyName: null,

      //seasonSetting
        seasonSetting: null,
      commencementDate1: null,
      commencementDate2: null,
      startDate: null,
      endDate: null,
      exemptLatePay: null,
      exemptSST: null,
      suspendApplication: null,
      exemptStopbBill: null,
      noSST: null,
      parkaideOnly: null,
      parkaideEnable: null,
      reactivation: null,
      latePenalty: null,
      reinstatement: null,
      allowHalf: null,
      allowFull: null,
      allowAny: null,
      giro: null,
      cash: null,
      cheque: null,
      onlinePayment: null,
      // STILL
      logoHeader: null,
      logoHeader1: null,
      logoFooter: null,
      tnc: null,

      image: null,
      classCarPark: true,
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
    handleImage() {
      CarParkService.fetchAllData(
        `carpark/${this.$route.query.carparkID}/finance`
      ).then(response => {
        this.logoHeader = response.data[0].logoHeader;
        this.logoFooter = response.data[0].logoFooter;
        this.logoHeader1 = response.data[0].logoHeader1;
      });
    },
    loadData() {
      let value = this.$route.query.carparkID;
      CarParkService.fetchAllData(`carpark/${value}`).then(response => {
        this.carpark = response.data;
        this.showSelectedCarPark();
        this.loadBilingSetting();
        this.handleImage();
      });
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: this.lat,
          lng: this.log
        };
      });
    },
    showSelectedCarPark() {
      this.carpark.forEach(el => {
        this.carParkName = el.name;
        this.name = el.name;
        this.image = el.image;
        this.code = el.carparkCode;
        this.startHour = el.operationHourStart;
        this.endHour = el.operationHourStop;
        this.bayCount = el.TOTALBAY;
        this.cityID = el.cityID;
        this.address1 = el.addressData1;
        this.log = el.lon;
        this.lat = el.lat;
        this.contractType =
          el.contractType == 1
            ? "Tenancy Deal"
            : el.contractType == 2
            ? "Management Deal"
            : "N/A";
      });
      this.loadAddress();
      this.loadCity(this.cityID);
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

    loadAddress(val) {
      CarParkService.fetchAllData(`address/${this.address1}`).then(response => {
        let res = JSON.parse(response.data[0].address);
        let parsedRes = JSON.parse(res);
        this.phone1 = parsedRes["phone1"];
        this.phone2 = parsedRes["phone2"];

        this.address1 = parsedRes["address1"];
        this.address2 = parsedRes["address2"];
        this.address3 = parsedRes["address3"];

        this.postalCode = parsedRes["addressPostalCode"];
      });
    },
    loadSeasonSetting() {

        CarParkService.fetchAllData(
        `carpark/${this.$route.query.carparkID}/seasonSetting`
      ).then(response => {
        this.seasonSetting = response.data;
        DateFormat.dateStartProcess(this.seasonSetting);
        this.commencementDate1 = response.data[0].CommencementDate1;
        this.commencementDate2 = response.data[0].CommencementDate2;
        if (this.commencementDate1 == 1 && this.commencementDate2 == 16)
          this.allowHalf = 1;
        if (this.commencementDate1 == 1 || this.commencementDate2 == 0)
            this.allowFull = 1;
        if (this.commencementDate1 == 0 && this.commencementDate2 == 0)
                this.allowAny = 1;
            this.seasonSetting.forEach(el => {
            this.startDate = el.startDate;
            this.endDate = el.endDate;
            this.exemptLatePay = el.ExemptLatePay;
            this.exemptSST = el.ExemptSST;
            this.suspendApplication = el.SuspendApplication;
            this.exemptStopbBill =el.ExemptStopbBill;
            this.noSST =el.NoSST;
            this.parkaideOnly = el.ParkaideOnly;
            this.parkaideEnable = el.ParkaideEnable;
            this.reactivation = el.Reactivation;
            this.latePenalty = el.LatePenalty;
            this.reinstatement = el.Reinstatement;
        });

      });
    },
    loadBilingSetting() {
      CarParkService.fetchAllData(
        `carpark/${this.$route.query.carparkID}/finance`
      ).then(response => {
        this.sstNumber = response.data[0].sstNumber;
        this.companyName = response.data[0].name;
        this.telephone = response.data[0].telephone;
        this.email = response.data[0].email;
        this.website = response.data[0].website;
        this.fax = response.data[0].fax;
        this.countryBilling = response.data[0].country;
        this.cityBilling = response.data[0].city;
        this.stateBilling = response.data[0].state;
        this.addressBilling = response.data[0].addressData1;
        CarParkService.fetchAllData(`address/${this.addressBilling}`).then(
          response => {
            let res = JSON.parse(response.data[0].address);
            let parsedRes = JSON.parse(res);
            this.address1Billing = parsedRes["carparkCompanyAddress1"];
            this.address2Billing = parsedRes["carparkCompanyAddress2"];
            this.address3Billing = parsedRes["carparkCompanyAddress3"];
            this.postalCodeBilling =
              parsedRes["carparkCompanyAddressPostalCode"];
          }
        );
      });
    },
    loadPaymentMethod() {


        CarParkService.fetchAllData(
        `carpark/${this.$route.query.carparkID}/seasonSetting`
      ).then(response => {
        this.giro = response.data[0].Giro;
        this.cash = response.data[0].Cash;
        this.cheque = response.data[0].Cheque;
        this.onlinePayment = response.data[0].OnlinePayment;
      });
    },
    loadBillingTerms() {
      CarParkService.fetchAllData(
        `carpark/${this.$route.query.carparkID}/tnc`
      ).then(response => {
        this.tnc = response.data[0].tnc;

        // var xmlString = res;
        // var doc = new DOMParser().parseFromString(xmlString, "text/html");
        // console.log(doc.firstChild.innerHTML); // => <div id="foo">...
        // console.log(doc.firstChild.firstChild.innerHTML) // => <a href="#">...
        // var temp = doc.firstChild.innerHTML;
        // this.tnc = temp;
      });
    }
  },
  mounted() {
      $(document).ready(function() {
          $(".summernote").summernote();
          // // $('.summernote').summernote('code', this.tnc);
          // var markupStr = this.tnc;
          // $('.summernote').summernote('code', markupStr);
      });
      $(document).ready(function() {
          $(".i-checks").iCheck({
              checkboxClass: "icheckbox_square-green",
              radioClass: "iradio_square-green"
          });
      });
      this.loadSeasonSetting();
      this.loadPaymentMethod();
      this.loadBillingTerms();

    this.geolocate();
    this.loadData();



  }
};
</script>


