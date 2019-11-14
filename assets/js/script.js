$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var attempts = 0;
var games_played = 0;


function initializeApp(){
  $('.card').click(handleCardClick);
  $('.resetGame').click(resetGame)
  displayStats();
  console.log(attempts);
}

function handleCardClick(event){

  var target = $(event.currentTarget)
  target.find('.front').addClass('hidden')
  if(firstCardClicked === null){
  firstCardClicked = target;
  }else{
  secondCardClicked = target;
  }

  var firstCardImage = firstCardClicked.find('.back').css('background-image')
  var secondCardImage = secondCardClicked.find('.back').css('background-image')

  if(firstCardImage === secondCardImage){
    console.log('cards match');
    matches++;
    attempts++;
    if(matches === max_matches){
      $('.gameWon').removeClass('hidden')
      games_played++;

    }else{
      firstCardClicked = null;
      secondCardClicked = null;
    }
  } else if (firstCardImage !== secondCardImage){
    attempts++;
    setTimeout(function(){
      firstCardClicked.find('.front').removeClass('hidden')
      secondCardClicked.find('.front').removeClass('hidden')
      firstCardClicked = null;
      secondCardClicked = null;
    }, 1500)
  }
  displayStats();
  console.log(attempts);
}

function resetGame(event){
  $('.front').removeClass('hidden');
  $('.gameWon').addClass('hidden');
  matches = 0;
  attempts = 0;
  firstCardClicked = null;
  secondCardClicked = null;
}

function calculateAccuracy(){
  var accuracyCalc = ((matches / attempts)*100).toFixed(0);
  return accuracyCalc;
}

function displayStats(){
  var accuracy = calculateAccuracy()
  $('.gamesPlayed').text(games_played);
  $('.attempts').text(attempts);
  $('.accuracy').text(accuracy + '%');
  console.log(accuracy)
}
