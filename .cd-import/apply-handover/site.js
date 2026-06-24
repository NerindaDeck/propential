/* Propential - shared site behaviour */
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

    // Make URLs, emails and AU phone numbers clickable inside legal pages
    linkifyLegal();
  });

  function linkifyLegal() {
    var root = document.querySelector('.legal-wrap');
    if (!root) return;
    var combined = /(https?:\/\/[^\s,);]+|www\.[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s,);]*)?)|([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})|((?:[a-z0-9-]+\.)+(?:com|org|net|gov)\.au\b(?:\/[^\s,);]*)?)|(1[38]00 \d{3} \d{3}|13 \d{2} \d{2})/ig;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest('a')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], cur;
    while ((cur = walker.nextNode())) nodes.push(cur);
    nodes.forEach(function (node) {
      var text = node.nodeValue;
      combined.lastIndex = 0;
      if (!combined.test(text)) return;
      combined.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, m;
      while ((m = combined.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var raw = m[0], trail = '';
        if (!m[4]) { var tp = raw.match(/[.,;:)]+$/); if (tp) { trail = tp[0]; raw = raw.slice(0, raw.length - trail.length); } }
        var a = document.createElement('a');
        if (m[1]) { a.href = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw; a.target = '_blank'; a.rel = 'noopener'; }
        else if (m[2]) { a.href = 'mailto:' + raw; }
        else if (m[3]) { a.href = 'https://' + raw; a.target = '_blank'; a.rel = 'noopener'; }
        else { a.href = 'tel:' + raw.replace(/\s+/g, ''); }
        a.textContent = raw;
        frag.appendChild(a);
        if (trail) frag.appendChild(document.createTextNode(trail));
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }
})();

document.addEventListener("DOMContentLoaded",function(){var vp=document.getElementById("vprog");if(vp){var f=function(){var h=document.documentElement.scrollHeight-window.innerHeight;vp.style.width=(h>0?(window.pageYOffset/h*100):0)+"%";};window.addEventListener("scroll",f,{passive:true});f();}});
