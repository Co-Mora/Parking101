<template>
  <div>
    <div>
      <div id="wrapper">
        <NavSide />
        <div id="page-wrapper" class="gray-bg">
         <NavBar />
          <div class="ibox-title">
            <p>Home / Register / Create New User</p>
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

                  <div class="ibox-content">
                    <div class="form-group row"><label class="col-sm-2 col-form-label">First Name</label>
                      <div class="col-sm-10"><input v-model="name"  placeholder="first name" type="text" class="form-control"></div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="form-group row"><label class="col-sm-2 col-form-label">Email</label>
                      <div class="col-sm-10"><input v-model="email"  placeholder="email address" type="text" class="form-control"></div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="form-group row"><label class="col-sm-2 col-form-label">Password</label>
                      <div class="col-sm-10"><input v-model="password"  placeholder="password" type="password" class="form-control"></div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="form-group row">
                      <div class="col-sm-4 col-sm-offset-2">
                        <button class="btn btn-primary btn-sm" @click="register()" :disabled="validated === true">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <MainFooter />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import NavSide from '../App/NavSide'
  import NavBar from '../App/NavBar'
  import MainFooter from '../App/MainFooter'
  export default {
    name: 'Register',

    data () {
      return {
        validated: false,
        isLoggedIn: false,
        token: localStorage.getItem('token'),
        name: null,
        email: null,
        checked: false,
        password: null,
        message: null,
        errors: []
      }
    },
    components: {
      NavSide,
      NavBar,
      MainFooter
    },
    methods: {

      register() {
        setTimeout(() => {
          $('.alert').alert('close')
        }, 500);
        if (!this.name && !this.email && !this.password) {
          this.errors.push('Please fill up the forms');
          return false
        } if (!this.name) {
          this.errors.push('Please fill up the First Name')
        } if (!this.email) {
          this.errors.push('Please fill up the Email Field')
        } if (!this.password) {
          this.errors.push('Please fill up the Password Field')
        }else  {
          axios({
            method: 'post',
            url: 'https://sys2.parkaidemobile.com/api/auth/register',
            data: qs.stringify({
              name: this.name,
              email: this.email,
              password: this.password,
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-access-token': JSON.parse(this.token)
            },
          }).then(response => {
            if(response.data.auth === true) {
              this.validated = true;
              setTimeout(() => {
                swal({
                  title: 'Add it successfully',
                  icon: 'success'
                })
              }, 200);
              this.name = null;
              this.email = null;
              this.password = null;
              //window.location.href = '/'
            }

          })
            .catch(error => {
              if(error.message) {
                setTimeout(() => {
                  swal({
                    title: 'Error Found',
                    icon: 'error'
                  })
                }, 200)
              }

            });
        }

      },
    }


  }

</script>
