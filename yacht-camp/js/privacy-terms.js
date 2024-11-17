$(function () {
  // AOS ANIMATION
  AOS.init({
    disable: "mobile",
    duration: 800,
    anchorPlacement: "center-bottom",
  });

  // ADD CLASS NAVBAR
  $(function () {
    $("#navbarNav").on("shown.bs.collapse", function () {
      $(".navbar").addClass("show");
    });

    $("#navbarNav").on("hidden.bs.collapse", function () {
      $(".navbar").removeClass("show");
    });
  });

  // BACK TO TOP
  $(function () {
    $(window).on("scroll", function () {
      toggleBackToTopBtn();
    });

    function toggleBackToTopBtn() {
      const $backToTopBtn = $("#backToTopBtn");
      if ($(window).scrollTop() > 200) {
        $backToTopBtn.fadeIn();
      } else {
        $backToTopBtn.fadeOut();
      }
    }

    $("#backToTopBtn").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, "smooth");
    });
  });

  // Height navbar
  $(function () {
    function adjustContentPadding() {
      var navbarHeight = $("#navbar").outerHeight();
      var extraPadding = 12;
      $("#content").css("padding-top", navbarHeight + extraPadding + "px");
    }

    adjustContentPadding();

    $(window).resize(function () {
      adjustContentPadding();
    });
  });

  //  Go to page
  $(function () {
    $(".navbar-nav .nav-link").on("click", function (event) {
      event.preventDefault();

      var targetPage = $(this).attr("href");

      if (targetPage !== "#") {
        window.location.href = targetPage;
      }
    });
  });
});
