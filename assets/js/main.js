$(function ($) {

  var $container = $('#main');
  var $back = $('#back');
  var $loader = $('#loader');
  var $title = $('#page-title');
  var $toggle = $('.navbar-toggle');

  var current = '/app/index.html';
  var history = [];

  function back() {
    if (history.length) {
      current = history.pop();
      navigate(current);
    }
    if (history.length === 0) {
      $back.hide();
    }
  }

  function forward(url) {
    $back.show();
    if (current !== url) {
      history.push(current);
      current = url;
      navigate(url);
    }
  }

  function root(title, url, reset) {
    console.log(arguments);
    $title.html(title);
    $back.hide();
    history = [];
    if (reset === false) {
      forward(url);
    } else if (current !== url) {
      current = url;
      navigate(url);
    }
  }

  function linkHandler(e) {
    var $tar = $(e.currentTarget);
    var url = $tar.attr('href');

    e.preventDefault();

    if (document.documentElement.clientWidth < 756 &&
        $tar.is('.navbar .nav a')) {
      $toggle.click();
    }

    if ($tar.data('root')) {
      root($tar.data('root'), url, $tar.data('reset'));
    } else if (url !== '#' && url !== current) {
      forward(url);
    }
  }

  function navigate(url) {
    $container.hide();
    $loader.show();
    $.get('/partials' + url, function (data) {
      $loader.hide();
      $container.html(data).show();
    });
  }

  $('body').on('click', 'a[href]', linkHandler);
  $back.click(function (e) {
    back();
  });

});