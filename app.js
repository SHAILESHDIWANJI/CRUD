var form = document.querySelector("form");
var submit = document.getElementById("submit");
var update = document.getElementById("update");
var userInfoTable = document.getElementById("userInfoTable");

update.style.display = "none";

let userArray = [];

let initialUserData = getUserData();

if (initialUserData?.length > 0) {
  dataTable(initialUserData);
}

function getUserData() {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
  return [];
}

function uuid() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
function handleCreate(e) {
  e.preventDefault();

  let userObj = {
    FirstName: fname.value,
    LastName: lname.value,
    Email: email.value,
    Contact: contact.value,
    Id: uuid(),
  };
  console.log(userObj.FirstName);
  var first=userObj.FirstName
  var second=userObj.LastName
  var third=userObj.Email
  var fourth=userObj.Contact
  if(first.length||second.length||third.length||fourth.length>0){
      userArray.push(userObj);
      localStorage.setItem("user",JSON.stringify(userArray))
      dataTable(userArray)
  }else{
     console.log("Input the values");
  }
  form.reset()
}

function handleEdit(e) {
  let getId = e.getAttribute("data-id");

  localStorage.setItem("id", getId);
  let getLocalData = getUserData();

  let getLocalObj = getLocalData.find((user) => user.Id === getId);

  fname.value = getLocalObj.FirstName;
  lname.value = getLocalObj.LastName;
  email.value = getLocalObj.Email;
  contact.value = getLocalObj.Contact;
  submit.style.display = "none";
  update.style.display = "block";
}

function handleUpdate() {
  let getId = localStorage.getItem("id");

  let getLocalData = getUserData();

  let getLocalObj = getLocalData.find((user) => user.Id === getId);

  if (getLocalObj) {
    getLocalObj.FirstName = fname.value;
    getLocalObj.LastName = lname.value;
    getLocalObj.Email = email.value;
    getLocalObj.Contact = contact.value;
  }
  localStorage.setItem("user", JSON.stringify(getLocalData));
  form.reset();

  dataTable(getLocalData);

  submit.style.display = "block";
  update.style.display = "none";
}
update.addEventListener("click", handleUpdate);

function handleDelete(e) {
  let getId = e.getAttribute("data-id");
  let getLocalData = getUserData();

  let modifiedData = getLocalData.filter((user) => user.Id !== getId);

  localStorage.setItem("user", JSON.stringify(modifiedData));

  dataTable(modifiedData);

  window.location.reload();
}
function dataTable(e) {
  let result = "";
  e.map((user, i) => {
    result += `<tr>
    <td>${i + 1}</td>
    <td>${user.FirstName}</td>
    <td>${user.LastName}</td>
    <td>${user.Email}</td>
    <td>${user.Contact}</td>
    <td><button onclick="handleEdit(this)" data-id=${
      user.Id
    }>Edit</button></td>
    <td><button onclick="handleDelete(this)" class="btn btn-danger btn-sm" data-id=${
      user.Id
    }>Delete</button></td>
  </tr>`;
  });
  userInfoTable.innerHTML = result;
}

form.addEventListener("submit", handleCreate);
