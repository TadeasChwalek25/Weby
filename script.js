const passwordInput = document.querySelector('input[type="password"]');
const passwordValidationMessage = document.getElementById('password-validation-message');

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const requirements = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password)
  ];

  const valid = requirements.every(req => req);
  passwordValidationMessage.textContent = valid ? 'Heslo splňuje všechny požadavky.' : 'Heslo nesplňuje všechny požadavky.';
  passwordValidationMessage.style.color = valid ? 'green' : 'red';
});