const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
};

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();
  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSucces(username);
  }
});
