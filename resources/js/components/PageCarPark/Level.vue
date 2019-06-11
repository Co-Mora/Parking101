<template>
    <div>
      <div class="modal inmodal" id="myModalUpdate" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content animated bounceInRight">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">{{carparkName}}</h4>
                  </div>
                  <div class="modal-body">
                      <div class="form-group">
                          <label>Level Name</label>
                          <input type="text" v-model="name" placeholder="Enter Zone Name" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>Reserved Count</label>
                          <input type=" text"  v-model="reservedCount" placeholder="Enter Reserved Count" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>Non Reserved Count</label>
                          <input type=" text" v-model="nonReservedCount" placeholder="Enter NonReserved Count" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>Tandem Count</label>
                          <input type=" text" v-model="tandemCount" placeholder="Enter Tandem Count" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>Motorcycle Count</label>
                          <input type=" text" v-model="motorcycleCount" placeholder="Enter Motorcycle Count" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>Image Name</label>
                          <input type="file" ref="file" @change="handleFileUpload()"  class="form-control">
                          <img style="width: 10%" :src="image" />
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" @click="updateLevel(levelID)" :disabled="validated == true" class="btn btn-primary">Update changes</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">{{carparkName}}</h4>
                  </div>
                  <div class="modal-body">
                      <div class="table-responsive">
                          <table class="table table-striped table-bordered table-hover dataTables-example">
                              <thead>
                                  <tr>
                                      <th data-hide="phone,tablet">Carpark Name</th>
                                      <th data-hide="phone,tablet">name</th>
                                      <th data-hide="phone,tablet">ReservedCount</th>
                                      <th data-hide="phone,tablet">Delete</th>
                                      <th data-hide="phone,tablet">Update</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <span v-show="selectedLevel == 0" style="font-size: 20px;">{{message}}</span>
                                  <tr v-for="level in selectedLevel" :key="level" class="gradeX">
                                      <td class="center">{{carparkName || 'Unknown'}}</td>
                                      <td class="center">{{level.name || 'Unknown'}}</td>
                                      <td class="center">{{level.ReservedCount || 'Unknown'}}</td>
                                      <td><button class="pull-right btn btn-danger btn-sm" :value="level.id" @click="deleteLevel(level.id)">Delete</button></td>
                                      <td>
                                          <button class="pull-right btn btn-primary btn-sm" :value="level.id" @click="viewLevelUpdate(level.id)" >Update</button>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>

                  <div class="modal-footer">
                      <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
      </div>
         <div id="wrapper">
            <nav-side :classLevel="classLevel"/>
             <div id="page-wrapper" class="gray-bg">
            <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
            </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <span class="m-r-sm text-muted welcome-message">Welcome to Carpark Aide.</span>
                    </li>
                    <li>
                        <a href="/login">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>
                    </li>
                </ul>

            </nav>
            </div>
               <div class="ibox-title">
                 <p>Home / Car Park / Levels</p>
               </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">

                        <div class="ibox-content">
                            <div class="row">
                               <div class="col-sm-9 m-b-xs">
                                    <select v-model="operatorID" class="form-control m-b" @change="loadData">
                                        <option disabled value="null" key="null">Please Select operator Name</option>
                                        <option v-for="op in operators" :value="op.id" :key="op">{{op.name}}</option>
                                    </select>
                                </div>
                              <div class="col-sm-9 m-b-xs">
                                <select v-model="carparkID" class="form-control m-b" @change="addLevel">
                                    <option disabled selected value="null" key="null">Please Select Carpark Name</option>
                                    <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
                                </select>
                              </div>
                              <div class="col-sm-3">
                                <div class="input-group" style="margin-bottom: 20px">
                                  <input v-model="searchResult" @change="getSearchResult" placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                      <button type="button"  @click="getSearchResult()" class="btn btn-sm btn-success">Search</button></span>
                                </div>
                             </div>
                            </div>
                            <div class="table-responsive">
                              <table  v-show="!messageLevel  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                  <thead>
                                  <tr>
                                      <th data-hide="phone,tablet">id(s)</th>
                                      <th data-hide="phone,tablet">image</th>
                                      <th data-hide="phone,tablet">carpark Name</th>
                                      <th data-hide="phone,tablet">name</th>
                                      <th data-hide="phone,tablet">TandemCount</th>
                                      <th data-hide="phone,tablet">NonReservedCount</th>
                                      <th data-hide="phone,tablet">MotorcycleCount</th>
                                  </tr>
                                  </thead>
                                  <tbody  v-if="result == true && errorResult === false">
                                      <tr v-for="level in levels" :key="level" class="gradeU">
                                          <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewLevel(level.id)">{{level.id}}</a></td>
                                          <td class="center"><a :href="level.image"><img style="width: 10%" :src="level.image"></a></td>
                                          <td class="center">{{carparkName || 'Unknown'}}</td>
                                           <td class="center">{{level.name || 'Unknown'}}</td>
                                           <td class="center">{{level.TandemCount || 'Unknown'}}</td>
                                           <td class="center">{{level.NonReservedCount || 'Unknown'}}</td>
                                           <td class="center">{{level.MotorcycleCount || 'Unknown'}}</td>
                                      </tr>
                                  </tbody>
                              </table>
                              <div class="alert alert-warning col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                              <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageLevel" role="alert">{{messageLevel}}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="footer">
                <div class="float-right">
                    10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                    <strong>Copyright</strong> CarPark Company &copy; 2018
                </div>
            </div>

        </div>
         </div>
    </div>
</template>

<script>
const NavSide = require('../NavSide.vue')
const axios  = require('axios');
const CarParkService = require('../../services/CarParkService')
const qs =  require('qs')


export default {
  name: 'Level',

  data () {
    return {
      carpark: null,
      levels: [],
      selectedLevel: null,
      carparkID: 'null',
      carparkName: null,
      validated: false,
      messageLevel: null,
      levelID: null,

      levelAdmin: [],


      operators: null, 
      operatorID: null,

      result: true,
      message: '',
      searchResult: '',
      errorResult: false,
      mySearch: [],

      classLevel: true
    }
  },
  methods: {
    getSearchResult() {
      if(this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.addLevel()
      } else {
          searchResult.findSearchResult(`carpark/${this.carparkID}/level?search=`, this.searchResult).then(response => {
            this.levels = response.data;
            this.errorResult = false
            this.message = "";
            this.result = true;
            if (this.levels.length === 0) {
                this.errorResult = true;
                this.result = true;
                this.message = "No data available.";
          }
        })
      }
    },
    addLevel() {
        CarParkService.fetchAllData(`operator/${this.operatorID}/carpark/${this.carparkID}/level`).then(response => {
            this.levels = response.data
            console.log(this.levels)
            this.messageLevel = '';
            if(this.levels.length === 0) {
              this.messageLevel = "No data available.";
            }
        })
        this.carpark.forEach((el) => {
           if(el.id === this.carparkID) {
             this.carparkName = el.name
           }
        })
        
    },
    viewLevel(value) {
         CarParkService.viewCarPark(`operator/${this.operatorID}/carpark/${this.carparkID}/level`, value).then(response => {
            this.selectedLevel = response.data;
            if (this.selectedLevel.length === 0) {
                this.message = "No Levels Found";
            }
        });
    },
    updateLevel(value) {
        this.validated = true;
        document.getElementById('myModalUpdate').style.display = "none";

        CarParkService.updateData(`operator/${this.operatorID}/carpark/${this.carparkID}/level`, value, qs.stringify({
            name: this.name,
            image: this.image,
            ReservedCount: this.reservedCount,
            TandemCount: this.tandemCount,
            NonReservedCount: this.nonReservedCount,
            MotorcycleCount: this.motorcycleCount,
            carparkID: this.carparkID
        }))
    },
    showSelectedLevel() {
      this.selectedLevel.forEach((el) => {
          this.name = el.name;
          this.motorcycleCount = el.MotorcycleCount;
          this.tandemCount = el.TandemCount;
          this.reservedCount = el.ReservedCount;
          this.nonReservedCount = el.NonReservedCount
          this.image = el.image;
          this.levelID = el.id;

      })
      
    },
    loadData() {
        CarParkService.fetchAllData(`operator/${this.operatorID}/carpark`).then(response => {
        this.carpark = response.data.result
        this.carparkID = response.data.result[0].id;
        this.addLevel()
      })
    },
     filterOperator() {
                CarParkService.fetchAllData('operator').then(response => {
                    this.operators = response.data
                    this.operatorID = response.data[1].id
                    this.loadData()
                });
            },
  },
  components: {
    NavSide
  },
  mounted () {
      this.filterOperator()
  }


}

</script>
