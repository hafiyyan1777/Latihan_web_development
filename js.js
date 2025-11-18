
    //  Jelaskan Kodingan ini apa (perintah JavaScript yang memberi tahu kode di dalamnya untuk menunggu sampai seluruh halaman HTML dimuat sebelum mulai)
    document.addEventListener('DOMContentLoaded', function() {
        
        //  Jelaskan Kodingan ini apa (memilih elemen-elemen dari HTML (layar, gambar, dan semua tombol) dan menyimpannya ke dalam variabel agar nanti bisa dikontrol)
        const display = document.getElementById('display');
        const statusImage = document.getElementById('statusImage');
        const buttons = document.querySelectorAll('.btn-calc');

        //  Jelaskan Kodingan ini apa (enyimpan tiga link (URL) gambar berbeda ke dalam tiga variabel untuk menampilkan status kalkulator yang berbeda (normal, sukses, atau error)) 
        const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
        const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
        const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

        /**
          Jelaskan Kodingan ini apa (mengganti gambar status kalkulator menjadi 'Sukses' atau 'Error' berdasarkan hasil perhitungan.)
         */
        function changeImage(state) {
            if (state === 'success') {
                statusImage.src = imgSuccess;
                statusImage.alt = "Perhitungan Sukses";
            } else if (state === 'error') {
                statusImage.src = imgError;
                statusImage.alt = "Error Perhitungan";
            } else {
                //  Jelaskan Kodingan ini apa (mengembalikan gambar status ke tampilan normal dan mengganti teks alt-nya menjadi "Status Kalkulator")
                statusImage.src = imgNormal;
                statusImage.alt = "Status Kalkulator";
            }
        }

        /**
          Jelaskan Kodingan ini apa (mengosongkan layar kalkulator dan mengembalikan gambar status ke normal)
         */
        function clearDisplay() {
            display.value = '';
            changeImage('normal'); // Memanggil function untuk merubah gambar
        }

        /**
          Jelaskan Kodingan ini apa (menghapus satu karakter terakhir dari teks yang sedang tampil di layar kalkulator.)
         */
        function deleteLastChar() {
            display.value = display.value.slice(0, -1);
        }

        /**
          Jelaskan Kodingan ini apa (menambahkan karakter ke akhir teks yang sedang tampil di layar kalkulator.)
         */
        function appendToDisplay(value) {
            display.value += value;
        }

        /**
          Jelaskan Kodingan ini apa (memulai definisi dari sebuah fungsi baru)
         */
        function calculateResult() {
            //  Jelaskan Kodingan ini apa (memeriksa apakah layar kalkulator kosong, dan jika ya, ia akan menampilkan gambar error dan menuliskan "Kosong!" di layar.)
            if (display.value === '') {
                changeImage('error');
                display.value = 'Kosong!';
                //  Jelaskan Kodingan ini apa (menjalankan fungsi clearDisplay setelah 1,5 detik, dan kemudian menghentikan eksekusi fungsi saat ini.)
                setTimeout(clearDisplay, 1500);
                return;
            }

            try {
                //  Jelaskan Kodingan ini apa (mengganti semua simbol persen (%) di layar menjadi teks "/100" agar JavaScript bisa menghitungnya dengan benar.)
                let result = eval(display.value
                    .replace(/%/g, '/100') //  Jelaskan Kodingan ini apa 
                ); 
                
                //  Jelaskan Kodingan ini apa (menampilkan hasil itu di layar dan mengubah gambar status menjadi 'sukses'.)
                if (isFinite(result)) {
                    display.value = result;
                    changeImage('success'); 
                    //  Jelaskan Kodingan ini apa (membuat pesan error bertuliskan "Hasil tidak valid" dan menampilkan "Error" di layar kalkulator dan mengubah gambar status menjadi 'error'.)
                } else {
                    throw new Error("Hasil tidak valid");
                }

            } catch (error) {
                console.error("Error kalkulasi:", error);
                display.value = 'Error';
                changeImage('error'); 
                //  Jelaskan Kodingan ini apa (menunggu 1,5 detik (1500 milidetik), lalu secara otomatis menjalankan fungsi)
                setTimeout(clearDisplay, 1500);
            }
        }

        //  Jelaskan Kodingan ini apa (setiap tombol kalkulator bisa diklik, lalu mengambil nilai)
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');

                //  Jelaskan Kodingan ini apa (memeriksa apakah tombol yang ditekan adalah 'C' (tombol 'Clear').)
                switch(value) {
                    case 'C':
                        //  Jelaskan Kodingan ini apa (untuk menghapus angka yang muncul)
                        clearDisplay();
                        break;
                    case 'DEL':
                        //  Jelaskan Kodingan ini apa (enjalankan fungsi hapus, lalu menghentikan pemeriksaan, dan melanjutkan untuk tombol "=".)
                        deleteLastChar();
                        break;
                    case '=':
                        //  Jelaskan Kodingan ini apa (menjalankan fungsi hitung, lalu menghentikan pemeriksaan, dan kemudian menangani semua tombol lainnya)
                        calculateResult();
                        break;
                    default:
                        //  Jelaskan Kodingan ini apa (membersihkan layar secara otomatis jika pengguna menekan tombol baru setelah hasil 'Sukses' atau 'Error' ditampilkan, lalu menambahkan tombol baru itu ke layar.)
                        if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                            clearDisplay();
                        }
                        appendToDisplay(value);
                        break;
                }
            });
        });

        //  Jelaskan Kodingan ini apa (membuat kalkulator bisa digunakan dengan keyboard, sehingga mengetik angka, menghitung, menghapus, dan membersihkan layar.)
        document.addEventListener('keydown', (e) => {
            const key = e.key;

            if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                    clearDisplay();
                }
                appendToDisplay(key);
                e.preventDefault();
            } else if (key === 'Enter' || key === '=') {
                calculateResult();
                e.preventDefault();
            } else if (key === 'Backspace') {
                deleteLastChar();
                e.preventDefault();
            } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                clearDisplay();
                e.preventDefault();
            }
        });

    });