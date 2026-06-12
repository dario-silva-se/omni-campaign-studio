import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import TemplateLibraryPage from './TemplateLibraryPage'
import { templateService } from '@/services/templateService'

describe('TemplateLibraryPage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<TemplateLibraryPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders template cards from fixtures', async () => {
    renderWithProviders(<TemplateLibraryPage />)
    expect(await screen.findByText('Viral Script Generator')).toBeInTheDocument()
    expect(screen.getByText('B2B Thought Leadership')).toBeInTheDocument()
    expect(screen.getByText('Broadcast Master')).toBeInTheDocument()
    expect(screen.getByText('Carousel Storyteller')).toBeInTheDocument()
    expect(screen.getByText('Thumbnail Optimizer')).toBeInTheDocument()
    expect(screen.getByText('Community Engagement Bot')).toBeInTheDocument()
  })

  it('shows error state when the service fails', async () => {
    const spy = vi.spyOn(templateService, 'list').mockRejectedValueOnce(new Error('boom'))
    renderWithProviders(<TemplateLibraryPage />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    spy.mockRestore()
  })
})
