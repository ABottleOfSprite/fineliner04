//Declaring variables
const cardsWrapper = document.getElementById("cardsWrapper");
const textLayer = document.getElementById("textLayer");
const cards = document.querySelectorAll(".cards");

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");

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
        c.style.mixBlendMode = 'screen';
      } else {
        c.style.mixBlendMode = 'multiply';
      }
    });
    textLayer.style.opacity = 1; // Making text layer visible
  });

// Removing hover effect from all cards on mouse leave  
  card.addEventListener('mouseleave', function() {
    cards.forEach(c => c.style.mixBlendMode = 'normal');// Resetting mix blend mode for all cards
    textLayer.style.opacity = 0;// Hiding text layer
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
  card.addEventListener('click', function() {
    cards.forEach((c, i) => {
      if (i === index) {
        c.style.opacity = '1'; // Making the clicked card visible
        c.style.pointerEvents = 'auto'; // Enable pointer events for the clicked card
      } else {

        if (c.style.opacity === '1') {
          c.style.opacity = '0';
          c.style.pointerEvents = 'none'; // Disable pointer events for other cards, to make sure the hover effect wont be triggered
          
          document.body.style.overflowY = 'visible';//Resetting the overflowY property to "visible"
          document.documentElement.style.setProperty('--selected-page-color', cardColor[index]);//Setting the selected page color
        } else{
          c.style.opacity = '1';
          c.style.pointerEvents = 'auto'; //enable pointer events for all cards
          
          window.scrollTo({ top: 0, behavior: 'smooth' });//When no page is selected, scroll to the top of the page, smoothly

          document.body.style.overflowY = 'hidden'; //make the body overflowY hidden
        }
        
      }
    });
  });
});
