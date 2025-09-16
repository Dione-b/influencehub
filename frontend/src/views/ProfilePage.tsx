import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../state/AuthContext";
import { useData } from "../state/DataContext";
import { UserCircle2, Trophy, CalendarCheck2, Target, Info } from "lucide-react";
import { PageHeader, StatCard, EmptyState } from "../ui/Primitives";
import { KitModalConnectButton } from "../ui/StellarWalletButton";
import { useTranslation } from "../i18n/hooks/useTranslation";
import { useStellarWalletContext } from "../state/StellarWalletContext";
import { getReputationLevel } from "../soroban/reputationClient";

export function ProfilePage() {
  const { user } = useAuth();
  const { submissions, attendance, missions, events } = useData();
  const { t } = useTranslation();
  const { address } = useStellarWalletContext();
  const [onchainLevel, setOnchainLevel] = useState<number | string>("-");
  const [repLoading, setRepLoading] = useState(false);
  const [onchainXP, setOnchainXP] = useState<number | string>("-");

  const history = useMemo(() => {
    if (!user) return { completed: [], attended: [] as string[] };
    const completed = submissions
      .filter((s) => s.userId === user.id && s.status === "approved")
      .map((s) => {
        const m = missions.find((mm) => mm.id === s.missionId);
        return `${m?.title} - ${s.date}`;
      });
    const attended = attendance
      .filter((a) => a.userId === user.id)
      .map((a) => {
        const ev = events.find((e) => e.id === a.eventId);
        return `${ev?.name} - ${a.date}`;
      });
    return { completed, attended };
  }, [user, submissions, attendance, missions, events]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!address) {
        setOnchainLevel("-");
        return;
      }
      setRepLoading(true);
      try {
        const level = await getReputationLevel(address);
        const numericLevel = Number((level as any)?.toString?.() ?? level);
        if (!cancelled) {
          setOnchainLevel(Number.isFinite(numericLevel) ? numericLevel : "-");
          // Optional: derive a simple XP estimate for clarity (e.g., Level * 100 XP)
          setOnchainXP(Number.isFinite(numericLevel) ? numericLevel * 100 : "-");
        }
      } catch (e) {
        if (!cancelled) setOnchainLevel("-");
      } finally {
        if (!cancelled) setRepLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [address]);

  if (!user) return <div>{t('profile.loginToView')}</div>;

  return (
    <div className="space-y-6 page-root relative z-10">
      <PageHeader icon={<UserCircle2 />} title={t('profile.title')} />
      <div className="grid md:grid-cols-5 gap-4">
        <div className="card flex justify-between">
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-zinc-400">{user.email}</div>
            <div className="text-xs mt-2 inline-block px-2 py-0.5 rounded-full bg-zinc-800">
              {user.role === "ADMIN" ? t('ranking.admin') : t('ranking.influencer')}
            </div>
          </div>
          <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-22 h-22 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <StatCard
          icon={<Trophy />}
          label={t('dashboard.totalPoints')}
          value={user.totalPoints}
          accent
        />
        <StatCard
          icon={<Target />}
          label={t('dashboard.missionsCompleted')}
          value={history.completed.length}
        />
        <div className="card flex items-center gap-3">
          <div className="text-yellow-400"><Target /></div>
          <div>
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              {t('profile.onchainReputation')}
              <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500">
                <Info size={12} />
                Level × 100 = XP (view only)
              </span>
            </div>
            <div className="text-2xl font-extrabold">{repLoading ? '...' : onchainLevel}</div>
            <div className="text-[11px] text-zinc-400">{repLoading ? '' : `≈ ${onchainXP} XP`}</div>
          </div>
        </div>
        <div className={`card flex items-center gap-3 border-yellow-400`}>
          <div>
            <div className="text-xs text-zinc-400">Stellar Wallet</div>
            <KitModalConnectButton
              className="mt-1"
              onConnect={(response) => {
                console.log('Wallet connected:', response.address);
              }}
              onDisconnect={() => {
                console.log('Wallet disconnected');
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-yellow-400" size={18} />
            <h2 className="font-semibold">{t('profile.missionsHistory')}</h2>
          </div>
          {history.completed.length === 0 ? (
            <EmptyState title={t('profile.noHistory')} />
          ) : (
            <ul className="list-disc pl-5 text-sm text-zinc-300">
              {history.completed.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <CalendarCheck2 className="text-yellow-400" size={18} />
            <h2 className="font-semibold">{t('profile.eventsHistory')}</h2>
          </div>
          {history.attended.length === 0 ? (
            <EmptyState title={t('profile.noEvents')} />
          ) : (
            <ul className="list-disc pl-5 text-sm text-zinc-300">
              {history.attended.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
