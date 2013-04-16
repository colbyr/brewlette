;(function ($) {

  var data = window.Data = {};

  $.fn.fixedlist = function () {

    var $input = this.find('input');
    var $list = this.find('.list');
    var $placeholder = this.find('.placeholder');
    var type = $input.data('type');

    $input.focus();

    if (data.hasOwnProperty(type)) {
      $input.val(data[type]);
    }

    $input.keyup(function () {
      var val = $input.val().toLowerCase().trim();
      $list.find('.list-group-item').each(function () {
        var $el = $(this);
        if (this.innerText.toLowerCase().trim().indexOf(val) === -1) {
          $el.hide();
        } else {
          $el.show();
        }
      });
    });

    $list.on('click', '.list-group-item a', function (e) {
      data[type] = this.innerText;
      console.log(data);
    });

  };

}(window.jQuery));
