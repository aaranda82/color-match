$(document).ready(initializeApp)

let firstCardClicked = null;
let secondCardClicked = null;
let matches = 0;
let max_matches = 9;
let matchedArray = [];

function initializeApp() {
  layOutCards()
  $('.container').on('click', '.card', handleCardClick)
  $('.resetButton').click(resetGame);
  $('.startButton').click(startGame)
}

function resetSelectedCrads() {
  firstCardClicked = null;
  secondCardClicked = null;
}

function handleCardClick(event) {
  if (firstCardClicked && secondCardClicked) {
    return
  } else {
    const target = $(event.currentTarget)
    $(event.currentTarget).addClass('pointerEvent')
    target.find('.back').addClass('hidden')
    if (!firstCardClicked) {
      firstCardClicked = target;
    } else if (firstCardClicked[0].outerHTML === target[0].outerHTML) {
      return
    } else {
      secondCardClicked = target;
    }
    const firstCardImage = firstCardClicked.find('.front').css('background-color')
    const secondCardImage = secondCardClicked ? secondCardClicked.find('.front').css('background-color') : null
    if (firstCardImage && secondCardImage) {
      if (firstCardImage === secondCardImage) {
        matches++;
        matchedArray.push(firstCardClicked[0].children[1].classList[1])
        resetSelectedCrads()
        if (matches === max_matches) {
          $('#winningModal').removeClass('hidden')
          matches = 0
        } else {
          resetSelectedCrads()
        }
      } else {
        $(firstCardClicked).removeClass('pointerEvent')
        $(secondCardClicked).removeClass('pointerEvent')
        setTimeout(function () {
          firstCardClicked.find('.back').removeClass('hidden')
          secondCardClicked.find('.back').removeClass('hidden')
          resetSelectedCrads()
        }, 750)
      }
    }
  }
  showMatchedColors()
}

function resetGame() {
  $('#winningModal').addClass('hidden');
  firstCardClicked = null;
  secondCardClicked = null;
  deleteCards();
  layOutCards();
  resetMatchedColors();
}

function startGame() {
  $('#openingModal').addClass('hidden')
}

function showMatchedColors() {
  for (index in matchedArray) {
    $(`#${matchedArray[index]}`).removeClass('hidden')
  }
}

function resetMatchedColors() {
  $('#red, #orange, #yellow, #green, #chartreuse, #blue, #indigo, #violet, #black').addClass('hidden')
  matchedArray = []
}

const cardArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'chartreuse'];
const fullArray = cardArray.concat(cardArray);

function shuffleCards(cardArray) {
  let currentIndex = cardArray.length, temp, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = cardArray[currentIndex];
    cardArray[currentIndex] = cardArray[randomIndex];
    cardArray[randomIndex] = temp;
  }
  return cardArray;
}

function layOutCards() {
  shuffleCards(fullArray);
  let dynamicCard = $('.container');
  for (var index in fullArray) {
    dynamicCard.append('<div class="card border">');
    const dynamicBack = $('div .card:last-child');
    const frontCard = $('<div>').addClass("back backImg pointer");
    const backCard = $('<div>').addClass(`front ${fullArray[index]} ${index}`);
    dynamicBack.append(frontCard, backCard);
  }
}

function deleteCards() {
  $('.card').remove();
}
