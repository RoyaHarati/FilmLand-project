"use strict";
const formEl = document.querySelector(".form-login");
const userLoginInp = document.querySelector(".user-login");
const passLoginInp = document.querySelector(".pass-login");
const themeBtn = document.querySelector(".theme-btn");
const divError = document.querySelector(".error");

//FormLogin ********************************************
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  divError.innerHTML = "<p>⏳ Loading...</p>";
  try {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: userLoginInp.value,
        password: passLoginInp.value,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (!data.token) {
      alert(`${data?.message}`);
      userLoginInp.value = "";
      passLoginInp.value = "";
      divError.innerHTML = "";
    } else {
      localStorage.setItem("token", `${data?.token}`);
      const user = await fetch("https://fakestoreapi.com/users");
      const nameUse = await user.json();
      nameUse?.map((e)=>{
if(e.username===userLoginInp.value){
      localStorage.setItem("name", `${e?.name?.firstname}`);

}
      })
      const theme = localStorage.getItem("theme");
      if (theme === "light") {
        document.body.classList.add("light-mode");
      } else {
        document.body.classList.remove("light-mode");
      }
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error);
  }
});

window.addEventListener("load", () => {
  userLoginInp.value = "";
  passLoginInp.value = "";
});

window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
});
