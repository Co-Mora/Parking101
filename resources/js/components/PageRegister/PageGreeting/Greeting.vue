<template>
    <div>
        <div class="passwordBox animated fadeInDown">
        <div class="row">
            <div class="col-md-12">
                <div class="ibox-content">
                    <h2 class="font-bold">Thank you for verfication </h2>
                    <p>
                        
                        your email address and your password will be reset and emailed to you.
                    </p>
                    <div class="row">
                        <div class="col-lg-12">
                            <form class="m-t" role="form" action="/carparks">
                                <div class="form-group">
                                    <input type="text" class="form-control" value="TKMCAOQQT" disabled>
                                </div>
                                <button type="submit" class="btn btn-primary block full-width m-b">Get password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-6">
                Copyright Car Park Aide
            </div>
            <div class="col-md-6 text-right">
               <small>© 2018-2019</small>
            </div>

        </div>
    </div>
    </div>
</template>


<script>
    const axios  = require('axios');
    const RegisterService = require('../../../services/RegisterService')

export default {
  name: "Greeting",
  data() {
    return {
        verityID: null,
        xhar: null,
        verifyVid: null,


    };
  },
  methods: {
    registerUser() {
        RegisterService.registerUser('auth2/web/register').then(response => {

        });
    },
     verifyUser() {
        RegisterService.verifyUser(`auth2/web/verify/`).then(response => {
           
        });
    },
    loginUser() {
        RegisterService.loginUser(`login/web`).then(response => {
            
        });
    },
  },
  components: {
    
  },
  mounted() {
    this.verifyUser();
  }
};
</script>
