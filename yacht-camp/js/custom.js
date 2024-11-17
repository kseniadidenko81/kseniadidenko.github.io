$(function () {
  // AOS ANIMATION
  AOS.init({
    disable: "mobile",
    duration: 800,
    anchorPlacement: "center-bottom",
  });

  // ANCHOR
  document
    .querySelector("#scroll-to-footer .smoothScroll")
    .addEventListener("click", function (event) {
      event.preventDefault();

      let targetId = this.getAttribute("data-target");

      if (!targetId || targetId === "#") return;

      let targetSection = document.querySelector(targetId);

      if (targetSection) {
        let navbarHeight = 49;
        let targetPosition =
          targetSection.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        console.error("Target section not found:", targetId);
      }
    });

  // SMOOTHSCROLL NAVBAR
  // $(function () {
  //   $(".navbar a, .hero-text a").on("click", function (event) {
  //     var $anchor = $(this);
  //     $("html, body")
  //       .stop()
  //       .animate(
  //         {
  //           scrollTop: $($anchor.attr("href")).offset().top - 49,
  //         },
  //         1000
  //       );
  //     event.preventDefault();
  //   });
  // });

  // SECTION FAQs

  $(function () {
    $(".fqs-header").on("click", function () {
      const selector = $(this).data("toggle");
      const $content = $(selector);

      if ($content.length === 0) {
        console.warn(`Элемент не найден для селектора: ${selector}`);
        return;
      }

      if ($content.hasClass("active")) {
        $content.removeClass("active").css("max-height", "0");
        $(this).removeClass("active");
      } else {
        $(".fqs-content.active").removeClass("active").css("max-height", "0");
        $(".fqs-header.active").removeClass("active");

        const targetHeight = $content[0].scrollHeight + "px";
        $content.addClass("active").css("max-height", targetHeight);
        $(this).addClass("active");
      }
    });
  });

  // FORM (INPUT + BTN)
  $(function () {
    $("input").on("input", function () {
      var $input = $(this);
      var $label = $input.siblings("label");

      if ($input.val()) {
        $label.addClass("hidden-label");
      } else {
        $label.removeClass("hidden-label");
      }
    });
  });

  $(function () {
    $("#contact-form").on("submit", function (event) {
      event.preventDefault();

      var $phoneInput = $("#phone");

      if ($phoneInput.val() && !$phoneInput[0].checkValidity()) {
        $phoneInput.addClass("is-invalid");
      } else {
        $phoneInput.removeClass("is-invalid");
      }
    });

    $("#phone").on("input", function () {
      var $phoneInput = $(this);

      if ($phoneInput.val() && !$phoneInput[0].checkValidity()) {
        $phoneInput.addClass("is-invalid");
      } else {
        $phoneInput.removeClass("is-invalid");
      }
    });
  });

  $(function () {
    $("#contact-form").on("submit", function (event) {
      event.preventDefault();

      $("#response-message")
        .fadeIn(500)
        .text("Thank you! Your message has been sent. We will contact you.");

      $("#submit-btn").html(
        '<span class="check-icon"></span> <span class="text-button">Sent</span>'
      );

      setTimeout(function () {
        $("#response-message").fadeOut(500);

        $("#submit-btn").html("Send");
      }, 15000);

      $(this).trigger("reset");
    });
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

// READ MORE/LESS TEXT
$(function () {
  $(document).ready(function () {
    let swiper = new Swiper(".instrSwiper", {
      slidesPerView: 1,
      loop: true,
      speed: 350,
      spaceBetween: 20,
      centeredSlides: true,
      autoHeight: true,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    $(".read-more").on("click", function () {
      let $target = $(this)
        .siblings(".read-more-wrap")
        .find(".read-more-target");

      $(".read-less").remove();
      $(".read-more").show();

      $target.stop(true).slideDown(500, "swing", () => {
        swiper.update();
        $target.addClass("slide-down");
      });

      $(this).hide();
      $(this).after('<span class="read-less">Read Less</span>');
    });

    $(document).on("click", ".read-less", function () {
      let $target = $(this)
        .siblings(".read-more-wrap")
        .find(".read-more-target");

      $target.stop(true).slideUp(500, "swing", () => {
        swiper.update();
        $target.removeClass("slide-down");
      });

      $(".read-more").show();
      $(this).remove();
    });
  });
});

// MODAL FORM

$(function () {
  $(".modal.fade.section-contact-form").on("show.bs.modal", function () {
    $(".modal.fade.section-contact-form")
      .not(this)
      .removeClass("show")
      .css("display", "none")
      .modal("hide");
  });

  $("#subs-form").on("submit", function (e) {
    e.preventDefault();
    $(this)[0].reset();

    $("#susbc-form").modal("hide").css("display", "none");
    $("#susbc-form-thank").modal("show");
  });

  $(".modal.fade.section-contact-form").on("shown.bs.modal", function () {
    $("body").addClass("modal-open");
  });

  $(".modal.fade.section-contact-form").on("hidden.bs.modal", function () {
    if ($(".modal.fade.section-contact-form.show").length === 0) {
      $("body").removeClass("modal-open");
    }

    if (
      $(".modal.fade.section-contact-form.show").length === 0 &&
      $(".modal-backdrop.fade.show").length > 0
    ) {
      $(".modal-backdrop.fade").removeClass("show").css("display", "none");
    }
  });

  $("#close-thank-modal").on("click", function () {
    $("#susbc-form-thank")
      .modal("hide")
      .removeClass("show")
      .css("display", "none");
  });
});

// SWIPER

var swiper1 = new Swiper(".swiper1", {
  autoHeight: true,
  slidesPerView: 1,
  loop: true,
  speed: 600,
  centeredSlides: true,
  loopedSlides: 3,
  effect: "coverflow",
  grabCursor: true,
  spaceBetween: 0,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 800,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".swiper1-button-next",
    prevEl: ".swiper1-button-prev",
  },
});

var swiper2 = new Swiper(".swiper2", {
  autoHeight: true,
  slidesPerView: 1,
  loop: true,
  speed: 600,
  loopedSlides: 3,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 0,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 800,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".swiper2-button-next",
    prevEl: ".swiper2-button-prev",
  },
});
