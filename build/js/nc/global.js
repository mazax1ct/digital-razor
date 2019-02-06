//закрытие попапа блока компонентов
function ncClose() {
  $("body").removeClass("overflow");
  $(".nc").removeClass("is-open");
  $(".nc-c").removeClass("is-open");
  $(".js-nc-c-block").removeClass("is-open");
  $(".nc-c__list").removeClass("is-open");
}

// закрытие списка компонентов по перевороту устройства
$(window).on("orientationchange", function() {
  ncClose();
});

$(document).ready(function() {
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
});
