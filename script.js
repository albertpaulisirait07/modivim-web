// Fungsi ini dijalankan saat tombol login ditekan
function prosesLogin(event) {
    event.preventDefault(); // Mencegah halaman berkedip/refresh
    
    // Karena ini baru frontend, kita langsung arahkan ke dashboard
    alert("Login berhasil! Mengalihkan ke Dashboard...");
    window.location.href = "dashboard.html";
}