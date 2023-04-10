const getQuoteBtn = document.querySelector(".get-quote-btn");
const quoteField = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");

getQuoteBtn.addEventListener("click", createQuoteHandler);

function createQuoteHandler() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((quoteData) => {
      console.log(quoteData.quote, quoteData.author);
      quoteField.innerHTML = quoteData.quote;
      quoteAuthor.innerHTML = "- " + quoteData.author;
    });
}
