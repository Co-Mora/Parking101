<template>
    <div>
        <div class="modal inmodal " id="myModal5"  role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">Season Terms</h4>
                  </div>
                  <div class="modal-body">
                      <div v-for="data in dataSource" :key="data">
                        <p>{{data.policy}}</p>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
        </div>
    </div>
  

</template>

<script>

const axios  = require('axios');
const CarParkService = require('../../services/CarParkService')

export default {
 name: 'SeasonTerms',
  data () {
    return {
      dataSource: null,
  
     
    }

  },
  components: {
    
  },
  props: ["seasonID", "isTerms"],
  methods: {
   
    loadData() {
        CarParkService.fetchAllData(`season/${this.seasonID}/terms`).then(response => {
        this.dataSource = response.data
      });
    },
    
    
  },
  mounted () {
    if(this.isTerms) {
      $("#myModal5").modal("show");
    }
    this.loadData()
  },  

}

</script>
