---
Task ID: 1
Agent: main (Super Z)
Task: Rebuild halaman Linktree Yusril Asrul sebagai Next.js modern untuk nadyazahira.my.id — modern minimalis, dark mode, animasi, semua 8 produk dipertahankan.

Work Log:
- Inisialisasi project Next.js 16 via init-fullstack.sh
- Membuat `src/lib/products.ts` berisi data 8 produk + 4 social link (URL, gambar, harga, badge sesuai aslinya)
- Update `src/app/layout.tsx`: Inter font, lang="id", metadata Nadya Zahira, ThemeProvider (default dark)
- Update `src/app/globals.css`: palet modern minimalis (rose accent), dark mode variabel, animasi cover-gradient drift, avatar-ring spin, grain overlay, scrollbar tipis
- Membuat `src/components/theme-provider.tsx` (wrapper next-themes)
- Membuat `src/components/theme-toggle.tsx` (tombol floating dengan AnimatePresence sun/moon)
- Membuat `src/components/linktree/hero.tsx` (cover gradient animasi + avatar inisial "NZ" dengan gradient ring + sparkle badge + name + bio)
- Membuat `src/components/linktree/social-links.tsx` (4 ikon sosial dengan brand color hover, spring animation)
- Membuat `src/components/linktree/product-card.tsx` (kartu horizontal: gambar + diskon badge + title + harga + old price + stock badge + chevron)
- Membuat `src/components/linktree/product-list.tsx` (staggered entry animation)
- Membuat `src/components/linktree/site-footer.tsx` (legal links + copyright + heart)
- Update `src/app/page.tsx` untuk merangkai semua section
- Lint: 0 errors, 0 warnings
- Verifikasi dengan agent-browser:
  - GET / 200, tidak ada console error
  - Semua 8 produk tampil dengan harga, diskon, badge yang benar
  - Theme toggle berfungsi (dark → light → dark)
  - Layout mobile (375x812) dan desktop (1280x800) baik
  - Semua href product, social, dan footer terverifikasi

Stage Summary:
- Deliverable: Next.js 16 app siap deploy ke nadyazahira.my.id
- Stack: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + framer-motion + next-themes + lucide-react
- File utama: src/app/page.tsx, src/app/layout.tsx, src/app/globals.css, src/components/linktree/*, src/components/theme-*.tsx, src/lib/products.ts
- Default theme: dark (dengan toggle ke light)
- Personalisasi: nama "Nadya Zahira", avatar inisial "NZ" (gradient), cover gradient mesh animasi
- 8 produk dipertahankan persis (URL, gambar, harga, badge)
- 4 social link dipertahankan (Instagram, TikTok, YouTube, Facebook) dengan brand color hover
- Catatan untuk user: ganti URL produk/social/avatar dengan aset Nadya Zahira saat deploy ke production
