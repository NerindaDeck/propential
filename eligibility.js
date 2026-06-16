/* Propential - eligibility check (client-side validation + instant result) */
(function () {
  var form = document.getElementById('eligForm');
  var result = document.getElementById('result');
  var state = document.getElementById('state');
  var stateHint = document.getElementById('stateHint');
  var money0 = function (n) { return '$' + Math.round(n).toLocaleString('en-AU'); };

  // Live chip checked styling
  form.addEventListener('change', function (e) {
    if ((e.target.type === 'radio' || e.target.type === 'checkbox') && e.target.closest('.chip')) {
      form.querySelectorAll('input[name="' + e.target.name + '"]').forEach(function (r) {
        var chip = r.closest('.chip'); if (chip) chip.classList.toggle('is-checked', r.checked);
      });
    }
    if (e.target === state) {
      var qn = state.value === 'QLD' || state.value === 'NT';
      stateHint.textContent = qn
        ? 'In ' + state.value + ', the loan is secured by a second mortgage over your property.'
        : 'In ' + state.value + ', the loan is secured by a caveat over your property.';
    }
  });

  function setError(field, on) {
    var f = field.closest('.field') || field;
    f.classList.toggle('field--error', on);
  }

  // Live amount validation ($5,000–$100,000)
  var amountEl = document.getElementById('amount');
  function checkAmount() {
    if (amountEl.value === '') { setError(amountEl, false); return; }
    var amt = parseFloat(amountEl.value);
    setError(amountEl, !(amt >= 5000 && amt <= 100000));
  }
  amountEl.addEventListener('blur', checkAmount);
  amountEl.addEventListener('input', function () {
    if ((amountEl.closest('.field') || amountEl).classList.contains('field--error')) checkAmount();
  });

  function validate() {
    var ok = true;
    // radios
    ['own', 'project', 'security'].forEach(function (name) {
      var checked = form.querySelector('input[name="' + name + '"]:checked');
      var group = form.querySelector('input[name="' + name + '"]');
      setError(group, !checked); if (!checked) ok = false;
    });
    // state
    setError(state, !state.value); if (!state.value) ok = false;
    // amount
    var amt = parseFloat(document.getElementById('amount').value);
    var amtBad = !(amt >= 5000 && amt <= 100000);
    setError(document.getElementById('amount'), amtBad); if (amtBad) ok = false;
    // text
    ['name', 'email', 'phone'].forEach(function (id) {
      var el = document.getElementById(id);
      var bad = !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
      setError(el, bad); if (bad) ok = false;
    });
    // consent
    var consent = document.getElementById('consent');
    setError(consent, !consent.checked); if (!consent.checked) ok = false;
    return ok;
  }

  var MARK = '<span class="result-mark mark" aria-hidden="true"><svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rmg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ECD58C"/><stop offset="0.5" stop-color="#D6B15E"/><stop offset="1" stop-color="#B6873A"/></linearGradient></defs><path d="M34 96 L100 36 L166 96" fill="none" stroke="url(#rmg)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 92 V162 Q52 174 64 174 H136 Q148 174 148 162 V92" fill="none" stroke="url(#rmg)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="112" r="14" fill="url(#rmg)"/><path d="M90 120 L110 120 L114 154 L86 154 Z" fill="url(#rmg)"/></svg></span>';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstErr = form.querySelector('.field--error');
      if (firstErr) window.scrollTo({ top: firstErr.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' });
      return;
    }

    var data = {
      own: form.own.value,
      state: state.value,
      amount: parseFloat(document.getElementById('amount').value),
      project: Array.prototype.map.call(form.querySelectorAll('input[name="project"]:checked'), function (c) { return c.value; }).join(', '),
      security: form.security.value,
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim()
    };

    // TODO: wire to Formstack (medipay.formstack.com) + ActiveCampaign CRM,
    // with referral code attached and an email fallback. Live integration to be added later.

    // Carry answers to the application form
    try { localStorage.setItem('propential_elig', JSON.stringify(data)); } catch (err) {}

    var eligible = data.own !== 'no' && data.security !== 'no';
    var html = MARK;

    if (eligible) {
      html +=
        '<h2>Good news, ' + escapeHtml(data.name.split(' ')[0]) + '.</h2>' +
        '<p style="color:var(--ivory)">Based on your answers, a Propential property-secured loan looks like a fit. The next step is a full application. It takes a few minutes and we\u2019ll come back to you quickly.</p>' +
        '<div class="result-summary">' +
          '<span>Borrowing <b>' + money0(data.amount) + '</b></span>' +
          '<span>Project: <b>' + escapeHtml(data.project) + '</b></span>' +
          '<span>Property in <b>' + escapeHtml(data.state) + '</b></span>' +
        '</div>' +
        '<div class="result-actions">' +
          '<a class="btn btn-primary btn-lg" href="apply.html">Continue to application</a>' +
          '<a class="btn btn-ghost btn-lg" href="calculator.html">See repayments</a>' +
        '</div>' +
        '<p style="margin-top:22px;font-size:0.78rem;color:var(--text-faint)">Indicative only. Not a quote, approval or credit offer, and subject to full credit assessment.</p>';
    } else {
      var reason = data.own === 'no'
        ? 'A Propential loan is secured against a property you own, so property ownership is needed to proceed.'
        : 'A Propential loan is secured by a mortgage or caveat over your property. If that\u2019s not something you\u2019re comfortable with, it won\u2019t be the right fit right now.';
      html +=
        '<h2>Thanks, ' + escapeHtml(data.name.split(' ')[0]) + '.</h2>' +
        '<p>' + reason + '</p>' +
        '<p>If your situation changes, we\u2019d be glad to hear from you. You\u2019re welcome to read more about how the product works in the meantime.</p>' +
        '<div class="result-actions">' +
          '<a class="btn btn-primary btn-lg" href="how-it-works.html">How it works</a>' +
          '<a class="btn btn-ghost btn-lg" href="product.html">The product</a>' +
        '</div>';
    }

    result.innerHTML = html;
    form.hidden = true;
    result.hidden = false;
    window.scrollTo({ top: result.getBoundingClientRect().top + window.pageYOffset - 110, behavior: 'smooth' });
  });

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
})();
