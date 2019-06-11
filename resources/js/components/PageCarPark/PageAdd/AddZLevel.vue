<template>
   <div>
         <div id="wrapper">
              <NavSide :classZLevel="classZLevel"/>
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
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-md-12">
                <div class="col-md-6" v-for="error in errors" :key="error">
                  <div class=" alert alert-danger alert-dismissible fade show" role="alert">
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      {{error}}
                  </div>
                </div>
              </div>
            </div>
        </div>
         <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-md-12">
                <div class="col-md-6" v-for="error in errors" :key="error">
                <div class=" alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {{error}}
                </div>
                </div>
            </div>
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h4>Add Zone Level</h4>
                        </div>
                        <div class="ibox-content">
                                <div class="col-lg-12">
                                    <div class="input-group" style="margin-bottom: 20px">
                                        <select v-model="carparkID" class="form-control m-b" @change="filterByZone">
                                            <option disabled selected value="null" key="null">Please Select Carpark Name</option>
                                            <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
                                        </select>
                                    </div>
                                    <div class="input-group" style="margin-bottom: 20px">
                                        <select v-model="zoneID" class="form-control m-b" @change="filterBylevel">
                                            <option disabled selected value="null" key="null">Please Select Zone Name</option>
                                            <option v-for="z in zones" :value="z.id" :key="z">{{z.name}}</option>
                                        </select>
                                    </div>
                                    <div class="input-group" style="margin-bottom: 20px">
                                        <select v-model="levelID" class="form-control m-b" >
                                        <option disabled selected value="null" key="null">Please Select Level Name</option>
                                            <option v-for="level in levels" :value="level.id" :key="level">{{level.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">ZLevel Name</label>
                                    <div class="col-sm-10"><input v-model="name"  placeholder="Name" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">MotorcycleCount</label>
                                    <div class="col-sm-10"><input v-model="motorcycleCount"  placeholder="" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">ReservedCount</label>
                                    <div class="col-sm-10"><input v-model="reservedCount"  placeholder="" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">NonReservedCount</label>
                                    <div class="col-sm-10"><input v-model="nonReservedCount"  placeholder="" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">tandemCount</label>
                                    <div class="col-sm-10"><input v-model="tandemCount"  placeholder="" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                 <div class="form-group row"><label class="col-sm-2 col-form-label">ZLevel Image</label>
                                    <div class="col-sm-10"><input placeholder="Image" type="file" ref="file" @change="handleFileUpload()" class="form-control">
                                      <img style="width: 10%" :src="image" />
                                    </div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row">
                                    <div class="col-sm-4 col-sm-offset-2">
                                        <button class="btn btn-primary btn-sm" @click="addZLevelCarpark" :disabled="validated == true">Add by Street</button>
                                    </div>
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

const NavSide = require('../../NavSide.vue')
const axios  = require('axios');
const CarParkService = require('../../../services/CarParkService')
const qs =  require('qs')

export default {
  name: 'AddStreet',
  data () {
    return {
      classZLevel: true,
      carparkID: 'null',
      carpark: null,
      zones: null,
      zoneID: 'null',
      levels: null,
      levelID: null,
      validated: false,
      file:null,
      name: null,
      image: null,
      reservedCount: null,
      tandemCount: null,
      nonReservedCount: null,
      motorcycleCount: null,
      errors: [],
    }
  },
  components: {
    NavSide
  },
  methods: {
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
    //    console.log("File:", this.file)
    //    this.processFile();
    // },
    addZLevelCarpark() {
         setTimeout(() => {
        $('.alert').alert('close')
      }, 2000)
         if (!this.name && !this.image) {
        this.errors.push('Please fill up the forms')
        return false
      } if (!this.name) {
        this.errors.push('Please fill up the Level Name')
      } if (!this.reservedCount) {
        this.errors.push('Please fill up the reservedCount')
      } if (!this.tandemCount) {
        this.errors.push('Please fill up the tandemCount')
      } if (!this.nonReservedCount) {
        this.errors.push('Please fill up the nonReservedCount')
      } if (!this.motorcycleCount) {
        this.errors.push('Please fill up the motorcycleCount')
      } if (!this.image) {
        this.errors.push('Please fill up the level image')
      } else {
        this.errors = []
        this.validated = true
        CarParkService.createData(`carpark/${this.carparkID}/zones/${this.zoneID}/zlevel`, qs.stringify({
            name: this.name,
            image: this.image,
            levelID: this.levelID,
            ReservedCount: this.reservedCount,
            TandemCount: this.tandemCount,
            NonReservedCount: this.nonReservedCount,
            MotorcycleCount: this.motorcycleCount
        }));
      }
    },
    filterByZone() {
         CarParkService.fetchAllData(`carpark/${this.carparkID}/zone`).then(response => {
            this.zones = response.data
            if(this.zones.length === 0) {
                this.message = "Threre's no carpark";
            }
        })
    },
    filterBylevel() {
        CarParkService.fetchAllData(`carpark/${this.carparkID}/level`).then(response => {
            this.levels = response.data
            if(this.levels.length === 0) {
                this.message = "Threre's no carpark";
            }
        })
    },
    loadData() {
        CarParkService.fetchAllData('carpark').then(response => {
            this.carpark = response.data
        });
    },
  },
 mounted () {
     this.loadData()
    }
}

</script>
