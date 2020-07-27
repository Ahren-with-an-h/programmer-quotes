let sig = 0; // unique ID for each API request
const img = document.getElementById("img");
const button = document.getElementById("button");
// Get window dimensions
const width =
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const height =
  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// Retrieve quote from Programming-Quotes api
async function getQuotes() {
  const quoteUrl = "https://programming-quotes-api.herokuapp.com/quotes/random";

  try {
    const response = await fetch(quoteUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log("Error -> ", err);
  }
}

// Retrieve image from Unsplash api
async function getImg() {
  imgUrl = `https://source.unsplash.com/random/${width * 0.75}x${height * 0.75}/?sig=${sig}`;
  sig++; // increment unique ID for random image request
  console.log("flag");
  try {
    const response = await fetch(imgUrl);
    console.log("img", response);
    img.setAttribute("src", response);
  } catch (err) {
    apiGet(url);
    console.log("Error -> ", err);
  }
}

button.addEventListener("click", getImg);

getQuotes();
