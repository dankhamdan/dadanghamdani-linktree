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

---
Task ID: 2
Agent: main (Super Z)
Task: Tambah animasi, integrasi payment link, dan pasang foto upload sebagai banner atas.

Work Log:
- Salin foto upload dari /home/z/my-project/upload/pasted_image_1791361688590.png ke /home/z/my-project/public/banner.png (425x630 PNG)
- Update src/lib/products.ts: tambah field `paymentUrl` per produk dengan helper paymentUrl() menghasilkan URL Mayar.id-style: https://nadyazahira.my.id/checkout/{slug}?ref=linktree&p={id}
- Update src/components/linktree/hero.tsx: ganti cover-gradient dengan <img src="/banner.png"> + parallax mouse-motion (useMotionValue + useSpring) + zoom on hover + ambient floating blobs + pulse-glow ring di sekitar avatar
- Update src/app/globals.css: tambah keyframes pulse-glow, marquee, shimmer; class .glow-ring untuk CTA button; .animate-marquee dengan pause-on-hover
- Buat src/components/linktree/marquee-strip.tsx: ticker topik (Web Dev, Mobile, AI, Blockchain, Source Code, Edukasi) dengan ikon Lucide + edge fade, loop seamless
- Buat src/components/linktree/magnetic-button.tsx: wrapper magnetic hover (pointer-follow spring)
- Update src/components/linktree/social-links.tsx: bungkus tiap social ikon dengan MagneticButton + glow ring per-brand-color
- Update src/components/theme-toggle.tsx: bungkus dengan MagneticButton (strength 0.5)
- Update src/components/linktree/product-card.tsx: redesign dengan (1) gambar + diskon badge, (2) title link ke detail, (3) harga + old price + stock badge, (4) CTA "Beli Sekarang"/"Klaim Gratis" pakai paymentUrl dengan glow-ring + spring scale, (5) tombol "Detail" ke product.url, (6) trust line "Pembayaran aman · QRIS, VA, e-wallet, kartu" dengan ikon Lock
- Update src/components/linktree/product-list.tsx: simplify karena tiap card handle animasi sendiri
- Buat src/components/linktree/scroll-to-top.tsx: floating button bottom-right dengan AnimatePresence reveal setelah scrollY > 480
- Update src/components/linktree/site-footer.tsx: tambah whileInView reveal + heartbeat pulse pada ikon Heart
- Update src/app/page.tsx: tambahkan MarqueeStrip setelah SocialLinks + ScrollToTop floating
- Lint: 0 errors, 0 warnings
- Verifikasi agent-browser: GET / 200, tidak ada console error, banner image loaded=true, marquee count=1, payment CTA count=8, scroll-to-top button muncul setelah scroll, mobile (375x812) & desktop (1280x800) baik

Stage Summary:
- 3 permintaan user selesai:
  1. Animasi tambahan: parallax banner, magnetic hover (toggle + socials), marquee ticker, pulse-glow avatar, scroll-reveal cards & footer, heartbeat, scroll-to-top floating
  2. Payment link: setiap produk kini punya 2 CTA — "Beli Sekarang" (ke paymentUrl nadyazahira.my.id/checkout/{slug}) dan "Detail" (ke product.url). Trust line menyebut QRIS/VA/e-wallet/kartu
  3. Foto upload: dipasang sebagai banner atas (object-cover, parallax mouse-motion, zoom on hover, gradient overlay untuk legibility)
- File baru: magnetic-button.tsx, marquee-strip.tsx, scroll-to-top.tsx, public/banner.png
- File diupdate: products.ts, hero.tsx, globals.css, social-links.tsx, theme-toggle.tsx, product-card.tsx, product-list.tsx, site-footer.tsx, page.tsx
- Catatan: paymentUrl saat ini pakai placeholder https://nadyazahira.my.id/checkout/{slug} — user perlu set up payment gateway (Mayar.id / Tripay / Midtrans) dan ganti mayarBase di src/lib/products.ts dengan URL checkout asli
