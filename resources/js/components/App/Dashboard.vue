<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-6">
          <div class="ibox ">
            <div class="ibox-title">
              <h5>Voucher</h5>
            </div>
            <div class="ibox-content">
              <div>
                <canvas id="voucherChart" height="140"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="ibox ">
            <div class="ibox-title">
              <h5>Tenant</h5>
            </div>
            <div class="ibox-content">
              <div>
                <canvas id="tenantChart" height="140"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="ibox ">
            <div class="ibox-title">
              <h5>Voucher Buy</h5>
            </div>
            <div class="ibox-content">
              <div>
                <canvas id="voucherBuyChart" height="140"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
    import axios from 'axios';
    export default {
        name: "dashboard",
        data() {
          return {
            data: null,
            totalVouchersBuy: 0,
            totalVouchers: 0,
            totalTenants: 0,
            totalLicenses: 0,
            totalCP: 0,
            totalCC: 0,
            isLoggedIn: localStorage.getItem('isLogged'),
            token: localStorage.getItem('token'),
          }
        },
        methods: {
          dashboard() {
            axios
              .get(`https://sys2.parkaidemobile.com/api/dashboard`,{headers: { 'x-access-token': JSON.parse(this.token)}})
              .then(response => {
                this.data = response.data
                var date;
                var day;
                var month;
                var year;
                var hours;
                var minutes;
                var seconds;
                var formattedTime;
                this.data.forEach((el) => {

                  date = new Date(el.createDate *1000);
                  day = date.getDay();
                  month = date.getMonth();
                  year = date.getFullYear();
                  hours = date.getHours();
                  minutes = "0" + date.getMinutes();
                  seconds = "0" + date.getSeconds();
                  if(month  === new Date().getMonth()) { // month - 1
                    this.totalVouchers += el.Voucher;
                  }
                  formattedTime = year + '-' + month + '-' + day + '  ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                  el.createDate = formattedTime

                });
                this.voucherChart();
                this.tenantChart();
                this.voucherBuyChart();
              });


          },
          voucherChart() {

            var totalVouchers = this.totalVouchers;
            var email = localStorage.getItem('email');

            $(document).ready(function() {
              setTimeout(function() {
                toastr.options = {
                  closeButton: true,
                  progressBar: true,
                  showMethod: 'slideDown',
                  timeOut: 4000
                };
                toastr.success(`Car Park Aide CRM', 'Welcome ${email}`);

              }, 1300);

              var voucherData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [

                  {
                    label: "Tenants",
                    backgroundColor: 'rgba(26,179,148,0.5)',
                    borderColor: "rgba(26,179,148,0.7)",
                    pointBackgroundColor: "rgba(26,179,148,1)",
                    pointBorderColor: "#fff",
                    data: [totalVouchers, 48, 40, 19, 86, 27, 90]
                  },
                ]
              };

              var lineOptions = {
                responsive: true
              };

              var ctx = document.getElementById("voucherChart").getContext("2d");
              new Chart(ctx, {type: 'line', data: voucherData, options:lineOptions});

            });
          },
          tenantChart() {

            var totalTenants = this.totalTenants;

            var tenantData = {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [

                {
                  label: "Vouchers",
                  backgroundColor: 'rgba(26,179,148,0.5)',
                  borderColor: "rgba(26,179,148,0.7)",
                  pointBackgroundColor: "rgba(26,179,148,1)",
                  pointBorderColor: "#fff",
                  data: [totalTenants, 48, 40, 19, 86, 27, 90]
                },
              ]
            };

            var lineOptions = {
              responsive: true
            };

            var ctx = document.getElementById("tenantChart").getContext("2d");
            new Chart(ctx, {type: 'line', data: tenantData, options:lineOptions});

          },
          voucherBuyChart() {

            var totalVoucherBuy = this.totalVouchersBuy;

            var voucherData = {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [

                {
                  label: "Voucher Buy",
                  backgroundColor: 'rgba(26,179,148,0.5)',
                  borderColor: "rgba(26,179,148,0.7)",
                  pointBackgroundColor: "rgba(26,179,148,1)",
                  pointBorderColor: "#fff",
                  data: [totalVoucherBuy, 48, 40, 19, 86, 27, 90]
                },
              ]
            };

            var lineOptions = {
              responsive: true
            };

            var ctx = document.getElementById("voucherBuyChart").getContext("2d");
            new Chart(ctx, {type: 'line', data: voucherData, options:lineOptions});

          }


        },
        mounted() {
          //this.dashboard();


        }
    }

</script>