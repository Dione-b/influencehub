import type { AttendanceRecord, Badge, EventItem, Mission, MissionSubmission, UserProfile } from './types'

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u1',
    name: 'Admin Master',
    email: 'admin@exemplo.com',
    password: 'admin123',
    role: 'ADMIN',
    totalPoints: 1200,
  },
  {
    id: 'u2',
    name: 'Influencer Alpha',
    email: 'influencer@example.com',
    password: 'password123',
    role: 'INFLUENCER',
    totalPoints: 350,
  },
  {
    id: 'u3',
    name: 'Influencer Beta',
    email: 'beta@example.com',
    password: 'password123',
    role: 'INFLUENCER',
    totalPoints: 420,
  },
  {
    id: 'u4',
    name: 'Influencer Gamma',
    email: 'gamma@example.com',
    password: 'password123',
    role: 'INFLUENCER',
    totalPoints: 280,
  },
  {
    id: 'u5',
    name: 'Influencer Delta',
    email: 'delta@example.com',
    password: 'password123',
    role: 'INFLUENCER',
    totalPoints: 510,
  },
]

export const MOCK_MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Post on X/Twitter',
    description: 'Write a thread about the project',
    type: 'social',
    points: 100,
    status: 'ativa',
  },
  {
    id: 'm2',
    title: 'Thread on Reddit',
    description: 'Start a constructive discussion',
    type: 'social',
    points: 120,
    status: 'ativa',
  },
  {
    id: 'm3',
    title: 'Organize a meetup',
    description: 'Host a local community gathering',
    type: 'evento',
    points: 300,
    status: 'ativa',
  },
  {
    id: 'm4',
    title: 'YouTube live',
    description: 'Stream a live explaining the network',
    type: 'social',
    points: 200,
    status: 'encerrada',
  },
  {
    id: 'm5',
    title: 'Event coverage',
    description: 'Cover an official event',
    type: 'evento',
    points: 250,
    status: 'ativa',
  },
]

export const MOCK_BADGES: Badge[] = [
  {
    id: "b1",
    title: "ESTRELA EM ASCENSÃO",
    subtitle: "Reach 10k followers",
    progress: 85,
    daysLeft: 5,
    rarity: "epic",
  },
  {
    id: "b2",
    title: "ENGAGEMENT PRO",
    subtitle: "Average 15% engagement",
    progress: 92,
    daysLeft: 3,
    rarity: "legendary",
  },
  {
    id: "b3",
    title: "CONSISTENCY KING",
    subtitle: "20 posts in 30 days",
    progress: 75,
    daysLeft: 12,
    rarity: "rare",
  },
  {
    id: "b4",
    title: "TREND SETTER",
    subtitle: "Create 5 viral contents",
    progress: 60,
    daysLeft: 8,
    rarity: "epic",
  },
  {
    id: "b5",
    title: "BRAND MAGNET",
    subtitle: "Close at least 3 partnerships",
    progress: 100,
    daysLeft: 0,
    rarity: "legendary",
  }
]

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'e1',
    name: 'Summit 2025',
    date: '2025-08-20',
    location: 'Sao Paulo',
    checkinCode: 'EVENT2025',
  },
  {
    id: 'e2',
    name: 'Global Hackathon',
    date: '2025-09-05',
    location: 'Rio de Janeiro',
    checkinCode: 'HACK2025',
  },
  {
    id: 'e3',
    name: 'Community Call',
    date: '2025-08-28',
    location: 'Online',
    checkinCode: 'CALL0825',
  },
]

export const MOCK_SUBMISSIONS: MissionSubmission[] = [
  {
    id: 's1',
    userId: 'u2',
    missionId: 'm1',
    proofType: 'link',
    proofValue: 'https://twitter.com/post/123',
    status: 'approved',
    date: '2025-08-01',
  },
  {
    id: 's2',
    userId: 'u2',
    missionId: 'm2',
    proofType: 'text',
    proofValue: 'Discussion with 50 comments',
    status: 'approved',
    date: '2025-08-03',
  },
  {
    id: 's3',
    userId: 'u2',
    missionId: 'm4',
    proofType: 'image',
    proofValue: 'live-screenshot.png',
    status: 'rejected',
    date: '2025-08-04',
  },
]

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', userId: 'u2', eventId: 'e1', date: '2025-08-02' },
]
