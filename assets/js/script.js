$(document).ready(initializeApp)

let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;
let max_matches = 9;
let attempts = 0;
let games_played = 0;

function initializeApp() {
  layOutCards()
  $('.container').on('click', '.card', handleCardClick)
  $('.resetButton').click(resetGame);
  $('.startButton').click(startGame)
  displayStats();
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
        attempts++;
        resetSelectedCrads()
        if (matches === max_matches) {
          $('#winningModal').removeClass('hidden')
          games_played++;
        } else {
          resetSelectedCrads()
        }
      } else {
        attempts++;
        setTimeout(function () {
          firstCardClicked.find('.back').removeClass('hidden')
          secondCardClicked.find('.back').removeClass('hidden')
          resetSelectedCrads()
        }, 750)
      }
    }
  }
  displayStats();
}

function resetGame() {
  $('#winningModal').addClass('hidden');
  resetStats();
  firstCardClicked = null;
  secondCardClicked = null;
  deleteCards();
  layOutCards();
}

function startGame() {
  $('#openingModal').addClass('hidden')
}

function calculateAccuracy() {
  const accuracyCalc = ((matches / attempts) * 100).toFixed(0);
  if (accuracyCalc === 'NaN') {
    return '0'
  } else {
    return accuracyCalc;
  }
}

function displayStats() {
  const accuracy = calculateAccuracy()
  $('.gamesPlayed').text(games_played);
  $('.attempts').text(attempts);
  $('.accuracy').text(accuracy + '%');
}

function resetStats() {
  matches = 0;
  attempts = 0;
  displayStats();
  $('.back').removeClass('hidden');
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
