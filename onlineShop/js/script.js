//----------------------------SLIDER--------------------------
var multiItemSlider = (function () {
	return function (selector, config) {
		var
			_mainElement = document.querySelector(selector), // основный элемент блока
			_sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
			_sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
			_sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
			_sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
			_sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
			_wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
			_itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
			_positionLeftItem = 0, // позиция левого активного элемента
			_transform = 0, // значение транфсофрмации .slider_wrapper
			_step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
			_items = []; // массив элементов
		// наполнение массива _items
		_sliderItems.forEach(function (item, index) {
			_items.push({ item: item, position: index, transform: 0 });
		});

		var position = {
			getItemMin: function () {
				var indexItem = 0;
				_items.forEach(function (item, index) {
					if (item.position < _items[indexItem].position) {
						indexItem = index;
					}
				});
				return indexItem;
			},
			getItemMax: function () {
				var indexItem = 0;
				_items.forEach(function (item, index) {
					if (item.position > _items[indexItem].position) {
						indexItem = index;
					}
				});
				return indexItem;
			},
			getMin: function () {
				return _items[position.getItemMin()].position;
			},
			getMax: function () {
				return _items[position.getItemMax()].position;
			}
		}

		var _transformItem = function (direction) {
			var nextItem;
			if (direction === 'right') {
				_positionLeftItem++;
				if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
					nextItem = position.getItemMin();
					_items[nextItem].position = position.getMax() + 1;
					_items[nextItem].transform += _items.length * 100;
					_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
				}
				_transform -= _step;
			}
			if (direction === 'left') {
				_positionLeftItem--;
				if (_positionLeftItem < position.getMin()) {
					nextItem = position.getItemMax();
					_items[nextItem].position = position.getMin() - 1;
					_items[nextItem].transform -= _items.length * 100;
					_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
				}
				_transform += _step;
			}
			_sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
		}

		// обработчик события click для кнопок "назад" и "вперед"
		var _controlClick = function (e) {
			var direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
			e.preventDefault();
			_transformItem(direction);
		};

		var _setUpListeners = function () {
			// добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
			_sliderControls.forEach(function (item) {
				item.addEventListener('click', _controlClick);
			});
		}

		// инициализация
		_setUpListeners();


		return {
			right: function () { // метод right
				_transformItem('right');
			},
			left: function () { // метод left
				_transformItem('left');
			}
		}

	}
}());

var slider = multiItemSlider('.slider');
var Slider2 = multiItemSlider('.slider2');
var slider3 = multiItemSlider('.slider3');

//End Slider

//----------------------------SLIDESHOW--------------------------
var slides = document.querySelectorAll('#container-slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,3000);

function nextSlide() {
	slides[currentSlide].className = 'slide';
	currentSlide = (currentSlide+1)%slides.length;
	slides[currentSlide].className = 'slide showing';
}

//----------------------------jQuery Scripts--------------------------
(function ($) {
	// "use strict";

	//----------------------------Sticky menu--------------------------

	$(document).ready(function(){
		setInterval(checkScroll, 20);
		function checkScroll() {
			var nav = $(".navbar-aside");
			if ($(document).scrollTop() > 0 && !nav.hasClass("sticky")) {
				nav.addClass("sticky");
			} else if ($(document).scrollTop() === 0 && nav.hasClass("sticky")) {
				nav.removeClass("sticky");
			}
		}
	});

	//-----------------Accordion------------------------------
	$('.collapse:first').show();
	$('.article-title:first').addClass('expanded');

	$('.article-title').on('click', function() {
		var content = $(this).next();

		$('.collapse').not(content).slideUp(400);
		$('.article-title').not(this).removeClass('expanded');
		$(this).toggleClass('expanded');
		content.slideToggle(400);
	});

	// ------------search form (icon) on header----------------------
	$(".nav-btn").on('click', function(){
		$("body").addClass('fix');
		$(".search-inner").addClass('show')
	})

	//-------------Sidebar menu basket(icon) on header-------------------

	$(".minicart-btn").on('click', function(){
		$("body").addClass('fix');
		$(".minicart-inner").addClass('show')
	})
	//close menu icon x
	$(".search-inner__close, .minicart-close, .minicart-inner__overlay").on('click', function(){
		$("body").removeClass('fix');
		$(".search-inner, .minicart-inner").removeClass('show')
	})

	//Slide page----------------------------------------------------------------

	(function() {

		var hash = window.location.hash.substr(1);
		var href = $('#nav li a').each(function(){
			var href = $(this).attr('href');
			if(hash==href.substr(0,href.length-5)){
				var toLoad = hash+'.html #content';
				$('#content').load(toLoad)
			}
		});

		$('#nav li a').click(function(){

			var toLoad = $(this).attr('href')+' #content';
			$('#content').hide('fast',loadContent);
			$('#load').remove();
			$('#wrapper').append('<span id="load">LOADING...</span>');
			$('#load').fadeIn('normal');
			window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
			function loadContent() {
				$('#content').load(toLoad,'',showNewContent())
			}
			function showNewContent() {
				$('#content').show('normal',hideLoader());
			}
			function hideLoader() {
				$('#load').fadeOut('normal');
			}
			return false;

		});

	});
})();

(function() {

	var parent = document.querySelector(".range-slider");
	if(!parent) return;

	var
		rangeS = parent.querySelectorAll("input[type=range]"),
		numberS = parent.querySelectorAll("input[type=number]");

	rangeS.forEach(function(el) {
		el.oninput = function() {
			var slide1 = parseFloat(rangeS[0].value),
				slide2 = parseFloat(rangeS[1].value);

			if (slide1 > slide2) {
				[slide1, slide2] = [slide2, slide1];
			}

			numberS[0].value = slide1;
			numberS[1].value = slide2;
		}
	});


	numberS.forEach(function(el) {
		el.oninput = function() {
			var number1 = parseFloat(numberS[0].value),
				number2 = parseFloat(numberS[1].value);

			if (number1 > number2) {
				var tmp = number1;
				numberS[0].value = number2;
				numberS[1].value = tmp;
			}

			rangeS[0].value = number1;
			rangeS[1].value = number2;

		}
	});

})();
