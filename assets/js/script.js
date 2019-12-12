$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var max_games = 3;
var attempts = 0;
var games_played = 0;


function initializeApp(){
  layOutCards()
  $('.container').on('click', '.card', handleCardClick)
    $('.resetGame').click(resetGame);
  displayStats();
}

function handleCardClick(event){ //function to hold game conditionals for game functioning
  var target = $(event.currentTarget)
  target.find('.back').addClass('hidden')
  if(firstCardClicked === null){
  firstCardClicked = target;
  }else{
  secondCardClicked = target;
  }

  var firstCardImage = firstCardClicked.find('.front').css('background-image')
  var secondCardImage = secondCardClicked.find('.front').css('background-image')

  if(firstCardImage === secondCardImage){ //compares cards clicked to each other
    matches++;
    attempts++;
    if(matches === max_matches){ //tracks and compares matches make modal appear and reset game
      $('.goal').removeClass('hidden')
      games_played++;
    }else{ //resets cards clicked
      firstCardClicked = null;
      secondCardClicked = null;
    }
  }else if (firstCardImage !== secondCardImage){ //resets the cards if not matching
    attempts++;
    setTimeout(function(){
      firstCardClicked.find('.back').removeClass('hidden')
      secondCardClicked.find('.back').removeClass('hidden')
      firstCardClicked = null;
      secondCardClicked = null;
    }, 750)
  }

  displayStats();

}

function resetGame(event){ //hides modal, resets stats and cards clicked, and recreates game board
  $('.goal').addClass('hidden');
  resetStats();
  firstCardClicked = null;
  secondCardClicked = null;
  deleteCards();
  layOutCards();
}

function calculateAccuracy(){ //compares matches to attemps to calculate accuracy
  var accuracyCalc = ((matches / attempts)*100).toFixed(0);
  if(accuracyCalc === 'NaN'){
    return '0'
  }else{
  return accuracyCalc;
  }
}

function displayStats(){ //updates stats as game progresses
  var accuracy = calculateAccuracy()
  $('.gamesPlayed').text(games_played);
  $('.attempts').text(attempts);
  $('.accuracy').text(accuracy + '%');
}

function resetStats(){ //clears stats
  matches = null;
  attempts = null;
  displayStats();
  $('.back').removeClass('hidden');
}

var ballArray = ['adidas2', 'adidas3', 'adidas4', 'nike1', 'nike2', 'nike3', 'puma1', 'puma2', 'puma3'];
var fullArray = ballArray.concat(ballArray);

function shuffleCards(cardArray){ //function to randomize card layout
  var currentIndex = cardArray.length, temp, randomIndex;
  while(0 !== currentIndex){
    randomIndex = Math.floor(Math.random()* currentIndex);
    currentIndex-=1;
    temp = cardArray[currentIndex];
    cardArray[currentIndex] = cardArray[randomIndex];
    cardArray[randomIndex] = temp;
  }
  return cardArray;
}

function layOutCards(){ // runs shufflecard fx and dynamically lays out cards
  shuffleCards(fullArray);
  for(var index = 0; index < fullArray.length; index++){
    var dynamicCard = $('.container');
    dynamicCard.append('<div class="card">');
    var dynamicBack = $('div .card:last-child');
    var frontCard = $('<div>').addClass("back frontImg");
    var backCard = $('<div>').addClass('front ballBackground '+fullArray[index]+'');
    dynamicBack.append(frontCard, backCard);
  }
}

function deleteCards(){ //fx to delete cards on game reset
  $('.card').remove();
}
