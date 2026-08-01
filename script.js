// GANTI TEKS DI BAWAH INI DENGAN URL APLIKASI WEB GAS ANDA
const scriptURL = 'https://script.google.com/macros/s/AKfycbxR3HoaBHLbs8CAwiAzKOfQkuZuXLRwVgYejl-COFHNthRYHYPuVxs4E8tqavtNcmbwmA/exec';

// ---------------------------------------------------------
// 1. FUNGSI UNTUK LOGIN MAHASISWA
// ---------------------------------------------------------
function prosesLogin(event) {
    event.preventDefault(); 
    
    const nimInput = document.getElementById('nim').value;
    const passInput = document.getElementById('password').value;
    const tombol = document.querySelector('button[type="submit"]');
    
    tombol.innerText = "Mengecek data...";
    
    const dataKirim = new URLSearchParams();
    dataKirim.append('action', 'login');
    dataKirim.append('nim', nimInput);
    dataKirim.append('password', passInput);
    
    fetch(scriptURL, { method: 'POST', body: dataKirim })
        .then(response => response.json()) 
        .then(hasil => {
            if (hasil.status === "Sukses") {
                alert("Login berhasil! Selamat datang, " + hasil.nama);
                localStorage.setItem("namaMhs", hasil.nama);
                localStorage.setItem("nimMhs", nimInput);
                window.location.href = "dashboard.html";
            } else {
                alert("Login Gagal: " + hasil.pesan);
                tombol.innerText = "Masuk ke Ruang Misi"; 
            }
        })
        .catch(error => {
            alert("Terjadi kendala jaringan. Coba lagi.");
            tombol.innerText = "Masuk ke Ruang Misi";
        });
}

// ---------------------------------------------------------
// 2. FUNGSI UNTUK MENGIRIM TUGAS ANALISIS ARTEFAK
// ---------------------------------------------------------
function kirimAnalisis(event) {
    event.preventDefault();
    
    // Asumsi halaman galeri memiliki input dengan ID 'jawabanAnalisis' dan teks 'namaArtefak'
    const hasilAnalisis = document.getElementById('jawabanAnalisis') ? document.getElementById('jawabanAnalisis').value : "Uji Coba Analisis";
    const artefakID = document.getElementById('namaArtefak') ? document.getElementById('namaArtefak').innerText : "Artefak Uji Coba";
    const tombol = event.target.querySelector('button') || document.getElementById('btnKirim');
    
    const namaMhs = localStorage.getItem("namaMhs") || "Nama Uji Coba";
    const nimMhs = localStorage.getItem("nimMhs") || "NIM Uji Coba";
    
    if (tombol) tombol.innerText = "Mengirim analisis sejarah...";

    const dataKirim = new URLSearchParams();
    dataKirim.append('action', 'submit_misi');
    dataKirim.append('nim', nimMhs);
    dataKirim.append('nama', namaMhs);
    dataKirim.append('artefak', artefakID);
    dataKirim.append('hasil_analisis', hasilAnalisis);

    fetch(scriptURL, { method: 'POST', body: dataKirim })
        .then(response => response.json())
        .then(hasil => {
            if (hasil.status === "Sukses") {
                alert("Luar biasa! Hasil analisis historis Anda berhasil terekam di database.");
                if (tombol) {
                    tombol.innerText = "Analisis Terkirim ✔️";
                    tombol.disabled = true; 
                }
            }
        })
        .catch(error => {
            alert("Gagal mengirim data. Coba lagi.");
            if (tombol) tombol.innerText = "Kirim Analisis";
        });
}
