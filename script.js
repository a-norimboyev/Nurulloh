const userData = {
  name: "Qurbonaliyev Nurulloh",
  email: "nurulloh1023@gmail.com",
  phone: "+998 91 740 74 67",
  links: {
    telegram: "https://t.me/Nurulloh_023",
    instagram: "https://www.instagram.com/nurulloh_23_?igsh=aWhnNGtvM3kyazZi",
    facebook: "https://www.facebook.com/criminal0717",
    twitter: "https://x.com/Nurulloh023",
    github: "https://github.com/nurulloh1023",
    linkedin: "https://linkedin.com/in/nurulloh",
  },
};

const translations = {
  uz: {
    title: "Suniy Intellekt Dasturchisi",
    portfolio: "Portfolio",
    theme: "Tema",
    telegram: "Telegram",
    instagram: "Instagram",
    facebook: "Facebook",
    twitter: "Twitter",
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "Oʻzbekiston",
    portfolioAlert: "Sizga ruhsat yoʻq! ❌",
    aboutTitle: "Men haqimda",
    aboutText:
      "Salom! Men Nurulloh — suniy intellekt dasturchisi. Machine Learning, Deep Learning va AI texnologiyalari bilan ishlashga qiziqaman. Python, TensorFlow, PyTorch va NLP sohasida tajribaga egaman. Kelajak texnologiyalarini yaratishga tayyor!",
    skillsTitle: "Ko'nikmalar",
    projectsTitle: "Loyihalarim",
    projectDesc1: "NLP asosida ishlaydigan aqlli chatbot. Foydalanuvchi savollariga javob beradi.",
    projectDesc2: "Computer Vision yordamida rasmlarni tahlil qilish va tanib olish tizimi.",
    projectDesc3: "Machine Learning yordamida mahsulot narxlarini bashorat qilish modeli.",
    certsTitle: "Sertifikatlar",
    contactFormTitle: "Xabar yuborish",
    contactBtn: "Xabar yuborish",
    submitBtn: "Yuborish",
    formSuccess: "Xabaringiz yuborildi! ✅",
    footer: "© 2026 Nurulloh Qurbonaliyev. Barcha huquqlar himoyalangan.",
  },
  ru: {
    title: "Разработчик Искусственного Интеллекта",
    portfolio: "Портфолио",
    theme: "Тема",
    telegram: "Телеграм",
    instagram: "Инстаграм",
    facebook: "Фейсбук",
    twitter: "Твиттер",
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "Узбекистан",
    portfolioAlert: "У вас нет доступа! ❌",
    aboutTitle: "Обо мне",
    aboutText:
      "Привет! Я Нуруллох — разработчик искусственного интеллекта. Работаю с Machine Learning, Deep Learning и AI технологиями. Имею опыт работы с Python, TensorFlow, PyTorch и NLP. Готов создавать технологии будущего!",
    skillsTitle: "Навыки",
    projectsTitle: "Мои проекты",
    projectDesc1: "Умный чатбот на основе NLP. Отвечает на вопросы пользователей.",
    projectDesc2: "Система анализа и распознавания изображений с помощью Computer Vision.",
    projectDesc3: "Модель прогнозирования цен товаров с помощью Machine Learning.",
    certsTitle: "Сертификаты",
    contactFormTitle: "Отправить сообщение",
    contactBtn: "Написать",
    submitBtn: "Отправить",
    formSuccess: "Сообщение отправлено! ✅",
    footer: "© 2026 Нуруллох Курбоналиев. Все права защищены.",
  },
  en: {
    title: "AI Developer",
    portfolio: "Portfolio",
    theme: "Theme",
    telegram: "Telegram",
    instagram: "Instagram",
    facebook: "Facebook",
    twitter: "Twitter",
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "Uzbekistan",
    portfolioAlert: "You don't have permission! ❌",
    aboutTitle: "About me",
    aboutText:
      "Hello! I'm Nurulloh — an AI developer. I work with Machine Learning, Deep Learning and AI technologies. I have experience with Python, TensorFlow, PyTorch and NLP. Ready to build the technologies of the future!",
    skillsTitle: "Skills",
    projectsTitle: "My Projects",
    projectDesc1: "Smart chatbot powered by NLP. Answers user questions intelligently.",
    projectDesc2: "Image analysis and recognition system using Computer Vision.",
    projectDesc3: "Product price prediction model using Machine Learning.",
    certsTitle: "Certificates",
    contactFormTitle: "Send a message",
    contactBtn: "Send message",
    submitBtn: "Submit",
    formSuccess: "Message sent successfully! ✅",
    footer: "© 2026 Nurulloh Qurbonaliyev. All rights reserved.",
  },
};

let currentLanguage = "uz";
let typingInterval = null;

// ===== ACCORDION =====
function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const isOpen = content.classList.contains("open");

  // Ochilgan/yopilgan holat
  header.classList.toggle("active");
  content.classList.toggle("open");
}

function showPortfolioAlert() {
  alert(translations[currentLanguage].portfolioAlert);
}

// ===== TYPING EFFEKT =====
function typeText(element, text, speed = 80) {
  if (typingInterval) clearInterval(typingInterval);
  element.textContent = "";
  let i = 0;
  typingInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null;
    }
  }, speed);
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

  // Typing effekt bilan title yangilash
  const titleText = document.querySelector(".title-text");
  typeText(titleText, t.title);

  document.querySelector(".portfolio-text").textContent = t.portfolio;
  document.querySelector(".theme-text").textContent = t.theme;
  document.querySelector(".telegram-text").textContent = t.telegram;
  document.querySelector(".instagram-text").textContent = t.instagram;
  document.querySelector(".facebook-text").textContent = t.facebook;
  document.querySelector(".twitter-text").textContent = t.twitter;
  document.querySelector(".github-text").textContent = t.github;
  document.querySelector(".linkedin-text").textContent = t.linkedin;
  document.querySelector(".location-text").textContent = t.location;

  // Bo'limlar
  document.querySelector(".about-title-text").textContent = t.aboutTitle;
  document.querySelector(".about-text").textContent = t.aboutText;
  document.querySelector(".skills-title-text").textContent = t.skillsTitle;
  document.querySelector(".projects-title-text").textContent = t.projectsTitle;
  document.querySelector(".project-desc-1").textContent = t.projectDesc1;
  document.querySelector(".project-desc-2").textContent = t.projectDesc2;
  document.querySelector(".project-desc-3").textContent = t.projectDesc3;
  document.querySelector(".certs-title-text").textContent = t.certsTitle;
  document.querySelector(".contact-form-title").textContent = t.contactFormTitle;
  document.querySelector(".contact-btn-text").textContent = t.contactBtn;
  document.querySelector(".form-submit-text").textContent = t.submitBtn;
  document.querySelector(".footer-text").textContent = t.footer;

  document.title = `Qurbonaliyev Nurulloh - ${t.title}`;
}

// ===== ALOQA FORMASI =====
function openContactModal() {
  document.getElementById("contactModal").classList.add("active");
}

function closeContactModal() {
  document.getElementById("contactModal").classList.remove("active");
}

function submitContactForm(e) {
  e.preventDefault();
  const name = document.getElementById("formName").value;
  const email = document.getElementById("formEmail").value;
  const message = document.getElementById("formMessage").value;

  alert(translations[currentLanguage].formSuccess);
  document.getElementById("contactForm").reset();
  closeContactModal();
}

// Modal tashqarisiga bosganda yopish
document.getElementById("contactModal").addEventListener("click", function (e) {
  if (e.target === this) closeContactModal();
});

// ===== SCROLL ANIMATSIYA =====
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".scroll-animate").forEach((el) => {
  scrollObserver.observe(el);
});

// ===== UCHUVCHI YULDUZLAR EFFEKTI =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = [];
const shootingStars = [];
const starCount = 200;

// Oddiy yulduzlar (miltillovchi)
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 4 + 1.5;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.twinkleSpeed = Math.random() * 0.03 + 0.005;
    this.twinkleDir = 1;
  }

  update() {
    // Miltillash effekti
    this.opacity += this.twinkleSpeed * this.twinkleDir;
    if (this.opacity >= 1) {
      this.twinkleDir = -1;
    } else if (this.opacity <= 0.1) {
      this.twinkleDir = 1;
    }
  }

  draw() {
    // Yulduz shaklida chizish (5 burchakli yulduzcha)
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    const spikes = 5;
    const outerRadius = this.radius * 2;
    const innerRadius = this.radius * 0.8;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / spikes) * i - Math.PI / 2;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowBlur = this.radius * 8;
    ctx.shadowColor = `rgba(200, 220, 255, ${this.opacity})`;
    ctx.fill();
    ctx.restore();
  }
}

// Uchuvchi yulduzlar (shooting stars)
class ShootingStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width * 1.5;
    this.y = -10;
    this.length = Math.random() * 80 + 40;
    this.speed = Math.random() * 8 + 4;
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
    this.opacity = 1;
    this.fadeSpeed = Math.random() * 0.015 + 0.005;
    this.active = true;
    this.thickness = Math.random() * 1.5 + 0.5;
  }

  update() {
    this.x -= Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= this.fadeSpeed;

    if (this.opacity <= 0 || this.y > canvas.height || this.x < -100) {
      this.active = false;
    }
  }

  draw() {
    if (!this.active) return;

    const tailX = this.x + Math.cos(this.angle) * this.length;
    const tailY = this.y - Math.sin(this.angle) * this.length;

    const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
    gradient.addColorStop(0.3, `rgba(0, 210, 255, ${this.opacity * 0.6})`);
    gradient.addColorStop(1, `rgba(0, 210, 255, 0)`);

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.thickness;
    ctx.lineCap = "round";
    ctx.stroke();

    // Yulduz boshi — yorqin nuqta
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.thickness + 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = `rgba(0, 210, 255, ${this.opacity})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Yulduzlarni yaratish
for (let i = 0; i < starCount; i++) {
  stars.push(new Star());
}

// Uchuvchi yulduzlarni vaqti-vaqti bilan yaratish
let shootingStarTimer = 0;

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Oddiy yulduzlar
  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  // Uchuvchi yulduzlarni yaratish (har 60-180 frame da)
  shootingStarTimer++;
  if (shootingStarTimer > Math.random() * 120 + 60) {
    shootingStars.push(new ShootingStar());
    shootingStarTimer = 0;
  }

  // Uchuvchi yulduzlarni chizish
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    shootingStars[i].update();
    shootingStars[i].draw();
    if (!shootingStars[i].active) {
      shootingStars.splice(i, 1);
    }
  }

  requestAnimationFrame(animateStars);
}

animateStars();

// ===== INIT =====
document.querySelector(".name").textContent = userData.name;
document.querySelector(".email-text").textContent = userData.email;
document.querySelector(".phone-text").textContent = userData.phone;

document.querySelector(".telegram").href = userData.links.telegram;
document.querySelector(".instagram").href = userData.links.instagram;
document.querySelector(".facebook").href = userData.links.facebook;
document.querySelector(".twitter").href = userData.links.twitter;
document.querySelector(".github").href = userData.links.github;
document.querySelector(".linkedin").href = userData.links.linkedin;

updateLanguage(currentLanguage);

// ===== CURSOR TRAIL EFFEKT =====
const trailCanvas = document.createElement("canvas");
trailCanvas.id = "cursor-trail";
trailCanvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;";
document.body.appendChild(trailCanvas);
const tCtx = trailCanvas.getContext("2d");

function resizeTrailCanvas() {
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
}
resizeTrailCanvas();
window.addEventListener("resize", resizeTrailCanvas);

const trail = [];
const trailLength = 20;

document.addEventListener("mousemove", (e) => {
  trail.push({
    x: e.clientX,
    y: e.clientY,
    life: 1,
    size: Math.random() * 3 + 2,
    color: `hsl(${190 + Math.random() * 30}, 100%, ${60 + Math.random() * 20}%)`
  });
  if (trail.length > trailLength) trail.shift();
});

function animateTrail() {
  tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

  for (let i = trail.length - 1; i >= 0; i--) {
    const p = trail[i];
    p.life -= 0.03;
    if (p.life <= 0) {
      trail.splice(i, 1);
      continue;
    }

    tCtx.save();
    tCtx.globalAlpha = p.life * 0.8;
    tCtx.beginPath();

    // Yulduzcha shakl
    const spikes = 4;
    const outerR = p.size * p.life;
    const innerR = outerR * 0.4;
    for (let j = 0; j < spikes * 2; j++) {
      const r = j % 2 === 0 ? outerR : innerR;
      const angle = (Math.PI / spikes) * j - Math.PI / 2;
      const px = p.x + Math.cos(angle) * r;
      const py = p.y + Math.sin(angle) * r;
      if (j === 0) tCtx.moveTo(px, py);
      else tCtx.lineTo(px, py);
    }
    tCtx.closePath();
    tCtx.fillStyle = p.color;
    tCtx.shadowBlur = 10;
    tCtx.shadowColor = "#00d2ff";
    tCtx.fill();
    tCtx.restore();
  }

  requestAnimationFrame(animateTrail);
}
animateTrail();

// ===== LOADING EKRANI =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1200);
});

// ===== YUQORIGA QAYTISH TUGMASI =====
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

// ===== SKILL COUNTER ANIMATSIYA =====
function animateSkillCounters() {
  document.querySelectorAll(".skill-fill").forEach((fill) => {
    const width = parseInt(fill.style.width);
    const parent = fill.closest(".skill-item");
    if (!parent) return;
    let counter = parent.querySelector(".skill-percent");
    if (!counter) {
      counter = document.createElement("span");
      counter.className = "skill-percent";
      counter.style.cssText = "font-size:11px;color:#00d2ff;font-weight:700;margin-top:2px;";
      parent.appendChild(counter);
    }
    let current = 0;
    const interval = setInterval(() => {
      current++;
      counter.textContent = current + "%";
      if (current >= width) clearInterval(interval);
    }, 20);
  });
}

// Skill counter ni accordion ochilganda ishga tushirish
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSkillCounters();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".skills-grid").forEach((grid) => {
  skillsObserver.observe(grid);
});

// ===== MATN REVEAL ANIMATSIYA =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll(".accordion-header, .about-text, .project-card, .cert-item, .skill-item, .contact-item");
      children.forEach((child, i) => {
        child.style.opacity = "0";
        child.style.transform = "translateY(20px)";
        child.style.filter = "blur(5px)";
        child.style.transition = "all 0.6s ease";
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
          child.style.filter = "blur(0)";
        }, i * 100);
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".accordion, .contact-info").forEach((el) => {
  revealObserver.observe(el);
});

// ===== PARALLAX SCROLL EFFEKT =====
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const profileImg = document.querySelector(".profile-img");
  const nameEl = document.querySelector(".name");
  const titleEl = document.querySelector(".title");

  if (profileImg) {
    profileImg.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
  if (nameEl) {
    nameEl.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
  if (titleEl) {
    titleEl.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});
