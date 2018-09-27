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
    $('.geo__list').toggleClass('is-open');
    return false;
  });

  //удалить
  $('.geo__list-item').click(function() {
    var text = $(this).text();
    $('.geo__opener').text(text);
    return false;
  });
});
