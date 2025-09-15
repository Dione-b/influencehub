import { createContext, useContext, useMemo, useState } from 'react'
import type {
  AttendanceRecord,
  EventItem,
  Mission,
  MissionSubmission,
  SubmissionStatus,
} from './types'
import { MOCK_ATTENDANCE, MOCK_EVENTS, MOCK_MISSIONS, MOCK_SUBMISSIONS, MOCK_USERS } from './mockData'

interface DataContextValue {
  missions: Mission[]
  events: EventItem[]
  submissions: MissionSubmission[]
  attendance: AttendanceRecord[]
  addMission: (mission: Omit<Mission, 'id'>) => void
  updateMission: (id: string, partial: Partial<Mission>) => void
  removeMission: (id: string) => void
  submitMission: (submission: Omit<MissionSubmission, 'id' | 'status' | 'date'> & { proofValue: string }) => void
  reviewSubmission: (id: string, status: SubmissionStatus, points: number, userId: string) => void
  addEvent: (event: Omit<EventItem, 'id'>) => void
  updateEvent: (id: string, partial: Partial<EventItem>) => void
  removeEvent: (id: string) => void
  checkin: (userId: string, code: string) => { ok: boolean; event?: EventItem }
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>([...MOCK_MISSIONS])
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

  function submitMission(submission: Omit<MissionSubmission, 'id' | 'status' | 'date'> & { proofValue: string }) {
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
    [missions, events, submissions, attendance],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
