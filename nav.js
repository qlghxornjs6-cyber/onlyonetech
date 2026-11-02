(function () {
  var btn = document.querySelector('.site-nav__toggle');
  var panel = document.getElementById('site-subnav');
  if (!btn || !panel) return;
  var fallback = document.querySelector('[data-subnav-link]');
  if (fallback) fallback.hidden = true;
  btn.hidden = false;

  function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }
  function setOpen(open, returnFocus) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('is-open', open);
    if (!open && returnFocus) btn.focus();
  }

  btn.addEventListener('click', function () { setOpen(!isOpen()); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) setOpen(false, true);
  });
  document.addEventListener('click', function (e) {
    if (isOpen() && !panel.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
  panel.addEventListener('focusout', function (e) {
    var next = e.relatedTarget;
    if (isOpen() && next && !panel.contains(next) && next !== btn) setOpen(false);
  });
})();
