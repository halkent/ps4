(function () {
    'use strict';
    var status = document.getElementById('firmware-status');
    var shortcut = document.getElementById('firmware-shortcut');
    if (!status || !shortcut) return;
    var ua = navigator.userAgent || '';
    var match = /PlayStation\s+4[\/ ;]+(\d+)\.(\d{2})(?!\d)/i.exec(ua);
    if (!match) {
        status.textContent = /PlayStation\s+4/i.test(ua)
            ? 'Sistem sürümü okunamadı. Sürümünü aşağıdan seçebilirsin.'
            : 'Otomatik sürüm algılama için bu sayfayı PS4 tarayıcısında aç.';
        return;
    }
    var version = parseInt(match[1], 10) + '.' + match[2];
    var routes = {};
    function add(versions, url) {
        var list = versions.split(' ');
        for (var i = 0; i < list.length; i++) routes[list[i]] = url;
    }
    add('5.05', './505/index.html');
    add('6.00 6.02 6.20 6.50 6.51 6.70 6.71 10.00 10.01 10.50 10.70 10.71 11.01 11.02', './css/version-selector.html');
    add('6.72', './672/index.html');
    add('7.00 7.01 7.02 7.50 7.51 7.55 8.00 8.01 8.03 8.50 8.52', './700/version-selector.html');
    add('9.00 9.03 9.04 9.50 9.51 9.60', './900/version-selector.html');
    add('11.00 11.50 11.52 12.00 12.02 12.50 12.52 13.00', './1300/index.html');
    add('13.02 13.04 13.50 13.52', './1352/index.html');
    add('14.00', './1400/');
    add('14.02', './1402/');
    var target = routes[version];
    if (!target) {
        status.textContent = 'PS4 ' + version + ' algılandı. Bu sürüm için uygun bir sayfa bulunmuyor.';
        return;
    }
    status.textContent = 'PS4 ' + version + ' algılandı. Uygun kart senin için işaretlendi.';
    shortcut.href = target;
    shortcut.style.display = 'inline-block';
    var cards = document.querySelectorAll('.card,.route');
    for (var j = 0; j < cards.length; j++) {
        if (cards[j].getAttribute('href') === target) {
            cards[j].className += ' is-recommended';
            cards[j].setAttribute('aria-label', 'PS4 ' + version + ' için önerilen sayfayı aç');
            var badge = document.createElement('span');
            badge.className = 'recommended-badge';
            badge.textContent = 'SÜRÜMÜNE UYGUN';
            cards[j].appendChild(badge);
            break;
        }
    }
})();
