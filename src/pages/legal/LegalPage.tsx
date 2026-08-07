interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-primary/85">{children}</div>
    </section>
  );
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28">
      <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Última actualización: {updated}</p>
      <div className="mt-10 space-y-10">{children}</div>
    </main>
  );
}
