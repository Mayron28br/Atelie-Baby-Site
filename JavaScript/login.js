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

// Login/Registro

document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");
  
    // Função para mostrar uma mensagem de sucesso
    const showSuccessMessage = (message) => {
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = message;
      document.body.appendChild(successMessage);
  
      // Adiciona estilo para centralizar e arredondar a mensagem
      successMessage.style.position = "fixed";
      successMessage.style.top = "50%";
      successMessage.style.left = "50%";
      successMessage.style.transform = "translate(-50%, -50%)";
      successMessage.style.backgroundColor = "#4CAF50";
      successMessage.style.color = "white";
      successMessage.style.padding = "20px";
      successMessage.style.zIndex = "1";
      successMessage.style.borderRadius = "50px"; // Adiciona bordas arredondadas
  
      // Remover a mensagem após alguns segundos
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
    };
  
    // Função para exibir mensagens de erro
    const displayErrorMessage = (elementId, message) => {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.style.visibility = "visible";
    };
  
    // Função para limpar mensagens de erro
    const clearErrorMessages = () => {
      const errorMessages = document.querySelectorAll(".error-message");
      errorMessages.forEach((element) => {
        element.textContent = "";
        element.style.visibility = "hidden";
      });
    };
  
    // Função para verificar se o email já está registrado
    const isEmailRegistered = (email) => {
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      return users.some((user) => user.email === email);
    };
  
    // Função para realizar o registro do usuário
    const registerUser = (email, password) => {
      if (isEmailRegistered(email)) {
        displayErrorMessage("email-signup-error", "Este email já está registrado.");
        return;
      }
  
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      users.push({ email, password });
      localStorage.setItem("registeredUsers", JSON.stringify(users));
  
      document.getElementById("email-signup").value = "";
      document.getElementById("password-signup").value = "";
      document.getElementById("password-confirmation-signup").value = "";
  
      showSuccessMessage("Registro bem-sucedido! Você será redirecionado para a página de login.");
  
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    };
  
    // Adiciona um ouvinte de eventos para o envio do formulário de registro
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email-signup").value;
      const password = document.getElementById("password-signup").value;
      const passwordConfirmation = document.getElementById("password-confirmation-signup").value;
  
      if (password !== passwordConfirmation) {
        displayErrorMessage("password-confirmation-signup-error", "As senhas não coincidem. Tente novamente.");
        return;
      }
  
      registerUser(email, password);
    });
  
    // Adiciona um ouvinte de eventos para o envio do formulário de login
    signinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email-signin").value;
      const password = document.getElementById("password-signin").value;
  
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  
      const user = users.find((user) => user.email === email && user.password === password);
  
      if (user) {
        showSuccessMessage("Login bem-sucedido! Você será redirecionado para a página inicial.");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      } else {
        displayErrorMessage("email-signin-error", "Credenciais inválidas. Tente novamente.");
      }
    });
  });
  