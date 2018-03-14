// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
}

// Depends
var $ = require('jquery');
require('bootstrap');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
var Fancy_select = require('_modules/fancyselect');
var Jscrollpane = require('_modules/jscrollpane');
// var LightGallery = require('_modules/lightgallery');
var Jslider = require('_modules/jslider');
var Fancybox = require('_modules/fancybox');
var Chosen = require('_modules/chosen');

// счетчики
require('../node_modules/odometer/odometer.js');

// обрезание текста
require('./modules/succinct/succinct.js');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  new Fancy_select();
  new Jscrollpane();
  // new LightGallery();
  new Slider();
  new Jslider();
  new Fancybox();
  new Chosen();

  /* табы хедер */
  (function($) {
    $(function() {
      $('ul.header-tabs__list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('nav.header-tabs').find('div.header-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  /* табы меню */
  (function($) {
    $(function() {
      $('ul.secondary-menu__list').on('mouseover', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('div.secondary-menu__inner').find('div.secondary-menu__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  /* выпадающее меню */
  $('.main-menu__btn').click(function() {
    $(this).toggleClass('active');
    $('.main-menu__btn-icon').toggleClass('active');
    $('.main-wrapper').toggleClass('active');
    $('.main-footer').toggleClass('active');
    $('.secondary-menu').toggleClass('active').slideToggle();
  });

  $(document).on('click', function() {
    $('.main-menu__btn').removeClass('active');
    $('.main-menu__btn-icon').removeClass('active');
    $('.main-wrapper').removeClass('active');
    $('.main-footer').removeClass('active');
    $('.secondary-menu').removeClass('active').slideUp();
  });

  $(document).on('click', '.main-menu__btn', function() {
    return false;
  });

  $(document).on('click', '.secondary-menu', function(e) {
    e.stopPropagation();
  });

  // мобильное меню

  $('.mobile-menu__btn-icon').click(function() {
    $(this).toggleClass('active');
    $('.mobile-menu__list').slideToggle('200');
  });

  $('.mobile-menu__cat-btn').click(function() {
    $(this).toggleClass('active');
    $('.mobile-submenu__list').slideToggle('200');
  });

  $('.mobile-submenu__item__wrapper').click(function() {
    $(this).toggleClass('active');
    $(this).closest('.mobile-submenu__item').find('.mobile-submenu__secondary').slideToggle('200')
    .closest('.mobile-submenu__item').siblings().find('.mobile-submenu__secondary').slideUp('200')
    .closest('.mobile-submenu__item').find('.mobile-submenu__item__wrapper').removeClass('active');
  });

  // главный слайдер
  $('.main-slider').not('.slick-initialized').slick({
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    fade: true,
    dots: true,
    arrows: false
  });

  // слайдер акции

  $('.actions-slider').not('.slick-initialized').slick({
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    nextArrow: '<div class="arrow-right"></div>',
    prevArrow: '<div class="arrow-left"></div>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // слайдер доставка
  $('.delivery-slider').not('.slick-initialized').slick({
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrows: true,
    nextArrow: '<div class="arrow-right"></div>',
    prevArrow: '<div class="arrow-left"></div>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  /* карта */

  $('#Map area').hover(function() {
    var cls = $(this).data('class');
    if (typeof cls !== 'undefined') {
      $('#mapdiv > #map-cont').removeAttr('class').addClass(cls);
    }
  });
  $('#Map area').click(function(e) {
    e.preventDefault();
    var cls = $(this).data('class');
    if (typeof cls !== 'undefined') {
      $('#mapdiv > #map-cont').removeAttr('class').addClass(cls);
      $('.address-info').removeClass('active').eq($(this).index()).addClass('active');
      // $('#filia').html('Региональный менеджер в ' + $(this).data('name') + '<br>' + $(this).data('manager') + '<br>' + 'тел. +38 (067) 514-18-18, +38 (050) 364-23-80');
    }
  });

  /* табы меню */
  (function($) {
    $(function() {
      $('.contacts-tabs').on('mouseover', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('.main-wrapper').find('.contacts-wrapper').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  // cчетчики

  var h = $(window).height();

  $(window).scroll(function() {
    if (($(this).scrollTop() + h) >= $('.section-4').offset().top) {
      $('.odometer1').html(1209);
      $('.odometer2').html(5209);
      $('.odometer3').html(4789);
    }
  });

  // сертификать в полный размер
  $('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // показать еще сертификаты

  $('.show-more-clients__btn').click(function() {
    $('.show-more-clients__btn').fadeOut('50');
    $('.clients-wrapper').slideDown('300').promise().done(function() {
      $('.clients-wrapper').addClass('active');
    });
  });

  /* табы новости */
  (function($) {
    $(function() {
      $('ul.news-tabs__list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('nav.news-tabs').find('div.news-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  // обрезание текста

  $('.news-item__text').succinct({
    size: 200
  });

  // фильтр в каталоге

  var w = $(window).width();

  if (w < 992) {
    $('.sidebar-hiiden').hide();
    $('.sidebar-title').click(function() {
      $('.sidebar-hiiden').slideToggle('200');
    });
  }
  else {
    $('.sidebar-hiiden').removeAttr('style');
  }

  // слайдер карточка товара

  $('.product-slider').not('.slick-initialized').slick({
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    nextArrow: '<div class="arrow-right"></div>',
    prevArrow: '<div class="arrow-left"></div>',
    asNavFor: '.product-nav'
  });

  $('.product-nav').not('.slick-initialized').slick({
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.product-slider'
  });

  // табы карточка товара

  (function($) {
    $(function() {
      $('ul.product-tabs__list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('nav.product-tabs').find('div.product-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  // табы вместе дешевле

  (function($) {
    $(function() {
      $('ul.buy-together__tabs-list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('div.buy-together__inner').find('div.buy-together__content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  // Прокрутка к якорю
  $('.go_to').each(function() {
    var $this = $(this);
    $this.click(function() {
      var scroll_el = $($this.data('destination'));
      if ($(scroll_el).length != 0) {
        $('html, body').animate({
          scrollTop: $(scroll_el).offset().top - 65
        }, 500);
      }
      return false;
    });
  });

  /* скроллинг */

  jQuery(document).ready(function($) {
    $('a[href^="#"]').bind('click.smoothscroll', function(e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate( {
        'scrollTop': $target.offset().top - 65
      }, 1000, 'swing', function() {
        // window.location.hash = target;
      } );
    } );
  } );

  $('.up').click(function() {
    $(window).animate({ scrollTop: 0 }, 'slow');
  });

  (function($) {
    $(function() {
      $('ul.product-menu').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('main.main-container').find('div.product-content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  $('.bottles-tab:not(.active)').one('click', function() {
    $('.volume-slider').slick('destroy');
    setTimeout(function() {
      $('.tab-items').slick('reinit');
    }, 10);
    setTimeout(function() {
      $('.volume-slider').slick({
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: '<div class="arrow-right icon-arr"></div>',
        prevArrow: '<div class="arrow-left icon-arr"></div>'
      });
    }, 50);
  });

  /* фиксация меню */

  window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (($(window).width() <= 1920) && (scrolled > 788)) {
      $('.menu-tabs').addClass('fixed');
      $('.up').show('slow');
    }
    else if (($(window).width() < 1200) && (scrolled > 887)) {
      $('.menu-tabs').addClass('fixed');
      $('.up').show('slow');
    }
    else if (($(window).width() < 991)) {
      $('.menu-tabs').removeClass('fixed');
      $('.up').hide('slow');
    }
    else {
      $('.menu-tabs').removeClass('fixed');
      $('.up').hide('slow');
    }
  };

  /* изменение значка поиска */
  var toggles_search = document.querySelectorAll('.search-btn');

  for (var i = toggles_search.length - 1; i >= 0; i--) {
    var toggle_s = toggles_search[i];
    toggleHandler(toggle_s);
  }

  function toggleHandler(toggle_s) {
    toggle_s.addEventListener( 'click', function(e) {
      e.preventDefault();
      (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
    });
  }

  /* выдвижное меню - стартовые пакеты */

  $('.packages-menu__btn').click(function(e) {
    if ($(this).hasClass('active')) {
      $('.packages-menu').addClass('active');
      $('.main-container').addClass('active');
      $('.main-footer').addClass('active');
      $('.main-search').removeClass('active');
      $('.search-btn__main').removeClass('active');
    }
    else {
      $('.packages-menu').removeClass('active');
      $('.main-search').removeClass('active');
      $('.main-container').removeClass('active');
      $('.main-footer').removeClass('active');
      $('.search-btn__main').removeClass('active');
    }
  });

  /* выдвижное меню на главной */

  $('.main-menu__btn').click(function(e) {
    if ($(this).hasClass('active')) {
      $('.main-menu').addClass('active');
      $('.main-container').addClass('active');
      $('.main-footer').addClass('active');
      $('.main-search').removeClass('active');
      $('.search-btn__main').removeClass('active');
    }
    else {
      $('.main-menu').removeClass('active');
      $('.main-search').removeClass('active');
      $('.main-container').removeClass('active');
      $('.main-footer').removeClass('active');
      $('.search-btn__main').removeClass('active');
    }
  });

  /* поиск */

  $('.search-btn__main').click(function(e) {
    if ($(this).hasClass('active')) {
      $('.main-search').addClass('active');
      $('.main-container').addClass('active');
      $('.main-footer').addClass('active');
      $('.main-menu').removeClass('active');
      $('.main-menu__btn').removeClass('active');
      $('.packages-menu').removeClass('active');
    }
    else {
      $('.main-search').removeClass('active');
      $('.main-menu').removeClass('active');
      $('.main-menu__btn').removeClass('active');
      $('.main-container').removeClass('active');
      $('.main-footer').removeClass('active');
      $('.packages-menu').removeClass('active');
    }
  });

  /* корзина */

  $('.cart-wrapper').click(function(e) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.main-cart').removeClass('active');
      $('header').css('filter', 'none');
      $('main').css('filter', 'none');
      $('footer').css('filter', 'none');
    }
    else {
      $(this).addClass('active');
      $('.main-cart').addClass('active');
      $('header').css('filter', 'blur(4px)');
      $('main').css('filter', 'blur(4px)');
      $('footer').css('filter', 'blur(4px)');
    }
  });

  $('.main-cart__close').click(function(e) {
    if ($(this).hasClass('active')) {
      $(this).addClass('active');
      $('.main-cart').addClass('active');
      $('header').css('filter', 'blur(4px)');
      $('main').css('filter', 'blur(4px)');
      $('footer').css('filter', 'blur(4px)');
      $('.cart-wrapper').addClass('active');
    }
    else {
      $(this).removeClass('active');
      $('.main-cart').removeClass('active');
      $('header').css('filter', 'none');
      $('main').css('filter', 'none');
      $('footer').css('filter', 'none');
      $('.cart-wrapper').removeClass('active');
    }
  });

  $(document).click(function() {
    if ($('.main-cart').hasClass('active')) {
      $('.cart-wrapper').removeClass('active');
      if ($('.cart-wrapper.active').length < 1) {
        $('.main-cart').removeClass('active');
        $('header').css('filter', 'none');
        $('main').css('filter', 'none');
        $('footer').css('filter', 'none');
      }
    }
  });

  $('.cart-wrapper').click(function(e) {
    e.stopPropagation();
  });

  $('.main-cart').click(function(e) {
    e.stopPropagation();
  });

  /* удаление из корзины */

  if ($('.main-cart__order').length != 0) {
    $('.main-cart__orders-list').show();
  }
  else {
    $('.main-cart__orders-list').hide();
    $('.empty-cart').css('display', 'flex');
  }

  $('.main-cart__del-order').click(function() {
    $(this).parent('li').slideUp('slow').promise().done(function() {
      $(this).remove();
      if ($('.main-cart__order').length != 0) {
        $('.main-cart__orders-list').show();
      }
      else {
        $('.main-cart__orders-list').hide();
        $('.empty-cart').css('display', 'flex');
      }
    });
  });

  // размытие фона
  if ($('.popup-btn').length > 0) {
    $('.popup-btn').magnificPopup({
      callbacks: {
        open: function() {
          $('header').css('filter', 'blur(4px)');
          $('main').css('filter', 'blur(4px)');
          $('footer').css('filter', 'blur(4px)');
          $.magnificPopup.instance.close = function() {
            $('header').css('filter', 'none');
            $('main').css('filter', 'none');
            $('footer').css('filter', 'none');
            $('.log-reg-wrapper').removeAttr('style');
            $('.regisration-wrapper').removeAttr('style');
            $.magnificPopup.proto.close.call(this);
          };
        }
      }
    });
  }

  /* табы личный кабинет */

  (function($) {
    $(function() {
      $('ul.user-room__tabs-list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('section.user-room').find('div.user-room__tabs-content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);


  /* изменение личных данных */

  $('.change-data__btn').click(function() {
    if ($('.user-room__input').is(':disabled')) {
      $('.user-room__input').removeAttr('disabled');
      $('.user-room__select').removeAttr('disabled');
      $('.change-data__btn').text('Сохранить');
    }
    else {
      $('.user-room__input').attr('disabled', 'disabled');
      $('.user-room__select').attr('disabled', 'disabled');
      $('.change-data__btn').text('Изменить личные данные');
    }
  });

  /* удаление из истории заказов */

  if ($('.user-room__order-history-items').length != 0) {
    $('.user-room__order-history').show();
  }
  else {
    $('.user-room__order-history').hide();
    $('.user-room__order-history__empty').css('display', 'flex');
  }

  $('.user-room__del-order').click(function() {
    $(this).parent('li').slideUp('slow').promise().done(function() {
      $(this).remove();
      if ($('.user-room__order-history-items').length != 0) {
        $('.user-room__order-history').show();
      }
      else {
        $('.user-room__order-history').hide();
        $('.user-room__order-history__empty').css('display', 'flex');
      }
    });
  });

  /* карта */

  $('#Map area').hover(function() {
    var cls = $(this).data('class');
    if (typeof cls !== 'undefined') {
      $('#mapdiv > #map-cont').removeAttr('class').addClass(cls);
    }
  });
  $('#Map area').click(function(e) {
    e.preventDefault();
    var cls = $(this).data('class');
    if (typeof cls !== 'undefined') {
      $('#mapdiv > #map-cont').removeAttr('class').addClass(cls);
      $('#filia').html('Региональный менеджер в ' + $(this).data('name') + '<br>' + $(this).data('manager') + '<br>' + 'тел. +38 (067) 514-18-18, +38 (050) 364-23-80');
    }
  });

  /* табы вакансии */

  (function($) {
    $(function() {
      $('ul.vacancies-list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('nav.vacancies-tabs').find('div.vacancies-content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  /* переключение логин/регистрация */

  $('.reg-btn').click(function() {
    $('.regisration-wrapper').slideDown('slow').promise().done(function() {
      $(this).show();
    });
    $('.log-reg-wrapper').slideDown('slow').promise().done(function() {
      $(this).hide();
    });
  });

  /* корзина этапы */

  $('.user-info-btn').click(function() {
    $('.user-info__wrapper').hide('slow');
    $('.delivery-form').show('slow');
    $('.user-info__edit').show('slow');
  });

  $('.user-info__edit').click(function() {
    $(this).hide('slow');
    $('.user-info__wrapper').show('slow');
    $('.delivery-form').hide('slow');
  });

  /* табы доставка */

  (function($) {
    $(function() {
      $('ul.delivery-info-list').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('.delivery-form').find('div.delivery-content').removeClass('active').eq($(this).index()).addClass('active');
      });
    });
  })(jQuery);

  /* табы статьи */
  (function($) {
    $(function() {
      $('js-tabs').on('click', 'li:not(.newsTabs-active)', function() {
        $(this)
          .addClass('newsTabs-active').siblings().removeClass('newsTabs-active')
          .closest('.newsTabs-active').find('newsTabs-content').removeClass('newsTabs-active').eq($(this).index()).addClass('newsTabs-active');
      });
    });
  })(jQuery);
});

