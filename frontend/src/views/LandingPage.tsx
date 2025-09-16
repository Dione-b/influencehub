import { Link } from "react-router-dom";
import { MOCK_EVENTS, MOCK_USERS } from "../state/mockData";
import {
  CalendarDays,
  Target,
  Trophy,
  ShieldCheck,
  Users2,
  Zap,
  Award,
  Crown,
  Medal,
} from "lucide-react";
import { useTranslation } from "../i18n/hooks/useTranslation";
import { LandingHeader } from "../ui/LandingHeader";
import HeroImage from "../assets/3dhero.png";

export function LandingPage() {
  const { t } = useTranslation();

  const ranking = [...MOCK_USERS]
    .filter((u) => u.role === "INFLUENCER")
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 5);

  const events = MOCK_EVENTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white relative page-root">
      <LandingHeader />

      {/* Hero */}
      <section className="relative z-10 px-6 pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-black bg-yellow-400 font-semibold rounded-full px-3 py-1 mb-4">
            {t("landing.officialProgram")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1]">
            {t("landing.heroTitle")}
            <span className="text-yellow-400">
              {" "}
              {t("landing.heroSubtitle")}
            </span>
          </h1>
          <p className="mt-4 text-zinc-300 text-lg">
            {t("landing.heroDescription")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="btn btn-primary">
              {t("landing.loginButton")}
            </Link>
            <Link to="/cadastrar" className="btn bg-zinc-900">
              {t("landing.registerButton")}
            </Link>
          </div>
          <div className="mt-6 text-sm text-zinc-400">
            {t("landing.freeStart")}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <HeroCard
            icon={<Target className="text-yellow-400" />}
            title={t("landing.missions")}
            text={t("landing.missionsDesc")}
          />
          <HeroCard
            icon={<CalendarDays className="text-yellow-400" />}
            title={t("landing.events")}
            text={t("landing.eventsDesc")}
          />
          <HeroCard
            icon={<Trophy className="text-yellow-400" />}
            title={t("landing.ranking")}
            text={t("landing.rankingDesc")}
          />
          <HeroCard
            icon={<ShieldCheck className="text-yellow-400" />}
            title={t("landing.approval")}
            text={t("landing.approvalDesc")}
          />
        </div>
      </section>

      <div className="soft-divider" />

      {/* O que fazemos */}
      <section className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
          {t("landing.whatWeDo")}
        </h2>
        <div className="flex grid md:grid-cols-2 gap-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-1 md:grid-rows-4 gap-4">
            <FeatureCard
              icon={<Users2 className="text-yellow-400" />}
              title={t("landing.workshops")}
              desc={t("landing.workshopsDesc")}
            />
            <FeatureCard
              icon={<Trophy className="text-yellow-400" />}
              title={t("landing.talks")}
              desc={t("landing.talksDesc")}
            />
            <FeatureCard
              icon={<CalendarDays className="text-yellow-400" />}
              title={t("landing.events")}
              desc={t("landing.eventsDesc2")}
            />
            <FeatureCard
              icon={<ShieldCheck className="text-yellow-400" />}
              title={t("landing.tutorials")}
              desc={t("landing.tutorialsDesc")}
            />
            <FeatureCard
              icon={<Users2 className="text-yellow-400" />}
              title={t("landing.studyGroup")}
              desc={t("landing.studyGroupDesc")}
            />
          </div>
          <div className="flex mx-auto justify-center w-lg invisible md:visible">
            <img src={HeroImage} alt="" className="object-contain" />
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-2">
          <Zap className="text-yellow-400" /> {t("landing.whyInfluencer")}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Users2 className="text-yellow-400" />}
            title={t("landing.buildCommunity")}
            desc={t("landing.buildCommunityDesc")}
          />
          <FeatureCard
            icon={<Target className="text-yellow-400" />}
            title={t("landing.gamification")}
            desc={t("landing.gamificationDesc")}
          />
          <FeatureCard
            icon={<Trophy className="text-yellow-400" />}
            title={t("landing.recognition")}
            desc={t("landing.recognitionDesc")}
          />
        </div>
      </section>

      <div className="soft-divider" />

      {/* Ranking */}
      <section className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            <Trophy className="text-yellow-400" /> {t("landing.topInfluencers")}
          </h2>
          <Link to="/app/ranking" className="text-yellow-400 text-sm">
            {t("landing.viewFullRanking")}
          </Link>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-8 mt-8">{t("ranking.top3")}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="order-2 md:order-1">
              <div className="card text-center relative p-8">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                    <Medal className="text-zinc-300 w-6 h-6" />
                  </div>
                </div>
                <div className="pt-8">
                  <div className="text-2xl font-bold text-zinc-300">2º</div>
                  <div className="font-semibold mt-2">
                    {ranking[1]?.name || t("ranking.noData")}
                  </div>
                  <div className="text-yellow-400 text-2xl font-extrabold mt-1">
                    {ranking[1]?.totalPoints || 0}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {t("ranking.points")}
                  </div>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="order-1 md:order-2">
              <div className="card top-1 text-center relative border-2 border-yellow-400 p-10">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Crown className="text-black w-8 h-8" />
                  </div>
                </div>
                <div className="pt-10">
                  <div className="text-3xl font-bold text-yellow-400">1º</div>
                  <div className="font-semibold mt-2 text-lg">
                    {ranking[0]?.name || t("ranking.noData")}
                  </div>
                  <div className="text-yellow-400 text-4xl font-extrabold mt-1">
                    {ranking[0]?.totalPoints || 0}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {t("ranking.points")}
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3">
              <div className="card text-center relative p-8">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                    <Award className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="pt-8">
                  <div className="text-2xl font-bold text-orange-400">3º</div>
                  <div className="font-semibold mt-2">
                    {ranking[2]?.name || t("ranking.noData")}
                  </div>
                  <div className="text-yellow-400 text-2xl font-extrabold mt-1">
                    {ranking[2]?.totalPoints || 0}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {t("ranking.points")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="soft-divider" />

      {/* Eventos */}
      <section className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            <CalendarDays className="text-yellow-400" />{" "}
            {t("landing.upcomingEvents")}
          </h2>
          <Link to="/login" className="text-yellow-400 text-sm">
            {t("landing.doCheckin")}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map((e) => (
            <div key={e.id} className="card">
              <div className="font-semibold">{e.name}</div>
              <div className="text-sm text-zinc-400">{e.location}</div>
              <div className="text-xs text-zinc-500 mt-1">{e.date}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="soft-divider" />

      {/* CTA final */}
      <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          {t("landing.readyToStart")}
        </h2>
        <p className="text-zinc-300 mt-2">{t("landing.readyToStartDesc")}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/cadastrar" className="btn btn-primary">
            {t("landing.registerButton")}
          </Link>
          <Link to="/login" className="btn bg-zinc-900">
            {t("landing.loginButton")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/80 backdrop-blur mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-extrabold text-yellow-400 mb-4">
                InfluenceHub
              </div>
              <p className="text-zinc-400 text-sm">
                {t("landing.heroDescription")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("common.quickLinks")}</h3>
              <div className="space-y-2 text-sm">
                <Link
                  to="/ranking"
                  className="block text-zinc-400 hover:text-white transition-colors"
                >
                  {t("common.ranking")}
                </Link>
                <Link
                  to="/login"
                  className="block text-zinc-400 hover:text-white transition-colors"
                >
                  {t("common.login")}
                </Link>
                <Link
                  to="/cadastrar"
                  className="block text-zinc-400 hover:text-white transition-colors"
                >
                  {t("common.register")}
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("common.contact")}</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <div>contato@influencehub.com</div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm text-zinc-500">
            © 2025 InfluenceHub. {t("common.allRightsReserved")}
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="card min-h-[120px]">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-zinc-400">{text}</div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-zinc-400">{desc}</div>
        </div>
      </div>
    </div>
  );
}
