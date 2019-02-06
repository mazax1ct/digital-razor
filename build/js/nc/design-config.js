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
    pic.src = '../images/content/back.png';
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
    pic.src = '../images/content/back.png';
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
    pic.src = '../images/content/back.png';
    pic2.src = '../images/content/back_light.png';
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
  $(".nc__inner-top--design").addClass("is-active");
  $(".nc__inner-top--design").removeClass("fixed");
  var topOffset = $('.nc__inner--result .config-title').offset().top - $('.header').height();
  $("html, body").animate({
      scrollTop: topOffset
  }, 0);
  return false;
});
