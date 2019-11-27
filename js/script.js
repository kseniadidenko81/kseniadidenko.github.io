window.onload = function() {

	document.querySelector('body').classList.add('loaded');

}

// =============================HEADER MENU=============================

var headerMenu = '.nav__list';

$(window).on('resize', function() {
	if($(headerMenu).is(':hidden')) {
		$(headerMenu).removeAttr('style');
	}
});

// =============================SCROLL MENU=============================

function onScroll(){
	$(headerMenu + ' a').each(function(){
		var anchor      = $(this).attr('href');
		var scrollTop   = $(document).scrollTop();
		var positionTop = $(anchor).position().top;
		var outerHeight = $(anchor).outerHeight();

		if ((positionTop <= scrollTop) && (positionTop + outerHeight > scrollTop)) {
			$(headerMenu + ' a.active').removeClass('active');
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});
}

$(document).on('scroll', onScroll);

$(headerMenu+' a').on('click', function(e){
	e.preventDefault();
	$(document).off('scroll');
	$(headerMenu+' a.active').removeClass('active');
	$(this).addClass('active');

	var anchor = $(this).attr('href');
	$('html, body').stop().animate({
		scrollTop: $(anchor).offset().top
	}, 500, function() {
		window.location.hash = anchor;
		$(document).on('scroll', onScroll);
	});
});

//=============================Sticky=============================
$(document).ready(function(){
	setInterval(checkScroll, 20);
	function checkScroll() {
		var nav = $(".container-menu");
		if ($(document).scrollTop() > 0 && !nav.hasClass("sticky")) {
			nav.addClass("sticky");
		} else if ($(document).scrollTop() === 0 && nav.hasClass("sticky")) {
			nav.removeClass("sticky");
		}
	}
});



//=============================To bottom=============================
$(function() {
	$('.chevron-content').click (function() {
		$('html, body').animate({scrollTop: $('section').offset().top }, 'slow');
		return false;
	});
});

//=============================To top=============================
$( window ).scroll( function() {
	if ( $( this ).scrollTop() > 500 ) {
		$( '.back-to-top' ).addClass( 'show-back-to-top' );
	} else {
		$( '.back-to-top' ).removeClass( 'show-back-to-top' );
	}
});

// Click event to scroll to top.
$( '.back-to-top' ).click( function() {
	$( 'html, body' ).animate( { scrollTop : 0 }, 500 );
	return false;
});

//=======================Resume=============================
const items = document.querySelectorAll('.timeline li');

const isInViewport = el => {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
		(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

const run = () =>
	items.forEach(item => {
		if (isInViewport(item)) {
			item.classList.add('show');
		}
	});

// Events
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);