/* Propential — application form */
(function () {
  var form = document.getElementById('applyForm');
  var result = document.getElementById('applyResult');
  var amount = document.getElementById('amount');
  var term = document.getElementById('term');
  var propState = document.getElementById('propState');
  var secHint = document.getElementById('secHint');

  // Prefill referral code from URL (?ref= or ?partner=)
  try {
    var params = new URLSearchParams(location.search);
    var ref = params.get('ref') || params.get('partner');
    if (ref) document.getElementById('referral').value = ref;
  } catch (e) {}

  // Prefill from the eligibility step, if completed
  try {
    var elig = JSON.parse(localStorage.getItem('propential_elig') || 'null');
    if (elig) {
      if (elig.name) document.getElementById('name').value = elig.name;
      if (elig.email) document.getElementById('email').value = elig.email;
      if (elig.phone) document.getElementById('phone').value = elig.phone;
      if (elig.amount) amount.value = elig.amount;
      if (elig.state) propState.value = elig.state;
      if (elig.project) {
        var p = form.querySelector('input[name="project"][value="' + elig.project + '"]');
        if (p) { p.checked = true; p.closest('.chip').classList.add('is-checked'); }
      }
    }
  } catch (e) {}

  // Build term options based on amount band
  function rebuildTerms() {
    var amt = parseFloat(amount.value) || 0;
    var maxTerm = amt > 50000 ? 10 : 7;
    var current = term.value;
    term.innerHTML = '<option value="" disabled>Select a term</option>';
    for (var y = 1; y <= maxTerm; y++) {
      var o = document.createElement('option');
      o.value = y; o.textContent = y + (y === 1 ? ' year' : ' years');
      term.appendChild(o);
    }
    if (current && +current <= maxTerm) term.value = current;
    else term.querySelector('option[value=""]').selected = true;
    document.getElementById('termHint').textContent = amt > 50000
      ? 'Up to 10 years for loans above $50,000.'
      : '1–7 years for loans up to $50,000.';
  }
  amount.addEventListener('input', rebuildTerms);
  rebuildTerms();

  form.addEventListener('change', function (e) {
    if (e.target.type === 'radio') {
      form.querySelectorAll('input[name="' + e.target.name + '"]').forEach(function (r) {
        r.closest('.chip').classList.toggle('is-checked', r.checked);
      });
      if (e.target.name === 'hasMortgage') {
        var show = e.target.value === 'yes';
        document.querySelectorAll('.mortgage-only').forEach(function (el) { el.classList.toggle('show', show); });
      }
    }
    if (e.target === propState) {
      var qn = propState.value === 'QLD' || propState.value === 'NT';
      secHint.textContent = qn
        ? 'In ' + propState.value + ', secured by a second mortgage over your property.'
        : 'In ' + propState.value + ', secured by a caveat over your property.';
    }
  });

  function setError(el, on) { (el.closest('.field') || el).classList.toggle('field--error', on); }

  function validate() {
    var ok = true;
    var requiredText = ['name', 'dob', 'email', 'phone', 'resAddress', 'propAddress', 'propValue', 'income', 'expenses', 'otherDebts', 'idNumber'];
    requiredText.forEach(function (id) {
      var el = document.getElementById(id);
      var bad = !el.value.trim();
      if (id === 'email') bad = bad || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value);
      setError(el, bad); if (bad) ok = false;
    });
    var selects = ['propState', 'term', 'employment', 'idType'];
    selects.forEach(function (id) { var el = document.getElementById(id); setError(el, !el.value); if (!el.value) ok = false; });
    // amount range
    var amt = parseFloat(amount.value);
    var amtBad = !(amt >= 5000 && amt <= 100000);
    setError(amount, amtBad); if (amtBad) ok = false;
    // radios
    ['hasMortgage', 'project'].forEach(function (name) {
      var checked = form.querySelector('input[name="' + name + '"]:checked');
      setError(form.querySelector('input[name="' + name + '"]'), !checked); if (!checked) ok = false;
    });
    // consents
    var c1 = document.getElementById('consentPrivacy'), c2 = document.getElementById('consentAccuracy');
    var cbad = !(c1.checked && c2.checked);
    document.getElementById('consentErr').style.display = cbad ? 'block' : 'none';
    if (cbad) ok = false;
    return ok;
  }

  var MARK = '<span class="result-mark mark" aria-hidden="true"><svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="armg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ECD58C"/><stop offset="0.5" stop-color="#D6B15E"/><stop offset="1" stop-color="#B6873A"/></linearGradient></defs><path d="M34 96 L100 36 L166 96" fill="none" stroke="url(#armg)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 92 V162 Q52 174 64 174 H136 Q148 174 148 162 V92" fill="none" stroke="url(#armg)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="112" r="14" fill="url(#armg)"/><path d="M90 120 L110 120 L114 154 L86 154 Z" fill="url(#armg)"/></svg></span>';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstErr = form.querySelector('.field--error') || (document.getElementById('consentErr').style.display === 'block' ? document.getElementById('consentErr') : null);
      if (firstErr) window.scrollTo({ top: firstErr.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' });
      return;
    }

    // TODO: wire to Formstack (medipay.formstack.com) + ActiveCampaign CRM,
    // with referral code attached and an email fallback. Live integration to be added later.

    var name = document.getElementById('name').value.trim();
    var ref = document.getElementById('referral').value.trim();

    result.innerHTML = MARK +
      '<h2>Application received, ' + escapeHtml(name.split(' ')[0]) + '.</h2>' +
      '<p>Thanks for applying with Propential. Our team will review your application against our credit policy and come back to you quickly with next steps — usually by email or phone.</p>' +
      (ref ? '<div class="result-ref">Referral code applied: <b>' + escapeHtml(ref) + '</b></div>' : '') +
      '<p style="margin-top:14px;font-size:0.78rem;color:var(--text-faint)">This confirmation is not an approval or credit offer. Your application is subject to credit assessment and our lending criteria.</p>' +
      '<div class="result-actions"><a class="btn btn-primary btn-lg" href="index.html">Back to home</a></div>';

    try { localStorage.removeItem('propential_elig'); } catch (er) {}
    form.hidden = true;
    result.hidden = false;
    window.scrollTo({ top: result.getBoundingClientRect().top + window.pageYOffset - 110, behavior: 'smooth' });
  });

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
})();
