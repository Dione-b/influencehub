import { createContext, useContext, useMemo, useState } from 'react'
import type {
  AttendanceRecord,
  Badge,
  EventItem,
  Mission,
  MissionSubmission,
  SubmissionStatus,
} from './types'
import { MOCK_ATTENDANCE, MOCK_EVENTS, MOCK_MISSIONS, MOCK_BADGES, MOCK_SUBMISSIONS, MOCK_USERS } from './mockData'

interface DataContextValue {
  missions: Mission[]
  badges: Badge[]
  events: EventItem[]
  submissions: MissionSubmission[]
  attendance: AttendanceRecord[]
  addMission: (mission: Omit<Mission, 'id'>) => void
  updateMission: (id: string, partial: Partial<Mission>) => void
  removeMission: (id: string) => void
  submitMission: (submission: Omit<MissionSubmission, 'id' | 'status' | 'date'> & { proofValue: string }) => void
  addBadge: (badge: Omit<Badge, 'id'>) => void
  updateBadge: (id: string, partial: Partial<Badge>) => void
  removeBadge: (id: string) => void
  reviewSubmission: (id: string, status: SubmissionStatus, points: number, userId: string) => void
  addEvent: (event: Omit<EventItem, 'id'>) => void
  updateEvent: (id: string, partial: Partial<EventItem>) => void
  removeEvent: (id: string) => void
  checkin: (userId: string, code: string) => { ok: boolean; event?: EventItem }
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>([...MOCK_MISSIONS])
  const [badges, setBadges] = useState<Badge[]>([...MOCK_BADGES])
  const [events, setEvents] = useState<EventItem[]>([...MOCK_EVENTS])
  const [submissions, setSubmissions] = useState<MissionSubmission[]>([...MOCK_SUBMISSIONS])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([...MOCK_ATTENDANCE])

  function addMission(mission: Omit<Mission, 'id'>) {
    setMissions((prev) => [...prev, { ...mission, id: 'm' + (prev.length + 1) }])
  }

  function updateMission(id: string, partial: Partial<Mission>) {
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, ...partial } : m)))
  }

  function removeMission(id: string) {
    setMissions((prev) => prev.filter((m) => m.id !== id))
  }

  function addBadge(badge: Omit<Badge, 'id'>) {
    setBadges((prev) => [...prev, { ...badge, id: 'b' + (prev.length + 1) }])
  }

  function updateBadge(id: string, partial: Partial<Badge>) {
    setBadges((prev) => prev.map((b) => (b.id === id ? { ...b, ...partial } : b)))
  }

  function removeBadge(id: string) {
    setBadges((prev) => prev.filter((b) => b.id !== id))
  }

  function submitMission(submission: Omit<MissionSubmission, 'id' | 'status' | 'date'> & { proofValue: string }) {
    const existingSubmission = submissions.find(
      sub => sub.userId === submission.userId && 
            sub.missionId === submission.missionId
    );

    if (existingSubmission) {
      throw new Error('Você já submeteu esta missão anteriormente');
    }

    setSubmissions((prev) => [
      ...prev,
      {
        ...submission,
        id: 's' + (prev.length + 1),
        status: 'pending',
        date: new Date().toISOString().slice(0, 10),
      },
    ])
  }

  function reviewSubmission(id: string, status: SubmissionStatus, points: number, userId: string) {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
    if (status === 'approved' && points > 0) {
      const u = MOCK_USERS.find((uu) => uu.id === userId)
      if (u) u.totalPoints += points
    }
  }

  function addEvent(event: Omit<EventItem, 'id'>) {
    setEvents((prev) => [...prev, { ...event, id: 'e' + (prev.length + 1) }])
  }

  function updateEvent(id: string, partial: Partial<EventItem>) {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...partial } : e)))
  }

  function removeEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  function checkin(userId: string, code: string) {
    const found = events.find((e) => e.checkinCode.toLowerCase() === code.toLowerCase())
    if (!found) return { ok: false as const }
    const record: AttendanceRecord = {
      id: 'a' + (attendance.length + 1),
      userId,
      eventId: found.id,
      date: new Date().toISOString().slice(0, 10),
    }
    setAttendance((prev) => [...prev, record])
    // Pontos por check-in em evento (ex.: 50)
    const u = MOCK_USERS.find((uu) => uu.id === userId)
    if (u) u.totalPoints += 50
    return { ok: true as const, event: found }
  }

  const value = useMemo(
    () => ({
      missions,
      events,
      badges,
      addBadge,
      updateBadge,
      removeBadge,
      submissions,
      attendance,
      addMission,
      updateMission,
      removeMission,
      submitMission,
      reviewSubmission,
      addEvent,
      updateEvent,
      removeEvent,
      checkin,
    }),
    [missions, events, badges, submissions, attendance],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
