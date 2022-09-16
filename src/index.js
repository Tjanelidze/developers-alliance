const formEl = document.querySelector('.needs-validation');
const tbodyEl = document.querySelector('tbody');
const tableEl = document.querySelector('table');
const button = document.getElementById('submitBtn');
const gender = document.querySelector('#gender');
const tableBody = document.querySelector('table').querySelector('tbody');
const modal = document.getElementById('modal');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const address = document.getElementById('address');
const dateBirth = document.getElementById('dateOfBirth');
const note = document.getElementById('notes');
const usertxt = document.getElementById('userTxt');
const closeBtn = document.getElementById('closeBtn');
const modalWindowOverlay = document.getElementById('modal-overlay');

let users = JSON.parse(localStorage.getItem('users')) || [];

let popUpIsActive = false;

const validation = function (event) {
  if (formEl.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  formEl.classList.add('was-validated');
};

const onAddWebsite = function (event) {
  validation(event);
  if (!formEl.checkValidity()) return;
  event.preventDefault();

  let id = 0;

  if (users.length === 0) {
    id = 1;
  } else {
    id = users[users.length - 1].id + 1;
  }

  users.push({
    id: id,
    firstname: firstname.value,
    lastname: lastname.value,
    address: address.value,
    gender: gender.value,
    dateBirth: dateBirth.value,
    note: note.value,
  });

  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
};

const addUsers = () => {
  tbodyEl.innerHTML = users
    .map((user) => {
      return `<tr>
  <td scope="row" class='rame' id='rame'>${user.id}</td>
  <td>${user.firstname}</td>
  <td>${user.lastname}</td>
  <td>${user.address}</td>
  <td>${user.gender}</td>
  <td>${user.dateBirth}</td>
  <td class="donotclick text-center" id='btn'>
  <button type="button" class="deleteBtn btn btn-danger">Delete</button>
  </td>
  </tr>`;
    })
    .join('');
};

const onDeleteRow = (event) => {
  if (!event.target.classList.contains('deleteBtn')) {
    return;
  }

  const btn = event.target;
  const index = btn.closest('tr').children.item(0).innerHTML;

  const filtered = users.filter((user) => user.id !== parseInt(index));
  users = filtered;
  localStorage.setItem('users', JSON.stringify(users));
  btn.closest('tr').remove();
};

if (users.length > 0) {
  addUsers();
}

const hideModalWindow = () => {
  modalWindowOverlay.style.display = 'none';
};

const onPopUpNotes = (e) => {
  const userId = e.target.closest('tr').children.item(0).innerHTML;
  const userNote = users.filter((el) => el.id === +userId);

  if (
    e.target.closest('tr') &&
    !e.target.classList.contains('donotclick') &&
    !e.target.classList.contains('btn')
  ) {
    modalWindowOverlay.style.display = 'flex';
    notePopUp(userNote[0].note);
  }
};

const notePopUp = (note) => {
  return (usertxt.innerHTML = `${note || ''}`);
};

closeBtn.addEventListener('click', hideModalWindow);
formEl.addEventListener('submit', onAddWebsite);
tableEl.addEventListener('click', onDeleteRow);
tableBody.addEventListener('click', onPopUpNotes);
