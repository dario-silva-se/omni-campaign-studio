import type { DashboardData, DashboardSignal, DashboardSignalSource, DashboardStatCard } from '@/types'

export type { DashboardData, DashboardSignal, DashboardSignalSource, DashboardStatCard }

export const dashboardFixture: DashboardData[] = [
  {
    _id: 'dashboard',
    greetingName: 'Matheus',
    campaignsRunning: 2,
    leadsCaptured: 880,
    stats: [
      {
        icon: 'play_circle',
        label: 'Visualizações YouTube',
        value: '24.5k',
        trend: '+12% vs last month',
        trendPositive: true,
        sparklinePoints: '0,25 20,20 40,28 60,15 80,18 100,5',
      },
      {
        icon: 'history',
        label: 'LinkedIn Views',
        value: '1.2k',
        trend: '+5.4% vs last month',
        trendPositive: true,
        sparklinePoints: '0,20 30,25 60,15 100,10',
      },
      {
        icon: 'favorite',
        label: 'Reels Engagement',
        value: '8.4%',
        trend: '+2.1% vs last month',
        trendPositive: true,
        sparklinePoints: '0,28 20,25 40,26 60,10 80,15 100,2',
      },
      {
        icon: 'send',
        label: 'Cliques Telegram',
        value: '880',
        trend: '+18% vs last month',
        trendPositive: true,
        sparklinePoints: '0,20 25,22 50,15 75,18 100,5',
      },
    ],
    signals: [
      // LinkedIn signals
      {
        _id: 'linkedin-1',
        source: 'linkedin',
        title: 'Liderança de Pensamento B2B',
        description:
          'Posts nativos de texto longo com insights de mercado estão recebendo 40% mais alcance orgânico.',
        author: 'B2B: @sales_pro · @linkedin_ads',
        publishedAt: '22/05 às 10:30',
        badge: 'Alta',
      },
      {
        _id: 'linkedin-2',
        source: 'linkedin',
        title: 'Vídeos Curtos Profissionais',
        description:
          'O novo feed de vídeos está priorizando conteúdos educacionais rápidos para tomadores de decisão.',
        author: 'Análise: @b2b_growth · @video_strategy',
        publishedAt: '21/05 às 16:45',
      },
      {
        _id: 'linkedin-3',
        source: 'linkedin',
        title: 'Newsletter de Empresa em Alta',
        description:
          'Taxas de abertura de newsletters corporativas no LinkedIn superam o e-mail marketing tradicional.',
        author: 'Insights: @corp_comms · @newsletter_hub',
        publishedAt: '22/05 às 09:00',
      },
      // YouTube signals
      {
        _id: 'youtube-1',
        source: 'youtube',
        title: "What's new in Claude Code",
        description: 'Anthropic lança novidades do Claude Code com guia prático.',
        author: '@claude',
        publishedAt: '20/05',
        views: 13714,
      },
      {
        _id: 'youtube-2',
        source: 'youtube',
        title: "I Built a $1M/y SaaS with Claude Code, Here's How",
        description: 'Nick Saraev construiu SaaS de $1M/ano usando Claude Code.',
        author: '@nicksaraev',
        publishedAt: '20/05',
        views: 8661,
      },
      {
        _id: 'youtube-3',
        source: 'youtube',
        title: 'Introducing Appshots in Codex',
        description: 'OpenAI lança Appshots no Codex para capturar contexto visual de...',
        author: '@OpenAI',
        publishedAt: '21/05',
        views: 1468,
      },
      // Telegram signals
      {
        _id: 'telegram-1',
        source: 'telegram',
        title: 'Canais de IA no Telegram',
        description:
          'Monitoramento global indica migração de comunidades de desenvolvedores para canais privados.',
        author: 'telegram-monitoring',
        categoryTag: 'Crescimento',
        activityNote: '+12.4k novos membros hoje',
      },
      {
        _id: 'telegram-2',
        source: 'telegram',
        title: 'Novas APIs de Bot para Pagamentos',
        description:
          'Atualização permite integração direta de checkouts em mini-apps dentro do mensageiro.',
        author: 'by telegram-dev',
        activityNote: 'Alta atividade em @BotFather',
      },
    ],
    radarUpdatedAt: '08:40',
  },
]
