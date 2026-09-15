import { INDIKATOR } from './indikator.js';

/**
 * Konten Level 1 — Misi Pengamatan ("Apa yang Sedang Mereka Lakukan?")
 * Teks & struktur soal mengikuti PROJECT.md §4 Level 1 (revisi brief klien) persis —
 * kalau klien revisi lagi, cukup ubah file ini, tidak perlu sentuh Level1Scene.js.
 */

/** 4 tokoh yang bisa diklik siswa (Misi 1 — Amati). Truk/pabrik sengaja TIDAK ada lagi. */
export const TOKOH_L1 = [
  {
    id: 'paktono',
    textureKey: 'karakter_paktono',
    nama: 'Pak Tono',
    peran: 'Petani',
    narasi: 'Pak Tono menanam padi untuk menghasilkan beras.',
  },
  {
    id: 'businta',
    textureKey: 'karakter_businta',
    nama: 'Bu Sinta',
    peran: 'Pedagang',
    narasi: 'Bu Sinta menjual sayuran kepada pembeli.',
  },
  {
    id: 'pakrudi',
    textureKey: 'karakter_pakrudi',
    nama: 'Pak Rudi',
    peran: 'Kurir',
    narasi: 'Pak Rudi mengantarkan barang dari penjual kepada pembeli.',
  },
  {
    id: 'ani',
    textureKey: 'karakter_ani',
    nama: 'Ani',
    peran: 'Pembeli',
    narasi: 'Ani membeli makanan untuk memenuhi kebutuhannya.',
  },
];

/**
 * 3 soal berurutan: 1 soal Indikator 1 (Menafsirkan), lalu 2 soal Indikator 2
 * (Memberikan contoh — distribusi, lalu konsumsi).
 */
export const SOAL_L1 = [
  {
    idSoal: 'l1-indikator1-paktono',
    indikator: INDIKATOR.MENAFSIRKAN,
    penanya: 'Pak Ali',
    pertanyaan: 'Apa yang sedang dilakukan oleh Pak Tono?',
    opsi: [
      { id: 'a', teks: 'Menghasilkan barang', benar: true },
      { id: 'b', teks: 'Mengantarkan barang', benar: false },
      { id: 'c', teks: 'Menggunakan barang', benar: false },
      { id: 'd', teks: 'Menjual barang', benar: false },
    ],
    feedbackBenar:
      'Kamu benar, Zara! Pak Tono menghasilkan suatu barang yaitu berupa beras dan kegiatan tersebut disebut produksi.',
    feedbackSalah: 'Kamu kurang tepat, Zara! Kita lihat bersama-sama lagi yuk aktivitas yang sedang mereka lakukan.',
    // salah → siswa diarahkan mengamati ulang tokoh sebelum boleh coba lagi (PROJECT.md §4)
    salahArahkanEksplorUlang: true,
  },
  {
    idSoal: 'l1-indikator2-distribusi',
    indikator: INDIKATOR.MEMBERI_CONTOH,
    // muncul sebelum soal ini ditampilkan (percakapan Pak Ali -> Zara)
    dialogSebelum: [
      {
        speaker: 'Pak Ali',
        text: 'Jika kegiatan tadi disebut dengan produksi, lalu bagaimana dengan kegiatan distribusi dan konsumsi?',
      },
      { speaker: 'Zara', text: 'Bantu aku beritahu Pak Ali contoh kegiatan distribusi dan konsumsi yuk!' },
    ],
    pertanyaan: 'Manakah contoh kegiatan distribusi?',
    opsi: [
      {
        id: 'a',
        teks: 'Petani menanam padi',
        benar: false,
        feedback: 'Kamu kurang tepat! Kegiatan tersebut sedang menghasilkan suatu barang.',
      },
      {
        id: 'b',
        teks: 'Pegawai pabrik sedang membuat roti',
        benar: false,
        feedback: 'Kamu kurang tepat! Kegiatan tersebut sedang menghasilkan suatu barang.',
      },
      {
        id: 'c',
        teks: 'Kurir mengantarkan barang dari penjual kepada pembeli',
        benar: true,
        feedback: 'Benar! Kurir yang sedang mengantarkan paket merupakan contoh kegiatan distribusi.',
      },
      {
        id: 'd',
        teks: 'Seorang anak membeli dan memakan roti',
        benar: false,
        feedback: 'Kamu kurang tepat! Kegiatan tersebut sedang menggunakan suatu barang yang telah dihasilkan.',
      },
    ],
  },
  {
    idSoal: 'l1-indikator2-konsumsi',
    indikator: INDIKATOR.MEMBERI_CONTOH,
    pertanyaan: 'Manakah contoh kegiatan konsumsi?',
    opsi: [
      {
        id: 'a',
        teks: 'Penjahit membuat pakaian dari kain',
        benar: false,
        feedback:
          'Belum tepat! Kegiatan tersebut merupakan produksi karena menghasilkan barang. Penjahit membuat pakaian, sedangkan pengrajin membuat meja dan kursi.',
      },
      {
        id: 'b',
        teks: 'Pengrajin membuat meja dan kursi',
        benar: false,
        feedback:
          'Belum tepat! Kegiatan tersebut merupakan produksi karena menghasilkan barang. Penjahit membuat pakaian, sedangkan pengrajin membuat meja dan kursi.',
      },
      {
        id: 'c',
        teks: 'Pedagang mengangkut hasil panen sayuran dari petani ke pasar',
        benar: false,
        feedback: 'Belum tepat! Kegiatan tersebut merupakan distribusi karena pedagang menyalurkan hasil panen dari petani ke pasar.',
      },
      {
        id: 'd',
        teks: 'Seorang anak membeli dan memakan roti',
        benar: true,
        feedback:
          'Benar! Seorang anak yang membeli dan memakan roti merupakan contoh kegiatan konsumsi karena menggunakan barang untuk memenuhi kebutuhan.',
      },
    ],
  },
];

export const DIALOG_L1 = {
  instruksiAmati: 'Klik tiap tokoh untuk mengamati kegiatan yang mereka lakukan.',
  ajakanAmatiUlang: 'Yuk, kita amati lagi aktivitas mereka sebelum coba lagi.',
  penutup: 'Wah, terima kasih banyak, Zara! Kamu sudah membantu Bapak. Aku akan berkeliling lagi untuk melihat-lihat.',
  penutupSpeaker: 'Pak Ali',
};
