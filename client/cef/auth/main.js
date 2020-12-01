$(document).ready(() => {
  const state = {
    page: 0, //1-auth, 0-reg
  }
  init()

  $('.window > .header .btn').click((e) => {
    $('.window > .header .btn').removeClass('active')
    $(`.window > .header .${e.target.classList[1]}`).addClass('active')
    state.page = e.target.classList[1] == 'auth' ? 0 : 1
    $('.window > .content').css(
      'transform',
      `translate(-${state.page ? 50 : 0}%)`
    )
  })

  function init() {
    $($('.window > .header .btn')[state.page]).addClass('active')
    $('.window > .content').css(
      'transform',
      `translate(-${state.page ? 50 : 0}%)`
    )
  }
})
// чистый js
var state = {
  page: 0, //1-auth, 0-reg
  auth: {
    login: '',
    pass: '',
  },
  reg: {
    login: '',
    pass: '',
    repass: '',
  },
}
let btnreg = document.getElementById("reg");
let btnauth = document.getElementById("auth");
btnreg.addEventListener("click", register);
function register() {
state.reg.login = document.getElementById("reg_login").value
state.reg.pass = document.getElementById("reg_pass").value
state.reg.repass = document.getElementById("reg_repass").value
if(state.reg.login == '' || state.reg.pass == '')
{
  console.log("Не веден логин или пароль")
}
else {


if (state.reg.pass != state.reg.repass)
{
  console.log("Пароль не совпадает.")
}
else {
  let send = {
    login: state.reg.login,
    pass: state.reg.pass,
  }
  alt.emit("register", send)
}
}
}
btnauth.addEventListener("click", auth);
function auth() {
  console.log("код до сюда дошел")
  state.auth.login = document.getElementById("auth_login").value
  state.auth.pass = document.getElementById("auth_pass").value
  console.log("код до сюда дошел2")
  if (state.auth.login == '' || state.auth.pass == '') 
  {
   console.log("Заполните поля данных пожалуйста!")
  }
  else {
    console.log("код до сюда дошел3")
    let send = {
      login: state.auth.login,
      pass: state.auth.pass,
    }
    console.log(send)
    alt.emit("authorization", send)
    console.log("конец функции")
  }
}