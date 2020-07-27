let sig = 0; // unique ID for each API request
const img = document.getElementById("img");
const button = document.getElementById("button");
const wrapper = document.getElementById("wrapper");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

// Retrieve quote from Programming-Quotes api
async function getQuotes() {
  const quoteUrl = "https://programming-quotes-api.herokuapp.com/quotes/random";

  try {
    const response = await fetch(quoteUrl);
    const data = await response.json();
    quote.innerText = data.en;
    author.innerText = data.author;
  } catch (err) {
    console.log("Error -> ", err);
  }
}

// Retrieve image from Unsplash api
async function getImg() {
  // Get window dimensions
  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  const imgUrl = `https://source.unsplash.com/collection/545337/${width}x${height}/?sig=${sig}`;
  console.log("imgUrl: ", imgUrl);
  sig++; // increment unique ID for random image request

  try {
    const response = await fetch(imgUrl);
    console.log("img", response);
    wrapper.style.background = `url('${response.url}') no-repeat center`;
  } catch (err) {
    console.log("Error -> ", err);
  }
}

button.addEventListener("click", () => { getImg(); getQuotes(); } );
getImg();
getQuotes();

/*
Load next image and quote before we need it
Fade out and fade in
*/