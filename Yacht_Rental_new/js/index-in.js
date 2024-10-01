// Click logo to main page
$(document).ready(function () {
  $("#logo, #in-logo").on("click", function () {
    window.location.href = "index.html";
  });
});

// Preloader Script
$(window).on("load", function () {
  $("body").addClass("loaded");
});

// Image Gallery
$(document).ready(function () {
  var modal = $("#image-modal");
  var modalImg = $("#modal-image");

  $(".thumbnail").on("click", function () {
    var largeImageSrc = $(this).data("large");

    modalImg.attr("src", largeImageSrc);

    modal.fadeIn();
  });

  $(".close").on("click", function () {
    modal.fadeOut();
  });

  modal.on("click", function (event) {
    if (event.target !== modalImg[0]) {
      modal.fadeOut();
    }
  });
});
