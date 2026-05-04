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

menuBtn.addEventListener("click", toggleDropdown);

document.addEventListener("click", (event) => {
  if (!menuWrap.contains(event.target)) {
    closeDropdown();
  }
});