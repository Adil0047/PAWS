import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { LiveChatWidget } from "@/components/site/live-chat-widget";
import { ScrollToTopButton } from "@/components/site/scroll-to-top";
import { ScrollProgress } from "@/components/site/scroll-progress";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTopButton />
      <LiveChatWidget />
    </div>
  );
}
