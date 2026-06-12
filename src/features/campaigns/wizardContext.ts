import { createContext, useContext, useReducer } from 'react'
import type { WizardState, WizardAction, WizardObjective, WizardChannelOption } from '@/types'

// ── Default state ──────────────────────────────────────────────────────────
const DEFAULT_STATE: WizardState = {
  step1: {
    name: '',
    description: '',
    objective: 'lead-gen' as WizardObjective,
    priority: false,
  },
  step2: {
    channels: [] as WizardChannelOption[],
  },
  step3: {
    selectedSegmentId: null,
    location: 'Global (All)',
    ageRange: '25 - 44',
    interests: ['Artificial Intelligence', 'Digital Marketing'],
    behaviorClickedLinkedIn: true,
    behaviorOpenedEmail: false,
    behaviorNewLeads: false,
  },
  step4: {
    confirmed: false,
  },
  step5: {
    format: 'single-image',
    headline: 'Elevate Your Strategy with Campaign Studio',
    primaryText:
      'Harness the power of cinematic precision. Manage high-stakes campaigns with absolute authority and real-time insights designed for elite digital agencies.',
    cta: 'Learn More',
  },
}

const STORAGE_KEY = 'wizard_state'

// ── sessionStorage helpers ─────────────────────────────────────────────────

function loadFromStorage(): WizardState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as WizardState
  } catch {
    // ignore parse errors
  }
  return DEFAULT_STATE
}

function saveToStorage(state: WizardState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota errors
  }
}

export function clearWizardStorage(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// ── Reducer ────────────────────────────────────────────────────────────────

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  let next: WizardState
  switch (action.type) {
    case 'SET_STEP1':
      next = { ...state, step1: { ...state.step1, ...action.payload } }
      break
    case 'SET_STEP2':
      next = { ...state, step2: { ...state.step2, ...action.payload } }
      break
    case 'SET_STEP3':
      next = { ...state, step3: { ...state.step3, ...action.payload } }
      break
    case 'SET_STEP4':
      next = { ...state, step4: { ...state.step4, ...action.payload } }
      break
    case 'SET_STEP5':
      next = { ...state, step5: { ...state.step5, ...action.payload } }
      break
    case 'RESET':
      next = DEFAULT_STATE
      break
    default:
      return state
  }
  saveToStorage(next)
  return next
}

// ── Context ────────────────────────────────────────────────────────────────

export interface WizardContextValue {
  state: WizardState
  dispatch: React.Dispatch<WizardAction>
}

export const WizardContext = createContext<WizardContextValue | null>(null)

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used inside WizardContext.Provider')
  return ctx
}

// ── Hook that creates the reducer (used in NewCampaignWizard) ──────────────

export function useWizardReducer() {
  return useReducer(wizardReducer, undefined, loadFromStorage)
}
