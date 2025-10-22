const userData = {
  name: "Qurbonaliyev Nurulloh",
  email: "nurulloh1023@gmail.com",
  phone: "+998 91 740 74 67",
  links: {
    telegram: "https://t.me/Nurulloh_023",
    instagram: "https://www.instagram.com/nurulloh_23_?igsh=aWhnNGtvM3kyazZi",
    facebook: "https://www.facebook.com/criminal0717",
    twitter: "https://x.com/Nurulloh023",
  },
};

const translations = {
  uz: {
    title: "Frontend Dasturchi",
    portfolio: "Portfolio",
    theme: "Tema",
    telegram: "Telegram",
    instagram: "Instagram",
    facebook: "Facebook",
    twitter: "Twitter",
    location: "Oʻzbekiston",
    portfolioAlert: "Sizga ruhsat yoʻq! ❌",
  },
  ru: {
    title: "Frontend Разработчик",
    portfolio: "Портфолио",
    theme: "Тема",
    telegram: "Телеграм",
    instagram: "Инстаграм",
    facebook: "Фейсбук",
    twitter: "Твиттер",
    location: "Узбекистан",
    portfolioAlert: "У вас нет доступа! ❌",
  },
  en: {
    title: "Frontend Developer",
    portfolio: "Portfolio",
    theme: "Theme",
    telegram: "Telegram",
    instagram: "Instagram",
    facebook: "Facebook",
    twitter: "Twitter",
    location: "Uzbekistan",
    portfolioAlert: "You don't have permission! ❌",
  },
};

let currentLanguage = "uz";

function showPortfolioAlert() {
  alert(translations[currentLanguage].portfolioAlert);
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const themeBtn = document.querySelector(".theme-btn");
  const icon = themeBtn.querySelector("i");

  if (document.body.classList.contains("dark-theme")) {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
  updateLanguage(currentLanguage);
}

function changeLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  updateLanguage(lang);
}

function updateLanguage(lang) {
  const t = translations[lang];
  document.querySelector(".title-text").textContent = t.title;
  document.querySelector(".portfolio-text").textContent = t.portfolio;
  document.querySelector(".theme-text").textContent = t.theme;
  document.querySelector(".telegram-text").textContent = t.telegram;
  document.querySelector(".instagram-text").textContent = t.instagram;
  document.querySelector(".facebook-text").textContent = t.facebook;
  document.querySelector(".twitter-text").textContent = t.twitter;
  document.querySelector(".location-text").textContent = t.location;
  document.title = `Qurbonaliyev Nurulloh - ${t.title}`;
}

document.querySelector(".name").textContent = userData.name;
document.querySelector(".email-text").textContent = userData.email;
document.querySelector(".phone-text").textContent = userData.phone;

document.querySelector(".telegram").href = userData.links.telegram;
document.querySelector(".instagram").href = userData.links.instagram;
document.querySelector(".facebook").href = userData.links.facebook;
document.querySelector(".twitter").href = userData.links.twitter;

updateLanguage(currentLanguage);
