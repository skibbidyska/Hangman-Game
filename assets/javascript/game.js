var game = {
    userInput: "",
    wins: 0,
    losses: 0,
    guessesRemaining: 10,
    word: "",
    dictionary: ["cloud", "aerith", "sephiroth", "jenova", "tifa", "uffie", "barret", "vincent", "zack", "cid", "rufus", "turks", "materia"],
    correct: 0,
    firstGame: 0,
    guessed: [],

    //selects random word from dictionary array
    generateWord: function(){
        this.word = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    },
    //creates li elements with bottom border turned white to hold letters spaces
    generateSpaces: function(){
        for(var i = 0; i < this.word.length; i++){
            var listEntry = document.createElement("li");
            var element = document.getElementById("spaces").appendChild(listEntry);
            document.getElementsByTagName("li")[i].setAttribute("class","d-inline-block m-3 border border-top-0 border-right-0 border-left-0 border-white");
            document.getElementsByTagName("li")[i].setAttribute("style","width:22px; height:40px");
            document.getElementsByTagName("li")[i].setAttribute("id","remove");
            document.getElementsByTagName("li")[i].innerHTML = " ";

        }

    },
    //correct guess 
    correctGuess: function(){
        for(var i = 0; i < this.word.length; i++){
           if(this.word[i] === this.userInput){
               document.getElementsByTagName("li")[i].setAttribute("class", "d-inline-block m-3 border-0 display-4");
               document.getElementsByTagName("li")[i].innerHTML = this.userInput;
               ++this.correct;
               this.pushScore();               
           }
            
        }
    },
    //incorrect guess
    incorrectGuess: function(){
        for(var i = 0; i < this.word.length; i++){
            if(this.word[i] != this.userInput && this.word.length === i + 1){
                --this.guessesRemaining;
                this.pushScore();
            }
        }
    },
    //win the game event
    gameWin: function(){
        if(this.word.length === this.correct){
            for(var i = 0; i < this.word.length; i++)
            document.getElementById("remove").remove();
            ++this.wins;
            this.correct = 0;
            this.guessed = [];
            this.guessesRemaining = 10;
            this.generateWord();
            this.generateSpaces();
            this.pushScore();
        }
    },
    //lose the game event
    gameLoss: function(){
        if(this.guessesRemaining === 0){
            ++this.losses;
            this.correct = 0;
            this.guessesRemaining = 10;
            this.guessed = [];
            for(var i = 0; i < this.word.length; i++){
                document.getElementById("remove").remove();   
            }
            this.generateWord();
            this.generateSpaces();
            this.pushScore();
        }
    },
    //updates scoreboard
    pushScore: function(){

        document.querySelector("#wins").innerHTML = "Score: </br>" + this.wins;
        document.querySelector("#losses").innerHTML = "Losses: </br>" + this.losses;
        document.querySelector("#guessesLeft").innerHTML = "Guesses left: </br>" + this.guessesRemaining;
        document.querySelector("#guesses").innerHTML = "Your guesses so far: " + this.guessed;
    },
    //stops guesses if the letter has already been selected
    letterGuessed: function(){
        if(this.guessed.includes(this.userInput)){
            ++this.guessesRemaining;
        }
        else{
            this.guessed.push(" " + this.userInput.toUpperCase());
        }
    }
}

document.onkeyup = function(event){
    //remove press to play and populate word, spaces, and scoreboard
    if(game.firstGame === 0){
        document.getElementById("pressToPlay").remove();
        game.generateWord();
        game.generateSpaces();
        game.pushScore();
        game.firstGame++;
    }
    //main game event (if the key pressed is a letter continue)
    if(event.keyCode >= 65 && event.keyCode <= 90){
        game.userInput = String.fromCharCode(event.which).toLowerCase();
        game.letterGuessed();
        game.correctGuess();
        game.incorrectGuess();
        game.gameWin();
        game.gameLoss();
    }
}