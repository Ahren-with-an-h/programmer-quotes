let sig = 0; // unique ID for each API request
const wrapper = document.getElementById("wrapper");
const background = document.getElementById("background");

// Does everything. Gets a quote, an image for the background, creates the elements, and makes it all happen.
function nextQuote() {
  let fadeout = false;
  // Start loading next quote and image
  const quote = getQuote();
  const img = getImage();

  try {
    // Flip out old quote box
    const oldBox = document.getElementById("quote-box");
    oldBox.classList.add("ld-flip-v-out");

    // Fade out old background image
    const oldImg = document.getElementById("img");
    oldImg.classList.add("img-fade-out");

    // Wait for them to finish their animations
    fadeout = new Promise((resolve, reject) => {
      setTimeout(() => {
        oldBox.remove();
        oldImg.remove();
        resolve(true);
      }, 3000);
    });
  } catch (err) {
    console.log("Initial load, or new load failed. Error -> ", err);
  }

  // If we are fading out the previous image wait for it to finish.
  if (fadeout) {
    Promise.all([fadeout, quote, img]).then(([fadeout, quote, img]) => {
      img.id = "img";
      background.appendChild(img);
      createQuoteBox(quote.en, quote.author);
    });
    // Otherwise it's the first load so ignore the fadeout promise
  } else {
    Promise.all([quote, img]).then(([quote, img]) => {
      img.id = "img";
      background.appendChild(img);
      createQuoteBox(quote.en, quote.author);
    });
  }
}

// Constructs the elements and appends them to the document
function createQuoteBox(quote, author) {
  // Create the quote box container
  const quoteBox = document.createElement("div");
  quoteBox.id = "quote-box";
  quoteBox.classList.add("ld");
  quoteBox.classList.add("ld-flip-v-in");
  // Create the quote element
  const quoteTxt = document.createElement("div");
  quoteTxt.id = "quote";
  quoteTxt.appendChild(document.createTextNode(quote));
  quoteBox.appendChild(quoteTxt);
  // Create the author element
  const authorTxt = document.createElement("div");
  authorTxt.id = "author";
  authorTxt.appendChild(document.createTextNode(author));
  quoteBox.appendChild(authorTxt);
  // Create the button
  const button = document.createElement("button");
  button.id = "button";
  button.classList.add("btn");
  button.addEventListener("click", nextQuote);
  button.appendChild(document.createTextNode("Another"));
  quoteBox.appendChild(button);
  // Add it all to the document
  wrapper.appendChild(quoteBox);
}

// Retrieve quote from Programming-Quotes api
async function getQuote() {
  const quoteUrl = "https://programming-quotes-api.herokuapp.com/quotes/random";

  try {
    const response = await fetch(quoteUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("getQuote() Error -> ", err);
  }
}

// Construct URL for image from Unsplash API for fetching
function makeImageUrl() {
  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const imageUrl = `https://source.unsplash.com/collection/545337/${width}x${height}/?sig=${sig}`;
  sig++; // increment unique ID for random image request

  return imageUrl;
}

// Fetch image, return promise
function getImage() {
  const url = makeImageUrl();
  return new Promise((resolve) => {
    const image = new Image();
    image.classList.add("img-fade-in");
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

// load the first quote
nextQuote(true);
