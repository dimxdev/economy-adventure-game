# DESIGN.md — Economy Adventure

> Dokumen ini menetapkan **arah visual & tema** game. Tujuannya supaya seluruh tampilan (asset, UI, warna, tipografi, animasi) terasa satu kesatuan dan konsisten. Baca ini sebelum membuat komponen UI atau menata scene.

---

## 1. Prinsip Desain Utama

1. **Ramah anak, hangat, ceria — bukan childish murahan.** Target usia 10-12 tahun. Visual harus cerah dan mengundang, tapi tetap rapi dan "berkelas" supaya juga nyaman dilihat guru/orang tua.
2. **Kejelasan di atas dekorasi.** Karena ini media belajar di layar (sering HP kecil), keterbacaan & kejelasan interaksi (mana yang bisa diklik/di-drag) LEBIH penting daripada estetika ramai. Setiap elemen dekoratif harus punya alasan.
3. **Konsisten satu dunia.** Semua karakter, background, dan ikon memakai satu gaya ilustrasi (flat 2D/vector), satu palet warna, dan satu "bahasa bentuk" (rounded/membulat). Tidak boleh terasa seperti tempelan dari sumber berbeda.
4. **Feedback selalu ramah.** Jawaban salah TIDAK boleh terasa menghukum. Warna & ikon feedback salah harus netral-mendorong ("ayo coba lagi"), bukan menakutkan.
5. **Mobile-first + landscape.** Semua keputusan ukuran, jarak sentuh, dan tata letak mengasumsikan layar HP landscape lebih dulu.

---

## 2. Gaya Ilustrasi

- **Jenis:** Flat 2D / vector illustration. BUKAN realistis, BUKAN pixel art, BUKAN 3D.
- **Proporsi karakter:** Sedikit *chibi* — kepala agak besar dibanding badan, imut & ramah, konsisten di semua karakter.
- **Outline:** Garis tegas dan jelas (bukan sketchy/tipis), supaya bentuk mudah terbaca di layar kecil.
- **Bayangan:** Datar/sederhana (flat shadow), hindari gradient realistis yang berat. Boleh sedikit soft shadow untuk memisahkan elemen dari background.
- **Ekspresi:** Ekspresif dan jelas (senang, berpikir, bangga) — penting untuk menyampaikan mood cerita ke anak.

---

## 3. Palet Warna

Palet mengambil nuansa "desa yang cerah, hangat, dan hidup" — hijau alam, langit cerah, dan aksen hangat produk lokal. Enam warna inti:

| Nama | Hex | Peran |
|------|-----|-------|
| **Daun Muda** (primary) | `#5CB85C` | Warna utama: tombol aksi (Mulai/Lanjut), kategori Produksi, elemen positif |
| **Langit Cerah** (secondary) | `#4FA9E0` | Warna sekunder: kategori Konsumsi, aksen sejuk, elemen informatif |
| **Mentari Hangat** (accent) | `#F5A623` | Aksen: kategori Distribusi, highlight, reward, penarik perhatian |
| **Krem Kertas** (surface) | `#FBF6EC` | Latar panel/modal/kartu, area teks — hangat, tidak menyilaukan |
| **Cokelat Tanah** (ink) | `#4A3B2A` | Warna teks utama & outline — lebih lembut & hangat dari hitam murni |
| **Merah Bata Lembut** (warning) | `#E4685A` | Feedback "belum tepat" / perhatian — merah yang tidak galak |

**Warna netral pendukung:**
- Putih bersih `#FFFFFF` — untuk highlight kecil / area sangat terang
- Abu lembut `#D8D2C6` — untuk elemen non-aktif, progress bar kosong, disabled state

**Aturan pemakaian warna kategori (penting, konsisten di semua level):**
- 🟢 **Produksi** → Daun Muda `#5CB85C`
- 🟠 **Distribusi** → Mentari Hangat `#F5A623`
- 🔵 **Konsumsi** → Langit Cerah `#4FA9E0`

> Warna kategori ini harus SAMA di mana pun (Level 1, Level 2, materi, ikon), supaya siswa membangun asosiasi warna→konsep yang konsisten.

---

## 4. Tipografi

Karena target anak SD, prioritas utama adalah **keterbacaan** dan **kesan ramah/bulat**. Pakai dua typeface yang jelas berbeda peran:

| Peran | Typeface | Karakter | Catatan |
|-------|----------|----------|---------|
| **Display / Judul / Tombol** | **Fredoka** (atau Baloo 2) | Bulat, tebal, playful | Untuk judul game, label tombol, header level. Kesan ceria & ramah anak |
| **Body / Dialog / Materi** | **Nunito** (atau Quicksand) | Sans-serif bulat, sangat mudah dibaca | Untuk teks dialog, penjelasan materi, instruksi. Rounded terminals biar senada dengan display |

**Aturan tipografi:**
- Ukuran teks dialog/materi harus cukup besar & nyaman dibaca anak — jangan terlalu kecil di layar HP. Uji di layar kecil.
- Line-height agak longgar (≈1.5) untuk body, supaya anak mudah mengikuti baris.
- Panjang baris teks materi jangan terlalu lebar — pecah ke dalam panel dengan lebar terbatas.
- Hindari ALL CAPS untuk kalimat panjang (boleh untuk label tombol pendek seperti "MULAI").
- Kedua font tersedia gratis di Google Fonts.

---

## 5. Bahasa Bentuk (Shape Language)

- **Serba membulat.** Sudut tombol, kartu, panel, dan modal semuanya *rounded* (radius cukup besar). Hindari sudut tajam 90° — kesan tajam terasa "keras" untuk anak.
- **Tombol** terlihat "bisa ditekan": warna solid + sedikit shadow/tebal di bagian bawah (efek 3D lembut).
- **Kartu drag-and-drop** punya bentuk konsisten (rounded rectangle), dengan bayangan halus saat diangkat/di-drag supaya terasa "terangkat".
- **Ikon kategori** dalam wadah lingkaran atau rounded square yang seragam.

---

## 6. Layout & Tata Letak (Landscape)

- **Base resolution acuan:** `1280×720` (rasio 16:9), di-scale via Phaser Scale Manager (mode FIT) agar proporsional di berbagai rasio device. Elemen penting jangan mepet tepi kiri/kanan (antisipasi letterbox di rasio berbeda seperti 18:9/20:9).
- **Zona umum tiap scene:**
  - **Atas:** HUD tipis — indikator level/progress bar, tombol kembali/menu, (opsional) tombol suara.
  - **Tengah:** area utama interaksi (objek yang diklik / area drag-drop / kartu urutan).
  - **Bawah:** area dialog/instruksi Zara (dialog box), atau tray kartu yang bisa di-drag.
- **Karakter pemandu (Zara)** biasanya muncul di sisi kiri-bawah saat memberi instruksi/dialog.
- **Area drop** (kategori/slot urutan) dibuat cukup besar & jelas batasnya, dengan highlight saat ada item di-drag mendekat (drag-over state).

---

## 7. Komponen UI Standar

| Komponen | Deskripsi visual |
|----------|------------------|
| **Tombol utama** | Rounded, warna Daun Muda (aksi positif) / Mentari (ulangi) / Langit atau abu (menu), teks Fredoka tebal, shadow bawah lembut |
| **Dialog box** | Panel Krem Kertas rounded, border warna aksen lembut, teks Nunito, opsional "ekor" speech-bubble ke arah karakter |
| **Panel materi** | Panel Krem Kertas lebih besar, boleh ada ikon kecil penanda "belajar", teks Nunito ukuran nyaman |
| **Feedback benar** | Ikon bintang emas + panel border hijau, animasi kecil ceria |
| **Feedback salah** | Ikon silang (rounded, Merah Bata Lembut) + panel border merah lembut, pesan mendorong coba lagi — TIDAK galak |
| **Progress bar** | Pill rounded; kosong = Abu lembut, terisi = Daun Muda / gradasi hangat; marker level bulat |
| **Overlay orientasi** | Full-screen, latar warna tenang, ikon HP berputar + teks "Putar HP kamu ke mode landscape" |

---

## 8. Animasi & Motion

- **Prinsip:** motion secukupnya untuk memberi *feedback* dan *mengarahkan perhatian*, bukan pamer efek. Jangan berlebihan (anak mudah terdistraksi, dan berat di HP low-end).
- **Motion yang dianjurkan (berbasis aksi):**
  - Kartu "terangkat" saat mulai di-drag (skala sedikit membesar + shadow).
  - Area drop menyala/highlight saat item didekatkan.
  - Feedback benar: bintang muncul dengan pop kecil + sedikit partikel (confetti mini).
  - Feedback salah: item kembali ke posisi asal dengan gerak halus (bukan "ditolak" kasar).
  - Transisi antar scene: fade sederhana (jangan transisi rumit).
- **Batasi** animasi non-aksi yang jalan terus-menerus. Hormati `prefers-reduced-motion` bila memungkinkan.

---

## 9. Audio (opsional, jika dimasukkan)

- **SFX:** klik/tap, jawaban benar (nada ceria naik), jawaban salah (nada netral lembut, bukan "buzzer" kasar), transisi/selesai level.
- **BGM:** musik latar ringan & riang, volume rendah. **Wajib ada toggle mute** (game mungkin dipakai di kelas).
- Semua audio harus bisa dimatikan; jangan auto-play keras.

---

## 10. Aksesibilitas & Quality Floor

- Kontras teks terhadap latar cukup tinggi (teks Cokelat Tanah di atas Krem Kertas aman).
- Target sentuh (hit area) untuk drag-drop minimal nyaman untuk jari anak (idealnya ≥ 44×44 px area efektif), meski ikonnya kecil.
- Jangan mengandalkan **warna saja** untuk menyampaikan makna — dukung dengan ikon/teks (mis. kategori punya warna + ikon + label).
- Uji tampilan di layar HP kecil sungguhan, bukan hanya di desktop.

---

## 11. Komponen Assessment Baru (Level 2, 3, 5, 6, 7)

> Ditambahkan mengikuti revisi brief klien: TTS, soal hybrid (guided + refleksi bebas), dan sistem poin. Tidak ada warna baru — semua tetap pakai palet §3.

### 11.1 TTS (Teka-Teki Silang) — Level 2
- Grid kotak **uniform**, rounded kecil (radius `--radius-sm`), border Cokelat Tanah.
- Kotak kosong/belum diisi = Abu lembut; kotak aktif/sedang dikerjakan = Krem Kertas dengan border Mentari Hangat (fokus).
- Huruf terisi: Fredoka atau Nunito bold, ukuran cukup besar untuk dibaca di HP kecil.
- Nomor soal kecil di pojok kiri-atas kotak pertama tiap kata (gaya angka index kecil, ink pudar).
- Highlight baris/kolom kata yang sedang aktif dengan warna kategori terkait bila relevan ke definisi produksi/distribusi/konsumsi.

### 11.2 Susun/Pilih Kalimat (Sentence Builder) — soal hybrid Level 3, 5, 6, 7
Dua varian, pilih yang paling pas per soal:
- **Susun dari word bank:** chip kata/frasa berbentuk *pill* rounded (mirip kartu drag di level lain) mengambang di tray bawah — warna Krem Kertas + border Cokelat Tanah tipis. Slot kalimat digambar sebagai garis putus-putus rounded; terisi saat chip di-drop. Validasi baru dijalankan saat tombol "Periksa" ditekan (bukan real-time), supaya siswa bebas menyusun ulang dulu.
- **Pilihan ganda kalimat penuh:** tiap opsi jadi card rounded terpisah (mirip tombol tapi lebih lebar, teks Nunito rata kiri); dipilih → border jadi Daun Muda tebal (state "terpilih"), seperti radio button versi kartu.

Style benar/salah pada submit ikuti §7 (Feedback benar/salah) — bukan gaya baru.

### 11.3 Kolom Refleksi Bebas (opsional, tidak dinilai)
Harus **terasa jelas berbeda** dari komponen wajib di atas, supaya anak (dan guru/orang tua yang mereview) langsung tahu ini boleh dikosongkan:
- Textarea rounded dengan **border putus-putus (dashed)** Abu lembut — bukan border solid seperti elemen wajib.
- Label kecil, italic, warna Cokelat Tanah 70% opacity: *"(opsional — tidak dinilai)"* di atas kolom.
- Placeholder ramah: *"Coba ceritakan dengan kata-katamu sendiri... (boleh dikosongkan)"*.
- Kalau field ini berdiri di step tersendiri, sediakan tombol "Lewati" di sebelah tombol "Kirim" — sama pentingnya secara visual (jangan dibuat kecil/tersembunyi).

### 11.4 Badge Poin
- Muncul menempel di **FeedbackModal benar** (§7), pojok kanan-atas card: pill kecil warna Mentari Hangat, teks putih Fredoka `"+10 Poin"` atau `"+5 Poin"`.
- Animasi pop-in bersamaan dengan bintang feedback benar (§8) — bukan animasi terpisah.
- **0 poin TIDAK ditampilkan sebagai badge.** Feedback salah tetap pakai styling feedback salah biasa (§7) tanpa badge "+0" — supaya tidak berkesan menghukum, konsisten dengan prinsip §1.4.
