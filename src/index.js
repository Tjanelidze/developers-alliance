const formEl = document.querySelector('.needs-validation');
const tbodyEl = document.querySelector('tbody');
const tableEl = document.querySelector('table');
const button = document.getElementById('submitBtn');
const gender = document.querySelector('#gender');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const address = document.getElementById('address');
const dateBirth = document.getElementById('dateOfBirth');
const note = document.getElementById('notes');

let users = JSON.parse(localStorage.getItem('users')) || [];

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
  });

  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
};

const addUsers = () => {
  tbodyEl.innerHTML = users
    .map((user) => {
      return `<tr>
  <th scope="row" class='rame' id='rame'>${user.id}</th>
  <td>${user.firstname}</td>
  <td>${user.lastname}</td>
  <td>${user.address}</td>
  <td>${user.gender}</td>
  <td>${user.dateBirth}</td>
  <td class="text-center">
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

formEl.addEventListener('submit', onAddWebsite);
tableEl.addEventListener('click', onDeleteRow);
