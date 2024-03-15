const formEl = document.querySelector("form"),
  inputFiel = document.querySelector("header input"),
  btnAdded = document.querySelector(".added"),
  listItem = document.querySelector(".list"),
  results = document.querySelector(".clear p"),
  numItem = document.querySelector(".clear span"),
  ClearAll = document.querySelector(".clear_all");

const itemsArr = JSON.parse(localStorage.getItem("items")) || [];

let isStatus = false;
let tempId;

function showItems() {
  listItem.innerHTML = itemsArr
    .map((item, index) => {
      return `<li>
        <span onclick="editItem(this, ${index})">${item}</span>
        <i class="fa-solid fa-trash-can delete" onclick="deleteItem(${index})"></i>
        </li>`;
    })
    .join("");

  results.innerHTML = `<p>You Having <span>${itemsArr.length}</span> Bending Task</p>`;
  if (itemsArr.length == 0) {
    results.innerText = "you do not have a item here!";
  }
}

showItems();

function deleteItem(itemId) {
  // console.log("delete button clicked");
  itemsArr.splice(itemId, 1);
  localStorage.setItem("items", JSON.stringify(itemsArr));
  showItems();
  if (itemsArr.length == 0) {
    results.innerText = "you do not have a item here!";
  }
}

function editItem(item, id) {
  console.log("edit button clicked");
  console.log(item, id);
  isStatus = true;
  inputFiel.value = item.innerText;
  btnAdded.innerText = "Edit";
  tempId = id;
}

formEl.addEventListener("keyup", (e) => {
  e.preventDefault();

  let userValue = inputFiel.value;
  if (e.key == "Enter") {
    if (userValue != "") {
      if (!isStatus) {
        itemsArr.push(userValue);
      } else {
        itemsArr[tempId] = userValue;
        // console.log(itemsArr, tempId);
        btnAdded.innerText = "+";
        isStatus = false;
      }

      localStorage.setItem("items", JSON.stringify(itemsArr));
      showItems();
    }
    inputFiel.value = "";
  }
});

ClearAll.addEventListener("click", (e) => {
  itemsArr.length = 0;
  localStorage.removeItem("items");
  showItems();
});
