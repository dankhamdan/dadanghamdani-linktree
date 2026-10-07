export type Product = {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number | null; // null = Gratis
  oldPrice?: number | null;
  badge?: string; // e.g. "Sisa 5"
  url: string; // halaman detail produk
  paymentUrl: string; // link checkout langsung (payment link)
};

/**
 * Helper: bangun URL payment link Mayar.id berdasarkan slug produk.
 * Ganti base URL dengan akun Mayar milikmu saat production.
 */
const mayarBase = "https://nadyazahira.my.id/checkout";
function paymentUrl(slug: string, id: string): string {
  return `${mayarBase}/${slug}?ref=linktree&p=${id}`;
}

/**
 * Daftar produk yang ditampilkan di halaman linktree.
 *
 * Catatan: URL, gambar, dan harga mengacu pada katalog asli
 * yusrilasrul.site. Ganti dengan aset milikmu sendiri saat
 * halaman ini di-deploy ke nadyazahira.my.id.
 */
export const products: Product[] = [
  {
    id: "1",
    slug: "formula-15-hari-bisa-bangun-web-dan-mobile-app-start-12-oktober",
    title: "Formula 15 Hari Bisa Bangun Web dan Mobile App - Start 12 Oktober",
    image:
      "https://yusrilasrul.site/assets/uploads/products/726444d12635001e36b14b38b3301dfc.webp",
    price: 289000,
    badge: "Sisa 5",
    url: "https://yusrilasrul.site/products/formula-15-hari-bisa-bangun-web-dan-mobile-app-start-12-oktober",
    paymentUrl: paymentUrl("formula-15-hari-bisa-bangun-web-dan-mobile-app-start-12-oktober", "1"),
  },
  {
    id: "2",
    slug: "pos-offline-pro-sourcecode-aplikasi-kasir-offline-fitur-lengkap-untuk-semua-usaha",
    title:
      "POS Offline Pro (+SourceCode) — Aplikasi Kasir Offline Fitur Lengkap untuk Semua Usaha",
    image:
      "https://yusrilasrul.site/assets/uploads/products/2c2023177e2007969749e5184f9605c5.webp",
    oldPrice: 78000,
    price: 59000,
    url: "https://yusrilasrul.site/products/pos-offline-pro-sourcecode-aplikasi-kasir-offline-fitur-lengkap-untuk-semua-usaha",
    paymentUrl: paymentUrl("pos-offline-pro-sourcecode-aplikasi-kasir-offline-fitur-lengkap-untuk-semua-usaha", "2"),
  },
  {
    id: "3",
    slug: "ebook-terlengkap-web3-dari-nol-sampai-bisa-bikin-aplikasi-web3",
    title: "Ebook Terlengkap Web3: Dari Nol sampai Bisa Bikin Aplikasi Web3.",
    image:
      "https://yusrilasrul.site/assets/uploads/products/dea731e6af5aad52f9766e0aacff6d69.webp",
    oldPrice: 149000,
    price: 89000,
    url: "https://yusrilasrul.site/products/ebook-terlengkap-web3-dari-nol-sampai-bisa-bikin-aplikasi-web3",
    paymentUrl: paymentUrl("ebook-terlengkap-web3-dari-nol-sampai-bisa-bikin-aplikasi-web3", "3"),
  },
  {
    id: "4",
    slug: "source-code-chatbot-whatsapp-ai-siap-pakai-cocok-untuk-cs-otomatis-usaha-kecil-menengah-settingan-chatbot-aman",
    title:
      "Source Code Chatbot WhatsApp AI Siap Pakai - Cocok untuk CS otomatis, usaha kecil menengah. - settingan chatbot aman",
    image:
      "https://yusrilasrul.site/assets/uploads/products/0bc5b9ed5d1fc41c4ac1a5b691b314f6.webp",
    price: 24000,
    url: "https://yusrilasrul.site/products/source-code-chatbot-whatsapp-ai-siap-pakai-cocok-untuk-cs-otomatis-usaha-kecil-menengah-settingan-chatbot-aman",
    paymentUrl: paymentUrl("source-code-chatbot-whatsapp-ai-siap-pakai-cocok-untuk-cs-otomatis-usaha-kecil-menengah-settingan-chatbot-aman", "4"),
  },
  {
    id: "5",
    slug: "laundry-pos-offline-aplikasi-kasir-khusus-laundry-yang-100-offline-datanya-tersimpan-aman-di-hp-anda-sekali-bayar",
    title:
      "Laundry POS offline -  Aplikasi kasir khusus laundry yang 100% offline & datanya tersimpan aman di HP Anda. (Sekali bayar)",
    image:
      "https://yusrilasrul.site/assets/uploads/products/443225e4219fc636ec828709348cef16.webp",
    price: 24000,
    url: "https://yusrilasrul.site/products/laundry-pos-offline-aplikasi-kasir-khusus-laundry-yang-100-offline-datanya-tersimpan-aman-di-hp-anda-sekali-bayar",
    paymentUrl: paymentUrl("laundry-pos-offline-aplikasi-kasir-khusus-laundry-yang-100-offline-datanya-tersimpan-aman-di-hp-anda-sekali-bayar", "5"),
  },
  {
    id: "6",
    slug: "source-code-web-game-3d-shooter",
    title: "Source code web game 3d Shooter",
    image:
      "https://yusrilasrul.site/assets/uploads/products/255a34db72866f7b66fa0900ed9b317e.webp",
    price: null,
    url: "https://yusrilasrul.site/products/source-code-web-game-3d-shooter",
    paymentUrl: paymentUrl("source-code-web-game-3d-shooter", "6"),
  },
  {
    id: "7",
    slug: "finance-bot-telegram-pencatat-keuangan-pribadi-otomatis-via-chat",
    title:
      "Finance Bot Telegram — Pencatat Keuangan Pribadi Otomatis via Chat",
    image:
      "https://yusrilasrul.site/assets/uploads/products/7d1a77ff1933c4d858e6cf118fb7e3ee.webp",
    oldPrice: 49000,
    price: 14000,
    url: "https://yusrilasrul.site/products/finance-bot-telegram-pencatat-keuangan-pribadi-otomatis-via-chat",
    paymentUrl: paymentUrl("finance-bot-telegram-pencatat-keuangan-pribadi-otomatis-via-chat", "7"),
  },
  {
    id: "8",
    slug: "platform-belajar-online-teknologi-web3-dan-blockchain",
    title: "Platform Belajar Online teknologi Web3 dan Blockchain",
    image:
      "https://yusrilasrul.site/assets/uploads/products/c0d03d0a903216832f8d862a966bed82.webp",
    price: null,
    url: "https://yusrilasrul.site/products/platform-belajar-online-teknologi-web3-dan-blockchain",
    paymentUrl: paymentUrl("platform-belajar-online-teknologi-web3-dan-blockchain", "8"),
  },
];

export type SocialLink = {
  label: string;
  href: string;
  // brand hex color for hover state
  brand: string;
  // lucide icon name OR custom key
  icon: "instagram" | "tiktok" | "youtube" | "facebook";
};

export const socials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/yusrilasrul_",
    brand: "#E1306C",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@yusrilasrul",
    brand: "#25F4EE",
    icon: "tiktok",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@yusrilasrul",
    brand: "#FF0000",
    icon: "youtube",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/yusrilweb3",
    brand: "#1877F2",
    icon: "facebook",
  },
];

export function formatRupiah(value: number | null): string {
  if (value === null) return "Gratis";
  return "Rp " + value.toLocaleString("id-ID");
}
