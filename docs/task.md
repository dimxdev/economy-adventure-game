# TASK.md — Economy Adventure

> Checklist urutan pengerjaan. Kerjakan **berurutan dari atas** — tiap fase membangun di atas fase sebelumnya. Centang `[x]` kalau sudah selesai. Baca `PROJECT.md` (apa & bagaimana) dan `DESIGN.md` (tema visual) sebelum mulai.
>
> Legenda: `[ ]` belum · `[x]` selesai · `[~]` sedang dikerjakan
>
> **Revisi brief klien:** scope berubah dari Level 1-4 (+2 TBD) jadi **7 level lengkap** + sistem poin. Fase-fase di bawah sudah direnumber & direvisi mengikuti PROJECT.md versi terbaru. Fase yang sudah `[x]` sebelumnya TIDAK di-reset kecuali disebutkan eksplisit — lihat catatan "⚠️ perlu ditinjau ulang" di tiap fase yang isinya berubah.

---

## FASE 0 — Setup Project & Fondasi

> **Package manager: gunakan Bun** (bukan npm/yarn). Semua perintah install & run pakai `bun install`, `bun run dev`, `bun run build`, dst. Vercel otomatis mendeteksi lockfile Bun dan build memakai Bun tanpa konfigurasi tambahan.

- [x] Inisialisasi project **Vite + Svelte**
- [x] Install & konfigurasi **Phaser.js**
- [x] Install **Dexie.js** (wrapper IndexedDB)
- [x] Setup struktur folder project (`src/game`, `src/components`, `src/services`, `src/data`)
- [x] Setup `config.js`: base resolution **1280×720**, `Scale.FIT`, `autoCenter`, physics **arcade**
- [x] Buat `GameContainer` (mount Phaser ke `<div>`, cleanup saat unmount)
- [x] Setup `eventBridge.js` (event emitter global Phaser ↔ Svelte)
- [x] Pasang **Google Fonts**: Fredoka (display) + Nunito (body)
- [x] Definisikan **design tokens** (warna DESIGN.md §3, radius, spacing) sebagai CSS variables
- [x] Setup **Dexie schema** dasar untuk progress
- [x] Pastikan project bisa `dev` & `build` tanpa error

---

## FASE 1 — Sistem Inti (Progress, Resume, State, Skor)

- [x] Rancang skema **Dexie** untuk progress: `currentLevel`, status penyelesaian tiap level, settings
- [x] Buat `services/progress.js`: `loadProgress()`, `setCurrentLevel()`, `markLevelComplete()`, `resetProgress()` (semua async)
- [x] Buat **Scene Registry / urutan level** yang fleksibel (`src/data/levels.js` + `src/game/sceneRegistry.js`)
- [x] Implement logika **resume**: `tentukanTujuanAwal()` + BootScene
- [x] Uji: selesaikan sebagian, reload browser, lanjut dari titik terakhir

**Tambahan baru (sistem poin — PROJECT.md §5.2-§5.4):**
- [x] Tabel Dexie baru `soalHasil`: `idSoal` (unik per level+soal, PK), `jumlahPercobaan`, `poinDiperoleh` (10/5/0), `indikator`, `refleksi` (opsional, tidak memengaruhi skor) — `db.js` v2
- [x] Fungsi di `services/progress.js`: `catatJawaban(idSoal, { level, indikator, benar, refleksi })` — increment `jumlahPercobaan`, hitung poin (10 di percobaan ke-1, 5 di percobaan ≥2, 0 kalau belum pernah benar), simpan
- [x] Fungsi `getSkorSummary()`: hitung `totalSkor` + `skorPerIndikator` (breakdown 7 indikator) dari tabel `soalHasil` — dipakai layar ending (FASE 11)
- [x] Uji: jawab salah lalu benar pada 1 soal → poin tercatat 5, bukan 10 atau 0 (diverifikasi di Level 1 — FASE 4)
- [x] Mapping indikator Level 1 di `src/data/levels.js` disesuaikan ke PROJECT.md §5.1 (`[MENAFSIRKAN, MEMBERI_CONTOH]`). Level 2-4 masih lama, menyusul saat FASE masing-masing.

---

## FASE 2 — Overlay & Kerangka UI Global

- [x] **Overlay orientasi**: deteksi portrait via `matchMedia`, tampilkan ajakan putar HP
- [x] **HUD global**: judul level + progress bar, tombol kembali ke menu, tombol mute
- [x] **Komponen modal/dialog** reusable: dialog box, panel materi, feedback benar/salah
- [x] Hubungkan ke `eventBridge` (scene Phaser ↔ overlay Svelte)
- [x] Uji komunikasi Phaser → UI

**Catatan:** komponen assessment baru (TTS, susun kalimat, refleksi bebas, badge poin — DESIGN.md §11) dibangun progresif mulai FASE 5 & 6 (saat pertama dibutuhkan), bukan di sini.

---

## FASE 3 — Boot, Preload & Main Menu

- [x] **BootScene**: baca progress, lanjut ke Preload
- [x] **PreloadScene**: loading bar, tunggu font, manifest aset, sistem placeholder otomatis
- [x] **MenuScene**: logo, Zara, narasi ajakan, tombol Mulai/Lanjutkan, tombol Tujuan Belajar
- [x] Uji alur: Menu → Mulai → Level 1
- [ ] ⚠️ **Perlu ditinjau ulang:** teks narasi di `MenuScene.js` saat ini generik ("Ayo bantu warga Desa Sejahtera...") dan belum memakai narasi pembuka first-person + menyebut Pak Ali sesuai PROJECT.md §2 (*"Halo! Aku Zara..."*). Revisi teksnya saat mengerjakan level berikutnya atau sebagai polish kecil terpisah.

---

## FASE 4 — Level 1: Misi Pengamatan ✅

- [x] **Level1Scene**: pasang background (`bg_level1`), 4 tokoh yang bisa diklik: **Pak Tono** (petani), **Bu Sinta** (pedagang), **Pak Rudi** (kurir — baru), **Ani** (pembeli — baru). Tanpa objek truk/pabrik terpisah.
- [x] Tambahkan **Pak Ali** sebagai lawan bicara dialog Zara sepanjang level (bukan objek diamati — pemandu tanya-jawab, dialog-only)
- [x] Misi 1 — Amati: klik tiap tokoh (berulang) → narasi aktivitas (teks persis PROJECT.md §4)
- [x] Indikator 1 (Menafsirkan): 1 soal pilihan ganda 4 opsi (aktivitas Pak Tono) + feedback benar/salah + retry mengarahkan eksplor ulang (wajib klik ≥1 tokoh lagi sebelum tombol Lanjut aktif)
- [x] Indikator 2 (Memberikan contoh): 2 soal pilihan ganda berurutan (contoh distribusi, contoh konsumsi) + feedback spesifik per opsi salah + dialog pembuka Pak Ali→Zara sebelum soal pertama
- [x] Dialog penutup Pak Ali
- [x] Simpan hasil tiap soal via `catatJawaban()` (indikator menafsirkan & memberi-contoh) + `markLevelComplete('level1')`
- [x] Data konten (narasi tokoh, soal, opsi, feedback) ke `src/data/level1.js`
- [x] **Tidak ada** drag & drop kategori di level ini (sudah pindah ke Level 2 — FASE 5)
- [x] Komponen baru **QuizPanel.svelte** (pilihan ganda reusable, dipakai lagi di level lain) + event `show-quiz`/`ui:submit-quiz` di eventBridge
- [x] Uji lengkap Level 1 end-to-end di browser: alur amati → soal1 (salah→amati ulang→benar, 5 poin) → soal2a (benar langsung, 10 poin) → soal2b (salah→benar, 5 poin) → penutup → `markLevelComplete` → lanjut scene. Total 20 poin tercatat benar, nol error console.

---

## FASE 5 — Level 2: Misi Klasifikasi

> Level BARU — menggantikan rencana lama "Tebak Profesi". Belum ada kode ditulis untuk level ini.

- [ ] **Level2Scene**: cerita kartu aktivitas tercampur di booth
- [ ] Komponen **TTS (teka-teki silang)** baru (DESIGN.md §11.1), reusable — 3 definisi → PRODUKSI/DISTRIBUSI/KONSUMSI
- [ ] Mekanik **drag & drop 3 kategori** (warna konsisten DESIGN.md §3) — 6 kartu sesuai tabel PROJECT.md §4 Level 2
- [ ] Feedback benar/salah (teks di PROJECT.md)
- [ ] Simpan hasil (indikator 3: Mengklasifikasikan) via `catatJawaban()` + `markLevelComplete('level2')`
- [ ] Data konten ke `src/data/level2.js` (soal TTS + kartu klasifikasi)
- [ ] Uji lengkap Level 2 (TTS + drag-drop)

---

## FASE 6 — Level 3: Petualangan Produksi

> ⚠️ Belum ada kode level-spesifik ditulis — langsung pakai daftar bahan/alat jebakan BARU di bawah, bukan yang lama.

- [ ] **Level3Scene**: dialog Pak Budi (teks persis PROJECT.md §4 Level 3)
- [ ] Misi 1 — Pilih bahan benar: 7 bahan (tepung, ragi, air, gula, garam, telur, mentega) + jebakan **BAWANG, JERUK, MINYAK**
- [ ] Misi 2 — Pilih alat benar: 6 alat (oven, mixer, wadah, timbangan, loyang, sendok) + jebakan **ALAT PEMBAKARAN, KOMPOR, KATEL, BLENDER**
- [ ] Dukung pemilihan partial (belum lengkap → feedback "hampir sempurna", bukan gagal langsung) — 3 jenis feedback (teks di PROJECT.md)
- [ ] Misi 3 — Susun urutan proses (5 kartu: campur → uleni → panggang → matang → kemasan)
- [ ] Indikator 4 (Menjelaskan) — HYBRID: bangun komponen **reusable** "susun/pilih kalimat" (DESIGN.md §11.2) + "kolom refleksi bebas" (DESIGN.md §11.3) — dipakai lagi di Level 5, 6, 7
- [ ] Simpan hasil (indikator 4) via `catatJawaban()` + `markLevelComplete('level3')`
- [ ] Data konten ke `src/data/level3.js` — **pastikan nama bahan/alat jebakan pakai daftar baru**, bukan bola/sepatu/wajan/helm lama
- [ ] Uji lengkap Level 3 (bahan, alat, urutan, komponen hybrid)

---

## FASE 7 — Level 4: Jalur Distribusi

- [ ] **Level4Scene**: dialog Pak Dimas, susun 2 jalur (Beras 5 tahap, Roti 4 tahap) — tidak berubah dari rencana lama
- [ ] Indikator 5 (Membandingkan) — **baru**: soal multi-select persamaan & perbedaan jalur Beras vs Roti (opsi di PROJECT.md §4 Level 4)
- [ ] Simpan hasil (indikator 5) via `catatJawaban()` + `markLevelComplete('level4')`
- [ ] Data konten ke `src/data/level4.js` (dua jalur + soal membandingkan)
- [ ] Uji lengkap Level 4

---

## FASE 8 — Level 5: Misi Detektif Distribusi

> Level penuh baru (sebelumnya TBD).

- [ ] **Level5Scene**: cerita Zara dapat laporan barang belum sampai
- [ ] Kasus 1: jalur "Petani → Konsumen" (lompat tahap) — soal apa yang salah
- [ ] Kasus 2: jalur "Pabrik → Konsumen" (lompat distributor & toko) — soal akibat kalau barang tidak disalurkan lewat jalur sesuai
- [ ] Indikator 6 (Menyimpulkan) — HYBRID: info pendukung + susun/pilih kalimat kesimpulan (reuse komponen FASE 6) — target di PROJECT.md §4 Level 5 + refleksi bebas opsional
- [ ] Simpan hasil (indikator 6) via `catatJawaban()` + `markLevelComplete('level5')`
- [ ] Data konten ke `src/data/level5.js`
- [ ] Uji lengkap Level 5

---

## FASE 9 — Level 6: Misi Pasar

> Level penuh baru (sebelumnya TBD).

- [ ] **Level6Scene**: cerita Zara di pasar — barang tersedia: Beras, Roti, Sepatu, Buku, Mainan, Sayuran, Air minum
- [ ] Misi 1: pilih barang makanan/minuman yang dibutuhkan festival (benar: Beras, Roti, Sayuran, Air minum)
- [ ] Twist budget terbatas: pilih barang paling dibutuhkan + pilih alasan (guided)
- [ ] Indikator 7 (Merangkum) — HYBRID: info pendukung + susun/pilih kalimat rangkuman (reuse komponen FASE 6) — target di PROJECT.md §4 Level 6 + refleksi bebas opsional
- [ ] Simpan hasil (indikator 7) via `catatJawaban()` + `markLevelComplete('level6')`
- [ ] Data konten ke `src/data/level6.js`
- [ ] Uji lengkap Level 6

---

## FASE 10 — Level 7: Misi Akhir

> ⚠️ **Dikerjakan PALING TERAKHIR**, setelah Level 1-6 matang. Level integrasi — reuse mekanik & asset lama, **tidak butuh asset baru**. Jangan mulai fase ini sebelum FASE 4-9 selesai.

- [ ] **Level7Scene**: skenario besar (mis. "Festival membutuhkan 100 roti")
- [ ] 6 langkah berurutan reuse mekanik: pilih bahan → pilih alat → susun proses (reuse Level 3) → pilih jalur distribusi → tentukan tempat sampai → tentukan pengguna (reuse Level 4-6)
- [ ] Pertanyaan akhir HYBRID penutup seluruh game: hubungkan Produksi → Distribusi → Konsumsi (reuse komponen susun kalimat + refleksi bebas)
- [ ] Tidak ada indikator baru — hasil tetap tercatat via `catatJawaban()` ke salah satu dari 7 indikator existing sesuai desain soal final
- [ ] `markLevelComplete('level7')`
- [ ] Data konten ke `src/data/level7.js`
- [ ] Uji lengkap Level 7 + **uji regresi** Level 1-6 (pastikan tidak rusak)

---

## FASE 11 — Penyelesaian Cerita & Assessment Akhir

- [ ] Scene **penutup/ending**: Festival Produk Lokal berhasil, rangkuman perjalanan Zara
- [ ] Tampilkan **total skor** + **breakdown skor per 7 indikator** (pakai `getSkorSummary()` dari FASE 1) — bukan lagi ringkasan generik
- [ ] Opsi **ulangi dari awal** / reset progress

---

## FASE 12 — Polish, Audio & Optimasi

- [ ] Tambahkan **audio** (SFX + BGM) dengan toggle mute
- [ ] Pas-kan semua animasi/transisi (feedback, drag, scene transition, badge poin) — halus, tidak berlebihan
- [ ] **Optimasi asset**: convert ke WebP, kompres, cek total ukuran (penting untuk HP)
- [ ] Uji performa di **HP kelas menengah-bawah**
- [ ] Cek keterbacaan teks & ukuran hit-area di layar HP kecil sungguhan
- [ ] Cek konsistensi warna kategori & gaya visual di semua 7 level (DESIGN.md)

---

## FASE 13 — Testing & QA

- [ ] Uji alur penuh Menu → Level 1 → 2 → 3 → 4 → 5 → 6 → 7 → ending
- [ ] Uji **resume** dari tiap level (keluar-masuk di berbagai titik)
- [ ] Uji **sistem poin** (10/5/0) konsisten di semua level & soal hybrid
- [ ] Uji kolom refleksi bebas tersimpan tapi tidak memengaruhi skor
- [ ] Uji di beberapa browser (Chrome, Firefox, Safari — terutama Safari iOS untuk orientasi)
- [ ] Uji di beberapa ukuran/rasio layar (16:9, 18:9, 20:9)
- [ ] Uji reset progress berjalan bersih
- [ ] Cek tidak ada error di console

---

## FASE 14 — Deploy

- [ ] `bun run build` — pastikan build sukses tanpa error
- [ ] Deploy ke **Vercel** (free tier)
- [ ] Uji versi production (loading asset via CDN, orientasi, resume, semua 7 level, skor)
- [ ] Siapkan dokumentasi singkat untuk klien (cara pakai / demo)

---

## Catatan Prioritas

- Urutan **FASE 0 → 3 wajib beres dulu** sebelum menyentuh level — sudah beres, ini fondasinya.
- **Pisahkan data konten dari logika** (folder `src/data/`) — makin penting sekarang karena 7 level + komponen hybrid reusable.
- **Level 7 jangan dikerjakan lebih dulu** dari Level 1-6 — ia reuse mekanik & asset, jadi harus menunggu semuanya matang (lihat FASE 10).
- Komponen assessment baru (TTS, susun kalimat, refleksi bebas) dibangun **reusable** sejak Level 3 (FASE 6) supaya Level 5, 6, 7 tinggal pakai ulang — jangan ditulis ulang tiap level.
