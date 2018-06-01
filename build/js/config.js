$(document).ready(function() {
  //открытие/закрытие главного меню
  $(".js-menu-opener").click(function() {
    $(this).toggleClass("is-active");
    $("body").toggleClass("overflow");
    $(".config").toggleClass("blur");
    $(".footer").toggleClass("blur");
    $(".main-menu").toggleClass("is-open");
    return false;
  });

  //открытие/закрытие меню конфигуратора
  $(".js-config-menu-opener").click(function() {
    $(this).toggleClass("is-active");
    $("body").toggleClass("overflow");
    $(".config__content").toggleClass("blur");
    $(".footer").toggleClass("blur");
    $(".config-menu").toggleClass("is-open");
    return false;
  });
});
