export const tokens = {
  color: {
    light: {
      surface:                   '#fdfbfa',
      'surface-dim':             '#ded8d7',
      'surface-bright':          '#fdfbfa',
      'surface-container-lowest':  '#ffffff',
      'surface-container-low':     '#f8f2f1',
      'surface-container':         '#f2eceb',
      'surface-container-high':    '#ece7e6',
      'surface-container-highest': '#e6e1e0',
      'on-surface':              '#1c1b1b',
      'on-surface-variant':      '#444746',
      'inverse-surface':         '#313030',
      'inverse-on-surface':      '#f5efee',
      outline:                   '#776e6d',
      'outline-variant':         '#cac3c3',
      'surface-tint':            '#005bc1',
      'surface-variant':         '#e0e3f2',

      primary:                   '#005bc1',
      'on-primary':              '#ffffff',
      'primary-container':       '#d8e2ff',
      'on-primary-container':    '#001a41',
      'inverse-primary':         '#adc6ff',
      'primary-fixed':           '#d8e2ff',
      'primary-fixed-dim':       '#adc6ff',
      'on-primary-fixed':        '#001a41',
      'on-primary-fixed-variant':'#004493',

      secondary:                   '#802a00',
      'on-secondary':              '#ffffff',
      'secondary-container':       '#ffdbce',
      'on-secondary-container':    '#2d0c00',
      'secondary-fixed':           '#ffdbce',
      'secondary-fixed-dim':       '#ffb59a',
      'on-secondary-fixed':        '#370e00',
      'on-secondary-fixed-variant':'#802a00',

      tertiary:                    '#2f2ebe',
      'on-tertiary':               '#ffffff',
      'tertiary-container':        '#e1e0ff',
      'on-tertiary-container':     '#07006c',
      'tertiary-fixed':            '#e1e0ff',
      'tertiary-fixed-dim':        '#c0c1ff',
      'on-tertiary-fixed':         '#07006c',
      'on-tertiary-fixed-variant': '#2f2ebe',

      error:                 '#ba1a1a',
      'on-error':            '#ffffff',
      'error-container':     '#ffdad6',
      'on-error-container':  '#410002',

      background:            '#f4f3f3',
      'on-background':       '#1c1b1b',
    },

    dark: {
      surface:                   '#131313',
      'surface-dim':             '#131313',
      'surface-bright':          '#393939',
      'surface-container-lowest':  '#0e0e0e',
      'surface-container-low':     '#1c1b1b',
      'surface-container':         '#201f1f',
      'surface-container-high':    '#2a2a2a',
      'surface-container-highest': '#353534',
      'on-surface':              '#e5e2e1',
      'on-surface-variant':      '#c1c6d7',
      'inverse-surface':         '#e5e2e1',
      'inverse-on-surface':      '#313030',
      outline:                   '#8b90a0',
      'outline-variant':         '#414755',
      'surface-tint':            '#adc6ff',
      'surface-variant':         '#353534',

      primary:                   '#adc6ff',
      'on-primary':              '#002e69',
      'primary-container':       '#4b8eff',
      'on-primary-container':    '#00285c',
      'inverse-primary':         '#005bc1',
      'primary-fixed':           '#d8e2ff',
      'primary-fixed-dim':       '#adc6ff',
      'on-primary-fixed':        '#001a41',
      'on-primary-fixed-variant':'#004493',

      secondary:                   '#ffb59a',
      'on-secondary':              '#5a1b00',
      'secondary-container':       '#ff5e07',
      'on-secondary-container':    '#531900',
      'secondary-fixed':           '#ffdbce',
      'secondary-fixed-dim':       '#ffb59a',
      'on-secondary-fixed':        '#370e00',
      'on-secondary-fixed-variant':'#802a00',

      tertiary:                    '#c0c1ff',
      'on-tertiary':               '#1000a9',
      'tertiary-container':        '#8083ff',
      'on-tertiary-container':     '#0d0096',
      'tertiary-fixed':            '#e1e0ff',
      'tertiary-fixed-dim':        '#c0c1ff',
      'on-tertiary-fixed':         '#07006c',
      'on-tertiary-fixed-variant': '#2f2ebe',

      error:                 '#ffb4ab',
      'on-error':            '#690005',
      'error-container':     '#93000a',
      'on-error-container':  '#ffdad6',

      background:            '#131313',
      'on-background':       '#e5e2e1',
    },
  },

  spacing: {
    base:           '4px',
    xs:             '8px',
    sm:             '12px',
    md:             '16px',
    lg:             '24px',
    xl:             '32px',
    gutter:         '20px',
    sidebarWidth:   '260px',
    containerMax:   '1440px',
  },

  borderRadius: {
    sm:      '2px',
    default: '4px',
    md:      '6px',
    lg:      '8px',
    xl:      '12px',
    full:    '9999px',
  },

  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    icon: ['Material Symbols Outlined'],
  },

  typography: {
    'display-lg': {
      fontSize:      '48px',
      lineHeight:    '56px',
      letterSpacing: '-0.02em',
      fontWeight:    '700',
    },
    'headline-lg': {
      fontSize:      '32px',
      lineHeight:    '40px',
      letterSpacing: '-0.01em',
      fontWeight:    '600',
    },
    'headline-lg-mobile': {
      fontSize:   '24px',
      lineHeight: '32px',
      fontWeight: '600',
    },
    'title-md': {
      fontSize:   '20px',
      lineHeight: '28px',
      fontWeight: '600',
    },
    'body-lg': {
      fontSize:   '16px',
      lineHeight: '24px',
      fontWeight: '400',
    },
    'body-sm': {
      fontSize:   '14px',
      lineHeight: '20px',
      fontWeight: '400',
    },
    'label-caps': {
      fontSize:      '12px',
      lineHeight:    '16px',
      letterSpacing: '0.05em',
      fontWeight:    '700',
    },
  },

  effect: {
    glass: {
      light: {
        bg:        'rgba(0, 0, 0, 0.04)',
        border:    'rgba(0, 0, 0, 0.10)',
        highlight: 'rgba(0, 0, 0, 0.04)',
        zebra:     'rgba(0, 0, 0, 0.02)',
      },
      dark: {
        bg:        'rgba(255, 255, 255, 0.03)',
        border:    'rgba(255, 255, 255, 0.10)',
        highlight: 'rgba(255, 255, 255, 0.05)',
        zebra:     'rgba(255, 255, 255, 0.02)',
      },
    },
    scrollbar: {
      light: { thumb: '#cac3c3', thumbHover: '#aaa4a4' },
      dark:  { thumb: '#353534', thumbHover: '#414755' },
    },
  },
} as const

export type ColorToken   = keyof typeof tokens.color.light
export type SpacingToken = keyof typeof tokens.spacing
export type RadiusToken  = keyof typeof tokens.borderRadius
export type TypographyToken = keyof typeof tokens.typography
