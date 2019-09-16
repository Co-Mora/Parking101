import Vue from 'vue'
import VueRouter from 'vue-router'
var Paginate = require('vuejs-paginate')

var Vuetify = require('vuetify');
var VuePagination = require('vue-ads-pagination')
var Pagination = require('vue-pagination-2')
var chosenSelect = require('chosen-js');
var VueGoogleMaps = require('vue2-google-maps');

Vue.use(VueRouter)

Vue.use(Vuetify)
// Vue.use(VuePagination)
Vue.component('paginate', Paginate)
// Vue.component('chosen-select', chosenSelect)

Vue.component("chosen-select", {
  data() {
      return { observer: null }
  },
  props: {
      value: [String, Array],
      multiple: Boolean
  },
  template: `<select><slot></slot></select>`,
  mounted() {
      // Create the observer (and what to do on changes...)
      this.observer = new MutationObserver(function (mutations) {
          $(this.$el).trigger("chosen:updated");
      }.bind(this));

      // Setup the observer
      this.observer.observe(
          $(this.$el)[0],
          { childList: true }
      );
      $(this.$el)
          .val(this.value)
          .chosen({ width: '100%' })
          .on("change", e => this.$emit('input', $(this.$el).val()))
  },
  watch: {
      value(val) {
          $(this.$el).val(val);
      }
  },

  updated(){
    $(this.$el).trigger("chosen:updated")
  },
  destroyed() {
      $(this.$el).chosen('destroy');
  }
});


Vue.component('pagination', Pagination)
// Vue.component('vuePagination', VuePagination)

//Car Park Components

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCdunUy-xZg8_1hv2hvnFwHFWsfT92pUJg',
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      //// If you want to set the version, you can do so:
      // v: '3.26',
    },

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
  })
// Vue.component('dashboard', require('./components/App/Dashboard.vue'));



// Route -> Login -> Auth
import Login from './components/PageLogin/Login'


import App from './components/App'
import Index from './components/Index'
import MainChart from './components/MainChart'

// Route -> Car Park -> Zone / Street / Bay
import Zone from './components/PageCarPark/Zone'
import Street from './components/PageCarPark/Street'
import Bay from './components/PageCarPark/Bay'
import CarParkProduct from './components/PageCarPark/CarParkProduct'

// Route -> PageAdd -> ViewCarPark & ViewCarParkProduct
import ViewCarPark from './components/PageCarPark/PageAdd/ViewCarPark'
import ViewCarParkProduct from './components/PageCarPark/PageAdd/ViewCarParkProduct'
import ViewCarParkFees from './components/PageCarPark/PageAdd/ViewCarParkFees'

// Route -> Location -> Country / State / City
import Country from './components/PageCountry/Country'
import State from './components/PageCountry/State'
import City from './components/PageCountry/City'


// Route -> Transcation -> Online Banking / Cash / Giro / Cheque
import Fund from './components/PageFinance/Fund'
import Cash from './components/PageFinance/Cash'
import Giro from './components/PageFinance/Giro'
import Cheque from './components/PageFinance/Cheque'


// Route -> Subscriber -> Subscriber
import Subscriber from './components/PageSubscriber/Subscriber'

// Route -> Business -> Operator
import CarParkOperator from './components/PageBusiness/CarParkOperator'

// Route -> Passcard -> All-Passcard -> Passcard
import Passcard from './components/PagePasscard/Passcard'
import AllPasscard from './components/PagePasscard/AllPasscard'


// Route -> Profile -> Profile
import Profile from './components/PageProfile/Profile'


// Route -> VerifyUser -> Verify
import Verify from './components/VerifyUser/Verify'

// Route -> PageReceipt -> ViewReceipt
import ViewReceipt from './components/PageReceipt/ViewReceipt'



// Route -> PageNotFound -> NotFound
import NotFound from './components/PageNotFound/NotFound'



// Route -> PageSeason -> SyncSeason
import SyncSeason from './components/PageSeason/SyncSeason'

// Route -> PageParkingLicence -> ParkingLicence
import ParkingLicense from './components/PageParkingLicense/ParkingLicense'

// Route -> PageParkingLicence -> ParkingLicence
import Company from './components/PageParkingLicense/CompanyList/Company'
import ViewCompany from './components/PageParkingLicense/CompanyList/ViewCompany'


// Route -> PageParkingLicence -> ParkingLicence
import Personal from './components/PageParkingLicense/CompanyList/Personal'
import ViewPersonal from './components/PageParkingLicense/CompanyList/ViewPersonal'



// Route -> PageParkingLicence -> ParkingLicence
import CompanyParkers from './components/PageParkingLicense/CompanyList/CompanyParkers'

// Route -> PageParkingLicence -> ParkingLicence
import PersonalParkers from './components/PageParkingLicense/CompanyList/PersonalParkers'


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/license',
            name: 'license',
            component: ParkingLicense
        },
        {
            path: '/v1/license/customer-list/company',
            name: 'company',
            component: Company
        },
        {
            path: '/v1/license/customer-list/company/view',
            name: 'ViewCompany',
            component: ViewCompany,
            props: (route) => ({ customerID: route.query.customerID})

        },
        {
            path: '/v1/license/customer-list/personal',
            name: 'Personal',
            component: Personal
        },
        {
            path: '/v1/license/customer-list/personal/view',
            name: 'ViewPersonal',
            component: ViewPersonal,
            props: (route) => ({ customerID: route.query.customerID})

        },
        {
            path: '/v1/license/customer-list/company-parkers',
            name: 'CompanyParkers',
            component: CompanyParkers
        },
        {
            path: '/v1/license/customer-list/personal-parkers',
            name: 'PersonalParkers',
            component: PersonalParkers
        },
        {
            path: '/v1/dashboard',
            name: 'home',
            component: MainChart
        },
        {
            path: '/v1?',
            name: 'home',
            component: MainChart
        },
         {
            path: '/v1/carpark',
            name: 'carpark',
            component: Index
        },
        {
            path: '/v1/carpark/view',
            name: 'viewCarpark',
            component: ViewCarPark,
            props: (route) => ({ carparkID: route.query.carparkID})
        },
        {
            path: '/v1/carpark/product/view',
            name: 'viewCarParkProduct',
            component: ViewCarParkProduct,
            // v1/carpark/product/view?carparkID=${carparkID}&zoneID=${zoneID}&seasonID=${carpark.id}
            props: (route) => ({ carparkID: route.query.carparkID, zoneID: route.query.zoneID, seasonID: route.query.seasonID})
        },
        {
            path: '/v1/carpark/product/fees',
            name: 'viewCarParkFees',
            component: ViewCarParkFees,
            // v1/carpark/product/fees?carparkID=${carparkID}&zoneID=${zoneID}&seasonID=${carpark.id}
            props: (route) => ({ carparkID: route.query.carparkID, zoneID: route.query.zoneID, seasonID: route.query.seasonID})
        },
        {
            path: '/v1/login',
            name: 'login',
            component: Login
        },
        // {
        //     path: '/404',
        //     name: '404',
        //     component: NotFound
        // },
        // {
        //     path: '*',
        //     redirect: '/404'
        // },
        {
            path: '/v1/carpark/zone',
            name: 'zone',
            component: Zone
        },
        {
            path: '/v1/carpark/product',
            name: 'product',
            component: CarParkProduct
        },
        {
            path: '/v1/carpark/street',
            name: 'street',
            component: Street
        },
        {
            path: '/v1/carpark/bay',
            name: 'bay',
            component: Bay
        },
        {
            path: '/v1/location/country',
            name: 'country',
            component: Country
        },
        {
            path: '/v1/location/state',
            name: 'state',
            component: State
        },
        {
            path: '/v1/location/city',
            name: 'city',
            component: City
        },

        {
            path: '/v1/transaction/online',
            name: 'fund',
            component: Fund
        },
        {
            path: '/v1/transaction/cash',
            name: 'cash',
            component: Cash
        },
        {
            path: '/v1/transaction/giro',
            name: 'giro',
            component: Giro
        },
        {
            path: '/v1/transaction/cheque',
            name: 'cheque',
            component: Cheque
        },
        {
            path: '/v1/transaction/receipt/view',
            name: 'viewReceipt',
            component: ViewReceipt,
            props: (route) => ({ receiptID: route.query.receiptID})
        },
        {
            path: '/v1/subscriber',
            name: 'subscriber',
            component: Subscriber
        },
        {
            path: '/v1/business/operator',
            name: 'carParkOperator',
            component: CarParkOperator
        },

        {
            path: '/v1/passcard',
            name: 'passcard',
            component: Passcard
        },
        {
            path: '/v1/passcard/all',
            name: 'all-passcard',
            component: AllPasscard
        },
        {
            path: '/v1/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/v1/verify/:id?',
            name: 'verify',
            component: Verify
        },
        {
            path: '/v1/season',
            name: 'syncseason',
            component: SyncSeason
        },

    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
