describe('scrabbleScore', function(){
  it("will give a score of 1 for the letter 'u'", function(){
    scrabbleScore("u").should.equal(1);
  });
  it("will return a score of 5 for k", function(){
    scrabbleScore("k").should.equal(5);
  });
  it("will take a four letter word and give the proper score", function(){
    scrabbleScore("Lion").should.equal(4)
  });
  it("will take a long word and give the big score", function() {
    scrabbleScore("aeioulnrstz").should.equal(20);
  })
});



