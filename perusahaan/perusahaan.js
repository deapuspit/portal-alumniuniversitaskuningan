const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

async function simpanLowongan() {
  const form = new FormData();
  form.append("action", "addLowongan");
  form.append("perusahaan", localStorage.getItem("nama"));
  form.append("judul", judul.value);
  form.append("deskripsi", deskripsi.value);
  form.append("lokasi", lokasi.value);
  form.append("link", link.value);

  if (gambar.files.length > 0) {
    form.append("gambar", gambar.files[0]);
  }

  const res = await fetch(API, {
    method: "POST",
    body: form
  });

  const text = await res.text();
  msg.innerText = text === "OK"
    ? "Lowongan berhasil dikirim (menunggu approval admin)"
    : "Gagal menyimpan";
}


async function loadLowonganSaya() {
  const el = document.getElementById("listLowongan");
  if (!el) return;

  const perusahaan = localStorage.getItem("nama");
  if (!perusahaan) {
    el.innerHTML = "<p>Nama perusahaan tidak ditemukan</p>";
    return;
  }

  const res = await fetch(
    API + "?action=lowonganSaya&perusahaan=" +
    encodeURIComponent(perusahaan)
  );

  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("Response bukan array:", data);
    el.innerHTML = "<p>Gagal memuat lowongan</p>";
    return;
  }

  renderLowonganSaya(data);
}

function renderLowonganSaya(data) {
  const el = document.getElementById("listLowongan");
  if (!el) return;

  // 🔥 GUARD TAMBAHAN
  if (!Array.isArray(data)) {
    el.innerHTML = "<p>Data tidak valid</p>";
    return;
  }

  el.innerHTML = "";

  if (data.length === 0) {
    el.innerHTML = "<p>Tidak ada lowongan</p>";
    return;
  }

  data.forEach(l => {
    el.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card shadow">
            <h5>${l.judul}</h5>
            <p>${l.lokasi}</p>
            ${l.link ? `
    <a href="${l.link}" target="_blank"
       class="btn btn-sm btn-outline-primary me-2">
      Lihat Detail
    </a>
  ` : ""}
            <span class="badge bg-secondary">${l.status}</span>
            <br><br>
            <button class="btn btn-danger btn-sm"
              onclick="hapusLowongan('${l.id}')">
              Hapus
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

async function hapusLowongan(id) {
  if (!confirm("Yakin hapus lowongan ini?")) return;

  const form = new FormData();
  form.append("action", "deleteLowongan");
  form.append("id", id);

  await fetch(API, {
    method: "POST",
    body: form
  });

  loadLowonganSaya();
}

function openEdit(id, judul, lokasi, gambar) {
  editId.value = id;
  editJudul.value = judul;
  editLokasi.value = lokasi;
  editGambar.value = gambar;

  new bootstrap.Modal(
    document.getElementById("editModal")
  ).show();
}

async function simpanEdit() {
  const form = new FormData();
  form.append("action", "updateLowongan");
  form.append("id", editId.value);
  form.append("judul", editJudul.value);
  form.append("lokasi", editLokasi.value);
  form.append("gambar", editGambar.value);

  await fetch(API, {
    method: "POST",
    body: form
  });

  alert("Lowongan berhasil diperbarui");

  bootstrap.Modal.getInstance(
    document.getElementById("editModal")
  ).hide();

  loadLowonganSaya();
}
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("listLowongan")) {
    loadLowonganSaya();
  }
});
