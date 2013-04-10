$(function ($) {

  var $container = $('#main');
  var $loader = $('#loader');
  var $toggle = $('.navbar-toggle');
  var current_url = null;

  function linkHandler(e) {
    var $tar = $(e.currentTarget);
    var url = $tar.attr('href');

    e.preventDefault();

    if (document.documentElement.clientWidth < 756 &&
        $tar.is('.navbar .nav a')) {
      $toggle.click();
    }

    if (url !== '#' && url !== current_url) {
      current_url = url;
      $container.hide();
      $loader.show();
      $.get('/partials' + $tar.attr('href'), function (data) {
        $loader.hide();
        $container.html(data).show();
      });
    }
  }

  if ('ontouchstart' in document.documentElement) {
    $('body').on('tap', 'a[href]', linkHandler);
    $('body').on('click', 'a[href]', function (e) { e.preventDefault(); });
  } else {
    $('body').on('click', 'a[href]', linkHandler);
  }

});