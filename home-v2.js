/* Propential Home v2 - carousel, reveal, floating nav */
(function () {
  document.addEventListener('DOMContentLoaded', function () {

    /* ---- reveal on scroll ---- */
    var reveals = document.querySelectorAll('.v2-reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---- floating nav solidifies past the hero ---- */
    var nav = document.querySelector('.nav');
    var hero = document.querySelector('.v2hero');
    if (nav && hero) {
      var onScroll = function () {
        var trigger = hero.offsetHeight - 90;
        nav.classList.toggle('nav--solid', window.pageYOffset > trigger);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ---- project carousel ---- */
    var track = document.getElementById('projTrack');
    var dotsWrap = document.getElementById('projDots');
    if (track && dotsWrap) {
      var cards = Array.prototype.slice.call(track.children);
      var index = 0, timer = null, paused = false;

      cards.forEach(function (_, i) {
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Go to project ' + (i + 1));
        b.addEventListener('click', function () { goTo(i); restart(); });
        dotsWrap.appendChild(b);
      });
      var dots = Array.prototype.slice.call(dotsWrap.children);

      function setActive(i) {
        index = i;
        dots.forEach(function (d, di) { d.classList.toggle('is-active', di === i); });
      }
      function goTo(i) {
        i = (i + cards.length) % cards.length;
        track.scrollTo({ left: cards[i].offsetLeft, behavior: 'smooth' });
        setActive(i);
      }
      function nearest() {
        var best = 0, min = Infinity;
        cards.forEach(function (c, i) {
          var d = Math.abs(c.offsetLeft - track.scrollLeft);
          if (d < min) { min = d; best = i; }
        });
        return best;
      }
      // sync dots while the user scrolls/swipes
      var st;
      track.addEventListener('scroll', function () {
        clearTimeout(st);
        st = setTimeout(function () { setActive(nearest()); }, 90);
      }, { passive: true });

      function tick() { if (!paused) goTo(index + 1); }
      function start() { timer = setInterval(tick, 4500); }
      function restart() { clearInterval(timer); start(); }
      ['pointerdown', 'mouseenter', 'touchstart'].forEach(function (ev) {
        track.addEventListener(ev, function () { paused = true; }, { passive: true });
      });
      ['mouseleave', 'touchend', 'pointerup'].forEach(function (ev) {
        track.addEventListener(ev, function () { paused = false; }, { passive: true });
      });

      setActive(0);
      start();
    }
  });
})();
