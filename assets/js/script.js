$(document).ready(initializeApp)

function initializeApp(){
  $('.card').click(handleCardClick);
}

function handleCardClick(event){
  console.log(event);
  var target = $(event.currentTarget)
  target.find('.front').addClass('hidden')
}
