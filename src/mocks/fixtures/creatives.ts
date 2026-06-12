import type {
  CreativeLabDraft,
  ContentGenerationData,
} from '@/types'

export const creativeLabDraftFixture: CreativeLabDraft = {
  _id: 'creative-draft-001',
  title: 'New Ad Creative',
  format: 'single-image',
  publishContext: 'company-page',
  assets: [
    { id: 'asset-1', name: 'Thumbnail_01.jpg', type: 'image' },
    { id: 'asset-2', name: 'product_demo_v2.mp4', type: 'video', progress: 65 },
  ],
  headline: 'Supercharge your workflow today',
  primaryText:
    'Discover the new standard in automation. Join thousands of professionals saving 10+ hours a week.',
  cta: 'Learn More',
  complianceItems: [
    {
      id: 'check-char-limits',
      label: 'Limites de Caracteres',
      autoChecked: true,
      note: '240/3000',
      required: true,
    },
    {
      id: 'check-aspect-ratio',
      label: 'Proporção (16:9)',
      autoChecked: true,
      required: true,
    },
    {
      id: 'check-destination-link',
      label: 'Link de Destino',
      autoChecked: false,
      required: true,
      actionLabel: 'Verificar',
    },
    {
      id: 'check-safe-zone',
      label: 'Alinhamento de Zona Segura',
      autoChecked: true,
      note: 'Verificado',
      required: true,
    },
    {
      id: 'check-linkedin-alt',
      label: 'LinkedIn: Texto Alternativo',
      autoChecked: false,
      required: true,
      actionLabel: 'Adicionar',
    },
    {
      id: 'check-youtube-metadata',
      label: 'YouTube: Metadados',
      autoChecked: false,
      required: false,
      actionLabel: 'Adicionar',
    },
  ],
  suggestions: [
    {
      id: 'sug-headline',
      type: 'warning',
      title: 'Tamanho do Título',
      description: 'Seu título é conciso, o que é ótimo para mobile.',
    },
    {
      id: 'sug-emoji',
      type: 'tip',
      title: 'Emoji Ausente',
      description:
        'Considere adicionar um emoji relevante ao texto principal para aumentar o engajamento em até 15%.',
      quickActions: [
        { label: '✨ Add Magic', value: '✨' },
        { label: '📈 Add Chart', value: '📈' },
      ],
    },
  ],
  createdAt: '2026-06-10T10:00:00Z',
  updatedAt: '2026-06-10T12:00:00Z',
}

export const contentGenerationFixture: ContentGenerationData = {
  _id: 'content-generation',
  stats: {
    generated: 3,
    scheduled: 3,
    published: 12,
  },
  drafts: [
    {
      _id: 'post-draft-1',
      content:
        'Tutorial: Como automatizar seu fluxo de Telegram usando N8N e IA.',
      channel: 'telegram',
      status: 'draft',
    },
    {
      _id: 'post-draft-2',
      content: '5 Dicas Rápidas para Reels que convertem seguidores em clientes.',
      channel: 'linkedin',
      status: 'draft',
    },
    {
      _id: 'post-draft-3',
      content: 'Deep Dive: Por que o YouTube é a melhor plataforma para 2026.',
      channel: 'youtube',
      status: 'draft',
    },
  ],
  scheduled: [
    {
      _id: 'post-sched-1',
      content:
        'A oportunidade real em IA em 2026 não é agência de automação...',
      channel: 'youtube',
      status: 'scheduled',
      scheduledFor: '2026-05-21T08:30:00Z',
    },
    {
      _id: 'post-sched-2',
      content: 'Carrossel: O fim das senhas como conhecemos.',
      channel: 'linkedin',
      status: 'scheduled',
      scheduledFor: '2026-06-13T10:00:00Z',
    },
    {
      _id: 'post-sched-3',
      content: 'Resumo da semana: Links úteis e novas automações liberadas.',
      channel: 'telegram',
      status: 'scheduled',
      scheduledFor: '2026-06-12T21:00:00Z',
    },
  ],
  published: [
    {
      _id: 'post-pub-1',
      content: 'Alerta de nova ferramenta de IA para edição de vídeo.',
      channel: 'telegram',
      status: 'published',
      publishedAt: '2026-05-19T00:00:00Z',
    },
    {
      _id: 'post-pub-2',
      content: 'Reels: O bastidor da nossa última campanha 100% no-code.',
      channel: 'linkedin',
      status: 'published',
      publishedAt: '2026-05-17T00:00:00Z',
    },
    {
      _id: 'post-pub-3',
      content:
        'Testei Claude Design vs Open Design. Ambos fazem a mesma coisa.',
      channel: 'youtube',
      status: 'published',
      publishedAt: '2026-05-09T00:00:00Z',
    },
  ],
}

export const generatedContentFixture: { content: string } = {
  content:
    '🚀 O futuro do marketing digital está aqui! Descubra como a automação inteligente pode transformar sua estratégia de conteúdo e multiplicar seus resultados.',
}
