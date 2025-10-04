const editButton = document.getElementById("editIntro");
const introParagraph = document.querySelector("#introText p");

let isEditing = false;

editButton.addEventListener("click", () => {
  if (!isEditing) {
    // Enable editing
    introParagraph.setAttribute("contenteditable", "true");
    introParagraph.classList.add("editing");
    introParagraph.focus();
    editButton.textContent = "Save";
    isEditing = true;
  } else {
    // Disable editing
    introParagraph.setAttribute("contenteditable", "false");
    introParagraph.classList.remove("editing");
    editButton.textContent = "Edit";
    isEditing = false;

    // Save to localStorage
    localStorage.setItem("introParagraph", introParagraph.innerHTML);
  }
});

// Load saved content if available
document.addEventListener("DOMContentLoaded", () => {
  const savedContent = localStorage.getItem("introParagraph");
  if (savedContent) {
    introParagraph.innerHTML = savedContent;
  }
});



let currentSlide = 0;
let isLocked = false;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dot");

// SLIDER
function showSlide(index) {
  if (isLocked) return;
  if (index < 0) index = 0;
  if (index >= dots.length) index = dots.length - 1;
  if (index === currentSlide) return;
  isLocked = true;
  currentSlide = index;
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
}

slides.addEventListener("transitionend", () => { isLocked = false; });

// DOTS click
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stops reload / jump
    alert("Message sent!");
    contactForm.reset(); // clears inputs
  });
}

