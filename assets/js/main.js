$(function ($) {

  function linkHandler(e) {
    e.preventDefault();
    var $tar = $(e.currentTarget);
    if (document.documentElement.clientWidth < 756 &&
        $tar.is('.navbar .nav a')) {
      $toggle.click();
    }
    if ($tar.attr('href') !== '#') {
      $container.hide();
      $loader.show();
      $.get('/partials' + $tar.attr('href'), function (data) {
        $loader.hide();
        $container.html(data).show();
      });
    }
  }

  var $container = $('#main');
  var $loader = $('#loader');
  var $toggle = $('.navbar-toggle');

  if ('ontouchstart' in document.documentElement) {
    $('body').on('tap', 'a[href]', linkHandler);
    $('body').on('click', 'a[href]', function (e) { e.preventDefault(); });
  } else {
    $('body').on('click', 'a[href]', linkHandler);
  }

});