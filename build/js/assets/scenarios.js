$(function() {

/****************************************/
/* main-nav
/****************************************/
	var $menu = $('.top-menu');
	var $item = $('.top-menu__item');
	var $link = $('.top-menu__link');

	$link.click(function(e) {
		e.preventDefault();

		$(this).addClass('top-menu__link--current')
			.closest($menu).find($item).siblings()
				.find($link).removeClass('top-menu__link--current');

		if ( $(this).hasClass('top-menu__link--current') ) {
			$(this).removeClass('top-menu__link--current');
		} else {
			$(this).addClass('top-menu__link--current');
			
		}
	});


/****************************************/
/* mobile nav menu
/****************************************/
	$('#toggleMenu').click(function() {
		var $mainNav = $('.main-nav');

		$('#searchForm').addClass('header-seach-form--isMobile');
		$mainNav.append($('#searchForm').clone());

		if ( $mainNav.is(":hidden") ) {
			$(this).addClass('mobile-menu-toggle--close');
			$mainNav.animate({'left': '0'}, 500, 'swing').show();
			$('.top-menu').addClass('top-menu--isMobile');
			$('.top-menu__item:last .top-menu__link').removeClass('top-menu__link--isIcon');
			$('.top-menu__link').addClass('top-menu__link--isMobile');
		} else {
				$mainNav.animate({'left': '-30rem'}, 500, 'swing');
				$(this).removeClass('mobile-menu-toggle--close');
				setTimeout(function() {
					$mainNav.hide();
				}, 600)
			}
	});// end click
// end mobile nav menu


/************************************************/
/* responsive image slider (block race-slider)
/************************************************/
	var numCount = 1, maxNum = 8;

	$('.race-slider__toggle--right').click(function() {
		var $currentSlide = $('.race-slider__slide--active'),
				$nextSlide = $currentSlide.next(),
				$currentNum = $('.race-slider__num:first');

		if ($nextSlide.length === 0) {
			$nextSlide = $('.race-slider__slide').first();
		}
		$currentSlide.fadeOut(400).removeClass('race-slider__slide--active');
		$nextSlide.fadeIn(400).addClass('race-slider__slide--active');

		if (numCount < maxNum) {
			numCount ++;
			$currentNum.text(numCount);
		} else {
			numCount = 1;
			$currentNum.text(numCount);
		}
	});//end right click

	$('.race-slider__toggle--left').click(function() {
		var $currentSlide = $('.race-slider__slide--active'),
				$nextSlide = $currentSlide.prev(),
				$currentNum = $('.race-slider__num:first');
		if ($nextSlide.length === 0) {
			$nextSlide = $('.race-slider__slide').last();
		}
		$currentSlide.fadeOut(400).removeClass('race-slider__slide--active');
		$nextSlide.fadeIn(400).addClass('race-slider__slide--active');

		numCount--;
		$currentNum.text(numCount);
		if (numCount < 1) {
			numCount = maxNum+1;
			numCount--;
			$currentNum.text(numCount);
		}
	});//end left click
//end responsive slider


/***************************************************/
/*header loading bar while scrolling & sticky header
/***************************************************/
	$('.page-header').after('<div class="sticky-header"></div>');
	var $stickHead = $('.sticky-header'),
			$headWrap = $('.main-content__header-wrapper');

	$stickHead
		.append($('<div class="sticky-header__content-clone"></div>'))
		.append($('<div class="sticky-header__subscribe"></div>'))
		.append($('<div class="sticky-header__progress-bar"></div>'));
	$('.sticky-header__content-clone')
		.append($('.article-logo').clone())
		.append($('.main-content__title').clone())
		.append($('.about-article__info:nth-child(2)').clone());
		
	$(window).scroll(function() {
		
		//progress bar
		var documentHeight = $(document).height(),
				windowScroll = $(window).scrollTop(),
				windowHeight = $(window).height(),
				$contentTitle = $headWrap.position(),
				$headerHeight = $('.main-content__header').height();
				scrollMax = documentHeight - windowHeight,
				scrollPercentage = windowScroll / (scrollMax / 100);

		$('.sticky-header__progress-bar').width(scrollPercentage + '%');

		if ( $(window).scrollTop() > $contentTitle.top + $headerHeight*0.2 ) {
			$stickHead.slideDown();
		} 
		else {
			$stickHead.slideUp();
		}
	});


/***************************************************/
/*header parallax scrolling
/***************************************************/

	/*var $headerWrapPos = $('.main-content__header-wrapper').position();

	function parallax(){
		var scrolled = $(window).scrollTop();
		$('.main-content__header-wrapper').css('top', $headerWrapPos.top - (scrolled * 0.2) + 'px');
		if ((document).width < 470) {
			return false;
		}
	}
	
	$(window).scroll(function(e){
		parallax();
	});*/

/************************************************/
/* subscribe form verification
/************************************************/
$('#subscripForm').validate({
	rules: {
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		email: {
			required: 'Пожалуйста, введите свой e-mail',
			email: 'Введите e-mail в формате example@mail.com'
		}
	}
});

});//end ready