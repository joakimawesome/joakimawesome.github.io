import Chat from '@/components/chat';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-indigo-500/30 relative flex flex-col">
      {/* Subtle technical background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-zinc-950 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_40%,#09090b_100%)] pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <main className="flex-1 w-full flex flex-col">
          <Chat />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
