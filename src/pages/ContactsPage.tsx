import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  return (
    <div className="animate-fade-in max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Контакты</h1>
      </div>

      {/* Telegram card */}
      <div className="rounded-xl overflow-hidden mb-5" style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}>
        <div className="relative h-28 flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,245,0.12), rgba(8,12,18,0.9))" }}>
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 text-center">
            <Icon name="Send" size={32} className="text-[var(--stryx-cyan)] mx-auto mb-2 drop-shadow-[0_0_12px_rgba(0,212,245,0.6)]" />
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-rajdhani font-bold text-white text-xl mb-1">STRYX Telegram</h2>
          <p className="text-white/40 text-sm mb-5">Официальный канал организации STRYX. Новости, матчи, анонсы.</p>
          <a
            href="https://t.me/STRYXCS2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 stryx-btn px-6 py-3 rounded-sm text-sm font-rajdhani font-bold uppercase tracking-widest w-full"
          >
            <Icon name="Send" size={16} />
            Перейти в Telegram — @STRYXCS2
          </a>
        </div>
      </div>

      {/* Quick message */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="section-title text-sm mb-4 text-white/60">Написать нам</h2>
        <div className="space-y-3">
          <input type="text" placeholder="Ваше имя" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors" />
          <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors" />
          <textarea placeholder="Сообщение..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors resize-none" />
          <button className="stryx-btn px-6 py-2.5 rounded-sm text-sm w-full font-rajdhani font-bold tracking-widest uppercase">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
