const formEl = document.querySelector('.needs-validation');
const tbodyEl = document.querySelector('tbody');

const validation = function (event) {
  if (formEl.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  formEl.classList.add('was-validated');
};

const onAddWebsite = function (event) {
  event.preventDefault();

  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const address = document.getElementById('address').value;
  const gender = document.getElementById('gender').value;
  const dateBirth = document.getElementById('dateOfBirth').value;
  tbodyEl.innerHTML += `
  <tr>
    <th scope="row">1</th>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>@${address}</td>
    <td>${gender}</td>
    <td>${dateBirth}</td>
    <td class="text-center">
        <button type="button" class="btn btn-danger">Delete</button>
    </td>
  </tr>
  `;
};

formEl.addEventListener('submit', validation);
formEl.addEventListener('submit', onAddWebsite);
