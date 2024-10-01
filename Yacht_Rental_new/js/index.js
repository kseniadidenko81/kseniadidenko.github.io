// Nav toggle menu Script
$(document).ready(function () {
  function checkAndShowHideMenu() {
    if (window.innerWidth < 768) {
      $("#nav ul").addClass("hidden");
    } else {
      $("#nav ul").removeClass("hidden");
    }
  }

  $(document).ready(function () {
    var tmNav = $("#nav");
    tmNav.singlePageNav();

    $("#nav ul li:first-child a").addClass("current");
    $("#nav ul li:nth-child(2) a").removeClass("current");

    $("html, body").scrollTop(0);

    checkAndShowHideMenu();
    window.addEventListener("resize", checkAndShowHideMenu);

    $("#menu-toggle").click(function () {
      $("#nav ul").toggleClass("hidden");
    });

    $("#nav ul li").click(function () {
      if (window.innerWidth < 768) {
        $("#nav ul").addClass("hidden");
      }
    });

    $(document).scroll(function () {
      var distanceFromTop = $(document).scrollTop();

      if (distanceFromTop > 100) {
        tmNav.addClass("scroll");
      } else {
        tmNav.removeClass("scroll");
      }
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        // Удаляем класс current со всех элементов меню
        $("#nav ul li a").removeClass("current");

        // Добавляем класс current к текущей ссылке
        $(this).addClass("current");

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  });
});

// Nav Script

$(document).ready(function () {
  var nav = $("#nav");
  var navOffset = nav.offset().top;

  $(window).on("scroll", function () {
    var scrollPos = $(window).scrollTop();

    if (scrollPos >= navOffset) {
      nav.addClass("fixed");
    } else {
      nav.removeClass("fixed");
    }
  });
});

// Preloader Script

$(window).on("load", function () {
  $("body").addClass("loaded");
});

// Parallax Script

$(document).ready(function () {
  var offset = 56;
  var target = $(".parallax");

  $("html, body").animate(
    {
      scrollTop: target.offset().top - offset,
    },
    0
  );
});

// Shevron Script
$(document).ready(function () {
  var offset = 56;

  $(".chevron-content").click(function () {
    $("html, body").animate(
      { scrollTop: $("section").offset().top - offset },
      "slow"
    );
    return false;
  });
});
