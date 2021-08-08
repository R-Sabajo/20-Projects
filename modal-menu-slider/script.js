const toggle = document.getElementById('toggle');
const closeModal = document.getElementById('close');
const openModal = document.getElementById('open');
const modal = document.getElementById('modal');
const nav = document.querySelector('#nav');

// Toggle nav
toggle.addEventListener('click', () => nav.classList.toggle('show-nav'));

// Hide nav on outside click
document.addEventListener('click', e => {
  let box = document.getElementById('nav');
  if (e.target != toggle && e.target.parentNode != toggle) {
    box.classList.remove('show-nav');
  }
});

// Show modal
openModal.addEventListener('click', () => modal.classList.add('show-modal'));

//  Hide modal
closeModal.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);

// Hide modal on outside click
window.addEventListener('click', e => {
  e.target == modal ? modal.classList.remove('show-modal') : false;
});
