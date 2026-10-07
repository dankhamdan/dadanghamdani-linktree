"use client";

import { Hero } from "@/components/linktree/hero";
import { MarqueeStrip } from "@/components/linktree/marquee-strip";
import { SocialLinks } from "@/components/linktree/social-links";
import { ProductList } from "@/components/linktree/product-list";
import { SiteFooter } from "@/components/linktree/site-footer";
import { ScrollToTop } from "@/components/linktree/scroll-to-top";
import { ThemeToggle } from "@/components/theme-toggle";
import { products, socials } from "@/lib/products";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Floating theme toggle (top-right) */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <main className="mx-auto w-full max-w-xl flex-1 px-4 pb-6 sm:px-5">
        <Hero />

        <SocialLinks socials={socials} />

        <MarqueeStrip />

        <ProductList products={products} />
      </main>

      <div className="mx-auto w-full max-w-xl px-4 sm:px-5">
        <SiteFooter />
      </div>

      <ScrollToTop />
    </div>
  );
}
