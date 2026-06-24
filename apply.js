/* Propential - application form (Reno Now full application) */
(function () {
  var form = document.getElementById('applyForm');
  var result = document.getElementById('applyResult');
  if (!form) return;

  var amount = document.getElementById('amount');
  var term = document.getElementById('term');

  /* ─────────────────────────── tracking + prefill ─────────────────────── */
  try {
    var p = new URLSearchParams(location.search);
    var set = function (id, v) { var el = document.getElementById(id); if (el && v) el.value = v; };
    set('utmSource', p.get('utm_source'));
    set('utmMedium', p.get('utm_medium'));
    set('utmContent', p.get('utm_content'));
    set('utmCampaign', p.get('utm_campaign'));
    set('gclid', p.get('gclid'));
  } catch (e) {}

  try {
    var elig = JSON.parse(localStorage.getItem('propential_elig') || 'null');
    if (elig) {
      if (elig.name) {
        var parts = String(elig.name).trim().split(/\s+/);
        var fn = document.getElementById('firstName');
        var ln = document.getElementById('lastName');
        if (fn) fn.value = parts.shift() || '';
        if (ln) ln.value = parts.join(' ');
      }
      if (elig.email) document.getElementById('email').value = elig.email;
      if (elig.phone) document.getElementById('phone').value = elig.phone;
      if (elig.amount) amount.value = elig.amount;
      if (elig.state) { var rs = document.getElementById('resState'); if (rs) rs.value = elig.state; }
      if (elig.project) {
        String(elig.project).split(',').forEach(function (val) {
          var box = form.querySelector('input[name="project"][value="' + val.trim() + '"]');
          if (box) { box.checked = true; var chip = box.closest('.chip'); if (chip) chip.classList.add('is-checked'); }
        });
      }
    }
  } catch (e) {}

  /* ─────────────────────────── industry options ───────────────────────── */
  (function fillIndustries() {
    var sel = document.getElementById('industry');
    var list = window.PROPENTIAL_INDUSTRIES || [];
    if (!sel || !list.length) return;
    list.forEach(function (label) {
      var o = document.createElement('option'); o.textContent = label; sel.appendChild(o);
    });
  })();

  /* ─────────────────────────── credit-card + debt repeats ──────────────── */
  var PROVIDERS = ['CBA', 'Westpac', 'ANZ', 'NAB', 'American Express', 'Citi Bank', 'Bank of Queensland', 'Bank of Melbourne', 'ING', 'Bankwest', 'BankSA', 'Bendigo Bank', 'Macquarie Bank', 'St. George', 'Suncorp Bank', 'Coles', 'Woolworths', 'ME', 'Latitude Financial Services', 'Lombard Finance', 'Virgin Money', 'ZIPMoney', 'Other'];
  var DEBT_TYPES = ['Overdrafts', 'Car Loans', 'Personal Loans', 'Other'];

  function opts(values) {
    return '<option value="" disabled selected>Select</option>' + values.map(function (v) { return '<option>' + v + '</option>'; }).join('');
  }
  function money(id, label) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><div class="money-input"><input class="input" id="' + id + '" name="' + id + '" type="number" min="0" step="1" inputmode="numeric" data-req></div><p class="error-msg">Required.</p></div>';
  }

  function buildCard(n) {
    return '<p class="sub-eyebrow">Card ' + n + '</p><div class="field-grid">' +
      '<div class="field"><label for="card' + n + 'Provider">Provider</label><select class="select" id="card' + n + 'Provider" name="card' + n + 'Provider">' + opts(PROVIDERS) + '</select></div>' +
      money('card' + n + 'Limit', 'Credit limit $') +
      money('card' + n + 'Owing', 'Amount owing $') +
      '</div>';
  }
  function buildDebt(n) {
    return '<p class="sub-eyebrow">Debt ' + n + '</p><div class="field-grid">' +
      '<div class="field"><label for="debt' + n + 'Type">Type of debt</label><select class="select" id="debt' + n + 'Type" name="debt' + n + 'Type" data-req>' + opts(DEBT_TYPES) + '</select><p class="error-msg">Please choose.</p></div>' +
      '<div class="field"></div>' +
      money('debt' + n + 'Owing', 'How much is still owing? $') +
      money('debt' + n + 'Repayment', 'Monthly repayment $') +
      '</div>';
  }

  function buildNestedRepeat(container, count, addLabel, addNamePrefix, builder) {
    // Builds 1..count blocks, each (except the last) followed by an "add" checkbox
    // that reveals the next nested block — mirrors the Centrelink pattern.
    var html = builder(1);
    for (var n = 2; n <= count; n++) {
      var addId = addNamePrefix + n;
      html += '<label class="addmore"><input type="checkbox" id="' + addId + '" name="' + addId + '" data-toggle> ' + addLabel + '</label>';
      html += '<div class="cond" data-when="' + addId + '|checked">';
      html += builder(n);
    }
    for (var c = 2; c <= count; c++) html += '</div>';
    container.innerHTML = html;
  }
  buildNestedRepeat(document.getElementById('cardRepeat'), 5, 'Add another credit card', 'addCard', buildCard);
  buildNestedRepeat(document.getElementById('debtRepeat'), 5, 'Add another debt', 'addDebt', buildDebt);

  /* ─────────────────────────── combobox (job titles) ──────────────────── */
  function enhanceCombo(input) {
    var source = window[input.getAttribute('data-source')] || [];
    var wrap = document.createElement('div'); wrap.className = 'combo-wrap';
    input.parentNode.insertBefore(wrap, input); wrap.appendChild(input);
    var list = document.createElement('div'); list.className = 'combo-list'; list.setAttribute('role', 'listbox'); wrap.appendChild(list);
    var active = -1, shown = [];

    function render(q) {
      var ql = q.toLowerCase();
      shown = q ? source.filter(function (s) { return s.toLowerCase().indexOf(ql) !== -1; }).slice(0, 50) : source.slice(0, 50);
      list.innerHTML = shown.map(function (s, i) { return '<div class="combo-opt" role="option" data-i="' + i + '">' + s.replace(/</g, '&lt;') + '</div>'; }).join('');
      active = -1;
    }
    function open() { render(input.value); list.classList.add('is-open'); }
    function close() { list.classList.remove('is-open'); }
    function choose(i) { if (shown[i] != null) { input.value = shown[i]; close(); input.dispatchEvent(new Event('change', { bubbles: true })); } }

    input.addEventListener('focus', open);
    input.addEventListener('input', open);
    input.addEventListener('keydown', function (e) {
      if (!list.classList.contains('is-open')) return;
      var items = list.querySelectorAll('.combo-opt');
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, items.length - 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); }
      else if (e.key === 'Enter') { if (active >= 0) { e.preventDefault(); choose(active); } return; }
      else if (e.key === 'Escape') { close(); return; }
      else return;
      items.forEach(function (it, i) { it.classList.toggle('is-active', i === active); });
      if (items[active]) items[active].scrollIntoView({ block: 'nearest' });
    });
    list.addEventListener('mousedown', function (e) {
      var opt = e.target.closest('.combo-opt'); if (opt) { e.preventDefault(); choose(+opt.getAttribute('data-i')); }
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
  }
  Array.prototype.forEach.call(document.querySelectorAll('.combo'), enhanceCombo);
  // a value counts as valid only if it's in the source list
  function comboValid(input) {
    var source = window[input.getAttribute('data-source')] || [];
    return source.indexOf(input.value.trim()) !== -1;
  }

  /* ─────────────────────────── repayment term band ────────────────────── */
  function rebuildTerms() {
    var amt = parseFloat(amount.value) || 0;
    var maxTerm = amt > 50000 ? 10 : 7;
    var current = term.value;
    term.innerHTML = '<option value="" disabled>Select a term</option>';
    var LABELS = { 8: '8 years  (over $40k only)', 9: '9 years  (over $40k only)', 10: '10 years (over $40k only)' };
    for (var y = 1; y <= maxTerm; y++) {
      var o = document.createElement('option');
      o.value = y;
      o.textContent = y <= 7 ? (y + (y === 1 ? ' year' : ' years')) : LABELS[y];
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

  /* ─────────────────────────── conditional engine ─────────────────────── */
  function fieldValue(name) {
    var els = form.querySelectorAll('[name="' + name + '"]');
    if (!els.length) return '';
    var first = els[0];
    if (first.type === 'radio') {
      for (var i = 0; i < els.length; i++) if (els[i].checked) return els[i].value;
      return '';
    }
    if (first.type === 'checkbox') return first.checked ? 'checked' : '';
    return first.value;
  }
  function evaluateConditions() {
    var conds = form.querySelectorAll('.cond');
    Array.prototype.forEach.call(conds, function (el) {
      var spec = el.getAttribute('data-when'); if (!spec) return;
      var bits = spec.split('|'); var name = bits[0].trim();
      var allowed = (bits[1] || '').split(',').map(function (s) { return s.trim(); });
      var val = fieldValue(name);
      el.classList.toggle('is-shown', allowed.indexOf(val) !== -1);
    });
  }

  form.addEventListener('change', function (e) {
    if ((e.target.type === 'radio' || e.target.type === 'checkbox') && e.target.closest('.chip')) {
      form.querySelectorAll('input[name="' + e.target.name + '"]').forEach(function (r) {
        var chip = r.closest('.chip'); if (chip) chip.classList.toggle('is-checked', r.checked);
      });
    }
    evaluateConditions();
  });
  evaluateConditions();

  /* ─────────────────────────── validation ─────────────────────────────── */
  function isVisible(el) { return !!(el && el.offsetParent !== null); }
  function fieldWrap(el) { return el.closest('.field') || el.closest('.chip-group') || el; }
  function setError(el, on) { fieldWrap(el).classList.toggle('field--error', on); }

  function validate() {
    var ok = true; var firstBad = null;
    form.querySelectorAll('.field--error').forEach(function (n) { n.classList.remove('field--error'); });

    // text/select/number/date with data-req that are currently visible
    Array.prototype.forEach.call(form.querySelectorAll('input[data-req], select[data-req], textarea[data-req]'), function (el) {
      if (el.type === 'checkbox' || el.type === 'radio') return; // handled below
      if (!isVisible(el)) return;
      var v = (el.value || '').trim();
      var bad = !v;
      if (!bad && el.hasAttribute('data-email')) bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
      if (!bad && el.type === 'email') bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
      if (!bad && el.hasAttribute('data-abn')) bad = !/^\d{11}$/.test(v.replace(/\s+/g, ''));
      if (!bad && el.hasAttribute('data-postcode')) bad = !/^\d{4}$/.test(v);
      if (!bad && el.hasAttribute('data-medicare')) bad = !/^\d{10,11}$/.test(v.replace(/\s+/g, ''));
      if (!bad && el.classList.contains('combo')) bad = !comboValid(el);
      setError(el, bad);
      if (bad && !firstBad) firstBad = el;
      if (bad) ok = false;
    });

    // email main + amount range
    var em = document.getElementById('email');
    if (isVisible(em) && em.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim())) { setError(em, true); if (!firstBad) firstBad = em; ok = false; }
    var amt = parseFloat(amount.value);
    if (!(amt >= 5000 && amt <= 175000)) { setError(amount, true); if (!firstBad) firstBad = amount; ok = false; }

    // required radio groups (chip-group with data-req)
    Array.prototype.forEach.call(form.querySelectorAll('.chip-group[data-req]'), function (group) {
      if (!isVisible(group)) return;
      var name = group.getAttribute('data-name');
      var checked = form.querySelector('input[name="' + name + '"]:checked');
      group.classList.toggle('field--error', !checked);
      if (!checked) { if (!firstBad) firstBad = group; ok = false; }
    });

    // consents — all required checkboxes in the declarations block
    var consentIds = ['consentPrivacy', 'consentConfirm', 'consentCitizen', 'consentAccuracy', 'consentCredit', 'consentElectronic', 'consentBiometric'];
    var consentBad = consentIds.some(function (id) { var c = document.getElementById(id); return !(c && c.checked); });
    document.getElementById('consentErr').style.display = consentBad ? 'block' : 'none';
    if (consentBad) { ok = false; if (!firstBad) firstBad = document.getElementById('consentErr'); }

    if (firstBad) validate._first = firstBad;
    return ok;
  }

  /* ─────────────────────────── payload ────────────────────────────────── */
  function activeText(id) { var el = document.getElementById(id); return (el && isVisible(el)) ? el.value.trim() : ''; }
  function radioVal(name) { var c = form.querySelector('input[name="' + name + '"]:checked'); return (c && isVisible(c)) ? c.value : ''; }
  function checkBool(id) { var el = document.getElementById(id); return !!(el && el.checked); }
  function checkActive(id) { var el = document.getElementById(id); return !!(el && el.checked && isVisible(el)); }

  function collectData() {
    var d = {
      // loan + identity
      purpose: radioVal('purpose'),
      project: Array.prototype.map.call(form.querySelectorAll('input[name="project"]:checked'), function (c) { return c.value; }),
      amount: activeText('amount'),
      term: activeText('term'),
      title: activeText('title'),
      firstName: activeText('firstName'),
      middleName: activeText('middleName'),
      lastName: activeText('lastName'),
      dob: activeText('dob'),
      email: activeText('email'),
      phone: activeText('phone'),
      joint: radioVal('joint'),
      jointName: activeText('jointName'),
      jointEmail: activeText('jointEmail'),
      // employment
      employment: activeText('employment'),
      employmentDetail: activeText('employmentDetail'),
      industry: activeText('industry'),
      jobTitle: activeText('jobTitle'),
      jobTenure: activeText('jobTenure'),
      employerName: activeText('employerName'),
      prevJobTitle: activeText('prevJobTitle'),
      prevEmployerName: activeText('prevEmployerName'),
      selfEmployedTenure: activeText('selfEmployedTenure'),
      businessName: activeText('businessName'),
      businessAbn: activeText('businessAbn'),
      // home
      resAddress: activeText('resAddress'),
      resCity: activeText('resCity'),
      resState: activeText('resState'),
      resPostcode: activeText('resPostcode'),
      addressTenure: radioVal('addressTenure'),
      prevResAddress: activeText('prevResAddress'),
      ownership: activeText('ownership'),
      ownershipOther: activeText('ownershipOther'),
      homeValue: activeText('homeValue'),
      mortBalance: activeText('mortBalance'),
      relationship: activeText('relationship'),
      // renovation property
      renoIsHome: radioVal('renoIsHome'),
      propAddress: activeText('propAddress'),
      propCity: activeText('propCity'),
      propState: activeText('propState'),
      propPostcode: activeText('propPostcode'),
      onTitle: radioVal('onTitle'),
      titleOwner: activeText('titleOwner'),
      propValue: activeText('propValue'),
      propRentalIncome: activeText('propRentalIncome'),
      propHasLoan: radioVal('propHasLoan'),
      propLoanOwing: activeText('propLoanOwing'),
      propLoanRepayment: activeText('propLoanRepayment'),
      // income
      income: activeText('income'),
      payFrequency: activeText('payFrequency'),
      centrelink: radioVal('centrelink'),
      cl1Type: activeText('cl1Type'), cl1Amount: activeText('cl1Amount'),
      addCl2: checkActive('addCl2'), cl2Type: activeText('cl2Type'), cl2Amount: activeText('cl2Amount'),
      addCl3: checkActive('addCl3'), cl3Type: activeText('cl3Type'), cl3Amount: activeText('cl3Amount'),
      otherIncome: radioVal('otherIncome'),
      src1Type: activeText('src1Type'), src1Amount: activeText('src1Amount'),
      addSrc2: checkActive('addSrc2'), src2Type: activeText('src2Type'), src2Amount: activeText('src2Amount'),
      addSrc3: checkActive('addSrc3'), src3Type: activeText('src3Type'), src3Amount: activeText('src3Amount'),
      // expenses
      generalExpenses: activeText('generalExpenses'),
      expenses: activeText('expenses'),
      spouseExpensePct: radioVal('spouseExpensePct'),
      rentFrequency: activeText('rentFrequency'),
      rentAmount: activeText('rentAmount'),
      spouseRentPct: radioVal('spouseRentPct'),
      adverseChange: radioVal('adverseChange'),
      // investment property
      investmentProperty: radioVal('investmentProperty'),
      ip1Rental: activeText('ip1Rental'), ip1HasMortgage: radioVal('ip1HasMortgage'), ip1Repayment: activeText('ip1Repayment'), ip1Owing: activeText('ip1Owing'), ip1Value: activeText('ip1Value'),
      addIp2: checkActive('addIp2'), ip2Rental: activeText('ip2Rental'), ip2HasMortgage: radioVal('ip2HasMortgage'), ip2Repayment: activeText('ip2Repayment'), ip2Owing: activeText('ip2Owing'), ip2Value: activeText('ip2Value'),
      addIp3: checkActive('addIp3'), ip3Rental: activeText('ip3Rental'), ip3HasMortgage: radioVal('ip3HasMortgage'), ip3Repayment: activeText('ip3Repayment'), ip3Owing: activeText('ip3Owing'), ip3Value: activeText('ip3Value'),
      // other assets
      otherAssets: radioVal('otherAssets'),
      asset1Type: activeText('asset1Type'), asset1Value: activeText('asset1Value'),
      addAsset2: checkActive('addAsset2'), asset2Type: activeText('asset2Type'), asset2Value: activeText('asset2Value'),
      addAsset3: checkActive('addAsset3'), asset3Type: activeText('asset3Type'), asset3Value: activeText('asset3Value'),
      addAsset4: checkActive('addAsset4'), asset4Type: activeText('asset4Type'), asset4Value: activeText('asset4Value'),
      // credit cards
      creditCards: radioVal('creditCards'),
      card1Provider: activeText('card1Provider'), card1Limit: activeText('card1Limit'), card1Owing: activeText('card1Owing'),
      addCard2: checkActive('addCard2'), card2Provider: activeText('card2Provider'), card2Limit: activeText('card2Limit'), card2Owing: activeText('card2Owing'),
      addCard3: checkActive('addCard3'), card3Provider: activeText('card3Provider'), card3Limit: activeText('card3Limit'), card3Owing: activeText('card3Owing'),
      addCard4: checkActive('addCard4'), card4Provider: activeText('card4Provider'), card4Limit: activeText('card4Limit'), card4Owing: activeText('card4Owing'),
      addCard5: checkActive('addCard5'), card5Provider: activeText('card5Provider'), card5Limit: activeText('card5Limit'), card5Owing: activeText('card5Owing'),
      // other debt
      otherDebt: radioVal('otherDebt'),
      debt1Type: activeText('debt1Type'), debt1Owing: activeText('debt1Owing'), debt1Repayment: activeText('debt1Repayment'),
      addDebt2: checkActive('addDebt2'), debt2Type: activeText('debt2Type'), debt2Owing: activeText('debt2Owing'), debt2Repayment: activeText('debt2Repayment'),
      addDebt3: checkActive('addDebt3'), debt3Type: activeText('debt3Type'), debt3Owing: activeText('debt3Owing'), debt3Repayment: activeText('debt3Repayment'),
      addDebt4: checkActive('addDebt4'), debt4Type: activeText('debt4Type'), debt4Owing: activeText('debt4Owing'), debt4Repayment: activeText('debt4Repayment'),
      addDebt5: checkActive('addDebt5'), debt5Type: activeText('debt5Type'), debt5Owing: activeText('debt5Owing'), debt5Repayment: activeText('debt5Repayment'),
      // identity & verification
      hasLicense: radioVal('hasLicense'),
      idIssuedState: activeText('idIssuedState'),
      idNumber: activeText('idNumber'),
      medicareNumber: activeText('medicareNumber'),
      medicareColour: activeText('medicareColour'),
      medicareExpiry: activeText('medicareExpiry'),
      dependants: activeText('dependants'),
      dep1Age: activeText('dep1Age'), dep2Age: activeText('dep2Age'), dep3Age: activeText('dep3Age'), dep4Age: activeText('dep4Age'),
      // declarations
      consentPrivacy: checkBool('consentPrivacy'),
      consentConfirm: checkBool('consentConfirm'),
      consentCitizen: checkBool('consentCitizen'),
      consentAccuracy: checkBool('consentAccuracy'),
      consentCredit: checkBool('consentCredit'),
      consentElectronic: checkBool('consentElectronic'),
      consentBiometric: checkBool('consentBiometric'),
      // tracking
      utmSource: document.getElementById('utmSource').value,
      utmMedium: document.getElementById('utmMedium').value,
      utmContent: document.getElementById('utmContent').value,
      utmCampaign: document.getElementById('utmCampaign').value,
      gclid: document.getElementById('gclid').value
    };
    return d;
  }

  /* ─────────────────────────── success render ─────────────────────────── */
  var MARK = '<span class="result-mark mark" aria-hidden="true"><svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="armg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ECD58C"/><stop offset="0.5" stop-color="#D6B15E"/><stop offset="1" stop-color="#B6873A"/></linearGradient></defs><path d="M34 96 L100 36 L166 96" fill="none" stroke="url(#armg)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 92 V162 Q52 174 64 174 H136 Q148 174 148 162 V92" fill="none" stroke="url(#armg)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="112" r="14" fill="url(#armg)"/><path d="M90 120 L110 120 L114 154 L86 154 Z" fill="url(#armg)"/></svg></span>';

  function renderSuccess() {
    var name = document.getElementById('firstName').value.trim();
    result.innerHTML = MARK +
      '<h2>Application received, ' + escapeHtml(name) + '.</h2>' +
      '<p style="max-width:none">Thanks for applying with Propential. Our team will review your application against our credit policy and come back to you quickly with next steps, usually by email or phone.</p>' +
      '<p style="margin-top:14px;font-size:0.78rem;color:var(--text-faint);max-width:none">This confirmation is not an approval or credit offer.<br>Your application is subject to credit assessment and our lending criteria.</p>' +
      '<div class="result-actions"><a class="btn btn-primary btn-lg" href="index.html">Back to home</a></div>' +
      '<div class="appsteps" aria-label="Application progress">' +
        '<div class="apptrack">' +
          '<div class="appstep appstep--done"><span class="appstep__node">\u2713</span><span class="appstep__label">Application Received</span></div>' +
          '<div class="appstep appstep--current"><span class="appstep__node">2</span><span class="appstep__label">Application Under Review</span></div>' +
          '<div class="appstep appstep--todo"><span class="appstep__node">3</span><span class="appstep__label">Conditional Approval<sup>^</sup> within minutes</span></div>' +
          '<div class="appstep appstep--todo"><span class="appstep__node">4</span><span class="appstep__label">Full Approval</span></div>' +
        '</div>' +
        '<p class="appsteps__foot" style="font-size:12px;color:rgb(111, 108, 99);max-width:none"><sup>^</sup> Conditional approval subject to suitability and receiving all required information during normal NSW business hours. Final approval subject to our lending criteria and supplying satisfactory supporting documents.</p>' +
      '</div>';

    try { localStorage.removeItem('propential_elig'); } catch (er) {}
    form.hidden = true;
    result.hidden = false;
    window.scrollTo({ top: result.getBoundingClientRect().top + window.pageYOffset - 110, behavior: 'smooth' });
  }

  function showSubmitError(btn) {
    if (btn) { btn.disabled = false; btn.textContent = 'Submit application'; }
    var el = document.getElementById('submitError');
    if (!el) {
      el = document.createElement('p'); el.id = 'submitError'; el.className = 'error-msg';
      el.style.textAlign = 'center'; el.style.marginTop = '12px';
      var foot = form.querySelector('.form-foot');
      if (foot && foot.parentNode) foot.parentNode.insertBefore(el, foot); else form.appendChild(el);
    }
    el.style.display = 'block';
    el.textContent = 'Sorry \u2014 we couldn\u2019t submit your application just now. Please try again in a moment.';
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ─────────────────────────── submit ─────────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstErr = validate._first;
      if (firstErr) window.scrollTo({ top: firstErr.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' });
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Submitting\u2026'; }
    var prevErr = document.getElementById('submitError');
    if (prevErr) prevErr.style.display = 'none';

    fetch('/api/submit-apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectData())
    }).then(function (r) {
      return r.json().then(function (body) { return { ok: r.ok, body: body }; }, function () { return { ok: false, body: null }; });
    }).then(function (res) {
      if (res.ok && res.body && res.body.ok) renderSuccess();
      else showSubmitError(btn);
    }).catch(function () { showSubmitError(btn); });
  });

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
})();
