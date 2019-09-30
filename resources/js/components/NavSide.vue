<template>
  <div>
    <nav class="navbar-default navbar-static-side" role="navigation">
      <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
          <li class="nav-header">
            <div class="dropdown profile-element">
              <img
                alt="image"
                class="-square-full"
                style="margin-left: 40px"
                :width="60"
                src="/images/icon.png"
              />
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                <span style="color:#fff" class="text-muted text-xs block">
                  Account
                  <b class="caret"></b>
                </span>
              </a>
              <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a class="dropdown-item" href="/v1/profile">Account</a>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="/v1/login">Logout</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="/">
              <i class="fa fa-dashboard"></i>
              <span class="nav-label">Dashboard</span>
            </a>
          </li>
          <li :class="{ active: subscriber }">
            <a :class="{ active: classSubscriber }" href="#">
              <i class="fa fa-user"></i>
              <span class="nav-label">Subscriber</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: classSubscriber }">
                <a href="/v1/subscriber">Subscriber</a>
              </li>
            </ul>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: classAll }">
                <a href="/v1/carpark/zone">
                  Season
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classSeasonSub }">
                    <a href="/v1/subscriber/season/sync">Sync to ParkAide</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li :class="{ active: season }">
            <a :class="{ active: classSeason }" href="#">
              <i class="fa fa-group"></i>
              <span class="nav-label">Season</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: classSeason }">
                <a href="/v1/season">Season</a>
              </li>
            </ul>
          </li>
          <li :class="{ active: operator }">
            <a :class="{ active: classOperator }" href="#">
              <i class="fa fa-suitcase"></i>
              <span class="nav-label">Business</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: classOperator }">
                <a>
                  Car Park Operator
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classOperator }">
                    <a href="/v1/business/operator">Car Park Operator</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li :class="{ active: carparkActive }">
            <a :class="{ active: carpark }" href="#">
              <i class="fa fa-car"></i>
              <span class="nav-label">Car Park</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: carpark }">
                <a href="/v1/carpark">Car Park</a>
              </li>
              <li :class="{ active: classAll }">
                <a href="/v1/carpark/zone">
                  Car Park Zone
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classZone }">
                    <a href="/v1/carpark/zone">Zone</a>
                  </li>
                  <li :class="{ active: classStreet }">
                    <a href="/v1/carpark/street">Street</a>
                  </li>
                  <li :class="{ active: classBay }">
                    <a href="/v1/carpark/bay">Bay</a>
                  </li>
                </ul>
              </li>
              <li :class="{ active: classProduct }">
                <a href="/v1/carpark/product">Car Park Product</a>
              </li>
              <li :class="{ active: classCarParkTenant }">
                <a href="#">Car Park Tenant</a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classCarParkTenant }">
                    <a href="/v1/carpark-tenant">Car Park Tenant</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li :class="{ active: parking }">
            <a :class="{ active: parking }" href="#">
              <i class="fa fa-address-card"></i>
              <span class="nav-label">Parking License</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: CustomerList }">
                <a>
                  Customer List
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classCompany }">
                    <a href="/v1/license/customer-list/company">Company</a>
                  </li>
                  <li :class="{ active: classCompanyParkers }">
                    <a href="/v1/license/customer-list/company-parkers">Company Parkers</a>
                  </li>
                  <li :class="{ active: classPersonal }">
                    <a href="/v1/license/customer-list/personal">Personal</a>
                  </li>
                  <li :class="{ active: classPersonalParkers }">
                    <a href="/v1/license/customer-list/personal-parkers">Personal Parkers</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: parking1 }">
                <a>
                  Parking License
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classParking }">
                    <a href="/v1/license">Parking License Subsccription</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li :class="{ active: passcard }">
            <a :class="{ active: passcard }" href="#">
              <i class="fa fa-ticket"></i>
              <span class="nav-label">Passcard</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: passcard }">
                <a>
                  Passcard Inventory
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classpassCardType }">
                    <a href="/v1/passcard">Passcard Type</a>
                  </li>
                </ul>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classpassCardAll }">
                    <a href="/v1/passcard/all">All Passcard</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li :class="{ active: location }">
            <a href="#">
              <i class="fa fa-globe"></i>
              <span class="nav-label">Location</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: classCountry }">
                <a href="/v1/location/country">Country</a>
              </li>
              <li :class="{ active: classState }">
                <a href="/v1/location/state">State</a>
              </li>
              <li :class="{ active: classCity }">
                <a href="/v1/location/city">City</a>
              </li>
            </ul>
          </li>
          <li :class="{ active: finance }">
            <a href="#">
              <i class="fa fa-line-chart"></i>
              <span class="nav-label">Transaction</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li
                :class="{ active: classGiro || classFinance || classCash || classCheque || classReceipt }"
              >
                <a href="#">
                  ParkBills
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classFinance }">
                    <a href="/v1/transaction/online">Online Banking</a>
                  </li>
                  <li :class="{ active: classGiro }">
                    <a href="/v1/transaction/giro">Giro</a>
                  </li>
                  <li :class="{ active: classCash }">
                    <a href="/v1/transaction/cash">Cash</a>
                  </li>
                  <li :class="{ active: classCheque }">
                    <a href="/v1/transaction/cheque">Cheque</a>
                  </li>
                  <li :class="{ active: classReceipt }">
                    <a href="/v1/transaction/receipt">Official Receipts</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="/v1/login" @click-="logout">
              <i class="fa fa-power-off"></i>
              <span class="nav-label">Log out</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavSide",
  props: [
    "classZone",
    "classLevel",
    "classZLevel",
    "classStreet",
    "classBay",
    "classVoucher",
    "classMaster",
    "classLock",
    "classPole",
    "classCountry",
    "classState",
    "classCity",
    "classAddSubscriber",
    "classGateMaster",
    "classGate",
    "classAdvert",
    "classCustomer",
    "classCustomerCP",
    "classCarParkTenant",
    "classCarPark",
    "classPassType",
    "classStaff",
    "classParker",
    "classFinance",
    "classGiro",
    "classCash",
    "classCheque",
    "classReceipt",
    "classBank",
    "classVoucherBuy",
    "classProduct",
    "classUsers",
    "classTenant",
    "classpassCardType",
    "classpassCardAll",
    "classParking",
    "classOperator",
    "classSubscriber",
    "classSeason",
    "classSeasonSub",
    "classCompany",
    "classCompanyParkers",
    "classPersonal",
    "classPersonalParkers"
  ],

  data() {
    return {
      Image,
      carpark: null,
      carparkActive: null,
      wheelMaster: null,
      location: null,
      passcard: null,
      season: null,
      finance: null,
      parking: null,
      subscriber: null,
      operator: null,
      gateMaster: null,
      advert: null,
      customer: null,
      CustomerList: null,
      subscriber: null,
      passType: null,
      staff: null,
      parker: null,
      bank: null,
      voucherBuy: null,
      classAll: false,
      isLoggedIn: localStorage.getItem("isLogged")
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("isLogged");
      localStorage.removeItem("token");
    }
  },
  mounted() {
    if (
      this.classCompany ||
      this.classCompanyParkers ||
      this.classPersonal ||
      this.classPersonalParkers
    ) {
      this.CustomerList = true;
      this.parking = true;
    }
    if (this.classParking) {
      this.parking = true;
    }
    if (this.classSeason) {
      this.season = true;
    }
    if (this.classSubscriber || this.classSeasonSub) {
      this.subscriber = true;
    }
    if (this.classOperator) {
      this.operator = true;
    }
    if (this.classpassCardType || this.classpassCardAll) {
      this.passcard = true;
    }
    if (this.classCarPark) {
      this.carpark = true;
      this.carparkActive = true;
    }
    if (
      this.classZone ||
      this.classLevel ||
      this.classZLevel ||
      this.classStreet ||
      this.classBay
    ) {
      this.carparkActive = true;
      this.classAll = true;
    }
    if (this.classVoucher) {
      this.carparkActive = true;
    }
    if (this.classTenant) {
      this.carparkActive = true;
    }
    if (this.classProduct || this.classCarParkTenant) {
      this.carparkActive = true;
    }
    if (
      this.classFinance ||
      this.classGiro ||
      this.classCash ||
      this.classCheque ||
      this.classReceipt
    ) {
      this.finance = true;
    }

    if (this.classMaster || this.classLock || this.classPole) {
      this.wheelMaster = true;
    }
    if (this.classCountry || this.classState || this.classCity) {
      this.location = true;
    }
    if (this.classAddSubscriber) {
      this.subscriber = true;
    }
    if (this.classGateMaster || this.classGate) {
      this.gateMaster = true;
    }
    if (this.classAdvert) {
      this.advert = true;
    }
    if (this.classCustomer || this.classCustomerCP) {
      this.customer = true;
    }
    if (this.classPassType) {
      this.passType = true;
    }
    if (this.classStaff) {
      this.staff = true;
    }
    if (this.classParker) {
      this.parker = true;
    }
    if (this.classBank) {
      this.bank = true;
    }
    if (this.classVoucherBuy) {
      this.voucherBuy = true;
    }
  }
};
</script>
