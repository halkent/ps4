(function () {
 var el = document.getElementById('visit-count');
 if (!el || !window.XMLHttpRequest) return;
 var request = new XMLHttpRequest();
 request.onreadystatechange = function () {
  if (request.readyState !== 4) return;
  if (request.status === 200) {
   try {
    var data = JSON.parse(request.responseText);
    if (typeof data.count === 'number' && data.count >= 0) {
     el.innerHTML = window.hkT('Toplam ziyaret: <strong>' + String(data.count).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '</strong>');
     return;
    }
   } catch (ignore) {}
  }
  el.innerHTML = window.hkT('Ziyaret sayacı geçici olarak kullanılamıyor');
 };
 request.open('POST', 'https://gamepad.halkent.com/ps4-counter.php', true);
 request.send(null);
}());
