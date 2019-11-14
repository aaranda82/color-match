$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;



function initializeApp(){
  $('.card').click(handleCardClick);
  $('.resetGame').click(resetGame)
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
    if(matches === max_matches){
      $('.gameWon').removeClass('hidden')
    }else{
      firstCardClicked = null;
      secondCardClicked = null;
    }
  } else if (firstCardImage !== secondCardImage){
    setTimeout(function(){
      firstCardClicked.find('.front').removeClass('hidden')
      secondCardClicked.find('.front').removeClass('hidden')
      firstCardClicked = null;
      secondCardClicked = null;
    }, 1500)
  }
}

function resetGame(event){
  $('.front').removeClass('hidden');
  $('.gameWon').addClass('hidden');
  matches = null;
  firstCardClicked = null;
  secondCardClicked = null;
}
