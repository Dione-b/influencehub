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
    name: 'Influenciador Alpha',
    email: 'embaixador@exemplo.com',
    password: 'senha123',
    role: 'INFLUENCER',
    totalPoints: 350,
  },
  {
    id: 'u3',
    name: 'Influenciador Beta',
    email: 'beta@exemplo.com',
    password: 'senha123',
    role: 'INFLUENCER',
    totalPoints: 420,
  },
  {
    id: 'u4',
    name: 'Influenciador Gama',
    email: 'gama@exemplo.com',
    password: 'senha123',
    role: 'INFLUENCER',
    totalPoints: 280,
  },
  {
    id: 'u5',
    name: 'Influenciador Delta',
    email: 'delta@exemplo.com',
    password: 'senha123',
    role: 'INFLUENCER',
    totalPoints: 510,
  },
]

export const MOCK_MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Post no Twitter',
    description: 'Escreva um fio sobre o projeto',
    type: 'social',
    points: 100,
    status: 'ativa',
  },
  {
    id: 'm2',
    title: 'Thread no Reddit',
    description: 'Comece uma discussão construtiva',
    type: 'social',
    points: 120,
    status: 'ativa',
  },
  {
    id: 'm3',
    title: 'Organizar meetup',
    description: 'Promova um encontro local',
    type: 'evento',
    points: 300,
    status: 'ativa',
  },
  {
    id: 'm4',
    title: 'Live no YouTube',
    description: 'Faça uma live explicando a rede',
    type: 'social',
    points: 200,
    status: 'encerrada',
  },
  {
    id: 'm5',
    title: 'Cobertura de evento',
    description: 'Cubra um evento oficial',
    type: 'evento',
    points: 250,
    status: 'ativa',
  },
]

export const MOCK_BADGES: Badge[] = [
  {
    id: "b1",
    title: "ESTRELA EM ASCENSÃO",
    subtitle: "Alcance 10k seguidores",
    progress: 85,
    daysLeft: 5,
    rarity: "epic",
  },
  {
    id: "b2",
    title: "ENGAGEMENT PRO",
    subtitle: "Média de 15% de engagement",
    progress: 92,
    daysLeft: 3,
    rarity: "legendary",
  },
  {
    id: "b3",
    title: "CONSISTENCY KING",
    subtitle: "20 publicações em 30 dias",
    progress: 75,
    daysLeft: 12,
    rarity: "rare",
  },
  {
    id: "b4",
    title: "TREND SETTER",
    subtitle: "Crie 5 conteúdos virais",
    progress: 60,
    daysLeft: 8,
    rarity: "epic",
  },
  {
    id: "b5",
    title: "BRAND MAGNET",
    subtitle: "Feche pelo menos 3 parcerias",
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
    location: 'São Paulo',
    checkinCode: 'EVENTO2025',
  },
  {
    id: 'e2',
    name: 'Hackathon Global',
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
    proofValue: 'Discussão com 50 comentários',
    status: 'approved',
    date: '2025-08-03',
  },
  {
    id: 's3',
    userId: 'u2',
    missionId: 'm4',
    proofType: 'image',
    proofValue: 'live-captura.png',
    status: 'rejected',
    date: '2025-08-04',
  },
]

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', userId: 'u2', eventId: 'e1', date: '2025-08-02' },
]
