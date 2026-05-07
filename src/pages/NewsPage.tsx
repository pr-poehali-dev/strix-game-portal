import { news } from "@/data/mockData";
import Icon from "@/components/ui/icon";

export default function NewsPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[var(--stryx-cyan)] rounded-full" />
        <h1 className="section-title text-2xl">Новости</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {news.map((n, i) => (
          <div
            key={n.id}
            className={`glass-card rounded-xl overflow-hidden cursor-pointer group ${i === 0 ? "md:col-span-2" : ""}`}
          >
            {/* Image placeholder */}
            <div className={`bg-gradient-to-br from-[var(--stryx-cyan)]/10 to-transparent border-b border-white/6 flex items-center justify-center ${i === 0 ? "h-48" : "h-28"}`}>
              <div className="text-center">
                <Icon name="Image" size={28} className="text-white/10 mx-auto mb-1" />
                <div className="text-white/10 text-xs font-mono">Фото не добавлено</div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-[var(--stryx-cyan-dim)] text-[var(--stryx-cyan)] px-2 py-0.5 rounded-sm font-rajdhani font-bold uppercase tracking-wider">
                  {n.category}
                </span>
                <span className="text-white/30 text-xs font-mono">{n.date}</span>
              </div>
              <h2 className={`font-rajdhani font-bold text-white group-hover:text-[var(--stryx-cyan)] transition-colors leading-snug mb-2 ${i === 0 ? "text-xl" : "text-base"}`}>
                {n.title}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">{n.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-white/20 text-xs font-mono">{n.author}</span>
                <div className="flex items-center gap-1.5 text-white/20 text-xs font-mono">
                  <Icon name="Eye" size={12} />
                  {n.views.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
