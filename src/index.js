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

let users = [];

// let formall = Array.from(document.querySelectorAll('#main-form input')).reduce(
//   (acc, input) => ({ ...acc, [input.id]: input }),
//   {}
// );

const validation = function (event) {
  if (formEl.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    console.log('false');
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

  tbodyEl.innerHTML = users
    .map((user) => {
      return `<tr>
    <th scope="row">${user.id}</th>
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

  // users.forEach((user) => {
  //   return (tbodyEl.innerHTML += `
  // <tr>
  //   <th scope="row">${user.id}</th>
  //   <td>${user.firstname}</td>
  //   <td>${user.lastname}</td>
  //   <td>${user.address}</td>
  //   <td>${user.gender}</td>
  //   <td>${user.dateBirth}</td>
  //   <td class="text-center">
  //       <button type="button" class="deleteBtn btn btn-danger">Delete</button>
  //   </td>
  // </tr>
  // `);
  // });

  clearForm();
};

const clearForm = () => {
  firstname.value = '';
  lastname.value = '';
  address.value = '';
  gender.value = 'male';
  dateBirth.value = '';
  note.value = '';
  formEl.classList.remove('was-validated');
};

const onDeleteRow = (event) => {
  if (!event.target.classList.contains('deleteBtn')) {
    return;
  }

  const btn = event.target;
  const index = btn.parentNode.parentNode.rowIndex;

  const filtered = users.filter((user) => user.id !== index);
  users = filtered;
  btn.closest('tr').remove();
};

formEl.addEventListener('submit', onAddWebsite);
tableEl.addEventListener('click', onDeleteRow);
