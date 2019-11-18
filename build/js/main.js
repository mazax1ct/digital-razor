function isTouchDevice(){
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

$(document).ready(function() {

  //открытие/закрытие главного меню
  $(".js-menu-opener").click(function() {
    $(this).toggleClass("is-active");
    $("body").toggleClass("overflow");
    $(".page-content").toggleClass("blur");
    $(".footer").toggleClass("blur");
    $(".main-menu").toggleClass("is-open");
    $(".main-menu-block").toggleClass("is-open");

    $(".bb-popup").removeClass("is-open");
    return false;
  });

  // дропдаун у главного меню
  if(isTouchDevice()===true) {
    $('.root-link').click(function(){
      if(!$(this).parent().hasClass('is-hover')){
        var sub = $(this).next('.main-menu__dropdown');
        if(sub.is(':visible')){
          $('.main-menu__dropdown').removeClass('open');
          return true;
        } else {
          $('.main-menu__dropdown').removeClass('open');
          sub.addClass('open');
          return false;
        }
      }
    });
  } else {
    $('.root').hover(
      function() {
        $(this).find('.main-menu__dropdown').stop(true, true).fadeIn(200);
      }, function() {
        $(this).find('.main-menu__dropdown').stop(true, true).fadeOut(200);
      }
    );
  }

  //главный баннер
  if ($(".js-main-banner").length) {
    $('.js-main-banner').slick({
      adaptiveHeight: true,
      arrows: false,
      dots: true
    });
  }

  //баннер в деталке каталога
  if ($(".js-catalog-banner").length) {
    $('.js-catalog-banner').slick({
      adaptiveHeight: true,
      mobileFirst: true,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            dots: false,
            arrows: true,
            prevArrow: '<button class="slick-prev" aria-label="Назад" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
            nextArrow: '<button class="slick-next" aria-label="Вперед" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
          }
        }
      ]
    });
  }

  //аккордеон
  $('.js-accordion-title').click(function() {
    $('.accordion__body[data-target=' + $(this).attr('data-link') + ']').slideToggle();
    return false;
  });

  //табы на страницах
  $('.js-tab-link').click(function() {
    $('.page-tabs[data-tabs=' + $(this).attr('data-tabs') + '] .page-tab').removeClass('is-active');
    $('.page-tab[data-target=' + $(this).attr('data-link') + ']').addClass('is-active');
    $(this).parent().parent().find('.sections-menu__item').removeClass('is-active');
    $(this).parent().addClass('is-active');
    return false;
  });

  //прокрутка к выбору варианта подбора
  $('.js-pick-scroll').click(function() {
    var headerHeaight = $('.header').height();
    var topOffset = $('.js-scroll-here').offset();
    $("html, body").animate({
        scrollTop: topOffset.top - headerHeaight
    }, 500);
  });

  //выбор города
  $('.js-geo').click(function() {
    $('.geo2__dropdown').toggleClass('is-open');
    return false;
  });

  //автосаггест
  $('.js-geo-list').focus(function() {
    $('.geo2__suggest').show();
  });

  $('.js-geo-list').blur(function() {
    $('.geo2__suggest').hide();
  });

  //удалить
  $('.geo__list-item').click(function() {
    var text = $(this).text();
    $('.geo__opener').text(text);
    return false;
  });

  //главный баннер
  if ($(".js-hero-banner").length) {
    $('.js-hero-banner').slick({
      adaptiveHeight: true,
      arrows: false,
      dots: false,
      asNavFor: '.js-hero-nav'
    });

    $('.js-hero-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.js-hero-banner',
      dots: false,
      prevArrow: '<button class="slick-prev" aria-label="Назад" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
      nextArrow: '<button class="slick-next" aria-label="Вперед" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
      focusOnSelect: true,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 479,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 639,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 6
          }
        }
      ]
    });
  }

  //открытие/закрытие попапа "битва брендов"
  $(".js-bb-opener").click(function() {
    $(".js-menu-opener").removeClass("is-active");
    $(".page-content").removeClass("blur");
    $(".footer").removeClass("blur");
    $(".main-menu").removeClass("is-open");
    $(".main-menu-block").removeClass("is-open");

    $("body").toggleClass("overflow");
    $(".bb-popup").toggleClass("is-open");
    return false;
  });

  $(".js-open-bb").click(function() {
    $(".bb-popup__inner").toggle();
    $(".bb-popup__bb").toggleClass("is-open");
  });

  //открытие попапа
  if ($("[data-fancybox='popup']").length) {
    $("[data-fancybox='popup']").fancybox({
      touch: false,
      infobar: false,
      toolbar: false,
      smallBtn: false,
      animationEffect: false,
      arrows: false,
      hash: false
  	});
  }

  //закрытие попапа
  $('.js-popup-close').on('click', function() {
  	$.fancybox.close();
  	return false;
  });

  //слайдер игр в блоке выбора конфигурации по fps
  $('.js-fps-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: '<button class="slick-prev" aria-label="Назад" type="button"><svg class="slick-arrow__svg" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
    nextArrow: '<button class="slick-next" aria-label="Вперед" type="button"><svg class="slick-arrow__svg" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  });

  $(".js-game").click(function() {
    $(".js-game").removeClass('is-active');
    $(this).addClass('is-active');
  });

  $('.auth-form__input, .reg-form__input').focus(function () {
    $('.auth-form__input, .reg-form__input').addClass('no-focus');
    $(this).removeClass('no-focus');
  });

  $('.auth-form__input, .reg-form__input').blur(function () {
    $('.auth-form__input, .reg-form__input').removeClass('no-focus');
  });

  //слайдер в отзывах
  if ($(".js-review-slider").length) {
    $('.js-review-slider').slick({
      infinite: false,
      arrows: false,
      dots: true
    });
  }
});
