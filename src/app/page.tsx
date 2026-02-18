import Link from 'next/link';
import { CALCULATOR_CARDS } from '@/lib/constants';

const HERO_STATS = [
  { value: '700+', label: 'Schemes', icon: '📋' },
  { value: '₹25L+', label: 'Potential Benefits', icon: '💰' },
  { value: '2 min', label: 'Quick Check', icon: '⚡' },
  { value: '100%', label: 'Free & Safe', icon: '🔒' },
];

const CATEGORIES = [
  { slug: 'agriculture', name: 'Agriculture', icon: '🌾', color: '#16A34A', count: 45 },
  { slug: 'health', name: 'Health', icon: '🏥', color: '#0891B2', count: 38 },
  { slug: 'housing', name: 'Housing', icon: '🏠', color: '#D97706', count: 22 },
  { slug: 'women', name: 'Women & Child', icon: '👩', color: '#DB2777', count: 35 },
  { slug: 'business', name: 'Business', icon: '💼', color: '#7C3AED', count: 50 },
  { slug: 'welfare', name: 'Welfare', icon: '🤝', color: '#059669', count: 40 },
  { slug: 'pension', name: 'Pension', icon: '🧓', color: '#4F46E5', count: 15 },
  { slug: 'insurance', name: 'Insurance', icon: '🛡️', color: '#0284C7', count: 20 },
  { slug: 'skill', name: 'Skill Training', icon: '🎓', color: '#B45309', count: 28 },
  { slug: 'education', name: 'Education', icon: '📚', color: '#2563EB', count: 55 },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Enter Your Details',
    description: 'Fill in basic info — age, income, state, occupation. No login needed.',
    icon: '📝',
  },
  {
    step: 2,
    title: 'Instant Matching',
    description: 'Our engine checks your profile against 700+ scheme eligibility rules.',
    icon: '⚡',
  },
  {
    step: 3,
    title: 'View Results',
    description: 'See all matching schemes with benefits, documents required, and how to apply.',
    icon: '🎯',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6 slide-up">
              <span>🇮🇳</span> India&apos;s #1 Government Scheme Eligibility Checker
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 slide-up">
              Government Schemes
              <br />
              <span className="text-yellow-300">Worth Lakhs</span> — Check Free
            </h1>

            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto slide-up">
              Check your eligibility for 700+ sarkari yojanas in just 2 minutes.
              Find schemes for PM Kisan, Ayushman Bharat, PMAY, and more.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up">
              <Link
                href="/eligibility"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[var(--color-primary)] font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <span>✅</span> Check My Eligibility — Free
              </Link>
              <Link
                href="/schemes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-all duration-200"
              >
                <span>📋</span> Browse All Schemes
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto fade-in">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <span className="text-2xl mb-1 block">{stat.icon}</span>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-green-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-[var(--color-text-secondary)]">3 simple steps. No login. No phone number.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative text-center p-6 rounded-2xl bg-[var(--color-bg-card)] shadow-sm card-hover border border-[var(--color-border)]">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full gradient-bg text-white text-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Category ───────────────────────── */}
      <section className="py-16 sm:py-20 bg-[var(--color-bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Browse by Category</h2>
            <p className="text-[var(--color-text-secondary)]">Find schemes by category — from agriculture to education</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/schemes?category=${cat.slug}`}
                className="group p-4 rounded-xl border border-[var(--color-border)] hover:border-transparent hover:shadow-lg transition-all duration-200 text-center card-hover"
                style={{ '--hover-color': cat.color } as React.CSSProperties}
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <h3 className="font-semibold text-sm mb-0.5">{cat.name}</h3>
                <p className="text-xs text-[var(--color-text-light)]">{cat.count}+ schemes</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Calculators ─────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Free Financial Calculators</h2>
            <p className="text-[var(--color-text-secondary)]">Smart tools for smarter financial decisions</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CALCULATOR_CARDS.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="group p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${calc.color}15` }}
                >
                  {calc.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{calc.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / CTA ──────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[var(--color-bg-card)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Don&apos;t Miss Out on Your Benefits
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
            Millions of Indians miss government benefits simply because they don&apos;t know
            about eligible schemes. Check your eligibility now — it takes just 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-2 px-8 py-3.5 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <span>🚀</span> Check My Eligibility Now
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5"><span>🔒</span> 100% Safe & Private</span>
            <span className="flex items-center gap-1.5"><span>🆓</span> Always Free</span>
            <span className="flex items-center gap-1.5"><span>🚫</span> No Login Required</span>
            <span className="flex items-center gap-1.5"><span>📱</span> Mobile Friendly</span>
          </div>
        </div>
      </section>
    </div>
  );
}
