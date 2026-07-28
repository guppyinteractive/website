(function () {
  var overlay = document.getElementById('lightbox');
  if (!overlay) return;
  var view = overlay.querySelector('img');
  var count = overlay.querySelector('.lb-count');
  var group = [];
  var index = 0;

  function show(i) {
    index = (i + group.length) % group.length;
    var src = group[index];
    view.src = src.src;
    view.alt = src.alt;
    count.textContent = (index + 1) + ' / ' + group.length;
  }

  function open(strip, img) {
    group = Array.prototype.slice.call(strip.querySelectorAll('img'));
    overlay.hidden = false;
    document.body.classList.add('lb-open');
    show(group.indexOf(img));
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove('lb-open');
    view.src = '';
  }

  Array.prototype.forEach.call(document.querySelectorAll('.screenshots'), function (strip) {
    strip.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG') open(strip, e.target);
    });
  });

  overlay.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  overlay.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (overlay.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  var touchX = null;
  overlay.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (dx > 40) show(index - 1);
    else if (dx < -40) show(index + 1);
  }, { passive: true });
})();
