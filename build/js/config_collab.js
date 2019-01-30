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
  $(".js-config-save").click(function () {
    $(".nc__inner").toggleClass("is-active");
    return false;
  });

  //аккордион секций конфига
  $(".js-config-section-opener").click(function () {
    var section = $(this).attr('data-item');
    $('.nc-c-list__item[data-item=' + section + ']').slideDown("300", function () {
      $(".nc-c-list__item").not($('.nc-c-list__item[data-item=' + section + ']')).slideUp("300", function () {
        $(".nc-c-list__item").not($('.nc-c-list__item[data-item=' + section + ']')).removeClass("is-active");
      });
      $('.nc-c-list__item[data-item=' + section + ']').addClass("is-active");
    });
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
