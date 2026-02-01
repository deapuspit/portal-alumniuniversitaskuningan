const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

async function loadBeritaAdmin() {
  const res = await fetch(API + "?action=getBeritaAdmin");
  const data = await res.json();

  const el = document.getElementById("listBerita");
  el.innerHTML = "";

  if (!Array.isArray(data)) {
    el.innerHTML = "<p class='text-danger'>Data berita tidak valid</p>";
    return;
  }

  data.forEach(b => {
    el.innerHTML += `
      <div class="card mb-2">
        <div class="card-body">
          <strong>${b.judul}</strong><br>
          <small>${b.tanggal}</small><br>

          <span class="badge ${b.status === 'Published' ? 'bg-success' : 'bg-secondary'}">
            ${b.status}
          </span>
          <br>

          <button class="btn btn-warning btn-sm mt-2"
            onclick="openEdit('${b.id}','${b.judul}','${b.ringkasan}','${b.isi}','${b.gambar}','${b.tanggal}','${b.link}')">
            Edit
          </button>

          <button class="btn btn-danger btn-sm mt-2"
            onclick="hapusBerita('${b.id}')">
            Hapus
          </button>

          <button class="btn btn-info btn-sm mt-2"
            onclick="togglePublish('${b.id}','${b.status === 'Published' ? 'Draft' : 'Published'}')">
            ${b.status === 'Published' ? 'Jadikan Draft' : 'Publish'}
          </button>
        </div>
      </div>
    `;
  });
}

async function tambahBerita() {
  const form = new FormData();
  form.append("action", "addBerita");
  form.append("judul", judul.value);
  form.append("ringkasan", ringkasan.value);
  form.append("isi", isi.value);
  form.append("gambar", gambar.value);
  form.append("tanggal", tanggal.value);
  form.append("link", link.value);
  form.append("status", status.value);
  form.append("kategori", kategori.value);

  await fetch(API, {
    method: "POST",
    body: form
  });

  alert("Berita ditambahkan");
  loadBeritaAdmin();
}

async function hapusBerita(id) {
  if (!confirm("Hapus berita ini?")) return;

  const form = new FormData();
  form.append("action", "deleteBerita");
  form.append("id", id);

  await fetch(API, {
    method: "POST",
    body: form
  });

  loadBeritaAdmin();
}

loadBeritaAdmin();
function openEdit(id, judul, ringkasan, isi, gambar, tanggal, link) {
  editId.value = id;
  editJudul.value = judul;
  editRingkasan.value = ringkasan;
  editIsi.value = isi;
  editGambar.value = gambar;
  editTanggal.value = tanggal;
  editLink.value = link;

  new bootstrap.Modal(document.getElementById("editModal")).show();
}

async function simpanEdit() {
  const form = new FormData();
  form.append("action", "updateBerita");
  form.append("id", editId.value);
  form.append("judul", editJudul.value);
  form.append("ringkasan", editRingkasan.value);
  form.append("isi", editIsi.value);
  form.append("gambar", editGambar.value);
  form.append("tanggal", editTanggal.value);
  form.append("link", editLink.value);

  await fetch(API, { method: "POST", body: form });
  alert("Berita diperbarui");
  loadBeritaAdmin();
}
async function togglePublish(id, status) {
  const form = new FormData();
  form.append("action", "setBeritaStatus");
  form.append("id", id);
  form.append("status", status);

  await fetch(API, {
    method: "POST",
    body: form
  });

  loadBeritaAdmin();
}

document.getElementById("gambarFile").addEventListener("change", async function () {
  const file = this.files[0];
  if (!file) return;

  const form = new FormData();
  form.append("action", "uploadGambarBerita");
  form.append("file", file);

  const res = await fetch(API, {
    method: "POST",
    body: form
  });

  const url = await res.text();
  document.getElementById("gambar").value = url;

  alert("Gambar berhasil diupload");
});


