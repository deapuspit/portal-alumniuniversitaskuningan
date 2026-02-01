const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formKontribusi");
  const judul = document.getElementById("judul");
  const jenis = document.getElementById("jenis");
  const deskripsi = document.getElementById("deskripsi");

  if (!form) {
    alert("form tidak ditemukan");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    alert("form terbaca"); // 🔥 TEST

    const fd = new FormData();
    fd.append("action", "addKontribusi");
    fd.append("nama", localStorage.getItem("nama"));
    fd.append("email", localStorage.getItem("email"));
    fd.append("jenis", jenis.value);
    fd.append("judul", judul.value);
    fd.append("deskripsi", deskripsi.value);

    await fetch(API, {
      method: "POST",
      body: fd
    });

    alert("✅ Kontribusi terkirim");
  });

});
