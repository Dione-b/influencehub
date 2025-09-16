import { useMemo, useCallback } from "react";
import { useAuth } from "../state/AuthContext";
import { useData } from "../state/DataContext";
import { UserCircle2, Trophy, CalendarCheck2, Target, Wallet } from "lucide-react";
import { PageHeader, StatCard, EmptyState } from "../ui/Primitives";
import { useFreighter } from "../hooks/useFreighter";

export function ProfilePage() {
  const { user } = useAuth();
  const { address, connect } = useFreighter();
  const { submissions, attendance, missions, events } = useData();

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

  const effectiveAddress = address ?? undefined;

  if (!user) return <div>Faça login para ver seu perfil.</div>;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleConnectWallet = useCallback(async () => {
    await connect();
  }, [connect]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6 page-root relative z-10">
      <PageHeader icon={<UserCircle2 />} title="Perfil" />
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card flex justify-between">
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-zinc-400">{user.email}</div>
            <div className="text-xs mt-2 inline-block mt-4 px-2 py-0.5 rounded-full bg-zinc-800">
              {user.role === "ADMIN" ? "Administrador" : "Influenciador"}
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
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <StatCard
          icon={<Trophy />}
          label="Pontos Totais"
          value={user.totalPoints}
          accent
        />
        <StatCard
          icon={<Target />}
          label="Missões Concluídas"
          value={history.completed.length}
        />
        <div className={`card flex items-center gap-3 border-yellow-400`}>
          {/* {icon && <div className="text-yellow-400">{icon}</div>} */}
          <div>
            <div className="text-xs text-zinc-400">Carteira</div>
            <div className={`text-md font-extrabold text-yellow-400`}>
              <button className="btn btn-primary mt-4" onClick={handleConnectWallet}>
                {effectiveAddress !== undefined
                ? formatAddress(effectiveAddress)
                : "Vincular Carteira"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-yellow-400" size={18} />
            <h2 className="font-semibold">Histórico de Missões</h2>
          </div>
          {history.completed.length === 0 ? (
            <EmptyState title="Sem histórico ainda" />
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
            <h2 className="font-semibold">Histórico de Eventos</h2>
          </div>
          {history.attended.length === 0 ? (
            <EmptyState title="Sem eventos registrados" />
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
