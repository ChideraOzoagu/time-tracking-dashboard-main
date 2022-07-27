//  select items
const container = document.querySelector(".main-cards");
let regularCards;
const menu = document.querySelectorAll(".menu-btn");

let timeframe = "weekly";
// --buttons
menu.forEach((btn) => {
  btn.addEventListener("click", menuOnClick);
});

// --get JSON data
let data = {};

const url = "/js/data.json";
async function fetchData() {
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.forEach((element) => {
    container.insertAdjacentHTML(
      "beforeend",
      createRegularCards(element, timeframe)
    );
  });

  // convert array to dict

  jsonData.forEach((element) => {
    data[element.title] = element.timeframes;
    console.log(data);
  });

  regularCards = document.querySelectorAll(".card-overlay");
}
fetchData();
// ----------functions--------

function menuOnClick(e) {
  menu.forEach((btn) => {
    btn.classList.remove("menu-active");
  });
  e.target.classList.add("menu-active");
  timeframe = e.target.textContent.toLowerCase();

  updateCards(timeframe);
}

function updateCards() {
  regularCards.forEach((card) => {
    updateCard(card, timeframe);
  });
}

function updateCard(card, timeframe) {
  const title = card.querySelector(".title").textContent;
  const current = data[title][timeframe]["current"];
  const previous = data[title][timeframe]["previous"];

  const timeframeMsg = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  const currentElement = card.querySelector(".current-time");
  currentElement.textContent = `${current}hrs`;
  const msgElement = card.querySelector(".previous-text");
  msgElement.textContent = `${timeframeMsg[timeframe]}`;
  const previousElement = card.querySelector(".previous-time");
  previousElement.textContent = `${previous}hrs`;
}

function createRegularCards(element, timeframe) {
  let title = element["title"];
  let current = element["timeframes"][timeframe]["current"];
  let previous = element["timeframes"][timeframe]["previous"];

  const timeframeMsg = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  return `<section class="card-overlay ${title
    .toLowerCase()
    .replace(/\s/g, "")}">
  <div class="card">
    <div class="text">
      <p class="title">${title}</p>
      <i class="fa-solid fa-ellipsis"></i>
    </div>
    <div class="hours">
      <h2 class="current-time">${current}hrs</h2>
      <p>
        <span class="previous-text">${timeframeMsg[timeframe]} </span> -
        <span class="previous-time">${previous}hrs</span>
      </p>
    </div>
  </div>
</section>`;
}
