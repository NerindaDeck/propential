/* Propential — Google Places address autocomplete (progressive enhancement).
   Attaches to any input with [data-address-autocomplete]. Restricted to AU addresses.

   TO ACTIVATE: supply a Google Maps Platform API key (Places API enabled, billing on)
   in ONE of these ways — no other change needed:
     1. <meta name="google-maps-key" content="YOUR_KEY"> in the page <head>, or
     2. window.PROPENTIAL_MAPS_KEY = 'YOUR_KEY'; before this script loads.

   With no key present the tagged fields remain ordinary, fully-usable text inputs. */
(function () {
  var fields = document.querySelectorAll('[data-address-autocomplete]');
  if (!fields.length) return;

  function getKey() {
    var m = document.querySelector('meta[name="google-maps-key"]');
    return window.PROPENTIAL_MAPS_KEY || (m && m.content) || '';
  }
  var key = getKey();
  if (!key) return; // graceful: plain text inputs stay functional

  // Callback invoked once the Maps + Places library has loaded.
  window.__propentialInitAddressAC = function () {
    if (!(window.google && google.maps && google.maps.places)) return;
    fields.forEach(function (input) {
      try {
        var ac = new google.maps.places.Autocomplete(input, {
          componentRestrictions: { country: 'au' },
          fields: ['formatted_address', 'address_components', 'geometry'],
          types: ['address']
        });
        ac.addListener('place_changed', function () {
          var place = ac.getPlace();
          if (place && place.formatted_address) input.value = place.formatted_address;
        });
        // Stop the browser's own autofill dropdown fighting the Places list.
        input.setAttribute('autocomplete', 'off');
      } catch (e) { /* leave field as plain input on error */ }
    });
  };

  var s = document.createElement('script');
  s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(key) +
          '&libraries=places&callback=__propentialInitAddressAC&loading=async';
  s.async = true;
  s.defer = true;
  s.onerror = function () { /* network/key failure: inputs remain plain text */ };
  document.head.appendChild(s);
})();
