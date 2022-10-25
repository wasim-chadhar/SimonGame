var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Detect Keypress
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});  

//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    //console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnwser(userClickedPattern.length -1);
});
  

/*--------- Funtion ---------*/

//Function to check answer
function checkAnwser(currentLevel) {
    //To check if the most recent user answer is the same as the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        //console.log("Succcess");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }

    else{
        //console.log("Wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){ 
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

//Function to generate Random Button Color
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber =Math.floor( Math.random() *4 );
    //alert(randomNumber);
    var choseRandomColor = buttonColors[randomNumber];
    //alert(choseRandomColor);
    gamePattern.push(choseRandomColor);

    /*-------- JQuery --------- */
    //Use jQuery to select the button with the same id as the randomChosenColour & to animate Flash to button
    $("#" + choseRandomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //JS To Play Audio
    playSound(choseRandomColor);
     }

//alert(gamePattern);

//Function to Animate Button
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
        
    }, 100);
}

//Function to Play sound
function playSound(name) {
    //JS To Play Audio
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

//Function to Restart game
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
