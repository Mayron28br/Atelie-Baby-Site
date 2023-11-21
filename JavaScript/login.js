var formSignin = document.querySelector('#signin-form')
var formSignup = document.querySelector('#signup-form')
var btnColor = document.querySelector('.btnColor')
var container = document.querySelector(' .container')

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    formSignin.style.left = "25px"
    formSignup.style.left = "450px"
    btnColor.style.left = "0px"
    container.style.height = "450px"
})

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    formSignin.style.left = "-450px"
    formSignup.style.left = "25px"
    btnColor.style.left = "114px"
    container.style.height = "550px"
})

const validations = {
  validateEmail: (email, errorId) => {
      const emailValue = email.value;
      const errorElement = document.getElementById(errorId);

      if (!emailValue || !emailValue.includes("@")) {
          errorElement.innerText = "Email inválido.";
          errorElement.style.visibility = "visible";
          return false;
      } else {
          errorElement.style.visibility = "hidden";
          return true;
      }
  },

  validatePassword: (password, errorId) => {
      const passwordValue = password.value;
      const errorElement = document.getElementById(errorId);

      if (!passwordValue || passwordValue.length < 6) {
          errorElement.innerText = "A senha deve ter no mínimo 6 caracteres.";
          errorElement.style.visibility = "visible";
          return false;
      } else {
          errorElement.style.visibility = "hidden";
          return true;
      }
  },

  validatePasswordConfirmation: (password, confirm, errorId) => {
      const passwordValue = password.value;
      const confirmValue = confirm.value;
      const errorElement = document.getElementById(errorId);

      if (passwordValue !== confirmValue) {
          errorElement.innerText = "As senhas não são iguais.";
          errorElement.style.visibility = "visible";
          return false;
      } else {
          errorElement.style.visibility = "hidden";
          return true;
      }
  }
};

document.getElementById("signin-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const emailSignin = document.getElementById("email-signin");
  const passwordSignin = document.getElementById("password-signin");
  const emailError = "email-signin-error";
  const passwordError = "password-signin-error";

  if (emailSignin && passwordSignin) {
      const emailSigninValid = validations.validateEmail(emailSignin, emailError);
      const passwordSigninValid = validations.validatePassword(passwordSignin, passwordError);

      if (emailSigninValid && passwordSigninValid) {
          alert("Login realizado com sucesso!");
      } else {
          alert("Por favor, preencha os campos corretamente.");
      }
  } else {
      alert("Elementos não encontrados!");
  }
});

// ... (seu código atual) ...

function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
  
    if (existingUser) {
      alert('Este email já está registrado.');
      return;
    }
  
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    // Redirecionar para a página de clientes após o registro
    window.location.href = 'clientes.html';
  }
  
  // ... (seu código atual) ...
  