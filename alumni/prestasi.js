const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

let allAlumni = [];

async function loadPrestasi() {
  const res = await fetch(API + "?action=prestasiAlumni");
  allAlumni = await res.json();

  render(allAlumni);
  loadFilterAngkatan(allAlumni);
}

function loadFilterAngkatan(data) {
  const select = document.getElementById("filterAngkatan");
  const angkatanUnik = [...new Set(data.map(a => a.angkatan).filter(Boolean))];

  angkatanUnik.forEach(a => {
    select.innerHTML += `<option value="${a}">${a}</option>`;
  });
}

function render(data) {
  const container = document.getElementById("listAlumni");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p class="text-center">Tidak ada data.</p>`;
    return;
  }

  data.forEach(a => {
    let foto = a.foto && a.foto !== ""
      ? a.foto
      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    let infoKerja = "";
    let sosmed = "";

    if (a.statusKarier === "Bekerja") {
      infoKerja = `
        <p class="mb-1"><b>${a.jabatan}</b></p>
        <p class="text-muted">${a.perusahaan}</p>
      `;

      if (a.izin === "Ya") {
        if (a.linkedin)
          sosmed += `<a href="${a.linkedin}" target="_blank">LinkedIn</a><br>`;
        if (a.instagram)
          sosmed += `<a href="${a.instagram}" target="_blank">Instagram</a>`;
      }
    }

    container.innerHTML += `
      <div class="col-md-12 mb-3">
        <div class="card p-3">
          <div class="row align-items-center">
            <div class="col-md-2 text-center">
              <img src="${foto}" class="rounded-circle" width="90">
            </div>
            <div class="col-md-7">
              ${infoKerja}
              <h6 class="mb-0">${a.nama}</h6>
              <small class="text-muted">Angkatan ${a.angkatan}</small>
            </div>
            <div class="col-md-3 text-end">
              ${sosmed}
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// ================= FILTER =================
function filterData() {
  const q = document.getElementById("searchNama").value.toLowerCase();
  const angkatan = document.getElementById("filterAngkatan").value;

  const hasil = allAlumni.filter(a =>
    a.nama.toLowerCase().includes(q) &&
    (angkatan === "" || a.angkatan === angkatan)
  );

  render(hasil);
}

document.getElementById("searchNama").addEventListener("input", filterData);
document.getElementById("filterAngkatan").addEventListener("change", filterData);

loadPrestasi();
