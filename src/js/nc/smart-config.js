//залипание блока графиков производительности через соседний селектор в css
if($(".nc__picture-block").length) {
  var resize_scroll = function(e) {
    $(window).scrollTop() > $(".nc__picture-block").innerHeight() + $(".nc__picture-block").offset().top - $(".header").innerHeight()
      ? $(".nc__picture-block").addClass("fixed")
      : $(".nc__picture-block").removeClass("fixed");
  };

  $(window).on("scroll", resize_scroll).on("resize", resize_scroll);
}

$(document).ready(function() {
  //переключение выводимых параметров производительности
  $(".js-performance-type .nc__performance-tabs-link").click(function () {
    $(".js-performance-type .nc__performance-tabs-link").removeClass("is-active");
    $(this).addClass("is-active");
    $(".nc__performance-bars-tab").removeClass("is-active");
    $(".nc__performance-bars-tab[data-target=" + $(this).attr("data-target") + "]").addClass("is-active");
    return false;
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

  //переключение на итоговую конфигурацию и кнопки в футере
  $(".js-config-result").click(function () {
    //переключаем видимость основной секции
    $('.nc__section').removeClass('is-active');
    $('.nc__section--result').addClass('is-active');

    //сбрасываем залипание блока с графиками
    $(".nc__picture-block").removeClass("fixed");

    if($('body').width() < 992) { //отсекаем мобилы по ширине body 992px
      $('.nc__inner').slideUp(0, function () { //закрываем секции
        $('.nc__inner--result').slideDown(0, function () { //открываем итог
          $('.nc__inner').removeClass("is-active"); //меням классы активности
          $('.nc__inner--result').addClass("is-active");
          //откручиваем к началу блока
          var topOffset = $('.nc__inner--result .config-title').offset().top - $('.header').height();
          $("html, body").animate({
              scrollTop: topOffset
          }, 0);
        });
      });
    } else {
      //меняем калссы активности
      $('.nc__inner').removeClass("is-active");
      $('.nc__inner--result').addClass("is-active");
    }

    //переключаем кнопки в футере
    $('.footer__inner').removeClass('is-active');
    $('.footer__inner--result').addClass('is-active');

    return false;
  });

  //возврат из "итоговой конфигурации" к конфигу
  $(".js-config-edit").click(function () {
    //переключаем видимость основной секции на начало конфига
    $('.nc__section').removeClass('is-active');
    $('.nc__section:first').addClass('is-active');

    //сбрасываем залипание блока с графиками
    $(".nc__picture-block").removeClass("fixed");

    if($('body').width() < 992) { //отсекаем мобилы по ширине body 992px
      $('.nc__inner').slideUp(0, function () {
        $('.nc__inner').removeClass("is-active"); //убираем классы активности
        $('.nc__inner--config').slideDown(0, function () {
          $('.nc__inner--config').addClass("is-active"); //вешаем класс активности на главную секцию
          //откручиваем страницу к началу блока
          var topOffset = $('.nc__inner--config').prev('.config-title').offset().top - $('.header').height();
          $("html, body").animate({
              scrollTop: topOffset
          }, 0);
        });
      });
    } else {
      $('.nc__inner').removeClass("is-active");
      $('.nc__inner--config').addClass("is-active");
    }

    //переключаем кнопки в футере
    $('.footer__inner').removeClass('is-active');
    $('.footer__inner--main').addClass('is-active');

    return false;
  });

  //аккордион секций конфига
  $(".js-config-section-opener").click(function () {
    var section_title = $(this);
    var section_id = $(this).attr('data-section');
    var section_parent = $(this).parent('.nc__section');

    //снимаем класс для фиксации блока графиков производительности
    $(".nc__picture-block").removeClass("fixed");

    $('.nc__inner[data-section=' + section_id + ']').slideDown(0, function () { //открываем секцию на заголовок которой нажали
      $(".nc__inner").not($('.nc__inner[data-section=' + section_id + ']')).slideUp(0, function () { //закрываем остальные секции
        $(".nc__inner").not($('.nc__inner[data-section=' + section_id + ']')).removeClass("is-active"); //закрываем внутренности остальных секций
        //откручиваем страницу к заголовку открытой секции
        var topOffset = section_title.offset().top - $('.header').height();
        $("html, body").animate({
            scrollTop: topOffset
        }, 0);
      });

      //переключаем класс активности текущей родительской секции
      $('.nc__section').removeClass("is-active");
      section_parent.addClass("is-active");

      //переключаем класс активности текущей секции
      $('.nc__inner[data-section=' + section_id + ']').addClass("is-active");
    });

    //переключаем кнопки в футере
    $('.footer__inner').removeClass('is-active');
    $('.footer__inner--main').addClass('is-active');
    return false;
  });

  //аккордион подсекций конфига
  $(".js-config-subsection-opener").click(function () {
    var section_title = $(this);
    var section_id = $(this).attr('data-section');
    var parent_section_id = $(this).attr('data-parent-section');

    $('.nc-c-list__item[data-section=' + section_id + ']').slideDown(0, function () {
      $('.nc__inner[data-section=' + parent_section_id + '] .nc-c-list__item:not(.nc-c-list__item[data-section=' + section_id + '])').slideUp(0, function () {
        $('.nc__inner[data-section=' + parent_section_id + '] .nc-c-list__item:not(.nc-c-list__item[data-section=' + section_id + '])').removeClass("is-active");
        //откручиваем страницу к заголовку секции, 275 высота блока с графиками на мобилах
        var topOffset = section_title.offset().top - 275 - $('.header').innerHeight();
        $("html, body").animate({
            scrollTop: topOffset
        }, 0);
      });

      //переключаем класс активности текущей подсекции
      $('.nc-c-list__item[data-section=' + section_id + ']').addClass("is-active");
    });
    return false;
  });
});
