$(function () {

  // Smooth Scroll
  $("[data-scroll]").on("click", function(event) {
      event.preventDefault();

      var $this = $(this),
          blockId = $this.data("scroll"),
          blockOffset = $(blockId).offset().top - 80;
      
      $("#nav a").removeClass("active");
      $this.addClass("active");

      $("html, body").animate({
          scrollTop: blockOffset
      }, 500);
  });


  $(window).scroll(() => { 
    // Distance from top of document to top of footer.
    topOfFooter = $('.footer').position().top;
    // Distance user has scrolled from top, adjusted to take in height of sidebar (570 pixels inc. padding).
    scrollDistanceFromTopOfDoc = $(document).scrollTop() + 570;
    // Difference between the two.
    scrollDistanceFromTopOfFooter = scrollDistanceFromTopOfDoc - topOfFooter;
  
    // If user has scrolled further than footer,
    // pull sidebar up using a negative margin.
    if (scrollDistanceFromTopOfDoc > topOfFooter) {
      $('.banner__logo').css('margin-top',  0 - scrollDistanceFromTopOfFooter);
    } else  {
      $('.banner__logo').css('margin-top', 0);
    }
  });
});