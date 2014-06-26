// http://developer.wordnik.com/docs.html#!/word/getDefinitions_get_2
// http://lib.store.yahoo.net/lib/abcunderwear/ysw-4pinventory-javascript-0713.js

var scrabbleScoreObject = function(wordInput) {
  var wordArray = wordInput.toLowerCase().split('');
  var lettersObject = {'a':1,'b':3,'c':3,'d':2,'e':1,'f':4,'g':2,'h':4,'i':1,'j':8,'k':5,'l':1,'m':3,'n':1,'o':1,'p':3,'q':10,'r':1,'s':1,'t':1,'u':1,'v':4,'w':4,'x':8,'y':4,'z':10}
  var wordScore = 0;

  for (var x = 0; x < wordArray.length; x++) {
    wordScore += lettersObject[wordArray[x]];
  }
  return wordScore;
}


$(document).ready(function() {

  var alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var tileCount = [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1];

  alphabetArray.forEach(function(letter, index) {
    jQuery('<div class="scrabble-tile" data-letter="' + letter  + '" data-position="' + index + '">' + letter + '</div>').appendTo('#tiles');
  });

  var removeDisabledTemp = function() {
    $('#tiles .disabled-temp').each(function() {
      $(this).removeClass('disabled-temp');
    })
  }

  var resetTiles = function() {
    tileCount = [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1];
    $('#compile').empty();
    $('#tiles .scrabble-tile').each(function() {
      $(this).removeClass('disabled');
      removeDisabledTemp();
    });
  }

  

  $('#tiles').on('click', '.scrabble-tile:not(.disabled, .disabled-temp)',function() { 
    var tilePos = parseInt($(this).data('position'));
    tileCount[tilePos] -= 1;
    
    $(this).clone().appendTo('#compile');

    if (tileCount[tilePos] === 0) {
      $(this).addClass('disabled');
    }

    if ($('#compile .scrabble-tile').length >=7 ) {
      $('#tiles .scrabble-tile:not(.disabled)').each(function() {
        $(this).addClass('disabled-temp');
      })
    }

    $('#result').empty();
    
  });

  $('#compile').on('click', '.scrabble-tile', function() {
    var tilePos = parseInt($(this).data('position'));
    tileCount[tilePos] += 1;
    $('#tiles .scrabble-tile[data-position*="' + tilePos + '"]').removeClass('disabled');
    $(this).remove();
    removeDisabledTemp();
  });

  $('#undo').on('click', function() {
    /*var lastTile = $('#compile .scrabble-tile:last-child');
    var lastTilePos = lastTile.data('position');
    tileCount[lastTilePos] += 1;
    $('#tiles .scrabble-tile[data-position*="' + lastTilePos + '"]').removeClass('disabled');
    lastTile.remove();*/
    removeDisabledTemp();
    $('#compile .scrabble-tile:last-child').click();
  });

  $('#clear').on('click', function() {
    
    resetTiles();
  });

  $('#submit').on('click', function() {
    var compiledWord = '';
    $('#compile .scrabble-tile').each(function(index, value) {
      compiledWord += $(this).data('letter');
    });

    var myPoints = scrabbleScoreObject(compiledWord);
    $('#result').text('Your Points: ' + myPoints);

    resetTiles();

  });

  $('body').keypress(function(letter) {

    if (event.keyCode === 13) {
      $('#submit').click();
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      $('#undo').click();
    } else {
      var letterPressed = String.fromCharCode(letter.which).toLowerCase();
      $('#tiles .scrabble-tile[data-letter*="' + letterPressed + '"]').click();
    }
  });

});
