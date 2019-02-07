//залипание блока с картинкой
if($(".nc__inner-cell--canvas").length) {
  var resize_scroll_design = function(e) {
    $(window).scrollTop() > $(".nc__inner-top--design").offset().top - $(".header").innerHeight()
      ? $(".nc__inner-top--design").addClass("fixed")
      : $(".nc__inner-top--design").removeClass("fixed");
  };

  $(window).on("scroll", resize_scroll_design).on("resize", resize_scroll_design);
}

//галимые функции для отрисовки канваса
function drawBack() {
  var back_side = document.getElementById('back_side');
  if (back_side.getContext) {
    var ctx = back_side.getContext('2d');
    var pic = new Image();
    back_side.height = 840;
    back_side.width = 840;
    pic.src = 'https://mazax1ct.github.io/digital-razor/build/images/content/back.png';
    pic.onload = function () {
      ctx.save();
      ctx.scale(-1,1);
      ctx.drawImage(pic, 0, 0, back_side.width * -1 , back_side.height);
      ctx.restore();
    }
  }
}

function drawOwnBack() {
  var own_back = document.getElementById('own_back');
  if (own_back.getContext) {
    var ctx = own_back.getContext('2d');
    var pic = new Image();
    own_back.height = 840;
    own_back.width = 840;
    pic.src = 'https://mazax1ct.github.io/digital-razor/build/images/content/back.png';
    pic.onload = function () {
      ctx.save();
      ctx.scale(-1,1);
      ctx.drawImage(pic, 0, 0, own_back.width * -1 , own_back.height);
      ctx.restore();
    }
  }
}

function drawFront() {
  var front_side = document.getElementById('front_side');
  if (front_side.getContext) {
    var ctx = front_side.getContext('2d');
    var pic = new Image();
    var pic2 = new Image();
    front_side.height = 840;
    front_side.width = 840;
    pic.src = 'https://mazax1ct.github.io/digital-razor/build/images/content/back.png';
    pic2.src = 'https://mazax1ct.github.io/digital-razor/build/images/content/back_light.png';
    pic.onload = function () {
      ctx.drawImage(pic, 0, 0);
    }
    pic2.onload = function () {
      ctx.drawImage(pic2, 0, 0);
    }
  }
}

drawFront();
drawBack();
drawOwnBack();

//закртие блока загрузки картинки
$('.js-own-design-close').click(function () {
  $('.nc__inner-top--design-block').removeClass("is-active");
  $(".nc__inner-top--design").addClass("is-active").removeClass("fixed");
  var topOffset = $('.nc__inner--result .config-title').offset().top - $('.header').height();
  $("html, body").animate({
      scrollTop: topOffset
  }, 0);
  return false;
});

//открытие блока загрузки картинки
$('.js-own-design-opener').click(function () {
  ncClose(); //закрываем блок выбора компонена (десктоп)
  $('.nc__inner-top--design').removeClass('is-active'); //скрываем блок с дизайном
  $('.nc__inner-top--own_design').addClass('is-active'); //показываем блок с загрузкой картинки
  return false;
});

//переключение на "итоговую конфигурацию" и кнопки в футере
$(".js-config-result").click(function () {
  //переключаем видимость основной секции
  $('.nc__section').removeClass('is-active');
  $('.nc__section--result').addClass('is-active');

  //сбрасываем залипание блока с графиками
  $(".nc__inner-top--design").removeClass("fixed");

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
  $(".nc__inner-top--design").removeClass("fixed");

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
  var section_title = $(this); //заголовок
  var section_id = $(this).attr('data-section'); //id секции
  var section_parent = $(this).parent('.nc__section'); //радительская секция

  //снимаем класс для фиксации блока с изображением
  $(".nc__inner-top--design").removeClass("fixed");

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

//аккордион подсекций конфига (мобила)
$(".js-design-section-opener").click(function () {
  var section_title = $(this);
  var section_id = $(this).attr('data-section');

  $('.design__section-inner[data-section=' + section_id + ']').slideDown(0, function () { //разворачиваем нужную секцию
    $('.design__section-inner:not(.design__section-inner[data-section=' + section_id + '])').slideUp(0, function () { //сворачиваем остальные секции
      $('.design__section-inner:not(.design__section-inner[data-section=' + section_id + '])').removeClass("is-active"); //убираем класс активности
      //откручиваем страницу к заголовку секции, 275 высота блока с изображением
      var topOffset = section_title.offset().top - 275 - $('.header').innerHeight();
      $("html, body").animate({
          scrollTop: topOffset
      }, 0);
    });

    //переключаем класс активности текущей секции
    $('.design__section-inner[data-section=' + section_id + ']').addClass("is-active");
  });
  return false;
});
