# PROJECT.md — Economy Adventure

> Dokumen ini menjelaskan **apa** project ini, **untuk siapa**, dan **bagaimana** ia bekerja secara keseluruhan. Baca ini dulu sebelum menyentuh kode.
>
> **Revisi brief klien (terbaru):** scope berubah dari Level 1-4 (+ 2 TBD) menjadi **7 level lengkap**, Zara jadi avatar orang-pertama, karakter baru (Pak Ali, Pak Rudi, Ani), dan ada **sistem poin** per soal. Lihat §2-§5 untuk detail penuh.

---

## 1. Ringkasan Project

**Judul:** Pengembangan Media Game Simulasi "Economy Adventure" Berbasis Web untuk Meningkatkan Pemahaman Konsep Siswa Kelas V

**Jenis:** Game edukasi berbasis web (single-player, client-side sepenuhnya)

**Target pengguna:** Siswa Sekolah Dasar kelas 5 (usia ~10-12 tahun)

**Tujuan pembelajaran:** Meningkatkan **pemahaman konsep** (bukan sekadar hafalan) tentang kegiatan ekonomi — **produksi, distribusi, dan konsumsi** — melalui simulasi dan role-play, di mana siswa "mengalami" sendiri peran sebagai pelaku ekonomi lewat misi-misi interaktif.

**Pendekatan:** Materi ekonomi TIDAK diajarkan secara langsung/tekstual di awal. Materi tersirat lewat **narasi cerita + simulasi interaktif**. Siswa belajar dengan melakukan (learning by doing), lalu penegasan konsep muncul di akhir tiap misi.

**Sudut pandang:** Game dimainkan dari sudut pandang **orang pertama** — siswa BUKAN mengontrol karakter NPC terpisah, siswa **adalah** Zara. Semua narasi & teks UI yang melibatkan Zara ditulis sebagai "aku" (siswa sendiri), bukan "dia". Lihat §2.

**Capaian Pembelajaran (resmi, ditampilkan di halaman awal):**
> "Capaian Pembelajaran IPAS Fase C: menerapkan kegiatan ekonomi masyarakat di lingkungan sekitar."

---

## 2. Konsep Cerita (Narrative)

**Zara = avatar siswa.** Zara bukan karakter pendamping/NPC — Zara adalah representasi siswa itu sendiri di dalam game (sudut pandang orang pertama). Setiap dialog/narasi "Zara" pada dasarnya adalah siswa sendiri yang berbicara/berpikir ("Aku...", bukan "Zara..." dari luar).

**Premis:** Untuk bisa membantu **Pak Ali** (ketua pelaksana) dan warga **Desa Sejahtera** mempersiapkan **Festival Produk Lokal**, siswa (sebagai Zara) harus memahami dulu bagaimana kegiatan ekonomi berjalan — dari produksi barang, distribusi, sampai ke konsumsi. Setiap level adalah satu misi yang membuat siswa makin paham konsep ekonomi.

**Pak Ali — tokoh sentral pemandu.** Pak Ali disebutkan sejak narasi pembuka di Halaman Awal, dan menjadi **lawan bicara aktif** Zara di Level 1 — ia bertanya ke Zara untuk memandu proses berpikir siswa (bukan sekadar warga biasa yang diamati).

**Alur:** Game berbentuk **1 alur besar yang menyambung** (bukan level lepas-lepas), sekarang terdiri dari **7 level**. Cerita mengalir dari satu level ke level berikutnya secara naratif, berpuncak di Level 7 (misi integrasi) lalu penutup Festival.

**Narasi pembuka (Halaman Awal, muncul setelah tombol Mulai ditekan), first-person, teks persis:**
> "Halo! Aku Zara. Hari ini aku akan membantu Pak Ali sebagai ketua pelaksana dan warga Desa Sejahtera mempersiapkan Festival Produk Lokal. Namun sebelum itu, aku harus memahami bagaimana kegiatan ekonomi berlangsung. Yuk, ikut berpetualang bersamaku!"

---

## 3. Karakter

| Karakter | Peran | Muncul di |
|----------|-------|-----------|
| **Zara** | Avatar siswa (sudut pandang orang pertama) — bukan NPC terpisah | Semua level |
| **Pak Ali** | Ketua pelaksana Festival Produk Lokal; lawan bicara aktif Zara, memandu proses berpikir siswa | Halaman Awal (disebut di narasi), Level 1 (dialog aktif) |
| **Pak Tono** | Petani padi | Level 1 (& referensi di Level 4) |
| **Bu Sinta** | Pedagang sayur | Level 1 |
| **Pak Rudi** *(baru)* | Kurir — mewakili contoh kegiatan **distribusi** | Level 1 |
| **Ani** *(baru)* | Pembeli — mewakili contoh kegiatan **konsumsi** | Level 1 |
| **Pak Budi** | Pemilik toko roti | Level 3 |
| **Pak Dimas** | Koordinator distribusi | Level 4 |

> Catatan: truk pengangkut & pabrik makanan yang sebelumnya direncanakan sebagai objek terpisah di Level 1 **dihapus** — fungsinya sekarang diwakili langsung oleh tokoh Pak Rudi (distribusi) dan Ani (konsumsi).

**Konvensi nama asset karakter baru** (ikut pola karakter lain seperti Pak Tono/Bu Sinta): `karakter_pakali_*.png`, `karakter_pakrudi_*.png`, `karakter_ani_*.png` (portrait + fullbody).

---

## 4. Struktur Level

> Game punya total **7 level**, dan sekarang **semua sudah punya detail lengkap dari klien** (sebelumnya hanya Level 1-4 lengkap, Level 5 & 6 masih TBD — sudah tidak berlaku). Level 7 baru sama sekali (level integrasi). Urutan pengembangan tetap mengerjakan Level 1-6 dulu; **Level 7 dikerjakan paling akhir** karena me-reuse mekanik & asset level-level sebelumnya (lihat §10 & TASK.md).

### Halaman Awal (Main Menu)
- Judul "Economy Adventure", tombol **Mulai**
- Teks Capaian Pembelajaran (lihat §1) + petunjuk bermain
- Jika ada progress tersimpan → opsi **"Lanjutkan"** (bukan mulai dari awal)
- Saat tombol Mulai ditekan → animasi Zara + narasi pembuka first-person (teks persis di §2), yang juga memperkenalkan Pak Ali

### Level 1 — Misi Pengamatan ("Apa yang Sedang Mereka Lakukan?")
**Cerita:** Zara (siswa) sampai di Desa Sejahtera dan melihat berbagai aktivitas warga.

**Misi 1 — Amati:** siswa klik tiap tokoh (bisa diklik berkali-kali), muncul narasi aktivitasnya:
- **Pak Tono** (petani) → "Pak Tono menanam padi untuk menghasilkan beras."
- **Bu Sinta** (pedagang) → "Bu Sinta menjual sayuran kepada pembeli."
- **Pak Rudi** (kurir) → "Pak Rudi mengantarkan barang dari penjual kepada pembeli."
- **Ani** (pembeli) → "Ani membeli makanan untuk memenuhi kebutuhannya."

**Indikator 1 — Menafsirkan** (pilihan ganda tunggal, 4 opsi):
Pak Ali bertanya: *"Apa yang sedang dilakukan oleh Pak Tono?"*
- Menghasilkan barang **(BENAR)**
- Mengantarkan barang
- Menggunakan barang
- Menjual barang

Feedback benar: *"Kamu benar, Zara! Pak Tono menghasilkan suatu barang yaitu berupa beras dan kegiatan tersebut disebut produksi."*
Feedback salah: *"Kamu kurang tepat, Zara! Kita lihat bersama-sama lagi yuk aktivitas yang sedang mereka lakukan."* → siswa diarahkan eksplor ulang (klik semua tokoh) sebelum mencoba lagi.

**Indikator 2 — Memberikan contoh** (2 soal pilihan ganda berurutan, 4 opsi):
Pak Ali: *"Jika kegiatan tadi disebut dengan produksi, lalu bagaimana dengan kegiatan distribusi dan konsumsi?"*
Zara (ke siswa): *"Bantu aku beritahu Pak Ali contoh kegiatan distribusi dan konsumsi yuk!"*

Soal A — *"Manakah contoh kegiatan distribusi?"*
- a) Petani menanam padi
- b) Pegawai pabrik sedang membuat roti
- c) Kurir mengantarkan barang dari penjual kepada pembeli **(BENAR)**
- d) Seorang anak membeli dan memakan roti

Feedback benar: *"Benar! Kurir yang sedang mengantarkan paket merupakan contoh kegiatan distribusi."*
Feedback salah (a/b): *"Kamu kurang tepat! Kegiatan tersebut sedang menghasilkan suatu barang."*
Feedback salah (d): *"Kamu kurang tepat! Kegiatan tersebut sedang menggunakan suatu barang yang telah dihasilkan."*

Soal B — *"Manakah contoh kegiatan konsumsi?"*
- a) Penjahit membuat pakaian dari kain
- b) Pengrajin membuat meja dan kursi
- c) Pedagang mengangkut hasil panen sayuran dari petani ke pasar
- d) Seorang anak membeli dan memakan roti **(BENAR)**

Feedback benar: *"Benar! Seorang anak yang membeli dan memakan roti merupakan contoh kegiatan konsumsi karena menggunakan barang untuk memenuhi kebutuhan."*
Feedback salah (a/b): *"Belum tepat! Kegiatan tersebut merupakan produksi karena menghasilkan barang. Penjahit membuat pakaian, sedangkan pengrajin membuat meja dan kursi."*
Feedback salah (c): *"Belum tepat! Kegiatan tersebut merupakan distribusi karena pedagang menyalurkan hasil panen dari petani ke pasar."*

**Penutup level:** Pak Ali: *"Wah, terima kasih banyak, Zara! Kamu sudah membantu Bapak. Aku akan berkeliling lagi untuk melihat-lihat."*

> ⚠️ **Tidak ada lagi drag & drop kategori di Level 1.** Mekanik itu sudah dipindahkan sepenuhnya ke Level 2.

### Level 2 — Misi Klasifikasi ("Kelompokkan Kegiatan Ekonomi!")
*(Menggantikan rencana lama "Tebak Profesi".)*

**Cerita:** Zara menemukan kartu aktivitas warga yang tercampur di booth berikutnya, dan membuka kartu petunjuk di meja booth.

**Kartu Petunjuk 1 — Teka-Teki Silang (TTS):** siswa mengisi kotak kosong berdasarkan definisi:
- Kegiatan ekonomi yang menghasilkan/membuat barang → **PRODUKSI**
- Kegiatan ekonomi yang menyalurkan/mengantarkan barang → **DISTRIBUSI**
- Kegiatan ekonomi yang menggunakan barang/jasa untuk memenuhi kebutuhan sehari-hari → **KONSUMSI**

**Kartu Petunjuk 2 — Drag & Drop 3 Kategori** (PRODUKSI | DISTRIBUSI | KONSUMSI):
| Kartu | Kategori benar |
|---|---|
| Petani menghasilkan padi | Produksi |
| Pabrik membuat roti | Produksi |
| Kurir mengantarkan barang | Distribusi |
| Pedagang menyalurkan barang | Distribusi |
| Ibu membeli beras | Konsumsi |
| Anak memakan roti | Konsumsi |

Feedback salah: *"Coba perhatikan kembali kegiatan yang dilakukan tokoh tersebut."*
Feedback benar: *"Hebat! Kamu berhasil mengelompokkan kegiatan ekonomi."*

**Indikator terkait: 3 — Mengklasifikasikan.**

### Level 3 — Petualangan Produksi ("Bagaimana Roti Dibuat?")
**Cerita:** Festival butuh roti, tapi toko roti Pak Budi kehabisan bahan & alat.
Zara: *"Pak Budi apa saja bahan dan alat yang dibutuhkan pada saat membuat roti?"*
Pak Budi: *"Bahan-bahan yang diperlukan yaitu ada tepung, ragi, air, gula, garam, telur, dan mentega. Sedangkan alat yang dibutuhkan yaitu oven, mixer, wadah, timbangan, loyang, dan sendok."*
Zara (ke siswa): *"Ayo cari bahan dan alat-alat untuk membuat roti bersama!"*

**Misi 1 — Cari Bahan:** pilih 7 bahan benar (tepung, ragi, air, gula, garam, telur, mentega) dari campuran berisi item jebakan.
> ⚠️ **Jebakan bahan direvisi:** BAWANG, JERUK, MINYAK — menggantikan daftar lama (bola/sepatu/buku/mainan/tisu). Asset jebakan lama di Google Drive Level 3 > Bahan sudah tidak relevan (direvisi terpisah di Drive, tidak perlu diubah di kode sekarang — cukup pastikan data konten di kode memakai nama bahan/jebakan yang baru).

**Misi 2 — Pilih Alat:** pilih 6 alat benar (oven, mixer, wadah, timbangan, loyang, sendok) dari campuran berisi item jebakan.
> ⚠️ **Jebakan alat direvisi:** ALAT PEMBAKARAN, KOMPOR, KATEL, BLENDER — menggantikan daftar lama (wajan/kompor/pancingan/helm). Sama seperti bahan, direvisi terpisah di Drive.

Jika bahan/alat yang dipilih belum lengkap, siswa **melengkapi kembali** (bukan otomatis gagal). Tiga jenis feedback:
- Salah: *"Sepertinya ada yang salah, coba perhatikan kembali bahan dan alat yang dibutuhkan sesuai dengan informasi yang didapatkan dari Pak Budi."*
- Benar (lengkap & tepat): *"Keren! Kamu sudah memilih bahan dan alat dengan tepat."*
- Masih kurang (partial): *"Pilihanmu hampir sempurna, perhatikan kembali bahan dan alat yang kurang."*

**Misi 3 — Susun Proses Produksi:** urutkan 5 kartu — Campur bahan → Uleni adonan → Panggang → Adonan matang → Masukkan ke kemasan.

**Indikator 4 — Menjelaskan** *(HYBRID — lihat §5.3)*:
Zara: *"Setelah semua bahan dan alat terkumpul, kita lanjutkan ke proses pembuatan roti!"* → setelah urutan benar:
*"Kamu telah berhasil mengurutkan proses produksi roti, sekarang jelaskan dengan bahasamu secara rinci bagaimana proses produksi roti hingga pada tahap pengemasan!"*
- **Guided (dinilai):** susun/pilih kalimat ringkasan proses dari pilihan yang disediakan, dicocokkan ke target.
- **Refleksi bebas (opsional, tidak dinilai):** kolom teks bebas untuk menjelaskan dengan kata sendiri.

### Level 4 — Jalur Distribusi ("Bagaimana Barang Sampai ke Pembeli?")
**Karakter:** Pak Dimas. **Cerita:** *"Semua produk sudah berhasil dibuat. Namun produk belum dapat dinikmati masyarakat. Bantu Pak Dimas mengirimkan barang ke tempat yang tepat sebelum Festival Produk Lokal dimulai."*

**Misi 1 — Susun Jalur** (2 produk, tidak berubah dari rencana lama):
- **Beras:** Petani → Penggilingan Padi → Distributor → Pasar → Konsumen (5 tahap)
- **Roti:** Pabrik → Distributor → Toko → Konsumen (4 tahap)

**Indikator 5 — Membandingkan** *(baru)*: setelah kedua jalur selesai, muncul pertanyaan (pilihan ganda multi-select):
*"Apa persamaan dan perbedaan perjalanan beras dan roti sampai kepada konsumen?"*
- **Persamaan:** keduanya barang yang diproduksi · keduanya disalurkan sebelum sampai ke konsumen
- **Perbedaan:** beras berasal dari petani dan melalui penggilingan · roti berasal dari pabrik dan langsung didistribusikan melalui distributor

### Level 5 — Misi Detektif Distribusi ("Barang Belum Sampai!")
*(Sebelumnya TBD — sekarang detail lengkap.)*

**Cerita:** Zara mendapat laporan produk Festival belum sampai. *"Waduh! Ada barang yang belum sampai ke toko. Bantu Zara menemukan apa yang menyebabkan masalah distribusi!"*

- **Kasus 1:** jalur "Petani → Konsumen" (lompat tahap penggilingan/distributor/pasar). *"Apa yang salah dengan jalur tersebut?"* → jawaban benar mengarah ke: *"Barang belum melalui proses penyaluran yang tepat."*
- **Kasus 2:** jalur "Pabrik → Konsumen" (lompat distributor & toko). *"Menurutmu, apa yang mungkin terjadi jika barang tidak disalurkan melalui jalur yang sesuai?"*

**Indikator 6 — Menyimpulkan** *(HYBRID)*: setelah kedua kasus, siswa diberi info pendukung (barang harus disalurkan dari produsen · distributor membantu menyalurkan barang · barang sampai ke konsumen), lalu:
*"Apa kesimpulanmu tentang kegiatan distribusi?"*
- **Guided (dinilai):** pilih/susun kalimat kesimpulan dari pilihan tersedia, target: *"Distribusi merupakan kegiatan menyalurkan barang dari produsen agar dapat sampai kepada konsumen."*
- **Refleksi bebas (opsional):** kolom teks bebas.

### Level 6 — Misi Pasar ("Pilih Barang yang Dibutuhkan!")
*(Sebelumnya TBD — sekarang detail lengkap.)*

**Cerita:** Setelah produksi & distribusi selesai, Zara pergi ke pasar. Barang tersedia: **Beras, Roti, Sepatu, Buku, Mainan, Sayuran, Air minum.**

*"Festival membutuhkan makanan untuk para pengunjung. Barang apa saja yang harus dipilih?"* → jawaban benar: Beras, Roti, Sayuran, Air minum (bukan Sepatu/Buku/Mainan).

**Twist — budget terbatas:** *"Uang Zara terbatas. Ia harus memilih barang yang paling dibutuhkan terlebih dahulu."* → siswa memilih barang **dan** alasannya (hybrid: pilihan alasan berpanduan + opsional refleksi bebas kenapa memilih barang itu).

**Indikator 7 — Merangkum** *(HYBRID)*: info pendukung (produksi menghasilkan barang · distribusi menyalurkan barang · konsumsi menggunakan barang untuk memenuhi kebutuhan), lalu:
*"Rangkum perjalanan barang dari produsen sampai digunakan oleh konsumen!"*
- **Guided (dinilai):** target jawaban — *"Barang dibuat melalui kegiatan produksi, kemudian disalurkan melalui kegiatan distribusi, dan akhirnya digunakan oleh konsumen melalui kegiatan konsumsi."*
- **Refleksi bebas (opsional).**

### Level 7 — Misi Akhir ("Selamatkan Festival Produk Lokal!")
*(Level BARU — belum pernah direncanakan sebelumnya. Level integrasi/kulminasi, dikerjakan PALING TERAKHIR — lihat §10.)*

**Cerita:** *"Festival akan dimulai! Semua kegiatan ekonomi harus berjalan dengan baik. Bantu Zara memastikan produksi, distribusi, dan konsumsi berjalan dengan tepat."* Skenario contoh: *"Festival membutuhkan 100 roti."*

Siswa melalui **6 langkah berurutan** (reuse mekanik & asset Level 3 & 4 — **tidak butuh asset baru**):
1. Memilih bahan produksi
2. Memilih alat produksi
3. Menyusun proses produksi
4. Memilih jalur distribusi
5. Menentukan tempat barang sampai
6. Menentukan siapa yang menggunakan barang

**Pertanyaan akhir** *(HYBRID, penutup seluruh game)*: *"Jelaskan bagaimana roti dapat sampai dan digunakan oleh pengunjung Festival Produk Lokal!"* — siswa menghubungkan alur Produksi → Distribusi → Konsumsi (guided: susun/pilih rangkaian kalimat penghubung tahap; opsional refleksi bebas).

Level 7 **tidak menambah indikator baru** — setelah selesai, tampil layar ringkasan akhir: total skor, breakdown skor per 7 indikator, dan pesan penutup perayaan Festival Produk Lokal berhasil.

---

## 5. Sistem Penilaian Pemahaman (Assessment)

Penilaian pemahaman **diintegrasikan langsung ke dalam game** (BUKAN post-test terpisah di luar game) — cara siswa menjawab/berinteraksi di tiap misi itu sendiri yang jadi bahan penilaian.

Indikator mengacu pada **Taksonomi Bloom revisi (kategori "Memahami"/C2 — Anderson & Krathwohl)**, 7 indikator, dengan **mapping pasti ke level** (menggantikan penjelasan generik sebelumnya):

### 5.1 Mapping Indikator → Level

| # | Indikator | Level | Bentuk soal |
|---|---|---|---|
| 1 | Menafsirkan | Level 1 | Pilihan ganda tunggal (4 opsi) |
| 2 | Memberikan contoh | Level 1 | Pilihan ganda tunggal (4 opsi) — 2 soal berurutan (contoh distribusi, contoh konsumsi) |
| 3 | Mengklasifikasikan | Level 2 | TTS + drag-and-drop 3 kategori |
| 4 | Menjelaskan | Level 3 | Susun urutan proses + jelaskan bahasa sendiri (hybrid) |
| 5 | Membandingkan | Level 4 | Pilihan ganda multi-select (persamaan & perbedaan) |
| 6 | Menyimpulkan | Level 5 | Analisis kasus + menyimpulkan (hybrid) |
| 7 | Merangkum | Level 6 | Pilih barang dengan budget terbatas + merangkum (hybrid) |

Level 7 tidak punya indikator baru — ia mengintegrasikan alur produksi→distribusi→konsumsi dari semua level sebelumnya, diakhiri pertanyaan reflektif penutup (juga hybrid).

### 5.2 Sistem Poin

Berlaku di **semua** soal/misi bernilai, di semua level. Butuh **tracking jumlah percobaan** per soal (bukan cuma status benar/salah):

| Kondisi | Poin |
|---|---|
| Jawaban benar pada percobaan **pertama** | **10** |
| Jawaban benar setelah feedback + coba lagi (percobaan ke-2 atau lebih) | **5** |
| Masih salah (belum berhasil / siswa berhenti mencoba) | **0** |

### 5.3 Pendekatan Hybrid (soal reflektif)

Untuk soal bertipe "jelaskan dengan bahasamu sendiri", "apa kesimpulanmu", "berikan alasan" (Level 3, 5, 6, 7):

- **Mekanisme utama (dinilai otomatis, menentukan poin 10/5/0):** jawaban berbentuk **pilihan ganda** atau **susun kalimat dari word bank/pilihan potongan kalimat** yang disediakan, dicocokkan ke jawaban target yang sudah ditentukan.
- **Tambahan opsional (tidak dinilai):** kolom teks bebas ("Coba ceritakan dengan kata-katamu sendiri") disimpan ke Dexie sebagai catatan refleksi untuk direview guru/orang tua nanti — **tidak** ikut logic/skor game.

### 5.4 Skema Data (ringkas — detail teknis penuh ada di TASK.md FASE 1)

Per soal/misi yang dinilai, disimpan:
- `id_soal` — unik per level + indikator
- `jumlah_percobaan` — increment tiap kali siswa submit jawaban salah sebelum benar
- `poin_diperoleh` — 10 / 5 / 0 (dihitung dari jumlah percobaan saat siswa akhirnya benar, atau 0 kalau belum pernah berhasil)
- `indikator_terkait` — 1-7 (tabel §5.1)
- `teks_refleksi_bebas` — opsional, string, khusus soal hybrid, **tidak memengaruhi poin**

Ringkasan yang dihitung dari data di atas (dipakai di layar ending setelah Level 7):
- `total_skor` — jumlah semua `poin_diperoleh`
- `skor_per_indikator` — breakdown 7 indikator

**Tidak ada leaderboard / data terpusat** — tetap prinsip no-backend/local-only (§6). Skor cuma direkap ke layar ringkasan di device siswa sendiri.

---

## 6. Ketentuan Fungsional Penting

- **Tanpa login / tanpa akun.** Tidak ada sistem autentikasi. Data disimpan **lokal di device masing-masing** (per-browser).
- **Progress tersimpan otomatis per-level.** Kalau siswa keluar lalu buka lagi, ia **melanjutkan dari level terakhir** yang belum selesai — TIDAK mengulang dari awal.
- **1 alur besar menyambung** antar level (bukan menu pilih level bebas), walau progress disimpan per-level untuk keperluan resume.
- **Offline-friendly.** Karena semua client-side, idealnya tetap bisa jalan tanpa koneksi setelah asset ter-load.

---

## 7. Platform & Teknis Umum

- **Mobile-first + landscape-locked.** Diutamakan pengalaman di HP (kemungkinan besar HP orang tua siswa), lalu dipastikan tetap baik di desktop/laptop.
- **Orientasi dikunci landscape.** Karena `screen.orientation.lock()` terbatas di browser (terutama iOS Safari), gunakan **fallback overlay** "Putar HP kamu ke mode landscape" yang muncul jika device terdeteksi portrait (deteksi via `window.matchMedia('(orientation: portrait)')`). Overlay ini di layer UI (Svelte/HTML), bukan di dalam Phaser.
- **1 set desain visual & 1 layout** (tidak ada layout portrait terpisah). Perbedaan antar-device ditangani lewat Scale Manager, bukan desain ulang.
- **Hosting:** Vercel (free tier) — cukup karena sepenuhnya static/client-side. Tidak ada backend server.

---

## 8. Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| **Game core** | **Phaser.js** | Game engine 2D web: scene management, drag-drop bawaan, sprite, scale manager, animasi — pas untuk game misi interaktif ini |
| **UI overlay** | **Svelte** | UI di luar canvas (menu, modal skor, overlay orientasi, komponen assessment hybrid). Ringan, bundle kecil, cocok untuk overlay tipis di atas canvas Phaser |
| **Data lokal** | **IndexedDB via Dexie.js** | Simpan progress per-level, status misi, hasil assessment (termasuk jumlah percobaan, poin, refleksi bebas — §5.4). Async (tidak blocking game loop), scalable |
| **Build tool** | **Vite** | Cepat, modern, dukungan bagus untuk Svelte & Phaser |
| **Hosting** | **Vercel** (free) | Static hosting + CDN, cukup untuk client-side |

### Prinsip arsitektur Phaser ↔ UI
- Phaser di-mount di sebuah `<div>` container; ia punya render loop sendiri (canvas/WebGL).
- UI overlay (Svelte) ada di layer terpisah di atas/luar canvas — termasuk komponen assessment baru (TTS, susun kalimat, refleksi bebas — DESIGN.md §11).
- Komunikasi antara Phaser dan UI lewat **event emitter** (`eventBridge`) — Phaser `emit` event (misal `score-updated`, `level-complete`), UI `on`/listen dan update tampilannya. UI TIDAK ikut mengatur render loop game.
- Dexie diakses dari layer state (bisa dari UI maupun dari scene lewat service module).

---

## 9. Sumber & Manajemen Asset

Asset dikerjakan terpisah oleh anggota tim lain dan dikumpulkan di Google Drive ("Economy Adventure - Asset Bank") dengan struktur folder per-level. Tiap folder punya `README.md` berisi daftar file, format, ukuran, dan detail/prompt.

**Pembagian sumber asset:**
- **Asset besar (karakter & background):** AI-generated, gaya flat 2D/vector, lalu dirapikan manual.
- **Asset kecil (item, ikon):** dari Freepik/Flaticon, dipilih yang gayanya senada.

**Format asset:**
- Karakter, item, ikon, UI → **PNG transparan** (atau WebP transparan)
- Background full-scene → **WebP** (fallback JPG/PNG)
- Semua asset final idealnya di-convert ke **WebP** sebelum dipakai (hemat ukuran, penting untuk mobile).

**Lokasi folder asset di project** (bukan `src/`, karena Phaser me-load asset lewat URL string, bukan `import` — harus ada di `public/`):
```
public/
└── assets/
    ├── characters/    # karakter_zara_*, karakter_pakali_*, karakter_paktono_*, karakter_businta_*,
    │                  # karakter_pakrudi_*, karakter_ani_*, karakter_pakbudi_*, karakter_pakdimas_*
    ├── ui/            # ui_tombol_*, ui_icon_*, ui_frame_*, ui_progressbar_*, ui_badgepoin_*
    ├── backgrounds/   # bg_level1_* .. bg_level7_*
    ├── level1/        # (tanpa objek truk/pabrik lagi — 4 tokoh + Pak Ali)
    ├── level2/        # kartu_klasifikasi_*, tts_*
    ├── level3/        # bahan_*, alat_*, jebakan_* (bawang/jeruk/minyak, alat pembakaran/kompor/katel/blender), proses_*
    ├── level4/        # distribusi_*
    ├── level5/        # (baru) detektif_*, kasus_*
    ├── level6/        # (baru) pasar_barang_*
    ├── level7/        # (baru — kemungkinan besar reuse asset level 1-6, minim asset baru)
    └── audio/         # sfx_*, bgm_* (jika dipakai)
```
Struktur folder ini sinkron dengan struktur folder Google Drive "Economy Adventure - Asset Bank" — jadi saat asset final diterima, tinggal disalin ke folder yang namanya paralel.

**Konvensi penamaan file asset:**
- Karakter: `karakter_<nama>_<pose>.png` (mis. `karakter_zara_idle.png`, `karakter_pakali_idle.png`)
- UI: `ui_<jenis>_<nama>.png` (mis. `ui_tombol_mulai.png`, `ui_badgepoin_plus10.png`)
- Kartu klasifikasi Level 2: `kartu_klasifikasi_<nama>.png`
- Bahan/alat Level 3 (**daftar jebakan sudah direvisi**, lihat §4 Level 3): `bahan_<nama>.png`, `alat_<nama>.png`, jebakan `jebakan_<nama>.png` (mis. `jebakan_bawang.png`, `jebakan_katel.png`)
- Kartu proses Level 3: `proses_<nama>.png`
- Ikon kategori: `icon_kategori_<nama>.png`
- Ikon distribusi Level 4: `distribusi_<nama>.png`
- Barang Level 6: `barang_<nama>.png`
- Background: `bg_level<n>_<nama>.png/webp`

**Catatan reuse:**
- Petani & pedagang di Level 1 memakai ulang `karakter_paktono_fullbody.png` & `karakter_businta_fullbody.png`.
- Ikon `distribusi_distributor` & `distribusi_konsumen` di Level 4 dipakai ulang untuk jalur beras & roti, dan juga di Level 5 (kasus distribusi) & Level 7.
- Level 7 secara sengaja didesain **tidak butuh asset baru** — reuse bahan/alat/proses (Level 3) & jalur distribusi (Level 4).

---

## 10. Ruang Lingkup Pengembangan Saat Ini

**Dikerjakan sekarang:** Main Menu + **Level 1-7 lengkap** + sistem progress/resume + sistem assessment (termasuk sistem poin & hybrid guided+refleksi) + overlay orientasi.

**Urutan prioritas:** Level 1 → 2 → 3 → 4 → 5 → 6 dulu sampai matang, **Level 7 dikerjakan paling akhir** karena levelnya integrasi (reuse mekanik & asset lama, bukan level baru dari nol) — lihat TASK.md.

**Timeline target klien:** sekitar Oktober–November.
