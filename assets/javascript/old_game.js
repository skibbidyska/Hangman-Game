var game = {
    wins: 0,
    losses: 0,
    guessesRemaining: 12,
    dictionary: [
    'aliens', 
    'ghostbusters',
    'gremlins',
    'scarface',
    'poltergeist',
    'tron',
    ],
    spaces: [],
    letter: '',
    lettersGuessed: [],
    randomWord: '',
    guessedWord: '',
    letterGuessed: function(){
        if(game.lettersGuessed.includes(game.letter)){
            return;
        }
        game.lettersGuessed.push(game.letter);
  
    }, 
    selectNewWord: function(){ 
        game.randomWord = game.dictionary[Math.floor(Math.random() * game.dictionary.length)];
        console.log(game.randomWord)
    },
    blankSpaces: function() {
        game.spaces.fill( "_" ,  game.randomWord.length); 
        
    },
    correctGuess: function(){
        if(this.randomWord.includes(this.letter)){
            console.log("replace me somehow");
        }
    },
    wrongGuess: function(){

    },
}

document.onkeyup = function(event){
    game.letter = event.key;
    game.letterGuessed();
    game.correctGuess();

    if(game.randomWord.charAt(0) === ''){
    game.selectNewWord(); 
    }
    else if(game.spaces.length == []){
        for(var i = 0; i < game.randomWord.length; i++){
            game.spaces.push("_");
                
        }
    }
    else{
        console.log(game.randomWord);
        console.log(game.lettersGuessed);
        console.log(game.spaces);
    
    }


}
