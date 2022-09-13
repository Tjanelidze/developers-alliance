const formEl = document.querySelector('.needs-validation');
const tbodyEl = document.querySelector('tbody');
const tableEl = document.querySelector('table');
const gender = document.querySelector('#gender').value;

const firstName = document.getElementById('firstname').value;
const lastName = document.getElementById('lastname').value;
const address = document.getElementById('address').value;
const dateBirth = document.getElementById('dateOfBirth').value;
const note = document.getElementById('notes').value;

const validation = function (event) {
  if (formEl.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  formEl.classList.add('was-validated');
};

const onAddWebsite = function (event) {
  event.preventDefault();

  tbodyEl.innerHTML += `
  <tr>
    <th scope="row">1</th>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>@${address}</td>
    <td>${gender}</td>
    <td>${dateBirth}</td>
    <td class="text-center">
        <button type="button" class="deleteBtn btn btn-danger">Delete</button>
    </td>
  </tr>
  `;
};

const onDeleteRow = (event) => {
  if (!event.target.classList.contains('deleteBtn')) {
    return;
  }

  const btn = event.target;
  btn.closest('tr').remove();
};

formEl.addEventListener('submit', validation);
formEl.addEventListener('submit', onAddWebsite);
tableEl.addEventListener('click', onDeleteRow);
