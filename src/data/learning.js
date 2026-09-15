import { KATEGORI } from './design.js';

/**
 * Tujuan & capaian pembelajaran — ditampilkan di Main Menu (PROJECT.md §4)
 * lewat panel materi (event SHOW_MATERI). Konten bisa direvisi klien tanpa
 * menyentuh kode scene.
 */
export const TUJUAN_BELAJAR = {
  judul: 'Tujuan Belajar',
  poin: [
    {
      label: 'Yang akan kamu pelajari',
      teks: 'Ikuti petualangan Zara membantu warga Desa Sejahtera, sambil memahami tiga kegiatan ekonomi:',
      warna: 'var(--c-ink)',
    },
    { label: KATEGORI.produksi.label, teks: 'Kegiatan menghasilkan barang atau jasa.', warna: KATEGORI.produksi.css },
    {
      label: KATEGORI.distribusi.label,
      teks: 'Kegiatan menyalurkan barang dari produsen sampai ke konsumen.',
      warna: KATEGORI.distribusi.css,
    },
    {
      label: KATEGORI.konsumsi.label,
      teks: 'Kegiatan memakai atau menghabiskan barang dan jasa.',
      warna: KATEGORI.konsumsi.css,
    },
  ],
  tombol: 'Siap!',
};
