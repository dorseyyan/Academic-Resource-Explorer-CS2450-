const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const menuWrap = document.getElementById("menuWrap");
const menuBtn = document.getElementById("menuBtn");

function toggleDropdown(event) {
  event.stopPropagation();
  const isOpen = menuWrap.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function closeDropdown() {
  menuWrap.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

function toggleSidebar() {
  if (window.innerWidth <= 820) {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  }
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

menuBtn.addEventListener("click", toggleDropdown);
mobileMenuBtn.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", closeSidebar);

document.addEventListener("click", (event) => {
  if (!menuWrap.contains(event.target)) {
    closeDropdown();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeSidebar();
  }
});