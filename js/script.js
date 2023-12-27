const form = document.querySelector("[data-form]");

const inputs = document.querySelectorAll("[required]");
const validityError = document.querySelectorAll(".validity__error");

const formLocalStorage = JSON.parse(localStorage.getItem("data")) || [];

function updateStorage() {
  localStorage.setItem("data", JSON.stringify(formLocalStorage));
}

inputs.forEach((input, index) => {
  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    validate(input, index);
  });
});

form.addEventListener("submit", (e) => {
  const formRes = {
    firstName: e.target.elements["first__name"].value,
    lastName: e.target.elements["last__name"].value,
    email: e.target.elements["email"].value,
    password: e.target.elements["password"].value,
  };

  if (!form.checkValidity()) {
    e.preventDefault();
    validate();
  } else {
    inputs.forEach((input) => {
      input.value = "";
    });
    e.preventDefault();
  }

  formLocalStorage.push(formRes);
  updateStorage();
});

function validate(input, index) {
  const validity = input.validity;
  const errorElement = validityError[index];

  if (validity.valueMissing) {
    input.setCustomValidity(`${input.name} cannot be empty`);
    errorElement.textContent = `${input.name} cannot be empty`;
    input.style.border = "2px solid hsl(0, 100%, 74%)";
    input.style.backgroundImage = "url(../images/icon-error.svg)";
    input.style.backgroundRepeat = "no-repeat";
    input.style.backgroundPosition = "right 5% bottom 50%";
    input.style.color = "hsl(0, 100%, 74%)";
  } else if (validity.typeMismatch) {
    input.setCustomValidity("Looks like this is not an email");
    errorElement.textContent = "Looks like this is not an email";
    input.style.border = "2px solid hsl(0, 100%, 74%)";
    input.style.backgroundImage = "url(../images/icon-error.svg)";
    input.style.backgroundRepeat = "no-repeat";
    input.style.backgroundPosition = "right 5% bottom 50%";
    input.style.color = "hsl(0, 100%, 74%)";
  } else {
    input.setCustomValidity("");
    errorElement.textContent = "";
    input.style.border = "";
    input.style.backgroundImage = "";
    input.style.backgroundRepeat = "";
    input.style.backgroundPosition = "";
    input.style.color = "hsl(249, 10%, 26%)";
  }
}
