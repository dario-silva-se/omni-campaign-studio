import { describe, it, expect, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import NewCampaignWizard from './NewCampaignWizard'
import type { WizardState } from '@/types'

/** Seed sessionStorage with a WizardState so the wizard loads it on mount. */
function seedWizardState(overrides: Partial<WizardState> = {}) {
  const base: WizardState = {
    step1: { name: 'Test Campaign', description: '', objective: 'lead-gen', priority: false },
    step2: { channels: ['social-media'] },
    step3: {
      selectedSegmentId: null,
      location: 'Global (All)',
      ageRange: '25 - 44',
      interests: [],
      behaviorClickedLinkedIn: false,
      behaviorOpenedEmail: false,
      behaviorNewLeads: false,
    },
    step4: { confirmed: false },
    step5: { format: 'single-image', headline: '', primaryText: '', cta: 'Learn More' },
    ...overrides,
  }
  sessionStorage.setItem('wizard_state', JSON.stringify(base))
}

describe('NewCampaignWizard', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders step 1 with 5 step indicators', () => {
    renderWithProviders(<NewCampaignWizard />, { route: '/campaigns/new/step-1' })
    const indicators = screen.getAllByTestId(/step-indicator-\d/)
    expect(indicators).toHaveLength(5)
  })

  it('does not advance when name is empty', async () => {
    renderWithProviders(<NewCampaignWizard />, { route: '/campaigns/new/step-1' })
    // Find next button by name/text
    const nextBtn = screen.getByRole('button', { name: /próximo passo/i })
    fireEvent.click(nextBtn)
    // Step 1 heading should still be visible (didn't navigate)
    expect(screen.getByText(/criar nova campanha/i)).toBeInTheDocument()
  })

  it('advances to step 2 after filling name', async () => {
    renderWithProviders(<NewCampaignWizard />, { route: '/campaigns/new/step-1' })
    const nameInput = screen.getByPlaceholderText(/q3 lead generation alpha/i)
    fireEvent.change(nameInput, { target: { value: 'My Campaign' } })
    const nextBtn = screen.getByRole('button', { name: /próximo passo/i })
    fireEvent.click(nextBtn)
    // Step 2 should now be rendered (channels heading)
    expect(await screen.findByText(/passo 2/i)).toBeInTheDocument()
  })

  it('persists state in sessionStorage on dispatch', () => {
    renderWithProviders(<NewCampaignWizard />, { route: '/campaigns/new/step-1' })
    const nameInput = screen.getByPlaceholderText(/q3 lead generation alpha/i)
    fireEvent.change(nameInput, { target: { value: 'Saved Name' } })
    const raw = sessionStorage.getItem('wizard_state')
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.step1.name).toBe('Saved Name')
  })

  describe('Step 3 audience validation', () => {
    it('blocks advancing when no audience is configured and shows required error', () => {
      // Seed with empty step3 (no segment, no interests, no behaviors)
      seedWizardState()
      renderWithProviders(<NewCampaignWizard />, { route: '/campaigns/new/step-3' })

      // Should be on step 3
      expect(screen.getByText(/definir seu público/i)).toBeInTheDocument()

      // Click Continue without configuring audience
      const continueBtn = screen.getByRole('button', { name: /revisar campanha/i })
      fireEvent.click(continueBtn)

      // Should still be on step 3
      expect(screen.getByText(/definir seu público/i)).toBeInTheDocument()

      // Required error message should be visible
      expect(
        screen.getByText(/selecione um segmento ou configure o construtor personalizado/i),
      ).toBeInTheDocument()
    })

    it('advances to step 4 after selecting a segment', () => {
      seedWizardState()
      renderWithProviders(<NewCampaignWizard />, { route: '/campaigns/new/step-3' })

      // Select first saved segment (Tech Enthusiasts)
      const segmentBtn = screen.getByRole('button', { name: /tech enthusiasts/i })
      fireEvent.click(segmentBtn)

      // Click Continue
      const continueBtn = screen.getByRole('button', { name: /revisar campanha/i })
      fireEvent.click(continueBtn)

      // Should now be on step 4
      expect(screen.getByText(/revisar seu público/i)).toBeInTheDocument()
    })
  })
})
