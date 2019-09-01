const Moment = require("moment");


const dateProcees = (data) => {



  data.forEach((el) => {
    var a = new Date(el.createDate * 1000);
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year  + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
    if(el.createDate !== 0) {
      el.createDate = time

    }

  });

  data.forEach((el) => {
    var a = new Date(el.ChequeDate * 1000);
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year  + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
    if(el.ChequeDate !== 0) {
      el.ChequeDate = time

    }

  });

  data.forEach((el) => {
    if(el.Date) {
      var a = new Date(el.Date * 1000);
      var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = year  + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
      if(el.Date !== 0) {
        el.Date = time

      }
    }else {
      el.Date = "N/A";
    }


  });

     data.forEach((el) => {

      var a = new Date(el.updateDate * 1000);
      var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = year  + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;

      if(el.updateDate !== 0) {
        el.updateDate = time

      }

    });


 }

 const dateStartProcess = (data) => {



  data.forEach((el) => {
    var a = new Date(el.startDate * 1000);
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year  + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
    if(el.startDate !== 0) {
      el.startDate = time

    }

  });
 }

 module.exports = {
    dateStartProcess,
    dateProcees
 }


 //createDate
