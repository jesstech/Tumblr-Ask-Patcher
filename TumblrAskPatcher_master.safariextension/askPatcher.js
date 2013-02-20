// enable line breaks by killing
for(i = setInterval(function(){return 1;}, 99); i > 0; i--){
   window.clearInterval(i);
}

document.onkeydown = function(e){return true;};

// add the
var askWatcher = setInterval(function(){
    var q = document.getElementById('question');

    // Character limit
    if (q.value.length > 500) q.value = q.value.substring(0, 500);

    // Replace dots with unicode full stops
    if (q.value.match('.')) q.value = q.value.replace('.','\u2024');
    // Get rid of http(s)://
    if (q.value.match(/http.?:\/\//g)) q.value = q.value.replace(/http.?:\/\//g,'');

    // Update character counter
    var remaining = 500 - q.value.length;
    document.getElementById('characters_remaining').innerHTML = remaining;
    if (remaining <= 100) {
        document.getElementById('user_info').style.display = 'none';
        document.getElementById('character_counter').style.display = 'block';
    } else {
        document.getElementById('character_counter').style.display = 'none';
        document.getElementById('user_info').style.display = 'block';
    }
}, 100);