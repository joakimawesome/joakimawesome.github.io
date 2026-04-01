import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-indigo-500/30 relative">
      {/* Background grid — matches homepage */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="fixed inset-0 bg-zinc-950 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_40%,#09090b_100%)] pointer-events-none" />

      <div className="relative z-10">
        <Nav />
        <main className="max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
