(function () {
  const isLogin = localStorage.getItem("login");
  const role = localStorage.getItem("role");

  const path = window.location.pathname;

  // BELUM LOGIN
  if (!isLogin) {
    window.location.href = "../index.html";
    return;
  }

  // ADMIN GUARD
  if (path.includes("/admin/") && role !== "admin") {
    alert("Akses ditolak!");
    window.location.href = "../index.html";
    return;
  }

  // ALUMNI GUARD
  if (path.includes("/alumni/") && role !== "alumni") {
    alert("Akses ditolak!");
    window.location.href = "../index.html";
    return;
  }

  // PERUSAHAAN GUARD
  if (path.includes("/perusahaan/") && role !== "perusahaan") {
    alert("Akses ditolak!");
    window.location.href = "../index.html";
    return;
  }
})();
