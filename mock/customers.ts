
export type CustomerScenario =
  | "S1"
  | "S2"
  | "S3"

export type CustomerStatus =
  | "NEW_CAPTURE"
  | "OTP_PENDING"
  | "NIN_PENDING"
  | "INCOMPLETE"
  | "ASSIGNED"
  | "DORMANT"
  | "RECOVERED"
  | "ACTIVE"

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  gender: string
  age: number
  location: string
  lga: string
  status: CustomerStatus
  scenario: CustomerScenario
  aiScore: number
  recoveryProbability: number
  riskScore: number
  onboardingCompletion: number
  kycTier: string
  assignedAgent: string
  slaRemaining: string
  transactionLikelihood: number
  churnRisk: number
  preferredChannel: string
  lastSeen: string
  device: string
  networkQuality: string
  avatar: string
  timeline: {
    event: string
    time: string
  }[]
}

export const customers: Customer[] = [
  {
    id: "PX-1001",
    name: "David Okafor",
    phone: "+2348034567891",
    email: "david@parallex.demo",
    gender: "Male",
    age: 29,
    location: "Lagos",
    lga: "Lekki",
    status: "OTP_PENDING",
    scenario: "S2",
    aiScore: 92,
    recoveryProbability: 88,
    riskScore: 12,
    onboardingCompletion: 64,
    kycTier: "Tier 1",
    assignedAgent: "Mary Johnson",
    slaRemaining: "12 mins",
    transactionLikelihood: 82,
    churnRisk: 21,
    preferredChannel: "WhatsApp",
    lastSeen: "3 mins ago",
    device: "Samsung S24",
    networkQuality: "Poor",
    avatar: "https://i.pravatar.cc/150?img=12",
    timeline: [
      {
        event: "Downloaded App",
        time: "09:12 AM",
      },
      {
        event: "Entered Phone Number",
        time: "09:13 AM",
      },
      {
        event: "WhatsApp OTP Failed",
        time: "09:14 AM",
      },
    ],
  },

  {
    id: "PX-1002",
    name: "Amina Bello",
    phone: "+2348076543210",
    email: "amina@parallex.demo",
    gender: "Female",
    age: 34,
    location: "Abuja",
    lga: "Maitama",
    status: "DORMANT",
    scenario: "S1",
    aiScore: 84,
    recoveryProbability: 72,
    riskScore: 5,
    onboardingCompletion: 100,
    kycTier: "Tier 2",
    assignedAgent: "James Musa",
    slaRemaining: "Completed",
    transactionLikelihood: 64,
    churnRisk: 68,
    preferredChannel: "Push Notification",
    lastSeen: "2 days ago",
    device: "iPhone 15",
    networkQuality: "Excellent",
    avatar: "https://i.pravatar.cc/150?img=32",
    timeline: [
      {
        event: "Onboarding Completed",
        time: "11:40 AM",
      },
      {
        event: "No First Transaction",
        time: "2 days ago",
      },
    ],
  },

  {
    id: "PX-1003",
    name: "Samuel Eze",
    phone: "+2348091112233",
    email: "samuel@parallex.demo",
    gender: "Male",
    age: 22,
    location: "Port Harcourt",
    lga: "Obio Akpor",
    status: "NEW_CAPTURE",
    scenario: "S3",
    aiScore: 74,
    recoveryProbability: 58,
    riskScore: 18,
    onboardingCompletion: 8,
    kycTier: "Tier 0",
    assignedAgent: "Unassigned",
    slaRemaining: "28 mins",
    transactionLikelihood: 33,
    churnRisk: 81,
    preferredChannel: "Push Notification",
    lastSeen: "1 min ago",
    device: "Tecno Camon",
    networkQuality: "Average",
    avatar: "https://i.pravatar.cc/150?img=14",
    timeline: [
      {
        event: "App Installed",
        time: "08:22 AM",
      },
    ],
  },
]

