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
                          <input type=" text" v-model="reservedCount" placeholder="Enter Reserved Count" class="form-control">
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
                          <img style="width: 20%" :src="image" />
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" @click="updateZLevel(zlevelID)" :disabled="validated == true" class="btn btn-primary">Update changes</button>
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
                          <table  class="table table-striped table-bordered table-hover dataTables-example">
                              <thead>
                                  <tr>
                                      <th data-hide="phone,tablet">Carpark Name</th>
                                      <th data-hide="phone,tablet">NonReservedCount</th>
                                      <th data-hide="phone,tablet">MotorcycleCount</th>
                                      <th data-hide="phone,tablet">Delete</th>
                                      <th data-hide="phone,tablet">Update</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="level in selectedLevel" :key="level" class="gradeX">
                                      <td class="center">{{carparkName || 'Unknown'}}</td>
                                      <td class="center">{{level.NonReservedCount || 'Unknown'}}</td>
                                      <td class="center">{{level.MotorcycleCount || 'Unknown'}}</td>
                                      <td><button class="pull-right btn btn-danger btn-sm" :value="level.id" @click="deleteZLevel(level.id)">Delete</button></td>
                                      <td>
                                          <button class="pull-right btn btn-primary btn-sm" :value="level.id" @click="viewZLevelUpdate(level.id)">Update</button>
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
            <nav-side :classZLevel="classZLevel"/>
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
                 <p>Home / Car Park / ZLevel</p>
               </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div class="row">
                              <div class="input-group" style="margin: 0 0 20px 16px">
                                  <a href="/carparks/zlevel/add" class="btn btn-rounded btn-w-m btn-outline-primary">Create New ZLevel</a>
                              </div>
                              <div class="col-sm-9 m-b-xs">
                                <select v-model="carparkID" class="form-control m-b" @change="ViewZone">
                                    <option disabled selected value="null" key="null">Please Select Carpark Name</option>
                                    <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
                                </select>
                              </div>
                              <div class="col-sm-9 m-b-xs">
                                <select v-model="zoneID" class="form-control m-b" @change="addZLevel">
                                    <option disabled selected value="null" key="null">Please Select Zone Name</option>
                                    <option v-for="z in zone" :value="z.id" :key="z">{{z.name}}</option>
                                </select>
                              </div>
                              <div class="col-sm-3">
                                <div class="input-group" style="margin-bottom: 20px">
                                  <input v-model="searchResult" @change="getSearchResult" placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                      <button type="button"  @click="getSearchResult()" class="btn btn-sm btn-primary">Search</button></span>
                                </div>
                             </div>
                            </div>
                            <div class="table-responsive">
                              <table v-show="!messageZLevels  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                  <thead>
                                  <tr>
                                      <th>id(s)</th>
                                      <th>image</th>
                                      <th>Car Park Name</th>
                                      <th>name</th>
                                      <th>ReservedCount</th>
                                      <th>TandemCount</th>

                                  </tr>
                                  </thead>
                                  <tbody v-if="result == true && errorResult === false">
                                      <tr v-for="level in zlevels" :key="level" class="gradeU" >
                                          <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewZLevel(level.id)">{{'Level: ' + level.id || 'Unknown'}}</a></td>
                                          <td class="center"><a :href="level.image"><img style="width: 10%" :src="level.image"></a></td>
                                          <td class="center">{{carparkName || 'Unknown'}}</td>
                                           <td class="center">{{level.name || 'Unknown'}}</td>
                                           <td class="center">{{level.ReservedCount || 'Unknown'}}</td>
                                           <td class="center">{{level.TandemCount || 'Unknown'}}</td>
                                      </tr>
                                  </tbody>
                              </table>
                              <div class="alert alert-warning col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                              <div class="alert alert-warning col-sm-12 m-b-xs" v-show="messageZLevels" role="alert">{{messageZLevels}}</div>
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
  name: 'ZLevel',

  data () {
    return {
      carpark: null,
      zlevels: null,
      selectedLevel: null,
      carparkID: 'null',
      zone: null,
      zoneID: null,
      zlevelID: null,
      carparkName: null,
      
      result: true,
      message: '',
      messageZLevels: null,
      searchResult: '',
      errorResult: false,
      mySearch: [],
      classZLevel: true
    }
  },
  methods: {
    getSearchResult() {
      if(this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.addZLevel()
      } else {
          searchResult.findSearchResult(`carpark/${this.carparkID}/zone/${this.zoneID}/zlevels?search=`, this.searchResult).then(response => {
          this.zlevels = response.data;
          this.errorResult = false;
          this.message = "";
          this.result = true;
          if (this.zlevels.length === 0) {
            this.errorResult = true;
            this.result = true;
            this.message = "No data available.";
          }
        })
      }

    },
    // processFile() {
    //   let formData = new FormData();
    //   formData.append('imgUploader', this.file);
    //   axios.post( 'https://sys2.parkaidemobile.com/api/images/upload',
    //             formData,
    //             {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'x-access-token': JSON.parse(this.token)
    //             }
    //           }
    //         ).then(response => {
    //           this.image = response.data
    //           console.log('SUCCESS!!', response.data);
    //     })
    //     .catch(function(ex){
    //       console.log(ex);
    //     });

    // },
    // handleFileUpload() {
    //    this.file = this.$refs.file.files[0];
    //    console.log("File:", this.file);
    //    this.processFile();
    // },
    addZLevel() {
        CarParkService.fetchAllData(`carpark/${this.carparkID}/zone/${this.zoneID}/zlevel`).then(response => {
            this.zlevels = response.data;
            this.messageZLevels = '';
            if(this.zlevels.length === 0) {
              this.messageZLevels = "No data available.";
            }
        });
        this.carpark.forEach((el) => {
           if(el.id === this.carparkID) {
             this.carparkName = el.name
           }
        })
    },
    ViewZone() {
         CarParkService.fetchAllData(`carpark/${this.carparkID}/zone`).then(response => {
            this.zone = response.data;
            this.messageZLevels = "";
            if(this.zone.length === 0) {
                this.messageZLevels = "No data available.";
            } else {
                this.zoneID = response.data[0].id;
                this.addZLevel()

            }

        });
    },
    viewZLevel(value) {
         CarParkService.viewCarPark(`carpark/${this.carparkID}/zlevels`, value).then(response => {
            this.selectedLevel = response.data;
        });
    },
    deleteZLevel(value) {
        CarParkService.deleteData(`carpark/${this.carparkID}/zlevel`, value)
    },
    viewZLevelUpdate(value) {
        $("#myModal5").modal("hide");
        $("#myModalUpdate").modal("show");
        CarParkService.viewCarPark(`carpark/${this.carparkID}/zlevels`, value).then(response => {
            this.selectedLevel = response.data;
            this.showSelectedZLevel()
        });

    },
    updateZLevel(value) {
        this.validated = true;
        CarParkService.updateData(`carpark/${this.carparkID}/zlevel`, value, qs.stringify({
            name: this.name,
            image: this.image,
            ReservedCount: this.reservedCount,
            TandemCount: this.tandemCount,
            NonReservedCount: this.nonReservedCount,
            MotorcycleCount: this.motorcycleCount,
            carparkID: this.carparkID
        }))
    },
    showSelectedZLevel() {
      this.selectedLevel.forEach((el) => {
          this.name = el.name;
          this.motorcycleCount = el.MotorcycleCount;
          this.tandemCount = el.TandemCount;
          this.reservedCount = el.ReservedCount;
          this.nonReservedCount = el.NonReservedCount
          this.image = el.image;
          this.zlevelID = el.id;

      })
    },
    loadData() {
        CarParkService.fetchAllData('carpark').then(response => {
            this.carpark = response.data
            this.carparkID = response.data[0].id;
            this.ViewZone()
        })

    },
  },
  components: {
    NavSide
  },
  mounted () {
    this.loadData()

  }


}

</script>
