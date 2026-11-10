import { createFileRoute } from "@tanstack/react-router";

const BOOKING_URL = "https://ig.me/m/robsonlobostattoo";
const INSTAGRAM_URL = "https://www.instagram.com/robsonlobostattoo/";

const modules = import.meta.glob<{ default: { url: string } }>("../assets/work/*.asset.json", {
  eager: true,
});
const works = Object.entries(modules)
  .sort(([a], [b]) => Number(a.match(/(\d+)\./)?.[1]) - Number(b.match(/(\d+)\./)?.[1]))
  .map(([, m]) => m.default.url);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Robson Lobos Tattoo — Portfólio e Agendamento" },
      { name: "description", content: "Portfólio de tatuagens em preto e cinza de Robson Lobos. Agende sua sessão." },
      { property: "og:title", content: "Robson Lobos Tattoo — Portfólio" },
      { property: "og:description", content: "Realismo e fineline em preto e cinza. Agende sua sessão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function BookButton({ big }: { big?: boolean }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-block border border-primary bg-primary font-display tracking-widest text-primary-foreground transition-colors hover:bg-background hover:text-foreground ${big ? "px-10 py-5 text-2xl" : "px-5 py-2 text-lg"}`}
    >
      Agendar sessão
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
        <span className="font-display text-2xl tracking-widest">Robson Lobos</span>
        <BookButton />
      </header>

      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32">
        <img src={works[0]} alt="Tatuagem de tigre e mulher no braço" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="grain absolute inset-0" />
        <div className="relative max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-muted-foreground">Tattoo artist · Preto & cinza</p>
          <h1 className="font-display text-[18vw] leading-[0.85] md:text-[11rem]">
            Robson
            <br />
            <span className="text-outline">Lobos</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Realismo, sombras e traços finos. Cada peça desenhada para a sua pele.</p>
          <div className="mt-8"><BookButton big /></div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
          <h2 className="font-display text-6xl md:text-8xl">Portfólio</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground">
            @robsonlobostattoo →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
          {works.map((src, i) => (
            <div key={src} className="group relative aspect-square overflow-hidden bg-muted">
              <img src={src} alt={`Trabalho ${i + 1} de Robson Lobos`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute bottom-2 left-3 font-display text-xl opacity-0 transition-opacity group-hover:opacity-100">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="grain border-y border-border px-6 py-32 text-center">
        <h2 className="font-display text-6xl md:text-9xl">Sua próxima <span className="text-outline">tattoo</span></h2>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">Mande sua ideia, referências e o local do corpo. Respondo com orçamento e datas disponíveis.</p>
        <div className="mt-10"><BookButton big /></div>
      </section>

      <footer className="flex justify-between px-6 py-8 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Robson Lobos Tattoo</span>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">Instagram</a>
      </footer>
    </div>
  );
}
