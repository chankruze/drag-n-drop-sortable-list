/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Sep 14 2021 09:48:11 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2021 and beyond
*/

const originalList = document.getElementById("original-list");
const draggableList = document.getElementById("draggable-list");
const checkButton = document.getElementById("btn-check");

let userData = null;

const fetchData = async () => {
  await fetch("./PersonData.json")
    .then((res) => res.json())
    .then((data) => (userData = data))
    .catch((err) => console.error(err));
};

// insert list utems to DOM
const populateList = (users, listItems) => {
  // original list
  users.map((user, idx) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", idx);
    listItem.innerHTML = `
  <div class="listItem">
    <div class="left">
      <img src="${user.avatar}" alt="Profile pic of ${user.name}" />
      ${
        user.gender === "Male"
          ? '<i class="fas fa-mars"></i>'
          : '<i class="fas fa-venus"></i>'
      }
    </div>
    <div class="mid">
      <h3>${user.name}</h3>
      <p class="job">${user.job_title}</p>
      <p>${user.email}</p>
    </div>
  </div>
  `;
    listItems.push(listItem);
    originalList.appendChild(listItem);
  });

  // randomize the list everytime (draggable list)
  users
    .map((u) => ({ user: u, sort: Math.random() }))
    .sort((x, y) => x.sort - y.sort)
    .forEach(({ user }, idx) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", idx);
      listItem.innerHTML = `
    <div class="listItem draggable" draggable="true">
      <div class="left">
        <img src="${user.avatar}" alt="Profile pic of ${user.name}" />
        ${
          user.gender === "Male"
            ? '<i class="fas fa-mars"></i>'
            : '<i class="fas fa-venus"></i>'
        }
      </div>
      <div class="mid">
        <h3>${user.name}</h3>
        <p class="job">${user.job_title}</p>
        <p>${user.email}</p>
      </div>
      <div class="right">
        <i class="fas fa-grip-lines"></i>
      </div>
    </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll("#draggable-list li");
  //   const dropZones = document.querySelectorAll("#draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragend", dragEnd);
    // draggable.addEventListener("drag", drag);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", drop);
  });

  //   dropZones.forEach((dropZone) => dropZone.addEventListener("drop", drop));
};

const dragStart = (e) => {
  //   console.log("dragstart");
  e.target.classList.add("old");
};

// const drag = (e) => {
//   //   console.log("dragstart");
//   console.log(e.target);
// };

const dragEnd = (e) => {
  //   console.log("dragstart");
  e.target.classList.remove("old");
};

const dragOver = (e) => {
  //   console.log("dragover");
  document.querySelectorAll(".draggable").forEach((elem) => {
    if (elem.contains(e.target)) {
      elem.classList.add("over");
      return;
    }
  });
};

const drop = (e) => {
  console.log(e.target);
  //   document.querySelectorAll(".draggable").forEach((elem) => {
  //     if (elem.contains(e.target)) {
  //       elem.classList.add("right");
  //       return;
  //     }
  //   });
};
const dragEnter = (e) => {
  //   console.log("dragenter");
  // add class over
};
const dragLeave = (e) => {
  //   console.log("dragleave");
  document.querySelectorAll(".draggable").forEach((elem) => {
    if (elem.contains(e.target) && elem.classList.contains("over")) {
      elem.classList.remove("over");
    }
  });
};

fetchData().then(() => {
  // store list items
  const listItems = [];

  let dragStartIndex;

  populateList(userData, listItems);
});
