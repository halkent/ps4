(function () {
  'use strict';
  var langs = [["tr", "Türkçe"], ["en", "English"], ["ar", "العربية"], ["bg", "Български"], ["cs", "Čeština"], ["da", "Dansk"], ["de", "Deutsch"], ["es", "Español"], ["fa", "فارسی"], ["fr", "Français"], ["hu", "Magyar"], ["it", "Italiano"], ["ja", "日本語"], ["ko", "한국어"], ["nl", "Nederlands"], ["pl", "Polski"], ["pt-BR", "Português do Brasil"], ["pt-PT", "Português"], ["sr", "Srpski"], ["ru", "Русский"], ["sk", "Slovak"], ["uk", "Українська"], ["vi", "Tiếng Việt"], ["zh-CN", "中文"], ["zh-TW", "中文(繁)"]];
  var scripts=document.getElementsByTagName('script'), self=scripts[scripts.length-1];
  var base=self.getAttribute('data-root') || './i18n/';
  var chosen='tr', query=/(?:[?&])lang=([^&]+)/.exec(location.search), key='halkent.language';
  function valid(c){for(var i=0;i<langs.length;i++)if(langs[i][0]===c)return true;return false;}
  try {chosen=localStorage.getItem(key)||'tr';} catch(e){}
  if(query){try{var q=decodeURIComponent(query[1]);if(valid(q))chosen=q;}catch(e){}}
  if(!valid(chosen))chosen='tr';
  try{localStorage.setItem(key,chosen);}catch(e){}
  window.hkT=function(value){
    if(typeof value!=='string'||chosen==='tr')return value;
    var map=window.hkDictionary||{}, normalized=value.replace(/\s+/g,' ').replace(/^ | $/g,'');
    if(Object.prototype.hasOwnProperty.call(map,normalized))return (value.match(/^\s*/)||[''])[0]+map[normalized]+(value.match(/\s*$/)||[''])[0];
    // Dynamic status messages may contain a version number between translated fragments.
    if(normalized.length<500){
      var pieces=window.hkTranslationPieces;
      if(!pieces){pieces=[];for(var k in map)if(Object.prototype.hasOwnProperty.call(map,k)&&k.length>=12&&/[çğıöşüÇĞİÖŞÜ]/.test(k))pieces.push(k);pieces.sort(function(a,b){return b.length-a.length;});window.hkTranslationPieces=pieces;}
      for(var j=0;j<pieces.length;j++){var part=pieces[j], at=value.indexOf(part);if(at===0||at>=0&&at+part.length===value.length)return value.slice(0,at)+map[part]+value.slice(at+part.length);}
    }
    return value;
  };
  // Blocking local load completes before host scripts. No network translation service.
  if(chosen!=='tr')document.write('<script src="'+base+chosen+'.js"><\/script>');
  function init(){
    if(document.getElementById('hk-language'))return;
    if(chosen!=='tr'&&!window.hkDictionary)chosen='tr';
    document.documentElement.lang=chosen;
    function skip(el){return !el||/^(SCRIPT|STYLE|SVG|CODE|PRE|NOSCRIPT)$/.test(el.tagName)||el.id==='hk-language'||el.className==='hk-wordmark';}
    function walk(el){
      if(skip(el))return;
      for(var n=el.firstChild;n;n=n.nextSibling){
        if(n.nodeType===3){var v=window.hkT(n.nodeValue);if(v!==n.nodeValue){n.nodeValue=v;if(chosen==='ar'||chosen==='fa')el.setAttribute('dir','rtl');}}
        else if(n.nodeType===1)walk(n);
      }
      var attrs=['title','aria-label','alt'];
      for(var i=0;i<attrs.length;i++){var a=el.getAttribute(attrs[i]);if(a)el.setAttribute(attrs[i],window.hkT(a));}
    }
    if(chosen!=='tr'){walk(document.body);document.title=window.hkT(document.title);}
    var box=document.createElement('div');box.id='hk-language';box.className='hk-language';
    var label=document.createElement('label');label.htmlFor='hk-language-select';label.textContent='文 / A';label.title=window.hkT('Dil seçin');
    var select=document.createElement('select');select.id='hk-language-select';select.setAttribute('aria-label',window.hkT('Dil seçin'));
    for(var i=0;i<langs.length;i++){var opt=document.createElement('option');opt.value=langs[i][0];opt.textContent=langs[i][1];opt.selected=chosen===langs[i][0];select.appendChild(opt);}
    box.appendChild(label);box.appendChild(select);
    var slot=document.querySelector('header nav, header, #brand, .topbar, .header');
    if(slot){slot.className+=' hk-language-host';slot.appendChild(box);}else document.body.insertBefore(box,document.body.firstChild);
    var running=/PlayStation\s+4/i.test(navigator.userAgent)&&/\/(?:jb|run_[^/]+)\.html$/.test(location.pathname);
    if(running){select.disabled=true;select.title=window.hkT('İşlem sürerken dil değiştirilemez.');}
    select.onchange=function(){
      var code=select.value;if(!valid(code))return;
      try{localStorage.setItem(key,code);}catch(e){}
      var url=new URL(location.href);url.searchParams.delete('lang');location.replace(url.href);
    };
    document.addEventListener('click',function(event){
      var link=event.target;while(link&&link.tagName!=='A')link=link.parentNode;
      if(!link||!link.getAttribute('href')||link.getAttribute('href').charAt(0)==='#')return;
      try{var u=new URL(link.href);if(u.origin===location.origin||(u.hostname==='halkent.github.io'&&u.pathname.indexOf('/ps4/')===0)||u.hostname==='app.halkent.com'){if(u.origin===location.origin)u.searchParams.delete('lang');else u.searchParams.set('lang',chosen);link.href=u.href;}}catch(e){}
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
