export type UserRole = 'INFLUENCER' | 'ADMIN'

export interface UserProfile {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  totalPoints: number
}

export type MissionType = 'social' | 'evento'
export type MissionStatus = 'ativa' | 'encerrada'

export interface Mission {
  id: string
  title: string
  description: string
  type: MissionType
  points: number
  status: MissionStatus
}

export interface EventItem {
  id: string
  name: string
  date: string
  location: string
  checkinCode: string
}

export type ProofType = 'link' | 'text' | 'image'
export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export interface MissionSubmission {
  id: string
  userId: string
  missionId: string
  proofType: ProofType
  proofValue: string
  status: SubmissionStatus
  date: string
}

export interface AttendanceRecord {
  id: string
  userId: string
  eventId: string
  date: string
}
