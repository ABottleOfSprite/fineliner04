const cardsWrapper = document.getElementById("cardsWrapper");
const textLayer = document.getElementById("textLayer");
const cards = document.querySelectorAll(".cards");

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");

//array of colors for the cards
const cardColor = ['#29BF12', '#256eff', '#ca054d', '#cf5c36'];


// Adding event listeners to each card
cards.forEach((card, index) => {
  card.addEventListener('mouseenter', function() {
    // Applying mix blend mode to the cards
    cards.forEach((c, i) => {
      if (i === index) {
        c.style.mixBlendMode = 'screen';
      } else {
        c.style.mixBlendMode = 'multiply';
      }
    });
    // Showing text layer
    textLayer.style.opacity = 1;
  });

  card.addEventListener('mouseleave', function() {
    // Resetting mix blend mode for all cards
    cards.forEach(c => c.style.mixBlendMode = 'normal');
    // Hiding text layer
    textLayer.style.opacity = 0;
  });
});

//Determining current text

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

// Removing every card except the one that is clicked
cards.forEach((card, index) => {
  card.addEventListener('click', function() {
    cards.forEach((c, i) => {
      if (i === index) {
        c.style.opacity = '1';
        c.style.pointerEvents = 'auto'; // Enable pointer events for the clicked card
      } else {

        if (c.style.opacity === '1') {
          c.style.opacity = '0';
          c.style.pointerEvents = 'none'; // Disable pointer events for other cards
          //make the body overflow normal
          document.body.style.overflowY = 'visible';
          document.documentElement.style.setProperty('--selected-page-color', cardColor[index]);
        } else{
          c.style.opacity = '1';
          c.style.pointerEvents = 'auto'; //enable pointer events for all cards
          //scrolling to the top of the page smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });


          //make the body overflow hidden
          document.body.style.overflow = 'hidden';
        }
        
      }
    });
  });
});
