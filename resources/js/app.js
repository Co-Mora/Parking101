import Vue from 'vue'
import VueRouter from 'vue-router'
var Paginate = require('vuejs-paginate')

var Vuetify = require('vuetify');
var VuePagination = require('vue-ads-pagination')
var Pagination = require('vue-pagination-2')
var chosenSelect = require('chosen-js');
const VueGoogleMaps = require('vue2-google-maps');

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

// Route -> PageAdd -> ViewCarPark
import ViewCarPark from './components/PageCarPark/PageAdd/ViewCarPark'


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




const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainChart
        },
        {
            path: '/?',
            name: 'home',
            component: MainChart
        },
         {
            path: '/carpark',
            name: 'carpark',
            component: Index
        },
        {
            path: '/carpark/view',
            name: 'viewCarpark',
            component: ViewCarPark,
            props: (route) => ({ carparkID: route.query.carparkID})
        },
        {
            path: '/login',
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
            path: '/carpark/zone',
            name: 'zone',
            component: Zone
        },
        {
            path: '/carpark/street',
            name: 'street',
            component: Street
        },
        {
            path: '/carpark/bay',
            name: 'bay',
            component: Bay
        },
        {
            path: '/location/country',
            name: 'country',
            component: Country
        },
        {
            path: '/location/state',
            name: 'state',
            component: State
        },
        {
            path: '/location/city',
            name: 'city',
            component: City
        },

        {
            path: '/transaction/online',
            name: 'fund',
            component: Fund
        },
        {
            path: '/transaction/cash',
            name: 'cash',
            component: Cash
        },
        {
            path: '/transaction/giro',
            name: 'giro',
            component: Giro
        },
        {
            path: '/transaction/cheque',
            name: 'cheque',
            component: Cheque
        },
        {
            path: '/subscriber',
            name: 'subscriber',
            component: Subscriber
        },
        {
            path: '/business/operator',
            name: 'carParkOperator',
            component: CarParkOperator
        },

        {
            path: '/passcard',
            name: 'passcard',
            component: Passcard
        },
        {
            path: '/passcard/all',
            name: 'all-passcard',
            component: AllPasscard
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/verify/:id?',
            name: 'verify',
            component: Verify
        },
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
