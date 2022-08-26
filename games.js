
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function(){
    userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over. Press Any Key to Restart');

        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level '+level);

    var randomNumber = Math.round(Math.random() * 10)%4;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    audio = new Audio('sounds/'+randomChosenColour+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    }, 100);
}

function playSound(name){
    $('#'+name).addClass('pressed',100).removeClass('pressed', 100);
    audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
