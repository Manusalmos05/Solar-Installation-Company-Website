import {
  TrendingUp,
  ShieldCheck,
  Leaf,
  House,
  Grid2x2,
  Zap,
  BatteryCharging,
  ClipboardList,
  Check,
  Smartphone,
  Droplet,
  PlugZap,
  Wifi,
  CalendarClock,
  Cloud,
  Lock,
} from "lucide-react";
import type { IconName, KitSpec } from "../../data/kitSpecs.ts";
import { formatPrice } from "../../data/kits.ts";

const ICONS: Record<IconName, typeof Zap> = {
  trending: TrendingUp,
  shield: ShieldCheck,
  leaf: Leaf,
  house: House,
  panel: Grid2x2,
  inverter: Zap,
  battery: BatteryCharging,
  clipboard: ClipboardList,
  phone: Smartphone,
  droplet: Droplet,
  plug: PlugZap,
  wifi: Wifi,
  calendar: CalendarClock,
  cloud: Cloud,
  lock: Lock,
};

function IconBubble({ icon, className }: { icon: IconName; className: string }) {
  const Glyph = ICONS[icon];
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground ${className}`}
    >
      <Glyph className="h-1/2 w-1/2" strokeWidth={2.2} />
    </span>
  );
}

function CoverageRing({ percent, className }: { percent: number; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative shrink-0 rounded-full ${className}`}
      style={{
        background: `conic-gradient(var(--accent) ${percent}%, color-mix(in srgb, var(--accent) 25%, transparent) 0)`,
      }}
    >
      <span className="absolute inset-1 rounded-full bg-card" />
    </span>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-secondary/60 p-4 lg:p-3.5">
      <h4 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest lg:mb-2">{title}</h4>
      {children}
    </section>
  );
}

export default function KitInfographic({ spec, price }: { spec: KitSpec; price: number }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-card text-left text-card-foreground shadow-xl">
      <div className="p-5 sm:p-7 lg:p-4 xl:p-7">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[0.92fr_1.18fr_0.9fr] lg:gap-5 xl:gap-7">

          <div className="flex flex-col gap-4 lg:gap-3">

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-accent-deep px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-accent-deep">
              <Zap size={12} aria-hidden="true" className="fill-accent-deep" />
              {spec.badge}
            </span>

            <div>
              <h3 className="text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-3xl xl:text-4xl">
                {spec.titleMain}{" "}
                <span
                  className={`normal-case text-accent ${spec.titlePower.length <= 14 ? "whitespace-nowrap" : ""}`}
                >
                  {spec.titlePower}
                </span>
              </h3>
              <div className="mt-2.5 h-1 w-20 rounded-full bg-accent" />
            </div>

            <p className="text-base leading-snug text-primary/85 sm:text-lg lg:text-sm xl:text-base">
              {spec.summary}
            </p>

            <div className="flex flex-col justify-center rounded-2xl bg-accent-deep px-5 py-4 text-center text-accent-deep-foreground lg:flex-1 lg:py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">{spec.priceLabel}</p>
              <p className="my-1 text-4xl font-extrabold tracking-tight lg:my-3 xl:text-5xl">
                {formatPrice(price)}
              </p>
              <p className="mx-auto w-fit border-t border-white/40 pt-2 text-xs font-semibold uppercase tracking-[0.18em]">
                {spec.taxNote}
              </p>
            </div>

            <ul className="space-y-3 lg:space-y-2.5">
              {spec.benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-2.5">
                  <IconBubble icon={b.icon} className="h-8 w-8 lg:h-7 lg:w-7" />
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-tight">{b.title}</span>
                    <span className="block text-sm leading-snug text-muted-foreground lg:text-xs">{b.body}</span>
                  </span>
                </li>
              ))}
            </ul>

          </div>

          <div className="flex flex-col gap-4 lg:gap-3">

            <img
              src={spec.productImage}
              alt={spec.productImageAlt}
              loading="lazy"
              decoding="async"
              width={spec.productImageWidth}
              height={spec.productImageHeight}
              className="h-auto w-full rounded-xl bg-secondary/60"
            />

            {spec.components && spec.components.length > 0 && (
              <ul
                className={`grid gap-3 md:grid-cols-1 lg:gap-2 ${
                  spec.components.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2"
                }`}
              >
                {spec.components.map((c) => (
                  <li key={c.title} className="flex items-center gap-2.5 sm:flex-col sm:text-center md:flex-row md:text-left">
                    <IconBubble icon={c.icon} className="h-9 w-9 lg:h-7 lg:w-7" />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-tight">{c.title}</span>
                      <span className="block text-sm leading-snug text-muted-foreground lg:text-xs">{c.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {spec.selfSufficiency && (
              <div className="rounded-xl border-2 border-accent/25 p-4 lg:p-3.5">
                <div className="flex items-start gap-3">
                  <IconBubble icon="house" className="h-11 w-11 lg:h-9 lg:w-9" />
                  <div className="min-w-0">
                    <p className="text-base font-extrabold uppercase leading-tight tracking-tight">
                      Hasta un <span className="text-accent-deep">{spec.selfSufficiency.percent}</span> de autosuficiencia energética
                    </p>
                    <p className="text-xs font-bold text-primary/80">({spec.selfSufficiency.scope})</p>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-snug text-muted-foreground lg:text-xs">
                  {spec.selfSufficiency.body}
                </p>
                {spec.stats && spec.stats.length > 0 && (
                  <div className="mt-3 grid gap-3 border-t border-border pt-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                    {spec.stats.map((s) => (
                      <div key={s.label} className="flex items-center gap-2.5">
                        {s.ringPercent != null ? (
                          <CoverageRing percent={s.ringPercent} className="h-9 w-9 lg:h-8 lg:w-8" />
                        ) : (
                          <IconBubble icon="inverter" className="h-9 w-9 lg:h-8 lg:w-8" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-xs leading-tight text-muted-foreground">{s.label}</span>
                          <span className="block text-lg font-extrabold tracking-tight">{s.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {spec.highlight && (
              <div className="rounded-xl border-2 border-accent/25 p-4 lg:p-3.5">
                <div className="flex items-start gap-3">
                  <IconBubble icon={spec.highlight.icon} className="h-11 w-11 lg:h-9 lg:w-9" />
                  <div className="min-w-0">
                    <p className="text-base font-extrabold uppercase leading-tight tracking-tight">
                      {spec.highlight.title}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground lg:text-xs">
                      {spec.highlight.body}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="flex flex-col gap-4 md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex lg:flex-col lg:gap-3">

            {spec.includes && spec.includes.length > 0 && (
              <Panel title="Incluye">
                <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:gap-1.5">
                  {spec.includes.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <Check size={14} strokeWidth={3} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-deep" />
                      <span className="text-sm leading-snug lg:text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}

            {spec.extras && spec.extras.length > 0 && (
              <Panel title="Extras opcionales">
                <ul className="space-y-2 lg:space-y-1.5">
                  {spec.extras.map((e) => (
                    <li key={e.label} className="flex items-baseline gap-2 text-sm lg:text-xs">
                      <span className="leading-snug">{e.label}</span>
                      <span className="min-w-3 flex-1 translate-y-[-3px] border-b border-dotted border-border" />
                      <span className="shrink-0 font-bold tabular-nums">{formatPrice(e.price)}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}

            <div className="grid gap-3 rounded-xl bg-secondary/60 p-4 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-1 lg:gap-2.5 lg:p-3.5">
              {spec.guarantees.map((g) => (
                <div key={g.title} className="flex items-start gap-2.5">
                  <IconBubble icon={g.icon} className="h-9 w-9 lg:h-8 lg:w-8" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold uppercase leading-tight tracking-widest">{g.title}</h4>
                    <p className="mt-0.5 text-sm leading-snug text-muted-foreground lg:text-xs">{g.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}
