import { contacts } from "@/data/mockData";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Контакты</h1>
      </div>

      <div className="space-y-4 mb-8">
        {contacts.map((c, i) => (
          <div key={i} className="glass-card rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--stryx-cyan)]/20 to-transparent border border-[var(--stryx-cyan)]/20 flex items-center justify-center">
              <Icon name="User" size={20} className="text-[var(--stryx-cyan)]" />
            </div>
            <div className="flex-1">
              <div className="font-rajdhani font-bold text-white">{c.name}</div>
              <div className="text-white/40 text-xs">{c.role}</div>
            </div>
            <div className="flex gap-2">
              <a href={`https://t.me/${c.telegram.replace('@','')}`} className="stryx-btn-outline px-3 py-1.5 rounded-sm text-xs flex items-center gap-1">
                <Icon name="Send" size={12} />
                {c.telegram}
              </a>
              <a href={`mailto:${c.email}`} className="stryx-btn-outline px-3 py-1.5 rounded-sm text-xs flex items-center gap-1">
                <Icon name="Mail" size={12} />
                Написать
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="section-title text-sm mb-4 text-white/60">Быстрое сообщение</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors"
          />
          <textarea
            placeholder="Сообщение..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-[var(--stryx-cyan)] transition-colors resize-none"
          />
          <button className="stryx-btn px-6 py-2.5 rounded-sm text-sm w-full font-rajdhani font-bold tracking-widest uppercase">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
