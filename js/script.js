"use strict";
const menuEl = document.querySelector(".Ham-menu");
const hamburgerBtn = document.querySelector(".hamburger");
const divSlideEl = document.querySelectorAll(".slide");
const sectionSlide = document.querySelector(".section-Slide");
const prevBtn = document.querySelector(".leftSlide");
const nextBtn = document.querySelector(".rightSlide");
const featuredSection = document.querySelector(".featured-section");
const featuredCards = document.querySelector(".featured-Cards");
const featuredBx = document.querySelectorAll(".featuredbx");
const popularSection = document.querySelector(".popular-section");
const popularBx = document.querySelectorAll(".popularbx");
const popularCards = document.querySelector(".popular-Cards");
const searchFormEl = document.querySelector(".search-form");
const searchInputEl = document.querySelector(".search-input");
const searchSection = document.querySelector(".search-section");
const Title = document.querySelector(".Title");
const SearchContent = document.querySelector(".Search-content");
const themeBtn = document.querySelector(".theme-btn");
const loginBtn = document.querySelector(".login-btn");
const userName = document.querySelector(".user-name");
const popUpSection = document.querySelector(".popUp-section");
const closePopUpBtn = document.querySelector(".close-popUp");
const signinBtn = document.querySelector(".signin-popUp");
const continueBtn = document.querySelector(".continue-popUp");
const titlePopUp = document.querySelector(".title-popUp");
const textPopUp = document.querySelector(".text-popUp");
const text2PopUp = document.querySelector(".text2-popUp");
const detailPopup = document.querySelector(".detail-popup");

let currentIndex = 0;

// منو همبرگری ********************************************
hamburgerBtn.addEventListener("click", () => {
  if (menuEl.classList.contains("active")) {
    menuEl.classList.remove("active");
  } else {
    menuEl.classList.add("active");
  }
});
window.addEventListener("click", (e) => {
  if (!e.target.closest(".hamburger") && !e.target.closest(".menu")) {
    menuEl.classList.remove("active");
  }
});

//  اسلایدر *****************************************************

setInterval(() => {
  divSlideEl[currentIndex].classList.remove("show");
  currentIndex++;

  if (currentIndex === divSlideEl.length) {
    currentIndex = 0;
  }
  divSlideEl[currentIndex].classList.add("show");
}, 3000);

nextBtn.addEventListener("click", () => {
  divSlideEl[currentIndex].classList.remove("show");
  currentIndex++;

  if (currentIndex === divSlideEl.length) {
    currentIndex = 0;
  }
  divSlideEl[currentIndex].classList.add("show");
});

prevBtn.addEventListener("click", () => {
  divSlideEl[currentIndex].classList.remove("show");
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = divSlideEl.length - 1;
  }
  divSlideEl[currentIndex].classList.add("show");
});

//  featuredCards ********************************************

let allCards = [];
let visible = 5;

const showCards = () => {
  allCards.forEach((card) => card.classList.remove("show"));

  const start = currentIndex;
  const end = start + visible;
  allCards.forEach((card, index) => {
    if (index >= start && index < end) {
      card.classList.add("show");
    }
  });
};
// fetch FeaturedCards *********
(async () => {
  try {
    featuredCards.innerHTML = "<p>⏳ Loading...</p>";
    const res = await fetch(
      "https://www.omdbapi.com/?type=movie&s=2025&apikey=91520410",
    );
    const data = await res.json();
    if (data.Search && data.Search.length > 0) {
      featuredCards.innerHTML = "";
      data?.Search?.map((mo) => {
        featuredCards.innerHTML += `<div class="card">
         <img src="${mo?.Poster}" onerror="this.src='assets/media/photo/MV5BZGIzMGE3YjgtNjA1Ny00YzBjLTg5ZDMtMjU0YjA3ZDBlYTUyXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg'">
          <div class="card-info">
            <h3>${mo.Title}</h3>
            <p>📅 ${mo.Year}</p>
          </div>
      </div>`;
      });
      allCards = document.querySelectorAll(".featured-Cards .card");
      showCards();
    }

  } catch (error) {
    console.log(error);
    featuredCards.innerHTML = "<p> Error loading movies</p>";
  }
})();
// bottoms FeaturedCards
featuredBx[1].addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > allCards.length - visible) currentIndex = 0;
  showCards();
});

featuredBx[0].addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = allCards.length - visible;
  showCards();
});

//  popularCards ********************************************
let popCurrentIndex = 0;
let allPopCards = [];
let visiblePop = 5;

const showPopCards = () => {
  allPopCards.forEach((card) => card.classList.remove("show"));

  const start = popCurrentIndex;
  const end = start + visiblePop;
  allPopCards.forEach((card, index) => {
    if (index >= start && index < end) {
      card.classList.add("show");
    }
  });
};
// fetch popularCards *********
(async () => {
  try {
    popularCards.innerHTML = "<p>⏳ Loading...</p>";
    const res = await fetch(
      "https://www.omdbapi.com/?type=movie&s=action&apikey=91520410",
    );
    const data = await res.json();

    if (data.Search && data.Search.length > 0) {
      popularCards.innerHTML = "";
      data?.Search?.map((mo) => {
        popularCards.innerHTML += `<div class="card">
         <img src="${mo?.Poster}" onerror="this.src='assets/media/photo/MV5BZGIzMGE3YjgtNjA1Ny00YzBjLTg5ZDMtMjU0YjA3ZDBlYTUyXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg'">
          <div class="card-info">
            <h3>${mo.Title}</h3>
            <p>📅 ${mo.Year}</p>
          </div>
      </div>`;
      });
      allPopCards = document.querySelectorAll(".popular-Cards .card");
      showPopCards();
    }
  } catch (error) {
    console.log(error);
    popularCards.innerHTML = "<p> Error loading movies </p>";
  }
})();
// bottoms FeaturedCards
popularBx[1].addEventListener("click", () => {
  popCurrentIndex++;
  if (popCurrentIndex > allPopCards.length - visiblePop) popCurrentIndex = 0;
  showPopCards();
});

popularBx[0].addEventListener("click", () => {
  popCurrentIndex--;
  if (popCurrentIndex < 0) popCurrentIndex = allPopCards.length - visiblePop;
  showPopCards();
});

//Search ********************************************
searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  SearchContent.innerHTML = "<p>⏳ Loading...</p>";

  Title.textContent = `⭐Search  "${searchInputEl.value}"`;
  featuredSection.classList.remove("activeSection");
  sectionSlide.classList.remove("activeSection");
  popularSection.classList.remove("activeSection");
  searchSection.classList.add("activeSection");

  (async () => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=91520410&s=${searchInputEl.value}`,
      );
      const data = await res.json();
      if (data.Response === "True") {
        SearchContent.innerHTML = "";

        data?.Search?.map((pr) => {
          SearchContent.innerHTML += `   <div class="search-card">
          <img src="${pr.Poster}" onerror="this.src='assets/media/photo/filmland.svg'">
          <div class="search-info">
            <h2>${pr.Title}</h2>
            <p>${pr.Year} · ${pr.Type}</p>
          </div>
        </div>`;
        });
      } else {
        Title.textContent = "Film Not found";
        SearchContent.innerHTML = "";
      }
    } catch (error) {
      console.log(error);
    }

    searchInputEl.value = "";
  })();
});

//Dark/Light ********************************************

themeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light-mode")) {
    document.body.classList.remove("light-mode");
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("light-mode");
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
});
window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    document.body.classList.add("light-mode");
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }
});

//Logout/Login **********************************************

window.addEventListener("load", () => {
  const loginName = localStorage.getItem("name");

  if (loginName) {
    const upperName = loginName[0].toUpperCase() + loginName.slice(1);
    userName.textContent = "Dear" + " " + upperName;
    loginBtn.textContent = "Logout";

    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");

      loginBtn.textContent = "Login";
      userName.textContent = "";
      window.location.reload();
    });
  } else {
    userName.textContent = "";
    loginBtn.textContent = "Login";
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  //popUp **********************************************

  setTimeout(() => {
    popUpSection.classList.add("activePop");
    document.body.style.overflow = "hidden";
    const token = localStorage.getItem("token");

    if (!token) {
      titlePopUp.textContent = "🎬 Welcome to FilmLand!";
      textPopUp.textContent = "We're glad you're here";
      text2PopUp.textContent =
        "Sign in to explore movies and save your favorites!";
      signinBtn.textContent = "SignIn";
      continueBtn.textContent = "Continue as Guest";
      signinBtn.addEventListener("click", () => {
        window.location.href = "login.html";
      });
      continueBtn.addEventListener("click", () => {
        popUpSection.classList.remove("activePop");
      });
    } else {
      titlePopUp.textContent = `🎬 Welcome back, ${localStorage.getItem("name")[0].toUpperCase() + localStorage.getItem("name").slice(1)}!`;
      textPopUp.textContent = "Great to see you again.";
      text2PopUp.textContent = "Check out what's trending today! 🔥";
      signinBtn.textContent = "See What's New";
      continueBtn.textContent = "Maybe Later";
      signinBtn.addEventListener("click", () => {
        popularSection.scrollIntoView({ behavior: "smooth" });
        popUpSection.classList.remove("activePop");
      });
      continueBtn.addEventListener("click", () => {
        popUpSection.classList.remove("activePop");
      });
    }
  }, 3000);
});

//popUp **********************************************
closePopUpBtn.addEventListener("click", () => {
  popUpSection.classList.remove("activePop");
});

window.addEventListener("click", (e) => {
  if (!e.target.closest(".popUp-section"))
    popUpSection.classList.remove("activePop");
  document.body.style.overflow = "";
});
