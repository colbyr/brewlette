$(function ($) {

  var $container = $('#main');
  var $toggle = $('.navbar-toggle');

  $('body').on('click', 'a[href!="#"]', function (e) {
    e.preventDefault();
    var $tar = $(e.currentTarget);
    if (document.documentElement.clientWidth < 756 &&
        $tar.is('.navbar .nav a')) {
      $toggle.click();
    }
    if ($tar.attr('href') !== '#') {
      $.get('/partials' + $tar.attr('href'), function (data) {
        $container.html(data);
      });
    }
  });

});