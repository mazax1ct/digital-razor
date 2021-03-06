function isTouchDevice() { // проверка на тач устройства
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

$(function() {
    // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;

  if (isSafari !== true && isChrome !== true && isBlink !== true) {
    $(window).on("load", function() {
      if($("body").width() > 991) {
        $(".config__content-block").mCustomScrollbar({
          scrollInertia: 0
        });
        $(".tabs-menu__list").mCustomScrollbar({
          scrollInertia: 0,
          axis:"x",
          scrollbarPosition: 'outside',
          alwaysShowScrollbar: 1
        });
        $(".config__sidebar").mCustomScrollbar({
          scrollInertia: 0
        });
        $(".save-block__description").mCustomScrollbar({
          scrollInertia: 0,
          scrollbarPosition: 'outside'
        });
        $(".consult-block__inner").mCustomScrollbar({
          scrollInertia: 0
        });
        $(".nc__inner-cell").mCustomScrollbar({
          scrollInertia: 0
        });
      }
    });
  }
});

$(document).ready(function() {
  //открытие/закрытие главного меню
  $(".js-menu-opener").click(function() {
    if($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $("body").removeClass("overflow");
      $(".config").removeClass("blur");
      $(".main-menu").removeClass("is-open");
      $(".footer").removeClass("blur");
      $(".nc").removeClass("blur");
    } else {
      $(this).addClass("is-active");
      $("body").addClass("overflow");
      $(".config").addClass("blur");
      $(".main-menu").addClass("is-open");
      $(".footer").addClass("blur");
      $(".nc").addClass("blur");
    }
    $(".config__content").removeClass("blur");
    $(".config__intro").removeClass("blur");
    $(".js-config-menu-opener").removeClass("is-active");
    $(".config-menu").removeClass("is-open");
    $('.js-personal-opener').removeClass('is-active');
    $(".personal-menu").removeClass("is-open");
    $('.js-config-save').removeClass('open');
    $('.save-block').removeClass('is-open');
    $('.js-config-consult').removeClass('open');
    $('.consult-block').removeClass('is-open');
    return false;
  });

  //открытие/закрытие меню личного кабинета
  $(".js-personal-opener").click(function() {
    if($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $("body").removeClass("overflow");
      $(".config").removeClass("blur");
      $(".personal-menu").removeClass("is-open");
      $(".footer").removeClass("blur");
      $(".nc").removeClass("blur");
    } else {
      $(this).addClass("is-active");
      $("body").addClass("overflow");
      $(".config").addClass("blur");
      $(".personal-menu").addClass("is-open");
      $(".footer").addClass("blur");
      $(".nc").addClass("blur");
    }
    $(".config__content").removeClass("blur");
    $(".config__intro").removeClass("blur");
    $(".js-menu-opener").removeClass('is-active');
    $(".main-menu").removeClass("is-open");
    $(".js-config-menu-opener").removeClass("is-active");
    $(".config-menu").removeClass("is-open");
    $('.js-config-save').removeClass('open');
    $('.save-block').removeClass('is-open');
    $('.js-config-consult').removeClass('open');
    $('.consult-block').removeClass('is-open');
    return false;
  });

  //открытие/закрытие меню конфигуратора
  $(".js-config-menu-opener").click(function() {
    if($(this).hasClass('is-active')) {
      $(this).removeClass("is-active");
      $(".config-menu").removeClass("is-open");
      $('body').removeClass('overflow');
      $(".config__content").removeClass("blur");
      $(".config__intro").removeClass("blur");
      $(".footer").removeClass("blur");
      $(".config__sidebar").removeClass("is-open");
    } else {
      $(this).addClass("is-active");
      $(".config-menu").addClass("is-open");
      $('body').addClass('overflow');
      $(".config__content").addClass("blur");
      $(".config__intro").addClass("blur");
      $(".footer").addClass("blur");
      $(".config__sidebar").addClass("is-open");
    }
    $(".config").removeClass("blur");
    $(".js-menu-opener").removeClass('is-active');
    $(".main-menu").removeClass("is-open");
    $('.js-personal-opener').removeClass('is-active');
    $(".personal-menu").removeClass("is-open");
    $('.js-config-save').removeClass('open');
    $('.save-block').removeClass('is-open');
    $('.js-config-consult').removeClass('open');
    $('.consult-block').removeClass('is-open');
    return false;
  });

  //открытие/закрытие блока с графиками производительности
  $('.js-performance-toggler').click(function() {
    $('.performance-title__toggle').toggleClass("is-open");
    $('.performance').slideToggle();
  });

  //скролл к началу конфига
  $('.js-config-scroll').click(function() {
    var topOffset = $('.config__intro').outerHeight(true);
    $("html, body").animate({
        scrollTop: topOffset
    }, 500);
  });

  //переключение вида списков конфига
  $('.js-config-view').click(function() {
    var className = $(this).attr('data-class');
    $('.js-config-view').removeClass('is-active');
    $('.js-config-view[data-class=' + className + ']').addClass('is-active');
    if(className === 'list') {
      $('body').removeClass('tile').addClass('list');
    } else if(className === 'tile') {
      $('body').removeClass('list').addClass('tile');
    }
    return false;
  });

  //переключение описания при выборе элемента в конфиге
  $('.js-config-element').click(function() {
    $('.component--config_description').removeClass('is-active');
    $('.component--config_description[data-description=' + $(this).attr('for') + ']').addClass('is-active');
  });

  //переключение вида списков смарт-конфига
  $('.js-smart-config-view').click(function() {
    var className = $(this).attr('data-class');
    $(this).closest('.config__views-block').find('.js-smart-config-view').removeClass('is-active');
    $(this).closest('.config__views-block').find('.js-smart-config-view[data-class=' + className + ']').addClass('is-active');
    if(className === 'list') {
      $(this).closest('.smart-config-section').removeClass('tile').addClass('list');
    } else if(className === 'tile') {
      $(this).closest('.smart-config-section').removeClass('list').addClass('tile');
    }
    return false;
  });

  //попап сохранение конфига
  $('.js-config-save').click(function() {
    if($(this).hasClass('open')) {
      $("body").removeClass("overflow"); //возвращаем прокрутку
      $('.save-block').removeClass('is-open'); //закрываем попап
      $(this).removeClass('open');
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").removeClass("blur");
      }
    } else {
      $(this).addClass('open');
      $("body").addClass("overflow"); // убираем прокрутку
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").addClass("blur");
      }
      $('.consult-block').removeClass('is-open'); // скрываем попап консультаций
      $('.js-config-consult').removeClass('open'); //снимаем отметку открытого попапа консультаций
      $('.save-block').addClass('is-open'); //открываем попап
    }
    return false;
  });

  $('.js-save-close').click(function() {
    $("body").removeClass("overflow"); //возвращаем прокрутку
    $('.save-block').removeClass('is-open'); //закрываем попап
    $('.js-config-save').removeClass('open'); //убираем отметку открытия попапа
    $(".config").removeClass("blur");
    $(".header").removeClass("blur");
    $(".footer").removeClass("blur");
  });

  //попап консультации
  $('.js-config-consult').click(function() {
    if($(this).hasClass('open')) {
      $("body").removeClass("overflow"); //возвращаем прокрутку
      $('.consult-block').removeClass('is-open'); //закрываем попап
      $(this).removeClass('open');
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").removeClass("blur");
      }
    } else {
      $(this).addClass('open');
      $("body").addClass("overflow"); // убираем прокрутку
      $('.save-block').removeClass('is-open'); // скрываем попап сохранения
      $('.save-block2').removeClass('is-open'); // скрываем попап сохранения
      $('.js-config-save').removeClass('open'); //снимаем отметку открытого попапа сохранения
      $('.js-config-save2').removeClass('open'); //снимаем отметку открытого попапа сохранения
      $('.consult-block').addClass('is-open'); //открываем попап
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").addClass("blur");
      }
    }
    return false;
  });

  $('.js-consult-close').click(function() {
    $("body").removeClass("overflow"); //возвращаем прокрутку
    $('.consult-block').removeClass('is-open'); //закрываем попап
    $('.js-config-consult').removeClass('open'); //убираем отметку открытия попапа
    $(".config").removeClass("blur");
    $(".header").removeClass("blur");
    $(".footer").removeClass("blur");
  });

  //тогл описания в корзине
  $('.js-cart-description-opener').click(function() {
    $(".cart-table__description[data-target=" + $(this).attr("data-link") + "]").slideToggle(300);
    return false;
  });

  // тогл описания в списке конфигураций
  $('.js-config-detail-opener').click(function() {
    $(".config-list__detail[data-target=" + $(this).attr("data-link") + "]").slideToggle(300);
    return false;
  });

  // попап сохранение конфига новый
  $('.js-config-save2').click(function() {
    if($(this).hasClass('open')) {
      $("body").removeClass("overflow"); //возвращаем прокрутку
      $('.save-block2').removeClass('is-open'); //закрываем попап
      $(this).removeClass('open');
      $(".config").removeClass("blur");
      $(".header").removeClass("blur");
      $(".footer").removeClass("blur");
    } else {
      $(this).addClass('open');
      $("body").addClass("overflow"); // убираем прокрутку
      $(".config").addClass("blur");
      $(".header").addClass("blur");
      $(".footer").addClass("blur");
      $('.consult-block').removeClass('is-open'); // скрываем попап консультаций
      $('.js-config-consult').removeClass('open'); //снимаем отметку открытого попапа консультаций
      $('.save-block2').addClass('is-open'); //открываем попап
    }
    return false;
  });

  $('.js-save-close2').click(function() {
    $("body").removeClass("overflow"); //возвращаем прокрутку
    $('.save-block2').removeClass('is-open'); //закрываем попап
    $('.js-config-save2').removeClass('open'); //убираем отметку открытия попапа
    $(".config").removeClass("blur");
    $(".header").removeClass("blur");
    $(".footer").removeClass("blur");
  });

  //слайдер итоговой конфигурации
  if ($(".js-config-result-slider").length) {
    $('.js-config-result-slider').slick({
      adaptiveHeight: true,
      prevArrow: '<button class="slick-prev" aria-label="Назад" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
      nextArrow: '<button class="slick-next" aria-label="Вперед" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
      dots: true,
      fade: true
    });
  }

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

  //открытие нового блока производительности
  $(".js-performance").click(function () {
    $(".nc__performance-dropdown").toggleClass("is-open");
  });

  //открытие скрытого блока с показателями производительности
  $(".js-hidden-bars-opener").click(function () {
    $(".nc__performance-bars-hidden").toggleClass("is-open");
    if($(".nc__performance-bars-hidden").hasClass("is-open")){
      $(this).text($(this).attr("data-text2"));
    } else {
      $(this).text($(this).attr("data-text1"));
    }
  });

  //переключение выводимых параметров производительности
  $(".js-performance-type .nc__performance-tabs-link").click(function () {
    $(".js-performance-type .nc__performance-tabs-link").removeClass("is-active");
    $(this).addClass("is-active");
    $(".nc__performance-bars-tab").removeClass("is-active");
    $(".nc__performance-bars-tab[data-target=" + $(this).attr("data-target") + "]").addClass("is-active");
    return false;
  });

  //открытие списка компонентов на 992
  $(".js-nc-c-block").click(function () {
    $(".nc-c").removeClass("is-open");
    $(".js-nc-c-block").removeClass("is-open");
    $(this).addClass("is-open");
    $(".nc-c__list").removeClass("is-open");
    $(this).parent(".nc-c").addClass("is-open");
    $(this).next(".nc-c__list").addClass("is-open");
    if($(this).hasClass("is-open")){
      $(".nc").addClass("is-open");
    } else {
      $(".nc").removeClass("is-open");
    }
  });

  //закрытие списка компонентов на 992
  $(".js-nc-c-block-close").click(function () {
    $(".js-nc-c-block").removeClass("is-open");
    $(".nc-c__list").removeClass("is-open");
    $(".nc-c").removeClass("is-open");
    $(".nc").removeClass("is-open");
  });

  //листалка "слайдов" конфига
  $(".nc-c-list__arrow").click(function () {
    var slides = $('.nc-c-list__item').length; //кол-во слайдов

    if(slides > 1) { //если есть другие слайды

      if($(this).hasClass("nc-c-list__arrow--next")) { //если движемся вперед

        var slide = $(".nc-c-list__item.is-active").index();
        console.log("вперед", slide, slides);

        if ((slide + 1) < slides) {
          $(".nc-c-list__item").removeClass("is-active");
          $(".nc-c-list__item").eq(slide + 1).addClass("is-active");
          $(".nc-c-list__arrow--prev").prop("disabled", false);
        }

        if (slide + 2 >= slides) {
          $(".nc-c-list__arrow--next").prop("disabled", true);
          return false;
        }
      }

      if($(this).hasClass("nc-c-list__arrow--prev")) { //если движемся назад
        var slide = $(".nc-c-list__item.is-active").index();

        console.log("назад");
        if(slide > 0) {
          $(".nc-c-list__item").removeClass("is-active");
          $(".nc-c-list__item").eq(slide - 1).addClass("is-active");
          $(".nc-c-list__arrow--next").prop("disabled", false);
        }

        if(slide - 1 == 0) {
          $(".nc-c-list__arrow--prev").prop("disabled", true);
          return false;
        }
      }

    } else { //если слайдов нет, то кнопки отключаем на php при формировании шаблона
      console.log("слайдов 1, нужно отключить кнопки");
    }

  });

  //переключение на итоговую конфигурацию
  $(".js-config-save3").click(function () {
    $(".nc__inner").toggleClass("is-active");
    $('.js-config-result-slider').slick('reinit');
    return false;
  });
});
