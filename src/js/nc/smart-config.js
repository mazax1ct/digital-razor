//если возвращаемся из дизайн конфига сразу на аксессуары
if(window.location.hash.substring(1) == 'accessories') {
  $('.nc__section[data-hash="accessories"] .nc__inner').slideDown(0, function () { //открываем секцию аксессов
    $(".nc__inner").not($('.nc__section[data-hash="accessories"] .nc__inner')).slideUp(0, function () { //закрываем остальные секции
      $(".nc__inner").not($('.nc__section[data-hash="accessories"] .nc__inner')).removeClass("is-active"); //закрываем внутренности остальных секций
      //откручиваем страницу к заголовку открытой секции
      var topOffset = $('.nc__section[data-hash="accessories"]').offset().top - $('.header').height();
      $("html, body").animate({
          scrollTop: topOffset
      }, 0);
    });

    //переключаем класс активности текущей родительской секции
    $('.nc__section').removeClass("is-active");
    $('.nc__section[data-hash="accessories"]').addClass("is-active");

    //переключаем класс активности текущей секции
    $('.nc__section[data-hash="accessories"] .nc__inner').addClass("is-active");
  });
}

//переключение выводимых параметров производительности
$(".js-performance-type .nc__performance-tabs-link").click(function () {
  $(".js-performance-type .nc__performance-tabs-link").removeClass("is-active");
  $(this).addClass("is-active");
  $(".nc__performance-bars-tab").removeClass("is-active");
  $(".nc__performance-bars-tab[data-target=" + $(this).attr("data-target") + "]").addClass("is-active");
  return false;
});

//переключение на "итоговую конфигурацию" и кнопки в футере
$(".js-config-result").click(function () {
  //переключаем видимость основной секции
  $('.nc__section').removeClass('is-active');
  $('.nc__section--result').addClass('is-active');

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
  if(window.location.hash.substring(1) == 'accessories') { //если открыли итог на аксессах
    //переключаем видимость основной секции на начало конфига
    $('.nc__section').removeClass('is-active');
    $('.nc__section[data-hash="accessories"]').addClass('is-active');

    if($('body').width() < 992) { //отсекаем мобилы по ширине body 992px
      $('.nc__inner').slideUp(0, function () {
        $('.nc__inner').removeClass("is-active"); //убираем классы активности
        $('.nc__section[data-hash="accessories"] .nc__inner').slideDown(0, function () {
          $('.nc__section[data-hash="accessories"] .nc__inner').addClass("is-active"); //вешаем класс активности на главную секцию
          //откручиваем страницу к началу блока
          var topOffset = $('.nc__section[data-hash="accessories"] .nc__inner').prev('.config-title').offset().top - $('.header').height();
          $("html, body").animate({
              scrollTop: topOffset
          }, 0);
        });
      });
    }
  } else {
    //переключаем видимость основной секции на начало конфига
    $('.nc__section').removeClass('is-active');
    $('.nc__section:first').addClass('is-active');

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
    }
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

//обработка кнопок для анимации графиков
$('html').keydown(function(e) { //отлавливаем нажатие клавиш
  if (e.keyCode == 107 || e.keyCode == 61) { //если нажали +
    $("#dplus").addClass("plus").animate({
      width: "64%"
    }, 300, function() {
      $(this).addClass("animated flash");
      setTimeout(function() {
        $("#plus").animate({
          width: "64%"
        }, 300 , function() {
          $("#dplus").removeClass("plus animated flash");
        });
      }, 1000);
    });
  }

  if (e.keyCode == 109 || e.keyCode == 173) { //если нажали -
    $("#plus").animate({
      width: "51%"
    }, 300, function() {
      $("#dplus").addClass("minus").addClass("animated flash");
      setTimeout(function() {
        $("#dplus").animate({
          width: "51%"
        }, 300 , function() {
          $("#dplus").removeClass("minus animated flash");
        });
      }, 1000);
    });
  }
});
