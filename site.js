/* Propential — shared site behaviour */
(function () {
  // Apply persisted global tweaks (gold intensity, heading font, section rhythm)
  // so settings chosen on the home page carry across every page.
  try {
    var t = JSON.parse(localStorage.getItem('propential_tweaks') || '{}');
    var root = document.documentElement;
    if (t.gold) root.setAttribute('data-gold', t.gold);
    if (t.fontFeel) root.setAttribute('data-font', t.fontFeel);
    if (t.rhythm) root.setAttribute('data-rhythm', t.rhythm);
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    // Mobile nav toggle
    var toggle = document.querySelector('.nav__toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        document.body.classList.toggle('menu-open');
        var open = document.body.classList.contains('menu-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // close menu when a link is tapped
      document.querySelectorAll('.nav__menu a').forEach(function (a) {
        a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
      });
    }

    // Reveal on scroll
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  });
})();

document.addEventListener("DOMContentLoaded",function(){var vp=document.getElementById("vprog");if(vp){var f=function(){var h=document.documentElement.scrollHeight-window.innerHeight;vp.style.width=(h>0?(window.pageYOffset/h*100):0)+"%";};window.addEventListener("scroll",f,{passive:true});f();}});
