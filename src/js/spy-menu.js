//spy menu init
if($(".js-sections-menu").length) {
  // Cache selectors
  var menu = $(".js-sections-menu");
  var menuTopOffset = $('.js-scroll-menu').offset().top;
  var headerHeight = $('.header').height();
  var lastId;
  var topMenu = $(".js-sections-menu");
  var topMenuHeight = topMenu.outerHeight() + 5;
  var menuItems = topMenu.find("a"); // All list items
  var scrollItems = menuItems.map(function() { // Anchors corresponding to menu items
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

  $(window).on('scroll', function(e) {
    if(window.pageYOffset >= menuTopOffset) {
      $('.scroll-menu-block__inner').addClass('fixed');
    } else {
      $('.scroll-menu-block__inner').removeClass('fixed');
    }

    if(window.pageYOffset >= menuTopOffset - headerHeight/2) {
      $('.header').addClass('hidden');
    } else {
      $('.header').removeClass('hidden');
    }
  });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e) {
    var href = $(this).attr("href");
    var offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300, function () {
      // Set window.location.hash
      history.pushState(null, document.title, href);
    });
    // Scroll spy menu
    if($('.js-sections-menu .is-active').index() >= 2) {
      $(menu).stop().animate({
          scrollLeft: 500
      }, 1000);
    } else {
      $(menu).stop().animate({
          scrollLeft: -500
      }, 1000);
    }
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;
    // Get id of current scroll item
    var cur = scrollItems.map(function() {
      if ($(this).offset().top < fromTop) {
        return this;
      }
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if(lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems.parent().removeClass("is-active").end().filter("[href='#" + id + "']").parent().addClass("is-active");
      // Set/remove window.location.hash
      var loc = location.href.replace(location.hash,"");
      if(id > 0) {
        history.replaceState(null, document.title, loc + '#' + id);
      } else {
        history.replaceState(null, document.title, loc);
      }
      // Scroll spy menu
      if($('.js-sections-menu .is-active').index() >= 2) {
        $(menu).stop().animate({
            scrollLeft: 500
        }, 1000);
      } else {
        $(menu).stop().animate({
            scrollLeft: -500
        }, 1000);
      }
    }
  });
}
