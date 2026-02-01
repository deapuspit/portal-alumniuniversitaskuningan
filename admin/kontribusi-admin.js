const API =
  "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

async function loadKontribusi() {
  const res = await fetch(API + "?action=getKontribusiAdmin");
  const data = await res.json();

  const list = document.getElementById("kontribusiList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML =
      "<tr><td colspan='5' class='text-center'>Belum ada data.</td></tr>";
    return;
  }

  data.forEach(k => {
    let tombol = "";

    if (k.status === "Pending") {
      tombol = `
        <button class="btn btn-success btn-sm me-1"
          onclick="setStatus('${k.id}','Approved')">
          Approve
        </button>

        <button class="btn btn-danger btn-sm"
          onclick="setStatus('${k.id}','Rejected')">
          Tolak
        </button>
      `;
    } else {
      tombol = `<span class="badge bg-secondary">${k.status}</span>`;
    }

    list.innerHTML += `
      <tr>
        <td>${k.nama}</td>
        <td>${k.jenis}</td>
        <td>${k.judul}</td>
        <td>
          <span class="badge ${
            k.status === "Approved"
              ? "bg-success"
              : k.status === "Rejected"
              ? "bg-danger"
              : "bg-warning text-dark"
          }">
            ${k.status}
          </span>
        </td>
        <td>${tombol}</td>
      </tr>
    `;
  });
}

async function setStatus(id, status) {
  if (!confirm("Yakin ubah status?")) return;

  const form = new FormData();
  form.append("action", "setKontribusiStatus");
  form.append("id", id);
  form.append("status", status);

  await fetch(API, {
    method: "POST",
    body: form
  });

  loadKontribusi();
}

loadKontribusi();
