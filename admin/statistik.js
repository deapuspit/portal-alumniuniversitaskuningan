const API = "https://script.google.com/macros/s/AKfycbyDS1ml_xKj_1BAvS6_eD9sMbbYDShc3IFUtONn4jV117sDkHgr1TkxhjFm-DF1FqjAVw/exec";

fetch(API + "?action=getBeritaAdmin")
  .then(res => res.json())
  .then(data => {

    console.log("DATA DARI API:", data);

    // ===== CEK DATA =====
    if (!Array.isArray(data)) {
      alert("Data statistik tidak valid");
      return;
    }

    // ===== AMBIL DATA =====
    const labels = data.map(b => b.judul);
    const klik = data.map(b => Number(b.klik || 0));

    // ===== BUAT CHART =====
    new Chart(document.getElementById("chartBerita"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Jumlah Klik Berita",
          data: klik,
          backgroundColor: "#ffc107"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });

  })
  .catch(err => {
    console.error("ERROR STATISTIK:", err);
    alert("Gagal memuat statistik berita");
  });
