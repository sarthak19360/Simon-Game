
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0;
document.addEventListener("keydown",function () {
    if(level === 0){
        nextSequence();
        document.querySelector("h1").innerHTML = "Level " + level;
    }
});

for(var i = 0; i < buttonColours.length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function () {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    });
}

function nextSequence(){
    // make userlickedPattern array empty again
    userClickedPattern = [];

    level = level + 1;
    document.querySelector("h1").innerHTML = "Level " + level;
    // random number from 0-3
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    // add the randomChosenColour at the end of the game pattern
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    var chosenButton = document.getElementById(randomChosenColour);
}

function playSound(randomChosenColour){
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function animatePress(randomChosenColour){
    var button = document.getElementById(randomChosenColour);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 50);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
}
