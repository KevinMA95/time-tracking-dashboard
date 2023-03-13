"use strict";

const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");
const hoursEl = document.querySelectorAll(".hours");
const prevHoursEl = document.querySelectorAll(".prevHours");
const lastTimeEl = document.querySelectorAll(".time-txt");
const listsBtn = document.querySelectorAll(".list-btn");

for(let list of listsBtn){
  list.addEventListener("click",()=>{
    let text = list.textContent;
    for(let list2 of listsBtn){
      if(list2.textContent == text){
        list2.classList.add("clicked");
      } else {
        list2.classList.remove("clicked");
      }
    }
  })
}

dailyBtn.addEventListener("click", () => {
  getData("daily");
  for (let time of lastTimeEl) {
    time.textContent = "Yesterday";
  }
});

weeklyBtn.addEventListener("click", () => {
  getData("weekly");
  for (let time of lastTimeEl) {
    time.textContent = "Last week";
  }
});

monthlyBtn.addEventListener("click", () => {
  getData("monthly");
  for (let time of lastTimeEl) {
    time.textContent = "Last month";
  }
});

const getData = async (time) => {
  let data = await fetch("./data.json").then((res) => res.json());
  for (let i = 0; i < hoursEl.length; i++) {
    if (data[i].timeframes[`${time}`].current != "1") {
      hoursEl[i].textContent = data[i].timeframes[`${time}`].current + "hrs";
    } else {
      hoursEl[i].textContent = data[i].timeframes[`${time}`].current + "hr";
    }

    if (data[i].timeframes[`${time}`].previous != "1") {
      prevHoursEl[i].textContent =
        data[i].timeframes[`${time}`].previous + "hrs";
    } else {
      prevHoursEl[i].textContent =
        data[i].timeframes[`${time}`].previous + "hr";
    }
  }
};
