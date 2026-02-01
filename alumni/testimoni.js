const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

async function kirimTestimoni() {
  const isi = document.getElementById("isi").value.trim();
  const email = localStorage.getItem("email");

  if (!isi) {
    alert("Testimoni tidak boleh kosong");
    return;
  }

  // ambil data alumni
  const res = await fetch(API + "?action=getAlumni&email=" + email);
  const alumni = await res.json();

  const fd = new FormData();
  fd.append("action", "addTestimoni");
  fd.append("nama", alumni.nama);
  fd.append("email", alumni.email);
  fd.append("program_studi", alumni.program_studi);
  fd.append("isi", isi);
  fd.append("foto", alumni.foto || "");

  await fetch(API, {
    method: "POST",
    body: fd
  });

  alert("✅ Testimoni berhasil dikirim\nMenunggu persetujuan admin");
  document.getElementById("isi").value = "";
}
