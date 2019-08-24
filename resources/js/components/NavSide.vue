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
              >
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                <span style="color:#fff" class="text-muted text-xs block">
                  Account
                  <b class="caret"></b>
                </span>
              </a>
              <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a class="dropdown-item" href="/profile">Account</a>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="/login">Logout</a>
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
                <a href="/subscriber">Subscriber</a>
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
                <a href="/season">Season</a>
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
                    <a href="/business/operator">Car Park Operator</a>
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
                <a href="/carpark">Car Park</a>
              </li>
              <li :class="{ active: classAll }">
                <a href="/carpark/zone">
                  Car Park Zone
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classZone }">
                    <a href="/carpark/zone">Zone</a>
                  </li>
                  <!-- <li :class="{ active: classLevel }">
                                    <a href="/carparks/level">Level</a>
                  </li>-->
                  <!-- <li :class="{ active: classZLevel }">
                                    <a href="/carparks/zlevel">ZLevel</a>
                  </li>-->
                  <li :class="{ active: classStreet }">
                    <a href="/carpark/street">Street</a>
                  </li>
                  <li :class="{ active: classBay }">
                    <a href="/carpark/bay">Bay</a>
                  </li>
                </ul>
              </li>
              <li :class="{ active: classProduct }">
                <a href="/carpark/product">Car Park Product</a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classFees }">
                    <a href="/carpark/product/fees">Fees</a>
                  </li>
                </ul>
              </li>
              <!-- <li :class="{ active: classVoucher }">
                              <a href="/carparks/voucher">Car park Voucher</a>
              </li>-->
            </ul>
          </li>
          <li :class="{ active: parking }">
            <a :class="{ active: parking }" href="#">
              <i class="fa fa-address-card"></i>
              <span class="nav-label">Parking License</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: parking }">
                <a>
                  Parking License
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classParking }">
                    <a href="/license">Parking License Subsccription</a>
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
                    <a href="/passcard">Passcard Type</a>
                  </li>
                </ul>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classpassCardAll }">
                    <a href="/passcard/all">All Passcard</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!-- <li :class="{ active: wheelMaster }">
                        <a  href="#"><i class="fa fa-motorcycle"></i> <span class="nav-label">Wheel</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" >
                            <li :class="{ active: classMaster }">
                              <a href="/wheel/master">Master</a>
                            </li>
                            <li :class="{ active: classLock }">
                              <a href="/wheel/lock">Lock</a></li>
                            <li :class="{ active: classPole }">
                              <a href="/wheel/pole">Pole</a>
                            </li>
                        </ul>
          </li>-->

          <li :class="{ active: location }">
            <a href="#">
              <i class="fa fa-globe"></i>
              <span class="nav-label">Location</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: classCountry }">
                <a href="/location/country">Country</a>
              </li>
              <li :class="{ active: classState }">
                <a href="/location/state">State</a>
              </li>
              <li :class="{ active: classCity }">
                <a href="/location/city">City</a>
              </li>
            </ul>
          </li>

          <!-- <li :class="{ active: gateMaster }">
                      <a  href="#"><i class="fa fa-bandcamp"></i> <span class="nav-label">Gate Master</span><span class="fa arrow"></span></a>
                      <ul class="nav nav-second-level collapse" >
                        <li :class="{ active: classGateMaster }">
                          <a href="/get-master">Master</a>
                        </li>
                        <li :class="{ active: classGate }">
                          <a href="/gates">Gate</a>
                        </li>
                      </ul>
          </li>-->
          <!-- <li :class="{ active: advert }">
                      <a  href="#"><i class="fa fa-bullhorn"></i> <span class="nav-label">Adverts</span><span class="fa arrow"></span></a>
                      <ul class="nav nav-second-level collapse" >
                        <li :class="{ active: classAdvert }">
                          <a href="/advert">Adverts</a>
                        </li>
                      </ul>
          </li>-->
          <!-- <li :class="{ active: customer }">
                        <a  href="#"><i class="fa fa-address-book "></i> <span class="nav-label">Customers</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" >
                            <li :class="{ active: classCustomer }">
                                <a href="/customers">All</a>
          </li>-->
          <!-- <li :class="{ active: classCustomerCP }">
                                <a href="#">Branch<span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                        <li>
                                            <a href="/customers/company?q=1">View Company</a>
                                        </li>
                                        <li>
                                            <a href="/customers/personal?q=0">View Personal</a>
                                        </li>
                                    </ul>
          </li>-->
          <!-- </ul>
          </li>-->
          <!-- <li :class="{ active: passType }">
                        <a href="#"><i class="fa fa-cube"></ i> <span class="nav-label">PassType</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" >
                          <li :class="{ active: classPassType }">
                              <a href="/passtype">View PassType</a>
                          </li>
                        </ul>
                    </li>
                    <li :class="{ active: staff }">
                        <a  href="#"><i class="fa fa-child"></i> <span class="nav-label">Staff</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" >
                          <li :class="{ active: classStaff }">
                              <a href="/staff">View Staff</a>
                          </li>
                        </ul>
                    </li>
                    <li :class="{ active: parker }">
                        <a  href="#"><i class="fa fa-thumb-tack "></i> <span class="nav-label">Parker</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" >
                          <li  :class="{ active: classParker }">
                              <a href="/parker">View Parker</a>
                          </li>
                        </ul>
          </li>-->
          <!-- <li :class="{ active: bank }">
                        <a  href="#"><i class="fa fa-university"></i> <span class="nav-label">Bank</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" >
                          <li :class="{ active: classBank }">
                              <a href="/bank">View Bank</a>
                          </li>
                        </ul>
                    </li>
                  <li :class="{ active: voucherBuy }">
                    <a  href="#"><i class="fa fa-ticket"></i> <span class="nav-label">Voucher Buy</span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level collapse" >
                      <li :class="{ active: classVoucherBuy }">
                        <a href="/voucher/buy">View Voucher</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a  href="#"><i class="fa fa-sliders"></i> <span class="nav-label">Settings</span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level collapse" >
                      <li>
                        <a href="/setting/forgot_password">Forgot Password</a>
                      </li>
                      <li>
                        <a href="/setting/reset_password">Reset Password</a>
                      </li>
                    </ul>
          </li>-->
          <!-- <li>
                    <a href="/activity"><i class="fa fa-flag-o"></i> <span class="nav-label">Activity</span></a>
          </li>-->
          <li :class="{ active: finance }">
            <a href="#">
              <i class="fa fa-line-chart"></i>
              <span class="nav-label">Transaction</span>
              <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse">
              <li :class="{ active: classGiro || classFinance || classCash || classCheque || classReceipt }">
                <a href="#">
                  ParkBills
                  <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-third-level">
                  <li :class="{ active: classFinance }">
                    <a href="/transaction/online">Online Banking</a>
                  </li>
                  <li :class="{ active: classGiro }">
                    <a href="/transaction/giro">Giro</a>
                  </li>
                  <li :class="{ active: classCash }">
                    <a href="/transaction/cash">Cash</a>
                  </li>
                  <li :class="{ active: classCheque }">
                    <a href="/transaction/cheque">Cheque</a>
                  </li>
                  <li :class="{ active: classReceipt }">
                    <a href="/transaction/receipt">Official Receipts</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="/login" @click-="logout">
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
    "classpassCardType",
    "classpassCardAll",
    "classParking",
    'classOperator',
    "classSubscriber",
    "classSeason"
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
    if(this.classParking) {
      this.parking = true;
    }
    if(this.classSeason) {
      this.season = true;
    }
    if(this.classSubscriber) {
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
    if (this.classProduct) {
      this.carparkActive = true;
    }
    if (this.classFinance || this.classGiro || this.classCash || this.classCheque || this.classReceipt) {
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
