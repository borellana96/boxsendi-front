(function() {
  "use strict"; // Start of use strict


 $(function () {
 $(window).scroll(function(e){
  var $el = $('#fixedElement');
  var isPositionFixed = ($el.css('position') == 'fixed');
  if ($(this).scrollTop() > 100 && !isPositionFixed){
    $el.css({'position': 'sticky', 'top': '80px'});
  }
  if ($(this).scrollTop() < 100 && isPositionFixed){
    $el.css({'position': 'sticky', 'top': '0px'});
  }
});
  })



})(jQuery); // End of use strict