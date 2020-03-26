const form = document.querySelector("#form");
const nameInput = form.querySelector("#userName");
const emailInput = form.querySelector("#userEmail");
const passwordInput = form.querySelector("#userPassword");
const password2Input = form.querySelector("#userPassword2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
}

function validateEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(input.value.trim()).toLowerCase())) {
    showError(input, "Email is not valid");
  } else {
    showSuccess(input);
  }
}

function chekLengthField(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.dataset.name} must be at least ${min} charters`);
  } else if (input.value.length > max) {
    showError(input, `${input.dataset.name} must be less than ${max} charters`);
  } else {
    showSuccess(input);
  }
}

function chekRequired(arrayInput) {
  arrayInput.forEach(element => {
    if (element.value.trim() === "") {
      showError(element, `${element.dataset.name} field is required`);
    } else {
      showSuccess(element);
    }
  });
}
function chekPasswordMusch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not mutch");
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  chekRequired([nameInput, emailInput, passwordInput, password2Input]);
  chekLengthField(nameInput, 3, 10);
  chekLengthField(passwordInput, 6, 15);
  validateEmail(emailInput);
  chekPasswordMusch(passwordInput, password2Input);
});
