const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

async function loadTestimoni() {
  const res = await fetch(API + "?action=getTestimoniAdmin");
  const data = await res.json();
  

  const el = document.getElementById("listTestimoni");
  el.innerHTML = "";

  data.forEach(t => {
    el.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">

          <h6>${t.nama}</h6>
          <small class="text-muted">
            ${t.program_studi} · ${t.email}
          </small>

          <p class="mt-2">${t.isi}</p>

          <span class="badge ${
            t.status === "Published" ? "bg-success" :
            t.status === "Rejected" ? "bg-danger" :
            "bg-warning text-dark"
          }">
            ${t.status}
          </span>

          <div class="mt-3">
            <button class="btn btn-success btn-sm"
              onclick="ubahStatus('${t.id}','Published')">
              Setujui
            </button>

            <button class="btn btn-danger btn-sm"
              onclick="ubahStatus('${t.id}','Rejected')">
              Tolak
            </button>
          </div>

        </div>
      </div>
    `;
  });
}

async function ubahStatus(id, status) {
  const form = new FormData();
  form.append("action", "setTestimoniStatus");
  form.append("id", id);
  form.append("status", status);

  await fetch(API, {
    method: "POST",
    body: form
  });

  loadTestimoni();
}

loadTestimoni();
