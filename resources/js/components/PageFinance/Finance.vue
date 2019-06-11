<template>
    <div>
        
     
       <div id="wrapper">
        <nav-side :classSeason="classSeason"/>
         <div class="ibox-title">
        <p>Home / Season</p>
      </div>
        <div id="page-wrapper" class="gray-bg">
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
                  <div class="col-lg-12">
                      <div class="ibox ">
                          <div class="ibox-content">
                            <div class="row">
                                <div class="col-sm-9 m-b-xs">
                                <select v-model="operatorID" class="form-control m-b" @change="filterSeason">
                                    <option disabled value="null" key="null">Please Select operator Name</option>
                                    <option v-for="op in operators" :value="op.id" :key="op">{{op.name}}</option>
                                </select>
                              </div>
                               <div class="col-sm-9 m-b-xs">
                                <select v-model="seasonID" class="form-control m-b" @change="loadData">
                                    <option disabled value="null" key="null">Please Select Season Name</option>
                                    <option v-for="sea in season" :value="sea.id" :key="sea">{{sea.name}}</option>
                                </select>
                              </div>
                              </div>
                              <div class="table-responsive">
                                <!-- <AppStaticTable :carpark="carpark"/> -->
                                <table v-show="!messageSource > 0 && !message" class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>ID(s)</th>
                                        <th>sstNumber</th>
                                        <th>name</th>
                                        <th>logoHeader</th>
                                        <th>logoFooter</th>
                                    </tr>
                                    </thead>
                                    <tbody v-if="result == true && errorResult === false">
                                        <tr v-for="data in dataSource" :key="data" class="gradeX" >
                                            <td class="center">{{data.id}}</td>
                                            <td class="center">{{data.sstNumber   || 'Unknown'}}</td>
                                            <td class="center">{{data.name}}</td>
                                            <td class="center">{{data.logoHeader}}</td>
                                            <td class="center">{{data.logoFooter}}</td>
                                        </tr>
                                    </tbody>
                                   <tfoot>
                                <tr>
                                </tr>
                                </tfoot>
                                </table>
                                <div class="alert alert-warning col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                                <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageSource" role="alert">{{messageSource}}</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

      </div>
        </div>
       </div>
      
    </div>
  

</template>

<script>

const axios  = require('axios');
const CarParkService = require('../../services/CarParkService')
const SeasonTerms = require('../PageTerms/SeasonTerms.vue')
const qs =  require('qs')
const NavSide = require('../NavSide.vue')
const NavBar = require('../NavBar.vue')

export default {
 name: 'Season',
  data () {
    return {
      carpark: null,
      carparkID: null,
      dataSource: null,

      operatorID: null,
      operators: null,
      
      validated: false,
      messageSeason: null,
      errorResult: false,
      result: true,
      classSeason: true,
      isTerms: false,
      message: '',
      pag: 1,
    }

  },
  components: {
      NavSide,
      SeasonTerms
  },
  methods: {
    
    dateFormat() {
       var date;
        var day;
        var month;
        var year;
        var hours;
        var minutes;
        var seconds;
        var formattedTime;
        this.dataSource.forEach((el) => {
          date = new Date(el.createDate * 1000);
          day = date.getDay();
          month = date.getMonth();
          year = date.getFullYear();
          hours = date.getHours();
          minutes = "0" + date.getMinutes();
          seconds = "0" + date.getSeconds();
          formattedTime = year + '-' + month + '-' + day + '  ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          el.createDate = formattedTime
        });
    },
    filterOperator() {
       CarParkService.fetchAllData(`operator`).then(response => {
        this.operators = response.data
        this.operatorID = response.data[1].id;
        this.filterCarPark()
      });
    },
    filterCarPark() {
        CarParkService.fetchAllData(`operator/${this.operatorID}/carpark`).then(response => {
        this.carpark = response.data
        this.carparkID = response.data[0].id
        this.messageSource = '';
        if(this.season.length === 0 ){
          this.messageSource = "No data available.";
        } else {
            this.loadData();
        }
      });
    },
    loadData() {
        CarParkService.fetchAllData(`operator/${this.operatorID}/carpark/${this.carparkID}/finance`).then(response => {
        this.dataSource = response.data
        this.dateFormat()
        this.messageSource = '';
        if(this.dataSource.length === 0 ){
          this.messageSource = "No data available.";
        }
      });
    },
    
    
  },
  mounted () {
    this.filterOperator()
  },  

}

</script>
