//закрытие попапа блока компонентов
function ncClose() {
  $("body").removeClass("overflow");
  $(".nc").removeClass("is-open");
  $(".nc-c").removeClass("is-open");
  $(".js-nc-c-block").removeClass("is-open");
  $(".nc-c__list").removeClass("is-open");
}

//закрытие попапа блока компонентов тип 2
function ncClose2() {
  $("body").removeClass("overflow");
  $(".nc-c2").removeClass("is-open");
  $(".js-nc-c2-block").removeClass("is-open");
  $(".nc-c2__list").removeClass("is-open");
}

// закрытие списка компонентов по перевороту устройства
$(window).on("orientationchange", function() {
  ncClose();
});

//закрытие попапа блока компонентов при выборе компонента
$('.nc-item').click(function() {
  ncClose();
});

$('.nc-item2').click(function() {
  ncClose();
});

$('.nc-item3').click(function() {
  ncClose();
});

//открытие/закрытие главного меню
$(".js-menu-opener").click(function() {
  if($(this).hasClass("is-active")) {
    $(this).removeClass("is-active"); //снимаем класс активности с кнопки
    $("body").removeClass("overflow"); //убираем запрет скролла на body
    $(".main-menu").removeClass("is-open"); //закрываем меню
    $(".footer").removeClass("blur"); //убираем класс размытия
    $(".nc").removeClass("blur");
  } else { //обратные действия
    $(this).addClass("is-active");
    $("body").addClass("overflow");
    $(".main-menu").addClass("is-open");
    $(".footer").addClass("blur");
    $(".nc").addClass("blur");
  }
  $('.js-personal-opener').removeClass('is-active'); //закрываем меню личного каинета
  $(".personal-menu").removeClass("is-open");
  return false;
});

//открытие/закрытие меню личного кабинета
$(".js-personal-opener").click(function() {
  if($(this).hasClass("is-active")) {
    $(this).removeClass("is-active"); //снимаем класс активности с кнопки
    $("body").removeClass("overflow"); //убираем запрет скролла на body
    $(".personal-menu").removeClass("is-open"); //закрываем меню
    $(".footer").removeClass("blur"); //убираем класс размытия
    $(".nc").removeClass("blur");
  } else {
    $(this).addClass("is-active");
    $("body").addClass("overflow");
    $(".personal-menu").addClass("is-open");
    $(".footer").addClass("blur");
    $(".nc").addClass("blur");
  }
  $(".js-menu-opener").removeClass('is-active');  //закрываем главное меню
  $(".main-menu").removeClass("is-open");
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

//открытие списка компонентов
$(".js-nc-c-block").click(function () {
  $(".nc-c").removeClass("is-open"); //закрываем все подобные блоки
  $(".js-nc-c-block").removeClass("is-open");
  $(".nc-c__list").removeClass("is-open");
  $(this).addClass("is-open"); //открываем текущий
  $(this).parent(".nc-c").addClass("is-open");
  $(this).next(".nc-c__list").addClass("is-open");
  if($(this).hasClass("is-open")){
    $(".nc").addClass("is-open"); //класс с затененеием
    $("body").addClass("overflow"); //класс с запретом скролла
  } else {
    $(".nc").removeClass("is-open");
    $("body").removeClass("overflow");
  }
});

//закрытие списка компонентов
$(".js-nc-c-block-close").click(function () {
  ncClose();
});

//открытие списка компонентов тип 2
$(".js-nc-c2-block").click(function () {
  $(".nc-c2").removeClass("is-open"); //закрываем все подобные блоки
  $(".js-nc-c2-block").removeClass("is-open");
  $(".nc-c2__list").removeClass("is-open");
  $(this).addClass("is-open"); //открываем текущий
  $(this).parent(".nc-c").addClass("is-open");
  $(this).next(".nc-c2__list").addClass("is-open");
  if($(this).hasClass("is-open")){
    $("body").addClass("overflow"); //класс с запретом скролла
  } else {
    $("body").removeClass("overflow");
  }
});

//закрытие списка компонентов тип 2
$(".js-nc-c2-block-close").click(function () {
  ncClose2();
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
        return false;
      }

      if (slide + 2 >= slides) {
        $(".nc-c-list__arrow--next").prop("disabled", true);
        //return false;
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