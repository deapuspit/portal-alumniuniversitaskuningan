const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

async function daftar() {
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;

  if (!nama || !email || !password) {
    alert("Semua wajib diisi");
    return;
  }

  const form = new FormData();
  form.append("action", "addUser");
  form.append("nama", nama);
  form.append("email", email);
  form.append("password", password);
  form.append("role", "alumni");

  await fetch(API, { method: "POST", body: form });

  // auto login
  localStorage.setItem("login", "true");
  localStorage.setItem("nama", nama);
  localStorage.setItem("email", email);
  localStorage.setItem("role", "alumni");
  localStorage.setItem("alumni_status", "Pending");

  window.location.href = "dashboard.html";
}
