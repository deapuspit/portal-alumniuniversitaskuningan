async function login() {
  console.log("LOGIN FUNCTION TERPANGGIL");

  const email = document.getElementById("email")?.value.trim().toLowerCase();
  const password = document.getElementById("password")?.value.trim();
  const role = document.getElementById("role")?.value;

  const msgEl = document.getElementById("msg");

  function showMsg(text, type = "error") {
    if (msgEl) {
      msgEl.innerText = text;
      msgEl.style.color = type === "success" ? "green" : "red";
    } else {
      alert(text);
    }
  }

  if (!email || !password || !role) {
    showMsg("Email, password, dan role wajib diisi!");
    return;
  }

  // ✅ GOOGLE APPS SCRIPT API
  const API_URL =
    "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

  try {
    const url =
      API_URL +
      "?email=" + encodeURIComponent(email) +
      "&password=" + encodeURIComponent(password) +
      "&role=" + encodeURIComponent(role);

    const res = await fetch(url);
    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (data.status !== "success") {
      showMsg(data.message || "Login gagal");
      return;
    }

    // ================= SIMPAN LOGIN =================
    localStorage.setItem("login", "true");
    localStorage.setItem("nama", data.nama);
    localStorage.setItem("email", email);
    localStorage.setItem("role", data.role);
    localStorage.setItem("alumni_status", data.alumni_status);

    showMsg("Login berhasil", "success");

    // ================= TUTUP MODAL =================
    const modalEl = document.getElementById("loginModal");
    if (modalEl) {
      const modal =
        bootstrap.Modal.getInstance(modalEl) ||
        new bootstrap.Modal(modalEl);
      modal.hide();
    }

    // ================= REDIRECT =================
    setTimeout(() => {
      if (data.role === "admin") {
        location.href = "admin/dashboard.html";
      } 
      else if (data.role === "perusahaan") {
        location.href = "perusahaan/dashboard.html";
      } 
      else if (data.role === "alumni") {
        if (data.alumni_status === "Verified") {
          location.href = "index.html";
        } else {
          location.href = "alumni/dashboard.html";
        }
      }
    }, 400);

  } catch (err) {
    console.error(err);
    showMsg("Gagal menghubungi server");
  }
}
