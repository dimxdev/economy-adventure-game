/**
 * Manifest aset gambar — SATU SUMBER KEBENARAN path & ukuran.
 *
 * Aset asli dibuat terpisah oleh tim (PROJECT.md §9) dan di-drop ke
 * `public/assets/<kategori>/...`. Selama file belum ada, PreloadScene otomatis
 * membuat PLACEHOLDER (kotak berwarna + label) dengan key yang sama — jadi
 * begitu file asli masuk, tidak ada perubahan kode.
 *
 * kind: 'bg' = latar full-scene (sudut siku, teks gelap di krem);
 *       selain itu = kartu/karakter/ikon (rounded, teks putih).
 */
export const ASSET_BASE = '/assets/';

export const ASSETS = {
  images: [
    // --- Menu ---
    { key: 'bg_menu', path: 'bg/bg_menu_desa.webp', w: 1280, h: 720, kind: 'bg', label: 'Latar Menu — Desa' },
    { key: 'logo', path: 'ui/ui_logo_judul.png', w: 620, h: 240, label: 'Economy Adventure' },
    { key: 'zara_idle', path: 'karakter/karakter_zara_idle.png', w: 320, h: 470, label: 'Zara' },

    // --- Tokoh Level 1 (PROJECT.md §3-4) ---
    { key: 'karakter_paktono', path: 'karakter/karakter_paktono_fullbody.png', w: 300, h: 460, label: 'Pak Tono' },
    { key: 'karakter_businta', path: 'karakter/karakter_businta_fullbody.png', w: 300, h: 460, label: 'Bu Sinta' },
    { key: 'karakter_pakrudi', path: 'karakter/karakter_pakrudi_fullbody.png', w: 300, h: 460, label: 'Pak Rudi' },
    { key: 'karakter_ani', path: 'karakter/karakter_ani_fullbody.png', w: 300, h: 460, label: 'Ani' },

    // --- Latar per level ---
    { key: 'bg_level1', path: 'bg/bg_level1_desa.webp', w: 1280, h: 720, kind: 'bg', label: 'Desa Sejahtera' },
    { key: 'bg_level2', path: 'bg/bg_level2_festival.webp', w: 1280, h: 720, kind: 'bg', label: 'Festival Produk Lokal' },
    { key: 'bg_level3', path: 'bg/bg_level3_dapur.webp', w: 1280, h: 720, kind: 'bg', label: 'Dapur Pak Budi' },
    { key: 'bg_level4', path: 'bg/bg_level4_petadistribusi.webp', w: 1280, h: 720, kind: 'bg', label: 'Peta Jalur Distribusi' },
    { key: 'bg_ending', path: 'bg/bg_ending_festival.webp', w: 1280, h: 720, kind: 'bg', label: 'Festival Sukses' },
  ],
};
