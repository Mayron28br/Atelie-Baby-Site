var formSignin = document.querySelector('#signin')
var formSignup = document.querySelector('#signup')
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

const form = document.getElementById("signin, signup")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation")
const check = document.getElementById("check")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  alert("CADASTRADO COM SUCESSO")
})

function checkInputEmail(){
  const emailvalue = email.value;

  if(emailvalue === ""){
    errorInput(email, "o email é obrigatório.")
  }
}
