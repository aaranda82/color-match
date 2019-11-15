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
  // $('.card').click(handleCardClick);// use event delegations here
  $('.resetGame').click(resetGame);
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
    if (games_played === max_games) {
      winTheCup();
    }else if(matches === max_matches){
      $('.goal').removeClass('hidden')
      games_played++;
      console.log('games won ', games_played)
    }else{
      firstCardClicked = null;
      secondCardClicked = null;
    }
  }else if (firstCardImage !== secondCardImage){
    attempts++;
    setTimeout(function(){
      firstCardClicked.find('.front').removeClass('hidden')
      secondCardClicked.find('.front').removeClass('hidden')
      firstCardClicked = null;
      secondCardClicked = null;
    }, 750)
  }



  displayStats();
  console.log(attempts);
}

function resetGame(event){
  $('.goal').addClass('hidden');
  resetStats();
  firstCardClicked = null;
  secondCardClicked = null;
  deleteCards();
  layOutCards();
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

function resetStats(){
  matches = null;
  attempts = null;
  games_played++;
  displayStats();
  $('.front').removeClass('hidden');
}

//create array with each class, make a copy of each class and
var ballArray = ['adidas2', 'adidas3', 'adidas4', 'nike1', 'nike2', 'nike3', 'puma1', 'puma2', 'puma3'];
var fullArray = ballArray.concat(ballArray);

function shuffleCards(cardArray){
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

function layOutCards(){
  shuffleCards(fullArray);
  for(var index = 0; index < fullArray.length; index++){
    var dynamicCard = $('.container');
    dynamicCard.append('<div class="card">');
    var dynamicBack = $('div .card:last-child');
    var frontCard = $('<div>').addClass("front frontImg");
    var backCard = $('<div>').addClass('back ballBackground '+fullArray[index]+'');
    dynamicBack.append(frontCard, backCard);
    // var dynamicFace = $('div .card:last-child');
    // dynamicFace.append('<div class="back ballBackground">');
}
}

function deleteCards(){
  $('.card').remove();
}
function winTheCup(){
  $('.worldCupChamps').removeClass('hidden')
  resetStats()
  games_played = 0;
}

// function expandKey(){

// }
