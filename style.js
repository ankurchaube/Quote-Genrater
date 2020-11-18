const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//& Loading Spinner Shown
function Loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//& Remove loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// *Get Quote From API

async function getQuote() {
  Loading();
  //& We need Proxy Url in order to make API call
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    //^ if author is blank add unknown.

    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //^ Reduce font size for long text.
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;

    //& Stop Loader , Show Quote
    complete();
  } catch (error) {
    getQuote();
  }
}

//* Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//? Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//^ On Load --
getQuote();
