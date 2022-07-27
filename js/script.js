class TimeTracker {
  async fetchData() {
    let response = await fetch("./js/data.json");
    let data = await response.json();
    let timeData = data.map((item) => {
      const title = item["title"];
      const timeframes = item["timeframes"]
      return { title, timeframes};
    });
    return timeData;
  }
}

class Container {
  displayCards(timeData) {
    let result = "";
    const timeframeMsg = {
      daily: "Yesterday",
      weekly: "Last Week",
      monthly: "Last Month",
    };
    timeData.forEach((item) => {
      result += `
      <section class="card-overlay ${item.title.toLowerCase().replace(/\s/g, "")}">
        <div class="card">
          <div class="text">
            <p class="title">${item.title}</p>
            <i class="fa-solid fa-ellipsis"></i>
          </div>
          <div class="hours">
            <h2 class="current-time">${item['timeframes'][timeframe]['current']}hrs</h2>
            <p>
              <span class="previous-text">${timeframeMsg[timeframe]}</span> -
              <span class="previous-time">${item['timeframes'][timeframe]['previous']}hrs</span>
            </p>
          </div>
        </div>
        </section>
      `;
    });
    container.insertAdjacentHTML('beforeend', result)
  }
  updateCards(timeData) {
    const cardOverlay = container.querySelectorAll('.card-overlay')
  
    timeData.forEach((element) => {
      tracker[element.title] = element.timeframes
    });
    const timeframeMsg = {
      daily: "Yesterday",
      weekly: "Last Week",
      monthly: "Last Month",
    };
    cardOverlay.forEach(card => {
      const title = card.querySelector('.title').textContent;
      const current = tracker[title][timeframe]["current"];
      const previous = tracker[title][timeframe]["previous"];
      const currentTime = card.querySelector('.current-time')
      const previousTime = card.querySelector('.previous-time')
      const previousText = card.querySelector('.previous-text')
      currentTime.textContent = `${current}hrs`;
      previousTime.textContent = `${previous}hrs`
      previousText.textContent = `${timeframeMsg[timeframe]}`
    })
    
  }
}
// VARIABLES
const menuBtns = [...document.querySelectorAll(".menu-btn")];
const container = document.querySelector(".main-cards");
let timeframe= 'weekly';
let tracker = {};
const timeTracker = new TimeTracker();
const showContainer = new Container();

document.addEventListener("DOMContentLoaded", () => {
  timeTracker
    .fetchData()
    .then((timeData) => showContainer.displayCards(timeData));
});

menuBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    menuBtns.forEach((clearBtn) => {
      clearBtn.classList.remove("menu-active");
    });
    e.target.classList.add("menu-active");
    timeframe = e.target.textContent.toLowerCase();
   timeTracker.fetchData().then(timeData => showContainer.updateCards(timeData))
  });
});
