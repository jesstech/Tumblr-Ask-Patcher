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

for(i = setInterval(function(){return 1;}, 99); i > 0; i--){
   window.clearInterval(i);
}

var askWatcher = setInterval(function() {
    var q = document.getElementById('question');
    var ask_button = document.getElementById('ask_button');
    var characters_remaining = document.getElementById('characters_remaining');
    var character_counter = document.getElementById('character_counter');

    if (q.value.match('.')) q.value = q.value.replace('.','\u2024');
    if (q.value.match(/http.?:\/\//g)) q.value = q.value.replace(/http.?:\/\//g,'');

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