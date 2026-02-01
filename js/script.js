const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.style.display =
      navMenu.style.display === "flex" ? "none" : "flex";
  });
}

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const role = document.getElementById("role").value;

    if (role === "admin") {
      window.location.href = "admin/dashboard.html";
    } else if (role === "perusahaan") {
      window.location.href = "perusahaan/dashboard.html";
    } else if (role === "alumni") {
      window.location.href = "alumni/dashboard.html";
    } else {
      alert("Pilih role terlebih dahulu!");
    }
  });
}
