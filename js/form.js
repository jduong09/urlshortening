document.addEventListener('DOMContentLoaded', () => {
  const inputUrl = document.getElementById('input-url');
  const inputSubmit = document.getElementById('input-submit');
  const inputError = document.getElementById('input-error-message');

  inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    if (!inputUrl.value) {
      inputUrl.classList.add('nonfilled');
      inputError.classList.remove('hide');
    } else {
      inputUrl.classList.remove('nonfilled');
      inputError.classList.add('hide');
    }
  });
});