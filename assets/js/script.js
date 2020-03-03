$(document).ready(initializeApp)

let firstCardClicked = null;
let secondCardClicked = null;
let matches = 0;
let max_matches = 9;
let matchedArray = [];
const cheer = new Audio('./assets/sounds/kids_cheering.mp3')
const red = new Audio('./assets/sounds/Red.m4a')
const orange = new Audio('./assets/sounds/Orange.m4a')
const yellow = new Audio('./assets/sounds/Yellow.m4a')
const green = new Audio('./assets/sounds/Green.m4a')
const lightGreen = new Audio('./assets/sounds/Light_green.m4a')
const blue = new Audio('./assets/sounds/Blue.m4a')
const indigo = new Audio('./assets/sounds/Indigo.m4a')
const violet = new Audio('./assets/sounds/Violet.m4a')
const black = new Audio('./assets/sounds/Black.m4a')

const cardArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'chartreuse'];
const fullArray = cardArray.concat(cardArray);

function initializeApp() {
  layOutCards()
  $('.container').on('click', '.card', handleCardClick)
  $('.resetButton').click(resetGame);
  $('.startButton').click(startGame);
  $('#red').click(() => { red.play() })
  $('#orange').click(() => { orange.play() })
  $('#yellow').click(() => { yellow.play() })
  $('#green').click(() => { green.play() })
  $('#chartreuse').click(() => { lightGreen.play() })
  $('#indigo').click(() => { indigo.play() })
  $('#blue').click(() => { blue.play() })
  $('#violet').click(() => { violet.play() })
  $('#black').click(() => { black.play() })
}

function resetSelectedCrads() {
  firstCardClicked = null;
  secondCardClicked = null;
}

function matchedColorSound(color) {
  switch (color) {
    case 'red':
      red.play()
      break;
    case 'orange':
      orange.play()
      break;
    case 'yellow':
      yellow.play();
      break;
    case 'green':
      green.play();
      break;
    case 'chartreuse':
      lightGreen.play();
      break;
    case 'blue':
      blue.play();
      break;
    case 'indigo':
      indigo.play();
      break;
    case 'violet':
      violet.play()
      break;
    case 'black':
      black.play();
      break;
  }
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
        let color = firstCardClicked[0].children[1].classList[1]
        matchedArray.push(color)
        matchedColorSound(color)
        resetSelectedCrads()
        if (matches === max_matches) {
          setTimeout(() => {

            cheer.play()
            $('#winningModal').removeClass('hidden')
            matches = 0
          }, 2000)
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
    $(`#${matchedArray[index]}`).addClass(`${matchedArray[index]} roll-in-top`)
  }
}

function resetMatchedColors() {
  for (index in matchedArray) {
    $(`#${matchedArray[index]}`).removeClass(`${matchedArray[index]} roll-in-top`)
  }
  matchedArray = []
}


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
