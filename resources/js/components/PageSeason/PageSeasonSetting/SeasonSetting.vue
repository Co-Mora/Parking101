<template>
    <div>
      <div class="ibox-title">
        <p>Home / SeasonSetting</p>
      </div>
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
                                <select v-model="carparkID" class="form-control m-b" @change="loadData">
                                    <option disabled value="null" key="null">Please Select Car Park Name</option>
                                    <option v-for="car in carpark" :value="op.id" :key="car">{{car.name}}</option>
                                </select>
                              </div>
                              </div>
                              <div class="table-responsive">
                                <!-- <AppStaticTable :carpark="carpark"/> -->
                                <table v-show="!messageCar > 0 && !message" class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>ID(s)</th>
                                        <th>Is Enable</th>
                                        <th>totalBays</th>
                                        <th>availableBayCount</th>
                                        <th>contract Type</th>
                                        <th>DateCreated</th>
                                    </tr>
                                    </thead>
                                    <tbody v-if="result == true && errorResult === false">
                                        <tr v-for="data in dataSource" :key="data" class="gradeX" >
                                            <td class="center">{{data.id}}</td>
                                            <td class="center"><span :class="{ 'label-primary': data.enableParkAide == 1, 'label-danger': data.enableParkAide == 0 }" class="float-right label">{{car.isEnable == 1 ? 'Enable' : 'Disable'}}</span></td>
                                            <td class="center">{{data.totalBays   || 'Unknown'}}</td>
                                            <td class="center">{{data.availableBayCount}}</td>
                                            <td class="center">{{data.createDate}}</td>
                                        </tr>
                                    </tbody>
                                   <tfoot>
                                <tr>
                                </tr>
                                </tfoot>
                                </table>
                                <div class="alert alert-warning col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                                <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageSeason" role="alert">{{messageSeason}}</div>
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
const CarParkService = require('../services/CarParkService')
const qs =  require('qs')

export default {
 name: 'SeasonSetting',
  data () {
    return {
      carpark: null,
      carparkID: null,
      dataSource: null,

      operatorID: null,
      operators: null,
      
      validated: false,
      messageSeason: null,
      errorResult: true,
      result: true,
      message: '',
      pag: 1,
    }

  },
  components: {
    AppStaticTable
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
        this.messageSeason = '';
        if(this.season.length === 0 ){
          this.messageSeason = "No data available.";
        } else {
            this.loadData();
        }
      });
    },
    loadData() {
        CarParkService.fetchAllData(`operator/${this.operatorID}/carpark/${this.carparkID}`).then(response => {
        this.dataSource = response.data
        this.dateFormat()
        this.messageSeason = '';
        if(this.dataSource.length === 0 ){
          this.messageSeason = "No data available.";
        }
      });
    },
    
    
  },
  mounted () {
    this.filterOperator()
  },  

}

</script>
