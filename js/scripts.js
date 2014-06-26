$(document).ready(function() {
  scrabble = {

    wordScore : 0, 

    letterScores : {
      1 : ['a','e','i','o','u','l','n','r','s','t'],
      2 : ['d','g'],
      3 : ['b','c','m','p'],
      4 : ['f','h','v','w','y'],
      5 : ['k'],
      8 : ['j','x'],
      10 : ['q','z']
    },

    init : function(){
      scrabble.buildLetterTiles();
      scrabble.pileTileClick();
      scrabble.undoLastTile();
      scrabble.clearTiles();
      scrabble.sendCompiledWord();
    }, 

    buildLetterTiles : function(){
      var alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');

      alphabetArray.forEach(function(letter, index) {
        jQuery('<div class="scrabble-tile">' + letter + '</div>').appendTo('#tiles');
      });
    },

    pileTileClick : function(){
      $('#tiles .scrabble-tile').on('click', function() { 
        $(this).clone().appendTo('#compile');
        $('#result').empty();
      });
    },

    undoLastTile : function(){
      $('#undo').on('click', function() {
        $('#compile .scrabble-tile:last-child').remove()
      });
    },

    clearTiles : function(){
      $('#clear').on('click', function() {
        $('#compile').empty();
      });
    },

    sendCompiledWord : function(){
      $('#submit').on('click', function() {
        var compiledWord = '';
        $('#compile .scrabble-tile').each(function(index, value) {
          compiledWord += $(this).text();
        });

        wordnikData = $.ajax({
          dataType: 'json',
          url: 'http://api.wordnik.com:80/v4/word.json/' + compiledWord + '/definitions?limit=1&includeRelated=false&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        });

        debugger;
        console.log(wordnikData.responseText)
        var parsed = JSON.parse(wordnikData.responseText);

        if (parsed.length > 0) {
          alert('all good')

        } else {
          return 'Not a valid word'
        }

      });
    },

    getWordScore : function(){
      
        var compiledWord = '';
        $('#compile .scrabble-tile').each(function(index, value) {
          compiledWord += $(this).attr('data-letter');
        });

        var myPoints = scrabbleScore(compiledWord);
        $('#result').text('Your Points: ' + myPoints);

        $('#compile').empty();
      
    }

  }

  scrabble.init();

});

/*
var scrabbleScore = function(wordInput) {

  var letterArray = wordInput.toLowerCase().split('');
  var wordScore = 0;

  var onePointLetters = ["a","e","i","o","u","l","n","r","s","t"];
  var twoPointLetters = ["d","g"];
  var threePointLetters = ["b","c","m","p"];
  var fourPointLetters = ["f","h","v","w","y"];
  var fivePointLetters = ["k"];
  var eightPointLetters = ["j","x"];
  var tenPointLetters = ["q","z"];

  
  
  for (var x = 0; x < letterArray.length; x++) {
    if (onePointLetters.indexOf(letterArray[x]) > -1) {
      wordScore += 1;
    } else if (twoPointLetters.indexOf(letterArray[x]) > -1) {
      wordScore += 2;
    } else if (threePointLetters.indexOf(letterArray[x]) > -1) {
      wordScore += 3;
    } else if (fourPointLetters.indexOf(letterArray[x]) > -1) {
      wordScore += 4;
    } else if (fivePointLetters.indexOf(letterArray[x]) > -1) {
      wordScore += 5;
    } else if (eightPointLetters.indexOf(letterArray[x]) > -1) {
      wordScore += 8;
    } else if (tenPointLetters.indexOf(letterArray[x]) > -1) {
      wordScore += 10;
    } else {
      return false;
    }
  };

  return wordScore;
 
};





  var alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');

  alphabetArray.forEach(function(letter, index) {
    jQuery('<div class="scrabble-tile" data-letter="' + letter  + '">' + letter + '</div>').appendTo('#tiles');
  });

  $('#tiles .scrabble-tile').on('click', function() { 
    $(this).clone().appendTo('#compile');
    $('#result').empty();
  });

  $('#undo').on('click', function() {
    $('#compile .scrabble-tile:last-child').remove()
  });

  $('#clear').on('click', function() {
    $('#compile').empty();
  });

  $('#submit').on('click', function() {
    var compiledWord = '';
    $('#compile .scrabble-tile').each(function(index, value) {
      compiledWord += $(this).attr('data-letter');
    });

    var myPoints = scrabbleScore(compiledWord);
    $('#result').text('Your Points: ' + myPoints);

    $('#compile').empty();
  });

*/