jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});



function data_dif(date){
    var date_now = new Date()
    console.log('Data recebida : ' + date)
    return Math.abs(Date(JSON.parse(date)) - date_now)
  }