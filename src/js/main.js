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
      dots: false
    });
  }

  //баннер в деталке каталога
  if ($(".js-catalog-banner").length) {
    $('.js-catalog-banner').slick({
      adaptiveHeight: true,
      mobileFirst: true,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            arrows: true,
            prevArrow: '<button class="slick-prev" aria-label="Назад" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
            nextArrow: '<button class="slick-next" aria-label="Вперед" type="button"><svg class="slick-arrow" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
          }
        }
      ]
    });
  }
});
