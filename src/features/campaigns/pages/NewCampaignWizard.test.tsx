import { describe, it, expect, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import NewCampaignWizard from './NewCampaignWizard'

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
})
