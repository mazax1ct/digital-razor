function ncClose() {
  $("body").removeClass("overflow");
  $(".nc").removeClass("is-open");
  $(".nc-c").removeClass("is-open");
  $(".js-nc-c-block").removeClass("is-open");
  $(".nc-c__list").removeClass("is-open");
}

$(document).ready(function() {
  //открытие/закрытие главного меню
  $(".js-menu-opener").click(function() {
    if($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $("body").removeClass("overflow");
      $(".main-menu").removeClass("is-open");
      $(".footer").removeClass("blur");
      $(".nc").removeClass("blur");
    } else {
      $(this).addClass("is-active");
      $("body").addClass("overflow");
      $(".main-menu").addClass("is-open");
      $(".footer").addClass("blur");
      $(".nc").addClass("blur");
    }
    $('.js-personal-opener').removeClass('is-active');
    $(".personal-menu").removeClass("is-open");
    return false;
  });

  //открытие/закрытие меню личного кабинета
  $(".js-personal-opener").click(function() {
    if($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $("body").removeClass("overflow");
      $(".personal-menu").removeClass("is-open");
      $(".footer").removeClass("blur");
      $(".nc").removeClass("blur");
    } else {
      $(this).addClass("is-active");
      $("body").addClass("overflow");
      $(".personal-menu").addClass("is-open");
      $(".footer").addClass("blur");
      $(".nc").addClass("blur");
    }
    $(".js-menu-opener").removeClass('is-active');
    $(".main-menu").removeClass("is-open");
    return false;
  });

  //переключение выводимых параметров производительности
  $(".js-performance-type .nc__performance-tabs-link").click(function () {
    $(".js-performance-type .nc__performance-tabs-link").removeClass("is-active");
    $(this).addClass("is-active");
    $(".nc__performance-bars-tab").removeClass("is-active");
    $(".nc__performance-bars-tab[data-target=" + $(this).attr("data-target") + "]").addClass("is-active");
    return false;
  });

  //открытие списка компонентов
  $(".js-nc-c-block").click(function () {
    $(".nc-c").removeClass("is-open");
    $(".js-nc-c-block").removeClass("is-open");
    $(this).addClass("is-open");
    $(".nc-c__list").removeClass("is-open");
    $(this).parent(".nc-c").addClass("is-open");
    $(this).next(".nc-c__list").addClass("is-open");
    if($(this).hasClass("is-open")){
      $(".nc").addClass("is-open");
      $("body").addClass("overflow");
    } else {
      $(".nc").removeClass("is-open");
      $("body").removeClass("overflow");
    }
  });

  //закрытие списка компонентов
  $(".js-nc-c-block-closer").click(function () {
    ncClose();
  });

  //закрытие списка компонентов
  $(".js-nc-c-block-close").click(function () {
    ncClose();
  });

  //листалка "слайдов" конфига
  $(".nc-c-list__arrow").click(function () {
    var parent = $(this).parent();
    var slides = parent.find($('.nc-c-list__item-cell')).length; //кол-во слайдов

    if(slides > 1) { //если есть другие слайды

      if($(this).hasClass("nc-c-list__arrow--next")) { //если движемся вперед

        var slide = $(".nc-c-list__item-cell.is-active").index();

        if ((slide + 1) < slides) {
          $(".nc-c-list__item-cell").removeClass("is-active");
          $(".nc-c-list__item-cell").eq(slide + 1).addClass("is-active");
          $(".nc-c-list__arrow--prev").prop("disabled", false);
        }

        if (slide + 2 >= slides) {
          $(".nc-c-list__arrow--next").prop("disabled", true);
          return false;
        }
      }

      if($(this).hasClass("nc-c-list__arrow--prev")) { //если движемся назад
        var slide = $(".nc-c-list__item-cell.is-active").index();

        console.log("назад");
        if(slide > 0) {
          $(".nc-c-list__item-cell").removeClass("is-active");
          $(".nc-c-list__item-cell").eq(slide - 1).addClass("is-active");
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
  $(".js-config-save").click(function () {
    $(".nc__inner").toggleClass("is-active");
    return false;
  });

  //аккордион секций конфига
  $(".js-config-section-opener").click(function () {
    var section_title = $(this);
    var section_id = $(this).attr('data-section');

    $('.nc__inner[data-section=' + section_id + ']').slideDown(100, function () {
      $(".nc__inner").not($('.nc__inner[data-section=' + section_id + ']')).slideUp(100, function () {
        $(".nc__inner").not($('.nc__inner[data-section=' + section_id + ']')).removeClass("is-active");
        //откручиваем страницу к заголовку секции
        var topOffset = section_title.offset().top - $('.header').height();
        $("html, body").animate({
            scrollTop: topOffset
        }, 0);
      });
      $('.nc__inner[data-section=' + section_id + ']').addClass("is-active");
    });
    return false;
  });

  //аккордион подсекций конфига
  $(".js-config-subsection-opener").click(function () {
    var section_title = $(this);
    var section_id = $(this).attr('data-section');
    $('.nc-c-list__item[data-section=' + section_id + ']').slideDown(100, function () {
      $(".nc-c-list__item").not($('.nc__inner .nc-c-list__item[data-section=' + section_id + ']')).slideUp(100, function () {
        $(".nc-c-list__item").not($('.nc__inner .nc-c-list__item[data-section=' + section_id + ']')).removeClass("is-active");
        //откручиваем страницу к заголовку секции
        var topOffset = section_title.offset().top - $('.header').height();
        $("html, body").animate({
            scrollTop: topOffset
        }, 0);
      });
      $('.nc-c-list__item[data-section=' + section_id + ']').addClass("is-active");
    });
    return false;
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
});

// закрытие списка компонентов
$(window).resize(function() {
  ncClose();
});

$(window).on("orientationchange", function() {
  ncClose();
});
