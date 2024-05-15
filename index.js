//Declaring variables
const cardsWrapper = document.getElementById("cardsWrapper");
const textLayer = document.getElementById("textLayer");
const cards = document.querySelectorAll(".cards");

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");

let textLayerVisibility = false; //initial value of text layer visibility
let navigationClickedState = false; //initial value of navigation clicked state

//Getting the colours of all the cards
const cardColor = [
  (getComputedStyle(card1).getPropertyValue('--color-primary')),
  (getComputedStyle(card2).getPropertyValue('--color-secondary')),
  (getComputedStyle(card3).getPropertyValue('--color-tertiary')),
  (getComputedStyle(card4).getPropertyValue('--color-quaternary'))
];

// Adding hover effect to all cards on mouse enter
cards.forEach((card, index) => {
  card.addEventListener('mouseenter', function() { 
    cards.forEach((c, i) => {  // Applying hover effect to all cards
      if (i === index) {
        c.style.mixBlendMode = 'lighten';
      } else {
        c.style.mixBlendMode = 'multiply';
      }
    });

    if (!navigationClickedState) {
      toggleTextLayer();
    }
  });

// Removing hover effect from all cards on mouse leave  
  card.addEventListener('mouseleave', function() {
    cards.forEach((c,i) => {
    
      if (navigationClickedState) {
        if (i === index) {
          c.style.mixBlendMode = 'lighten';
        }
        else {
          c.style.mixBlendMode = 'normal';
        }
      } else {
        c.style.mixBlendMode = 'normal';
      }

    });// Resetting mix blend mode for all cards

    if (!navigationClickedState) {
      toggleTextLayer();
    }
  });
});

//Determining text when a card is hovered(The text defines the page that is navigated to)
card1.addEventListener('mouseenter', function() {
  textLayer.innerHTML = "PROJECTS";
});

card2.addEventListener('mouseenter', function() {
  textLayer.innerHTML = "ABOUT";
});

card3.addEventListener('mouseenter', function() {
  textLayer.innerHTML = "BLOG";
});

card4.addEventListener('mouseenter', function() {
  textLayer.innerHTML = "CONTACT";
});

// Effects when a card is clicked
cards.forEach((card, index) => {
  card.addEventListener('mousedown', function() {
    toggleNavigationClickedState();//reset the navigation clicked state
    cards.forEach((c, i) => {
      if (i === index) {
        c.style.opacity = '1'; // Making the clicked card visible
        c.style.pointerEvents = 'auto'; // Enable pointer events for the clicked card
        c.style.mixBlendMode = 'lighten';
      } else {

        if (navigationClickedState) {
          c.style.opacity = '0';
          c.style.pointerEvents = 'none'; // Disable pointer events for other cards, to make sure the hover effect wont be triggered
          document.body.style.overflowY = 'visible';//Resetting the overflowY property to "visible"
          document.documentElement.style.setProperty('--selected-page-color', cardColor[index]);//Setting the selected page color
          toggleTextLayer(); //show the text layer if it is hidden
        } else{
          c.style.pointerEvents = 'auto'; //enable pointer events for all cards
          c.style.opacity = '1';
          window.scrollTo({ top: 0, behavior: 'smooth' });//When no page is selected, scroll to the top of the page, smoothly
          document.body.style.overflowY = 'hidden'; //make the body overflowY hidden
          
        }        
      }
    });
  });
});

window.scrollTo({ top: 0, behavior: 'smooth' });//Scrolling to the top of the page initially to prevent reload errors


//Code for toggling the text layer visibility
function toggleTextLayer() {
  if (navigationClickedState) {
    textLayer.style.opacity = 1;
    console.log("text layer visibility: ", textLayerVisibility);
    return;
  } else {
    if (textLayerVisibility) {
      textLayer.style.opacity = 0;
      textLayerVisibility = false;
    } else {
      textLayer.style.opacity = 1;
      textLayerVisibility = true;
    }
    console.log("text layer visibility: ", textLayerVisibility); 
  }
}

function toggleNavigationClickedState() {
  if (navigationClickedState) {
    navigationClickedState = false;
  } else {
    navigationClickedState = true;
  }
  console.log("navigation clicked state: ", navigationClickedState);
}
