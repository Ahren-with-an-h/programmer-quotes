let sig = 0; // unique ID for each API request
const wrapper = document.getElementById("wrapper");
const background = document.getElementById("background");

function createQuoteBox(quote, author) {
  // Create the quote box container
  const quoteBox = document.createElement("div");
  quoteBox.id = "quote-box";
  quoteBox.classList.add("animate__animated");
  quoteBox.classList.add("animate__flipInX");
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
  button.appendChild(document.createTextNode("Another"))
  quoteBox.appendChild(button);
  // Add it all to the document
  wrapper.appendChild(quoteBox);
}

function nextQuote() {
  try {
    const oldBox = document.getElementById("quote-box");
    oldBox.remove();
    const oldImg = document.getElementById("img");
    oldImg.remove();
  } catch {}

  const quote = getQuote();
  const img = getImage();

  Promise.all([quote, img]).then(([quote, img]) => {
    background.appendChild(img);
    createQuoteBox(quote.en, quote.author);
  });
}

// Retrieve quote from Programming-Quotes api
async function getQuote() {
  const quoteUrl = "https://programming-quotes-api.herokuapp.com/quotes/random";

  try {
    const response = await fetch(quoteUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error -> ", err);
  }
}

// Retrieve image from Unsplash api
function makeImageUrl() {
  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const imageUrl = `https://source.unsplash.com/collection/545337/${width}x${height}/?sig=${sig}`;
  sig++; // increment unique ID for random image request
  return imageUrl;
}

function getImage() {
  const url = makeImageUrl();
  return new Promise((resolve) => {
    const image = new Image();
    image.id = "img";
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

nextQuote(true);
