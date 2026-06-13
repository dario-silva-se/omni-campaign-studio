import type { Approval, GovernanceHistoryRow } from '@/types'

export const approvalsFixture: Approval[] = [
  {
    _id: 'apr-001',
    postId: 'post-li-001',
    title: 'LI_Q4_PRODUCT_LAUNCH_02',
    channel: 'linkedin',
    status: 'pending',
    requestedBy: 'alex-chen',
    requestedByName: 'Alex Chen',
    timeAgo: '5h ago',
    urgency: 'normal',
    campaignContext: {
      targetAudience: 'C-Suite / CMOs',
      channel: 'LinkedIn Ads',
    },
    complianceItems: [
      { id: 'c1', label: 'Brand Tone of Voice', checked: true },
      { id: 'c2', label: 'Legal Disclaimer Included', checked: true },
      { id: 'c3', label: 'High-Res Asset Validation', checked: false },
    ],
    reviewers: [
      { name: 'Sarah Jenkins', role: 'Legal Compliance', status: 'pending', avatarInitials: 'SJ' },
      { name: 'Mark Davis', role: 'Creative Copy', status: 'pending', avatarInitials: 'MD' },
    ],
    comments: [
      {
        author: 'Sarah Jenkins',
        role: 'Legal Compliance',
        message:
          'The CTA in the third paragraph needs to be slightly more specific about the "Report". Can we change it to "2024 Tech Report"?',
        createdAt: '2024-05-24T07:42:00Z',
        replies: [
          {
            author: 'Mark Davis',
            role: 'Creative Copy',
            message: "Agreed. I've updated the source doc, will push changes to this preview shortly.",
            createdAt: '2024-05-24T08:42:00Z',
          },
        ],
      },
      {
        author: 'System',
        role: '',
        message: 'LinkedIn Insight Tag is not detected on the landing page URL provided in this creative.',
        createdAt: '2024-05-24T06:00:00Z',
        isAlert: true,
      },
    ],
    historyEvents: [
      { event: 'Visual Updated', actor: 'Mark Davis • Today, 10:45 AM', timeAgo: '10:45 AM' },
      { event: 'Content Created', actor: 'System • Oct 24, 4:12 PM', timeAgo: '4:12 PM' },
    ],
    contentSnippet:
      '"Success in the modern era is no longer about raw power, but about the surgical application of data. Our latest case study explores how..."',
    createdAt: '2024-05-24T00:00:00Z',
  },
  {
    _id: 'apr-002',
    postId: 'post-yt-001',
    title: 'The Future of AI-Driven Workflows in Enterprise',
    channel: 'youtube',
    status: 'pending',
    requestedBy: 'sarah-jenkins',
    requestedByName: 'Sarah Jenkins',
    timeAgo: '2h ago',
    urgency: 'critical',
    reviewers: [
      { name: 'Alex Chen', role: 'Director of Ops', status: 'pending', avatarInitials: 'AC' },
    ],
    comments: [],
    contentSnippet: '',
    thumbnailColorClass: 'bg-blue-900',
    createdAt: '2024-05-24T02:00:00Z',
  },
  {
    _id: 'apr-003',
    postId: 'post-tg-001',
    title: 'Q4 Product Roadmap Update - Confidential',
    channel: 'telegram',
    status: 'pending',
    requestedBy: 'jessica-wu',
    requestedByName: 'Jessica Wu',
    timeAgo: '8h ago',
    urgency: 'normal',
    reviewers: [
      { name: 'Marcus Chen', role: 'Senior Stakeholder', status: 'pending', avatarInitials: 'MC' },
    ],
    comments: [],
    contentSnippet: '',
    thumbnailColorClass: 'bg-slate-700',
    createdAt: '2024-05-23T16:00:00Z',
  },
]

export const governanceHistoryFixture: GovernanceHistoryRow[] = [
  {
    _id: 'hist-001',
    contentName: 'Summer Launch Reel v4',
    contentId: '#VID-29384',
    channel: 'Instagram',
    decision: 'approved',
    approver: 'Alex Rivera',
    date: '24 Mai 2024, 09:42',
  },
  {
    _id: 'hist-002',
    contentName: 'Tech-Expo Static Banner',
    contentId: '#IMG-00452',
    channel: 'Google Display',
    decision: 'rejected',
    approver: 'Sarah Jenkins',
    date: '22 Mai 2024, 14:15',
  },
  {
    _id: 'hist-003',
    contentName: 'Compliance Update v2.1',
    contentId: '#DOC-88219',
    channel: 'Email Interno',
    decision: 'approved',
    approver: 'Marcus Chen',
    date: '21 Mai 2024, 11:30',
  },
  {
    _id: 'hist-004',
    contentName: 'Quarterly Insight Story',
    contentId: '#ST-44310',
    channel: 'LinkedIn',
    decision: 'approved',
    approver: 'Alex Rivera',
    date: '20 Mai 2024, 16:55',
  },
]
