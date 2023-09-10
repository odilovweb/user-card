const form = document.querySelector("#form");
const body = document.querySelector("body");
const sumbitBtn = document.querySelector("#submitBtn");
const gmailInp = document.querySelector("#gmail-inp");
const nameInp = document.querySelector("#name-inp");
const phoneInp = document.querySelector("#phone-inp");
const imageInp = document.querySelector("#image-inp");
const age = document.querySelector("#age-inp");
const users = document.querySelector("#users");

// sumbitBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("salom");
//   form.reset();
// });
// localStorage.setItem("users", JSON.stringify([]));
let usersLoc = JSON.parse(localStorage.getItem("users"));
let usersLists = usersLoc ? usersLoc : [];
function pushValues() {
  usersLists.push({
    gmail: gmailInp.value,
    name: nameInp.value,
    phone: phoneInp.value,
    image: imageInp.value,
    age: age.value,
  });
}

function pushLocal() {
  localStorage.setItem("users", JSON.stringify(usersLists));
}
function pushHTMl(num) {
  users.innerHTML += `
    <li class="card users-card" style="width: 18rem;">
    <img src="${usersLists[num].image}" class="card-img-top user-img" alt="User logo image">
    <div class="card-body">
      <h5 class="card-title">Name: ${usersLists[num].name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Phone: ${usersLists[num].phone}</li>
      <li class="list-group-item">Gmail:${usersLists[num].gmail} </li>
      <li class="list-group-item">Age: ${usersLists[num].age}</li>
    </ul>
    <div class="card-body">
    <button class="btn btn-primary delete-btn" id="delete-btn">Delete</button>
    </div>
  </li>
    `;
}

if (usersLists) {
  for (let n = 0; n < usersLists.length; n++) {
    pushHTMl(n);
  }
}
const deleteBtn = document.querySelectorAll("#delete-btn");
let usersListNew = [];
deleteBtn.forEach((e, i) => {
  e.addEventListener("click", () => {
    usersListNew = usersLoc.filter((e, index) => {
      return index != i;
    });
    localStorage.removeItem("users");

    usersLists = [...usersListNew];
    localStorage.setItem("users", JSON.stringify(usersListNew));
    console.log(usersListNew);
    window.location.reload();
  });
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(usersLists);
  pushValues();
  pushLocal();
  if (!usersLoc) {
    pushHTMl(0);
  } else {
    pushHTMl(usersLoc.length - 1);
  }
  document.querySelector("#form").reset();
  window.location.reload();
});
