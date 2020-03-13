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
var Slider1 = multiItemSlider('.slider1');
var Slider2 = multiItemSlider('.slider2');
var slider3 = multiItemSlider('.slider3');
var slider4 = multiItemSlider('.slider4');

//End Slider
// --------------------------Plus --- Minus--------------------------------
    var count = 1;
    var countEl = document.getElementById("count");
    function plus(){
        count++;
        countEl.value = count;
    }
    function minus(){
      if (count > 1) {
        count--;
        countEl.value = count;
      }  
    }

//-----------------------Range Filter---------------------------------

;(function( win, $ ) {

	function featureTest( property, value, noPrefixes ) {
		// Modernizr! https://github.com/phistuck/Modernizr/commit/3fb7217f5f8274e2f11fe6cfeda7cfaf9948a1f5
		var prop = property + ':',
			el = document.createElement( 'test' ),
			mStyle = el.style;

		if( !noPrefixes ) {
			mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join( value + ';' + prop ) + value + ';';
		} else {
			mStyle.cssText = prop + value;
		}
		return mStyle[ property ].indexOf( value ) !== -1;
	}

	function getPx( unit ) {
		return parseInt( unit, 10 ) || 0;
	}

	var uniqueIdCounter = 0;

	var S = {
		classes: {
			plugin: 'fixedsticky',
			active: 'fixedsticky-on',
			inactive: 'fixedsticky-off',
			clone: 'fixedsticky-dummy',
			withoutFixedFixed: 'fixedsticky-withoutfixedfixed'
		},
		keys: {
			offset: 'fixedStickyOffset',
			position: 'fixedStickyPosition',
			id: 'fixedStickyId'
		},
		tests: {
			sticky: featureTest( 'position', 'sticky' ),
			fixed: featureTest( 'position', 'fixed', true )
		},
		// jQuery!
		getScrollTop: function() {
			var prop = 'pageYOffset',
				method = 'scrollTop';
			return win ? (prop in win) ? win[ prop ] :
				win.document.documentElement[ method ] :
				win.document.body[ method ];
		},
		bypass: function() {
			// Check native sticky, check fixed and if fixed-fixed is also included on the page and is supported
			return ( S.tests.sticky && !S.optOut ) ||
				!S.tests.fixed ||
				win.FixedFixed && !$( win.document.documentElement ).hasClass( 'fixed-supported' );
		},
		update: function( el ) {
			if( !el.offsetWidth ) { return; }

			var $el = $( el ),
				height = $el.outerHeight(),
				initialOffset = $el.data( S.keys.offset ),
				scroll = S.getScrollTop(),
				isAlreadyOn = $el.is( '.' + S.classes.active ),
				toggle = function( turnOn ) {
					$el[ turnOn ? 'addClass' : 'removeClass' ]( S.classes.active )
						[ !turnOn ? 'addClass' : 'removeClass' ]( S.classes.inactive );
				},
				viewportHeight = $( window ).height(),
				position = $el.data( S.keys.position ),
				skipSettingToFixed,
				elTop,
				elBottom,
				$parent = $el.parent(),
				parentOffset = $parent.offset().top,
				parentHeight = $parent.outerHeight();

			if( initialOffset === undefined ) {
				initialOffset = $el.offset().top;
				$el.data( S.keys.offset, initialOffset );
				$el.after( $( '<div>' ).addClass( S.classes.clone ).height( height ) );
			} else {
				$el.next( '.' + S.classes.clone ).height( height );
			}

			if( !position ) {
				// Some browsers require fixed/absolute to report accurate top/left values.
				skipSettingToFixed = $el.css( 'top' ) !== 'auto' || $el.css( 'bottom' ) !== 'auto';

				if( !skipSettingToFixed ) {
					$el.css( 'position', 'fixed' );
				}

				position = {
					top: $el.css( 'top' ) !== 'auto',
					bottom: $el.css( 'bottom' ) !== 'auto'
				};

				if( !skipSettingToFixed ) {
					$el.css( 'position', '' );
				}

				$el.data( S.keys.position, position );
			}

			function isFixedToTop() {
				var offsetTop = scroll + elTop;

				// Initial Offset Top
				return initialOffset < offsetTop &&
					// Container Bottom
					offsetTop + height <= parentOffset + parentHeight;
			}

			function isFixedToBottom() {
				// Initial Offset Top + Height
				return initialOffset + ( height || 0 ) > scroll + viewportHeight - elBottom &&
					// Container Top
					scroll + viewportHeight - elBottom >= parentOffset + ( height || 0 );
			}

			elTop = getPx( $el.css( 'top' ) );
			elBottom = getPx( $el.css( 'bottom' ) );

			if( position.top && isFixedToTop() || position.bottom && isFixedToBottom() ) {
				if( !isAlreadyOn ) {
					toggle( true );
				}
			} else {
				if( isAlreadyOn ) {
					toggle( false );
				}
			}
		},
		destroy: function( el ) {
			var $el = $( el );
			if (S.bypass()) {
				return $el;
			}

			return $el.each(function() {
				var $this = $( this );
				var id = $this.data( S.keys.id );
				$( win ).unbind( '.fixedsticky' + id );

				$this
					.removeData( [ S.keys.offset, S.keys.position, S.keys.id ] )
					.removeClass( S.classes.active )
					.removeClass( S.classes.inactive )
					.next( '.' + S.classes.clone ).remove();
			});
		},
		init: function( el ) {
			var $el = $( el );

			if( S.bypass() ) {
				return $el;
			}

			return $el.each(function() {
				var _this = this;
				var id = uniqueIdCounter++;
				$( this ).data( S.keys.id, id );

				$( win ).bind( 'scroll.fixedsticky' + id, function() {
					S.update( _this );
				}).trigger( 'scroll.fixedsticky' + id );

				$( win ).bind( 'resize.fixedsticky' + id , function() {
					if( $el.is( '.' + S.classes.active ) ) {
						S.update( _this );
					}
				});
			});
		}
	};

	win.FixedSticky = S;

	// Plugin
	$.fn.fixedsticky = function( method ) {
		if ( typeof S[ method ] === 'function') {
			return S[ method ].call( S, this);
		} else if ( typeof method === 'object' || ! method ) {
			return S.init.call( S, this );
		} else {
			throw new Error( 'Method `' +  method + '` does not exist on jQuery.fixedsticky' );
		}
	};

	// Add fallback when fixed-fixed is not available.
	if( !win.FixedFixed ) {
		$( win.document.documentElement ).addClass( S.classes.withoutFixedFixed );
	}

})( window, jQuery );



//-------------------Number form input--------------------------------------

(function( $ ) {

	//// ---> Проверка на существование элемента на странице
	jQuery.fn.exists = function() {
		return jQuery(this).length;
	}

	//	Phone Mask
	$(function() {

		if ($('#user_phone').exists()) {

			$('#user_phone').each(function() {
				$(this).mask("(999) 999-99-99");
			});

		}

		if ($('.phone_form').exists()) {

			var form = $('.phone_form'),
			btn = form.find('.btn_submit');

			form.find('.rfield').addClass('empty_field');

			setInterval(function() {

				if ($('#user_phone').exists()) {
					var pmc = $('#user_phone');
					if ( (pmc.val().indexOf("_") != -1) || pmc.val() == '' ) {
						pmc.addClass('empty_field');
					} else {
						pmc.removeClass('empty_field');
					}
				}

				var sizeEmpty = form.find('.empty_field').size();

				if (sizeEmpty > 0) {
					if (btn.hasClass('disabled')) {
						return false
					} else {
						btn.addClass('disabled')
					}
				} else {
					btn.removeClass('disabled')
				}

			},200);

			btn.click(function() {
				if ($(this).hasClass('disabled')) {
					return false
				} else {
					form.submit();
				}
			});

		}

	});

})( jQuery );