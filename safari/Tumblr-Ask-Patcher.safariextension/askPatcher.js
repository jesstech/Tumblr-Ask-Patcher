// Save cursor positions & selections
function getInputSelection(e){var h=0,c=0,g,d,b,a,f;if(typeof e.selectionStart=="number"&&typeof e.selectionEnd=="number"){h=e.selectionStart;c=e.selectionEnd}else{d=document.selection.createRange();if(d&&d.parentElement()==e){a=e.value.length;g=e.value.replace(/\r\n/g,"\n");b=e.createTextRange();b.moveToBookmark(d.getBookmark());f=e.createTextRange();f.collapse(false);if(b.compareEndPoints("StartToEnd",f)>-1){h=c=a}else{h=-b.moveStart("character",-a);h+=g.slice(0,h).split("\n").length-1;if(b.compareEndPoints("EndToEnd",f)>-1){c=a}else{c=-b.moveEnd("character",-a);c+=g.slice(0,c).split("\n").length-1}}}}return{start:h,end:c}}function offsetToRangeCharacterMove(a,b){return b-(a.value.slice(0,b).split("\r\n").length-1)}function setInputSelection(e,a,d){if(typeof e.selectionStart=="number"&&typeof e.selectionEnd=="number"){e.selectionStart=a;e.selectionEnd=d}else{var c=e.createTextRange();var b=offsetToRangeCharacterMove(e,a);c.collapse(true);if(a==d){c.move("character",b)}else{c.moveEnd("character",offsetToRangeCharacterMove(e,d));c.moveStart("character",b)}c.select()}};

var parentWindow = (function(){
   var a;
   try {
      a = unsafeWindow == window ? false : unsafeWindow; // Chrome: window == unsafeWindow
   } catch(e) { }
   return a || (function(){
      var el = document.createElement('p');
      el.setAttribute('onclick', 'return window;');
      return el.onclick();
   }());
}());

parentWindow.document.removeEventListener('keydown', parentWindow.linebreaks, false);

for(i=setInterval(function(){return 1;},99);i>0;i--){
   window.clearInterval(i);
}

function replacer(match){return match.replace('.','\u2024');}
var replaceDot = function(q, matches){
  if (matches) {
    for(i=0;i<matches.length;i++) {
      console.log(matches[i]);
      var sel = getInputSelection(q);
      q.value = q.value.replace(matches[i],replacer);
      setInputSelection(q,sel.start,sel.end);
    }
  }
};

var askWatcher = setInterval(function() {
    var q = document.getElementById('question');
    var ask_button = document.getElementById('ask_button');
    var characters_remaining = document.getElementById('characters_remaining');
    var character_counter = document.getElementById('character_counter');

    if (q.value.match(/http:\/\//i)) {
      var sel = getInputSelection(q);
      q.value = q.value.replace(/http:\/\//ig,'');
      setInputSelection(q,sel.start,sel.end-7);
    }
    replaceDot(q, q.value.match(/(www)\./ig));
    replaceDot(q, q.value.match(/\.?[a-zA-Z0-9]+(\.arpa|\.root|\.aero|\.biz|\.cat|\.com|\.coop|\.edu|\.gov|\.info|\.int|\.jobs|\.mil|\.mobi|\.museum|\.name|\.net|\.org|\.pro|\.travel|TLD|\.ac|\.ad|\.ae|\.af|\.ag|\.ai|\.al|\.am|\.an|\.ao|\.aq|\.ar|\.as|\.at|\.au|\.aw|\.ax|\.az|\.ba|\.bb|\.bd|\.be|\.bf|\.bg|\.bh|\.bi|\.bj|\.bm|\.bn|\.bo|\.br|\.bs|\.bt|\.bv|\.bw|\.by|\.bz|\.ca|\.cc|\.cd|\.cf|\.cg|\.ch|\.ci|\.ck|\.cl|\.cm|\.cn|\.co|\.cr|\.cu|\.cv|\.cx|\.cy|\.cz|\.de|\.dj|\.dk|\.dm|\.do|\.dz|\.ec|\.ee|\.eg|\.er|\.es|\.et|\.eu|\.fi|\.fj|\.fk|\.fm|\.fo|\.fr|\.ga|\.gb|\.gd|\.ge|\.gf|\.gg|\.gh|\.gi|\.gl|\.gm|\.gn|\.gp|\.gq|\.gr|\.gs|\.gt|\.gu|\.gw|\.gy|\.hk|\.hm|\.hn|\.hr|\.ht|\.hu|\.id|\.ie|\.il|\.im|\.in|\.io|\.iq|\.ir|\.is|\.it|\.je|\.jm|\.jo|\.jp|\.ke|\.kg|\.kh|\.ki|\.km|\.kn|\.kr|\.kw|\.ky|\.kz|\.la|\.lb|\.lc|\.li|\.lk|\.lr|\.ls|\.lt|\.lu|\.lv|\.ly|\.ma|\.mc|\.md|\.mg|\.mh|\.mk|\.ml|\.mm|\.mn|\.mo|\.mp|\.mq|\.mr|\.ms|\.mt|\.mu|\.mv|\.mw|\.mx|\.my|\.mz|\.na|\.nc|\.ne|\.nf|\.ng|\.ni|\.nl|\.no|\.np|\.nr|\.nu|\.nz|\.om|\.pa|\.pe|\.pf|\.pg|\.ph|\.pk|\.pl|\.pm|\.pn|\.pr|\.ps|\.pt|\.pw|\.py|\.qa|\.re|\.ro|\.ru|\.rw|\.sa|\.sb|\.sc|\.sd|\.se|\.sg|\.sh|\.si|\.sj|\.sk|\.sl|\.sm|\.sn|\.so|\.sr|\.st|\.su|\.sv|\.sy|\.sz|\.tc|\.td|\.tf|\.tg|\.th|\.tj|\.tk|\.tl|\.tm|\.tn|\.to|\.tp|\.tr|\.tt|\.tv|\.tw|\.tz|\.ua|\.ug|\.uk|\.um|\.us|\.uy|\.uz|\.va|\.vc|\.ve|\.vg|\.vi|\.vn|\.vu|\.wf|\.ws|\.ye|\.yt|\.yu|\.za|\.zm|\.zw)/ig));

    // Character limit.
    if (q.value.length > 500) q.value = q.value.substring(0, 500);

    // Enable ask button.
    if(q.value.length > 0) {
        ask_button.disabled = false;
    } else {
        ask_button.disabled = true;
    }

    var remaining = 500 - q.value.length;
    characters_remaining.innerHTML = remaining;

    // Update character counter.
    if (remaining <= 120) {
        character_counter.style.display = 'block';
        if(remaining > 100) {
            character_counter.style.color = '#444';
        } else if (remaining > 80 && remaining <= 100) {
            character_counter.style.color = '#5f3b3e';
        } else if (remaining > 60 && remaining <= 80) {
            character_counter.style.color = '#7b3239';
        } else if (remaining > 40 && remaining <= 60) {
            character_counter.style.color = '#962a33';
        } else if (remaining > 20 && remaining <= 40) {
            character_counter.style.color = '#b2212e';
        } else {
            character_counter.style.color = '#cd1828';
        }
    } else {
        character_counter.style.display = 'none';
    }
}, 100);