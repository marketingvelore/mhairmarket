(function () {
  'use strict';

  var WHATSAPP_NUMBER = '38765754484';

  var buttons = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.product-card');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var filter = btn.getAttribute('data-filter');
      items.forEach(function (item) {
        var match = filter === 'all' || item.getAttribute('data-cat') === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });

  document.querySelectorAll('.product-order-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var name = btn.getAttribute('data-product');
      var text = 'Zdravo, zanima me proizvod: ' + name + '. Da li je dostupan?';
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
    });
  });
})();
