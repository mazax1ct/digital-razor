function isTouchDevice(){
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

$(function() {
    var isWebKit = 'WebkitAppearance' in document.documentElement.style;

    if (/iPad/i.test(navigator.userAgent) !== true && /iPhone/i.test(navigator.userAgent) !== true && /Android/i.test(navigator.userAgent) !== true && isTouchDevice() !==true && isWebKit !== true) {
      $(window).on("load",function(){
        $(".config__content-block").mCustomScrollbar({
          scrollInertia: 0
        });
        $(".tabs-menu__list").mCustomScrollbar({
          scrollInertia: 0,
          axis:"x",
          scrollbarPosition: 'outside'
        });
        $(".config__sidebar").mCustomScrollbar({
          scrollInertia: 0
        });
        $(".save-block__description").mCustomScrollbar({
          scrollInertia: 0,
          scrollbarPosition: 'outside'
        });
        $(".consult-block__inner").mCustomScrollbar({
          scrollInertia: 0
        });
      });
    } else if(isWebKit === true) {
      $(".tabs-menu__list").addClass('webkit-scroll');
      $(".config__content-block").addClass('webkit-scroll');
      $(".config__sidebar").addClass('webkit-scroll');
      $(".save-block__description").addClass('webkit-scroll');
      $(".consult-block__inner").addClass('webkit-scroll');
    }
});

function CanvasStretchImage(srcImgElem, points, ctx) {
  var yTopStart = points[0][1];
  var yTopEnd = points[1][1];
  var tgtWidth = points[1][0] - points[0][0];
  var dX = tgtWidth;
  var topDy = (yTopEnd-yTopStart) / dX;
  var yBotStart = points[2][1];//3
  var yBotEnd = points[3][1];//2
  tgtWidth = points[3][0] - points[2][0];//3
  dX = tgtWidth;
  var botDy = (yBotEnd-yBotStart) / dX;
  var imgW, imgH, imgDx;
  imgW = srcImgElem.naturalWidth;
  imgH = srcImgElem.naturalHeight;
  imgDx = imgW / dX;
  var curX, curYtop, curYbot, curImgX;
  var i = 0;
  for (curX=points[0][0]; curX<points[1][0]; curX++){
    curYtop = yTopStart + (i * topDy);
    curYbot = yBotStart + (i * botDy);
    curImgX = i * imgDx;
    var sliceHeight = curYbot - curYtop;
    ctx.drawImage(srcImgElem, curImgX, 0, 1, imgH, curX, curYtop, imgDx, sliceHeight);
    i++;
  }
}

$(document).ready(function() {
  //открытие/закрытие главного меню
  $(".js-menu-opener").click(function() {
    if($(this).hasClass("is-active")){
      $(this).removeClass("is-active");
      $("body").removeClass("overflow");
      $(".config").removeClass("blur");
      $(".main-menu").removeClass("is-open");
      $(".footer").removeClass("blur");
    }else{
      $(this).addClass("is-active");
      $("body").addClass("overflow");
      $(".config").addClass("blur");
      $(".main-menu").addClass("is-open");
      $(".footer").addClass("blur");
    }
    $('.js-config-save').removeClass('open');
    $('.save-block').removeClass('is-open');
    $('.js-config-consult').removeClass('open');
    $('.consult-block').removeClass('is-open');
    return false;
  });

  //открытие/закрытие меню конфигуратора
  $(".js-config-menu-opener").click(function() {
    if($(this).hasClass('is-active')){
      $('body').removeClass('overflow');
    }else{
      $('body').addClass('overflow');
    }
    $(this).toggleClass("is-active");
    $(".config__content").toggleClass("blur");
    $(".config__intro").toggleClass("blur");
    $(".footer").toggleClass("blur");
    $(".config-menu").toggleClass("is-open");
    $(".config__sidebar").toggleClass("is-open");
    $('.js-config-save').removeClass('open');
    $('.save-block').removeClass('is-open');
    $('.js-config-consult').removeClass('open');
    $('.consult-block').removeClass('is-open');
    return false;
  });

  //открытие/закрытие блока с графиками производительности
  $('.js-performance-toggler').click(function() {
    $('.performance-title__toggle').toggleClass("is-open");
    $('.performance').slideToggle();
  });

  // скролл к началу конфига
  $('.js-config-scroll').click(function() {
    var topOffset = $('.config__intro').outerHeight(true);
    $("html, body").animate({
        scrollTop: topOffset
    }, 500);
  });

  // переключение вида списков конфига
  $('.js-config-view').click(function() {
    var className = $(this).attr('data-class');
    $('.js-config-view').removeClass('is-active');
    $('.js-config-view[data-class=' + className + ']').addClass('is-active');
    if(className === 'list') {
      $('body').removeClass('tile').addClass('list');
    } else if(className === 'tile') {
      $('body').removeClass('list').addClass('tile');
    }
    return false;
  });

  // переключение описания при выборе элемента в конфиге
  $('.js-config-element').click(function() {
    $('.component--config_description').removeClass('is-active');
    $('.component--config_description[data-description=' + $(this).attr('for') + ']').addClass('is-active');
  });

  // переключение вида списков смарт-конфига
  $('.js-smart-config-view').click(function() {
    var className = $(this).attr('data-class');
    $(this).closest('.config__views-block').find('.js-smart-config-view').removeClass('is-active');
    $(this).closest('.config__views-block').find('.js-smart-config-view[data-class=' + className + ']').addClass('is-active');
    if(className === 'list') {
      $(this).closest('.smart-config-section').removeClass('tile').addClass('list');
    } else if(className === 'tile') {
      $(this).closest('.smart-config-section').removeClass('list').addClass('tile');
    }
    return false;
  });

  // попап сохранение конфига
  $('.js-config-save').click(function() {
    if($(this).hasClass('open')) {
      $("body").removeClass("overflow"); //возвращаем прокрутку
      $('.save-block').removeClass('is-open'); //закрываем попап
      $(this).removeClass('open');
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").removeClass("blur");
      }
    } else {
      $(this).addClass('open');
      $("body").addClass("overflow"); // убираем прокрутку
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").addClass("blur");
      }
      $('.consult-block').removeClass('is-open'); // скрываем попап консультаций
      $('.js-config-consult').removeClass('open'); //снимаем отметку открытого попапа консультаций
      $('.save-block').addClass('is-open'); //открываем попап
    }
    return false;
  });

  $('.js-save-close').click(function() {
    $("body").removeClass("overflow"); //возвращаем прокрутку
    $('.save-block').removeClass('is-open'); //закрываем попап
    $('.js-config-save').removeClass('open'); //убираем отметку открытия попапа
    $(".config").removeClass("blur");
  });

  // попап консультации
  $('.js-config-consult').click(function() {
    if($(this).hasClass('open')) {
      $("body").removeClass("overflow"); //возвращаем прокрутку
      $('.consult-block').removeClass('is-open'); //закрываем попап
      $(this).removeClass('open');
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").removeClass("blur");
      }
    } else {
      $(this).addClass('open');
      $("body").addClass("overflow"); // убираем прокрутку
      $('.save-block').removeClass('is-open'); // скрываем попап сохранения
      $('.js-config-save').removeClass('open'); //снимаем отметку открытого попапа сохранения
      $('.consult-block').addClass('is-open'); //открываем попап
      if($('body').width() > 1199){ // жесткий кастыль
        $(".config").addClass("blur");
      }
    }
    return false;
  });

  $('.js-consult-close').click(function() {
    $("body").removeClass("overflow"); //возвращаем прокрутку
    $('.consult-block').removeClass('is-open'); //закрываем попап
    $('.js-config-consult').removeClass('open'); //убираем отметку открытия попапа
    $(".config").removeClass("blur");
  });

  //аккордион описания
  /*$('.js-accordion').click( function() {
    $(this).prev('.cl-item__text-inner').toggleClass('is-open');
    return false;
  });*/

  // канвас и иже с ним
  window.BASE_IMAGES = {};
  //Get all markered images
  $("img[data-base-id]").each(function () {
    var Wrapper = $(this).parent();
    var CurrentImg = $(this);
    var BASE_ID = $(this).attr("data-base-id");
    window.BASE_IMAGES[BASE_ID] = {};
    var IMAGE = new Image();
    window.BASE_IMAGES[BASE_ID].IMAGE = IMAGE;
    IMAGE.src = $(this).attr("src");
    IMAGE.onload = function() {
      var CANVAS = $('<canvas width="'+IMAGE.width+'" height="'+IMAGE.height+'"><canvas/>')[0];
      window.BASE_IMAGES[BASE_ID].CANVAS = CANVAS;
      var CTX = CANVAS.getContext('2d');
      window.BASE_IMAGES[BASE_ID].CTX = CTX;
      CTX.drawImage(IMAGE, 0, 0);
      window.BASE_IMAGES[BASE_ID].POINTS = [];
      var tmpPoints = {};
      if(IMAGE.width > 0 && IMAGE.height > 0) {
        var IMAGE_DATA_POINT =  CTX.getImageData(0,0,IMAGE.width,IMAGE.height);
        for (var i=0;i<IMAGE_DATA_POINT.data.length;i+=4) {
          if(IMAGE_DATA_POINT.data[i] == 0 && IMAGE_DATA_POINT.data[i+1] == 255 && IMAGE_DATA_POINT.data[i+2] == 0){
              var OffsetTop = parseInt((i/4)/IMAGE.width,10);
              var OffsetLeft = (i/4) - OffsetTop*IMAGE.width;
              tmpPoints[OffsetTop+OffsetLeft] = [OffsetLeft,OffsetTop];
              //window.BASE_IMAGES[BASE_ID].POINTS.push([OffsetTop,OffsetLeft]);
          }
        }
        $.each(tmpPoints,function ($k,$arr) {
          window.BASE_IMAGES[BASE_ID].POINTS.push($arr);
        });
      }
      $(Wrapper).append(CANVAS);
      $(CurrentImg).hide();
    };
  });

  $("[data-base-selector]").change(function (event) {
    var BASE_ID = $(this).attr("data-base-selector");
    var inform = event.originalEvent.target;
    var oFile = inform.files[0];
    var accept = 'image/jpeg,image/png,image/gif';
    if (accept && $.inArray(oFile.type, accept.split(/, ?/)) == -1) {
      return alert('Не допустимый формат.');
    }
    if (oFile.size > 5 * 1024 * 1024) {
      return alert('Размер файла более 5Мб.');
    }
    if (typeof (FileReader) != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var UPLOADED_IMAGE = new Image();
        UPLOADED_IMAGE.src = e.target.result;
        if(!window.BASE_IMAGES[BASE_ID])
          return false;
        UPLOADED_IMAGE.onload = function() {
          CanvasStretchImage(UPLOADED_IMAGE, window.BASE_IMAGES[BASE_ID].POINTS, window.BASE_IMAGES[BASE_ID].CTX);
          var ObjCroppie = $('[data-base-crop='+BASE_ID+']').croppie({
            url: UPLOADED_IMAGE.src,
            viewport: {
              width: 400,
              height: 400
            },
            enableResize: true,
            enableOrientation: false,
            showZoomer: false,
            update: function (data) {
              ObjCroppie.croppie('result',{type: 'base64', format: 'png'}).then(function (res) {
                var CROP_IMAGE = new Image();
                CROP_IMAGE.src = res;
                CanvasStretchImage(CROP_IMAGE, window.BASE_IMAGES[BASE_ID].POINTS, window.BASE_IMAGES[BASE_ID].CTX);
              });
            }
          });
          $('[data-base-crop='+BASE_ID+']').on('update.croppie', function(ev, cropData) {});
        }
      };
      reader.readAsDataURL(oFile);
    } else {
      alert('Обновите ваш браузер');
    }
  });
});
