$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;



function initializeApp(){
  $('.card').click(handleCardClick);
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
  } else if (firstCardImage !== secondCardImage){
    setTimeout(function(){
      firstCardClicked.find('.front').removeClass('hidden')
      secondCardClicked.find('.front').removeClass('hidden')
    }, 1500)
  }
}
